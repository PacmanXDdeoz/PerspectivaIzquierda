// Mobile menu toggle + copy hex
// Changes (2026-06-09):
// - Toggle `aria-expanded` on the button for accessibility
// - Add/remove `menu-open` class on <body> to prevent scrolling when menu is open
// - Close menu when clicking outside the menu area
// - Preserve existing copy-hex behaviour
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector("[data-menu-toggle]");
  const menu = document.querySelector("[data-mobile-menu]");
  if (toggle && menu) {
    // initialize aria state
    toggle.setAttribute("aria-expanded", "false");

    const openMenu = () => {
      menu.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    };

    const closeMenu = () => {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    };

    toggle.addEventListener("click", (e) => {
      if (menu.classList.contains("open")) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close when a link is clicked
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => closeMenu())
    );

    // Close when clicking outside the mobile menu
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!menu.contains(target) && !toggle.contains(target) && menu.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  // Theme toggle buttons
  const themeButtons = document.querySelectorAll("[data-theme-toggle]");
  const updateThemeButtons = (theme) => {
    themeButtons.forEach((btn) => {
      btn.textContent = theme === "audaz" ? "Variante moderna" : "Variante audaz";
    });
  };

  const setTheme = (theme) => {
    document.body.classList.toggle("dark", theme === "audaz");
    document.body.classList.toggle("theme-moderna", theme === "moderno");
    if (theme === "audaz") {
      document.body.style.background = "var(--pi-night)";
    } else {
      document.body.style.background = "var(--pi-cream)";
    }
    updateThemeButtons(theme);
  };

  if (themeButtons.length) {
    themeButtons.forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const currentTheme = document.body.classList.contains("dark") ? "audaz" : "moderno";
        setTheme(currentTheme === "audaz" ? "moderno" : "audaz");
        if (menu && menu.classList.contains("open")) {
          closeMenu();
        }
      });
    });

    // initialize button labels based on current theme
    const initialTheme = document.body.classList.contains("dark") ? "audaz" : "moderno";
    updateThemeButtons(initialTheme);
  }

  // Copy hex buttons (no functional changes)
  document.querySelectorAll("[data-copy-hex]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const hex = btn.getAttribute("data-copy-hex");
      if (navigator.clipboard) {
        navigator.clipboard.writeText(hex).then(() => {
          const original = btn.textContent;
          btn.textContent = "Copiado ✓";
          setTimeout(() => (btn.textContent = original), 1500);
        });
      }
    });
  });
});
