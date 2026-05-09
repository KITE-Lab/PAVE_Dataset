const THEME_STORAGE_KEY = "themePreference";
const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const themeButtons = Array.from(document.querySelectorAll("[data-theme-option]"));

function getStoredThemePreference() {
  const storedValue = localStorage.getItem(THEME_STORAGE_KEY);
  return storedValue === "light" || storedValue === "dark" || storedValue === "auto"
    ? storedValue
    : "auto";
}

function resolveTheme(preference) {
  if (preference === "auto") {
    return themeMediaQuery.matches ? "dark" : "light";
  }

  return preference;
}

function updateThemeControls(preference) {
  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeOption === preference;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function applyTheme(preference) {
  const resolvedTheme = resolveTheme(preference);

  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themePreference = preference;
  document.body.dataset.theme = resolvedTheme;
  document.body.dataset.themePreference = preference;

  updateThemeControls(preference);
}

function setThemePreference(preference) {
  localStorage.setItem(THEME_STORAGE_KEY, preference);
  applyTheme(preference);
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setThemePreference(button.dataset.themeOption);
  });
});

applyTheme(getStoredThemePreference());

themeMediaQuery.addEventListener("change", () => {
  if (getStoredThemePreference() === "auto") {
    applyTheme("auto");
  }
});
