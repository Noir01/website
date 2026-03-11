# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Use `bun` as the package manager (not npm).

```bash
bun run dev      # Start dev server
bun run build    # Build for production
bun run preview  # Preview production build
```

## Architecture

Personal portfolio site (noir.ac) built with **Astro 6** and MDX.

### Layouts

Two layouts in `src/layouts/`:
- **`BaseLayout.astro`**: Used for most pages. Includes Nav, Footer, and layered gradient/noise background images. Background images lazy-load on `loaded` class.
- **`LandingLayout.astro`**: Used only for `index.astro`. No footer, locked to viewport height on desktop, noise-only background.

### Content Collections

Defined in `src/content.config.ts`:
- **`work`**: Markdown files in `src/content/work/`. Required frontmatter: `title`, `description`, `publishDate`, `tags`, `img`, optional `img_alt`.
- **`blog`**: Markdown/MDX files in `src/content/blog/`. Required: `title`, `description`, `publishDate`. Optional: `tags`, `draft` (default `false`).

### Theming

- CSS custom properties in `src/styles/global.css` define the color palette.
- Dark/light theme is controlled by the `theme-dark` class on `<html>`.
- Theme toggle is currently **disabled** — the site is effectively hardcoded to dark mode.
- Background images in `public/assets/backgrounds/` follow the naming pattern `bg-{type}-{light|dark}-{800w|1440w}.jpg`.

### Key Files

- `src/consts.ts`: Site-wide constants (currently just `SITE_TITLE`).
- `src/components/Nav.astro`: Nav links and social icon links are hardcoded arrays at the top of the file.
- `src/components/IconPaths.ts`: SVG path data for all icons used via `Icon.astro`.
