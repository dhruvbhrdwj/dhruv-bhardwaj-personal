const root = document.documentElement;

try {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    root.dataset.theme = savedTheme;
  }
} catch {
  // The theme can still be switched when storage is unavailable.
}

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("#theme-toggle");
  const systemTheme = matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.dataset.theme || (systemTheme.matches ? "dark" : "light");
  const updateToggle = () => {
    toggle.textContent = currentTheme() === "dark" ? "light mode" : "dark mode";
  };

  toggle.addEventListener("click", () => {
    root.dataset.theme = currentTheme() === "dark" ? "light" : "dark";
    try {
      localStorage.setItem("theme", root.dataset.theme);
    } catch {
      // The selected theme still applies to this page.
    }
    updateToggle();
  });

  systemTheme.addEventListener("change", updateToggle);
  updateToggle();
  toggle.hidden = false;
});
