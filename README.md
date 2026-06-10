# Perspectiva de Izquierda — versión estática (HTML/CSS/JS)

Proyecto **sin React ni dependencias de build**. Solo archivos planos.

## Estructura

```
.
├── index.html           Selector entre las dos variantes
├── moderno.html         Variante A (clara, sobria, accesible)
├── audaz.html           Variante B (oscura, brutalista, propaganda)
├── styleguide.html      Guía de paleta y tipografía
└── assets/
    ├── styles.css       Estilos compartidos (todas las páginas)
    ├── main.js          Menú móvil + copiar HEX
    └── emblem.svg       Emblema del movimiento (SVG editable)
```

## Cómo verlo en local

Abre cualquier `.html` con doble clic en tu navegador.
O sirve la carpeta con un servidor sencillo:

```bash
# Python 3
cd static-export
python3 -m http.server 8080
# luego abre http://localhost:8080
```

## Cómo desplegarlo

Sube la carpeta completa a **cualquier hosting estático**:
- GitHub Pages
- Netlify (arrastrar y soltar)
- Vercel
- Cloudflare Pages
- Hostinger / cPanel / etc.

## Personalización rápida

| Quieres cambiar… | Edita |
|---|---|
| Colores globales | `assets/styles.css` (las variables `:root` arriba) |
| Tipografías | etiqueta `<link>` Google Fonts en cada HTML |
| Textos | directamente en el HTML correspondiente |
| Imágenes de galería | URLs en `moderno.html` y `audaz.html` |
| Email / teléfono / dirección | bloque `<footer>` en cada HTML |
| Redes sociales | `href="#"` de los iconos en el footer |
| Emblema | `assets/emblem.svg` (vectorial, edita con Illustrator/Inkscape/Figma) |

## Fuentes utilizadas (Google Fonts, gratuitas)

- **Outfit** — encabezados Variante A
- **Anton** — encabezados Variante B
- **IBM Plex Sans** — cuerpo en ambas variantes
- **IBM Plex Serif** — citas e itálicas

## Paleta principal

| Color | HEX | Uso |
|---|---|---|
| Rojo bandera | `#D81E0A` | CTA primario |
| Dorado | `#FFDA2C` | Acento |
| Guinda MORENA | `#722F37` | Texto de acento / Variante A |
| Guinda bandera | `#8B1A1A` | Footer Audaz |
| Crema | `#FDFDFD` | Fondo Variante A |
| Noche | `#0A0505` | Fondo Variante B |
| Tinta | `#1A1A1A` | Texto principal claro |

© 2025 — Proyecto ciudadano. Diseño de presentación.
