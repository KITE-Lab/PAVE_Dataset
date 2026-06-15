#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'EOF'
Usage:
  ./scripts/git_submit_current.sh [--dry-run] [commit message]

Examples:
  ./scripts/git_submit_current.sh
  ./scripts/git_submit_current.sh "update dataset documentation"
  ./scripts/git_submit_current.sh --dry-run
EOF
}

die() {
  echo "[ERROR] $*" >&2
  exit 1
}

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
REPO_ROOT="$(git -C "${SCRIPT_DIR}/.." rev-parse --show-toplevel 2>/dev/null)" || die "script is not inside a Git repository"
GIT_DIR="$(git -C "${REPO_ROOT}" rev-parse --git-dir)"
DRY_RUN=0

if [[ "${1:-}" == "-h" || "${1:-}" == "--help" ]]; then
  usage
  exit 0
fi

if [[ "${1:-}" == "--dry-run" ]]; then
  DRY_RUN=1
  shift
fi

COMMIT_MESSAGE="${*:-}"
if [[ -z "${COMMIT_MESSAGE}" ]]; then
  COMMIT_MESSAGE="chore: update PAVE_Dataset $(date '+%Y-%m-%d %H:%M:%S')"
fi

cd "${REPO_ROOT}"

BRANCH="$(git symbolic-ref --quiet --short HEAD 2>/dev/null)" || die "refusing to submit from detached HEAD"
UPSTREAM="$(git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}' 2>/dev/null)" || die "branch '${BRANCH}' has no tracked upstream"

if git rev-parse -q --verify MERGE_HEAD >/dev/null 2>&1; then
  die "merge is in progress; resolve it before submitting"
fi

if [[ -d "${GIT_DIR}/rebase-merge" || -d "${GIT_DIR}/rebase-apply" ]]; then
  die "rebase is in progress; resolve it before submitting"
fi

if [[ -n "$(git diff --name-only --diff-filter=U)" ]]; then
  die "unmerged files are present; resolve conflicts before submitting"
fi

echo "[INFO] repository: ${REPO_ROOT}"
echo "[INFO] branch: ${BRANCH}"
echo "[INFO] upstream: ${UPSTREAM}"
echo

if [[ -z "$(git status --porcelain=v1 --untracked-files=all)" ]]; then
  echo "[INFO] nothing to commit"
  exit 0
fi

echo "[INFO] current status:"
git status --short --untracked-files=all
echo

if [[ "${DRY_RUN}" -eq 1 ]]; then
  echo "[DRY-RUN] commit message: ${COMMIT_MESSAGE}"
  echo "[DRY-RUN] files that would be staged by git add -A:"
  git add -A --dry-run
  echo "[DRY-RUN] would run: git commit -m \"${COMMIT_MESSAGE}\""
  echo "[DRY-RUN] would run: git pull --rebase --autostash"
  echo "[DRY-RUN] would run: git push"
  exit 0
fi

echo "[INFO] staging all non-ignored changes"
git add -A

if git diff --cached --quiet; then
  echo "[INFO] no staged changes after git add -A"
  exit 0
fi

echo "[INFO] committing"
git commit -m "${COMMIT_MESSAGE}"

echo "[INFO] rebasing against ${UPSTREAM}"
git pull --rebase --autostash

echo "[INFO] pushing to ${UPSTREAM}"
git push

echo "[INFO] submitted successfully"
