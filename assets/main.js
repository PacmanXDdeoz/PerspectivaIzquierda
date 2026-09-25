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

  /* ---------- Modal de aviso (assets/aviso.jpeg) ----------
     Ventana emergente oculta por defecto. Se abre automáticamente al cargar
     la página y se cierra al: pulsar la (X) de la esquina superior derecha,
     hacer clic en el fondo/overlay (fuera del contenido) o pulsar Escape.
     Añadido 2026-09-25. JavaScript vainilla, sin dependencias externas. */
  const initAvisoModal = () => {
    const modal = document.querySelector("[data-modal]");
    if (!modal) return;

    const closeBtn = modal.querySelector(".pi-modal__close");
    let lastFocused = null;

    const openModal = () => {
      lastFocused = document.activeElement;
      modal.classList.add("is-open");
      document.body.classList.add("modal-open");
      // Enfocamos el botón de cierre para facilitar el uso con teclado.
      if (closeBtn) closeBtn.focus();
    };

    const closeModal = () => {
      modal.classList.remove("is-open");
      document.body.classList.remove("modal-open");
      // Devolvemos el foco al elemento previo por accesibilidad.
      if (lastFocused && typeof lastFocused.focus === "function") {
        lastFocused.focus();
      }
    };

    // Cierre con la (X) y con el overlay: ambos llevan [data-modal-close].
    modal.querySelectorAll("[data-modal-close]").forEach((el) => {
      el.addEventListener("click", closeModal);
    });

    // Cierre con la tecla Escape (solo si el modal está abierto).
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("is-open")) {
        closeModal();
      }
    });

    // Apertura automática al cargar la página.
    openModal();
  };

  initAvisoModal();
});
