#!/usr/bin/env bash
set -Eeuo pipefail

DEFAULT_COMMIT_MESSAGE="Update PAVE dataset repository"

usage() {
  cat <<'EOF'
Usage:
  ./scripts/git_update.sh
  ./scripts/git_update.sh "Update dataset README"

Commits and pushes tracked and untracked non-ignored file changes.
EOF
}

if [[ $# -gt 1 ]]; then
  usage
  exit 2
fi

commit_message="${1:-$DEFAULT_COMMIT_MESSAGE}"

if ! command -v git >/dev/null 2>&1; then
  echo "ERROR: git is not installed or not available on PATH." >&2
  exit 1
fi

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$repo_root" ]]; then
  echo "ERROR: this script must be run from inside a git repository." >&2
  exit 1
fi
cd "$repo_root"

branch="$(git symbolic-ref --short HEAD 2>/dev/null || true)"
if [[ -z "$branch" ]]; then
  echo "ERROR: detached HEAD detected. Check out a branch before running this script." >&2
  exit 1
fi

remote="$(git config --get "branch.${branch}.remote" || true)"
remote_ref="$(git config --get "branch.${branch}.merge" || true)"
if [[ -z "$remote" || -z "$remote_ref" ]]; then
  echo "ERROR: branch '$branch' has no upstream configured." >&2
  echo "Hint: run 'git push -u origin $branch' once, then retry." >&2
  exit 1
fi

remote_branch="${remote_ref#refs/heads/}"
upstream="${remote}/${remote_branch}"

echo "Repository: $repo_root"
echo "Branch:     $branch"
echo "Upstream:   $upstream"
echo

echo "Fetching latest upstream state..."
git fetch "$remote"

local_sha="$(git rev-parse HEAD)"
upstream_sha="$(git rev-parse "$upstream")"
merge_base="$(git merge-base HEAD "$upstream")"

if [[ "$local_sha" == "$upstream_sha" ]]; then
  echo "Local branch is up to date with $upstream."
elif [[ "$local_sha" == "$merge_base" ]]; then
  echo "ERROR: $upstream is ahead of local branch '$branch'." >&2
  echo "Please pull/rebase manually, resolve any conflicts, then rerun this script." >&2
  exit 1
elif [[ "$upstream_sha" == "$merge_base" ]]; then
  echo "Local branch is ahead of $upstream; continuing."
else
  echo "ERROR: local branch '$branch' and $upstream have diverged." >&2
  echo "Please reconcile them manually, then rerun this script." >&2
  exit 1
fi
echo

if [[ -z "$(git status --porcelain --untracked-files=all)" ]]; then
  echo "No changes to commit."
  exit 0
fi

echo "Changes to commit:"
git status --short --untracked-files=all
echo

git add -A

if git diff --cached --quiet --ignore-submodules --; then
  echo "No staged changes after git add -A; nothing to commit."
  exit 0
fi

echo "Creating commit:"
echo "  $commit_message"
git commit -m "$commit_message"

commit_hash="$(git rev-parse --short HEAD)"
echo
echo "Created commit: $commit_hash"
echo "Pushing HEAD to $upstream..."
git push "$remote" "HEAD:${remote_branch}"

echo
echo "Done. $branch is pushed to $upstream at commit $commit_hash."
