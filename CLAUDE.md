# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Use `npm` as the package manager (not bun).

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Architecture

Personal portfolio site (srivastava.dev, also accessible at noir.ac) built with **Astro 6** and MDX.

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

- `src/consts.ts`: Site-wide constants (`SITE_TITLE`, `SPOTIFY_API`, `LASTFM_API`).
- `src/components/Nav.astro`: Nav links and social icon links are hardcoded arrays at the top of the file.
- `src/components/IconPaths.ts`: SVG path data for all icons used via `Icon.astro`.
- `src/components/MusicPlayer.astro`: Music "now playing" widget on the landing page (see below).

### Music Player Widget

`MusicPlayer.astro` is a web component (`<music-player>`) rendered on `index.astro`, fixed to the bottom-right corner.

- **APIs:** Primary: `https://spotify.noir.ac` — returns `{ song, artist, album, url, playing }`. Fallback: `https://lastfm.noir.ac` — returns `{ name, artist, album, url, image, nowPlaying }`. The Last.fm API is used when Spotify is not actively playing.
- **Behavior:** Fetches Spotify first; if not playing or unreachable, falls back to Last.fm. Polls every 60s. Shows "Now playing" or "Was listening to" with song/artist. Hides silently if both APIs are unreachable or return no track data.
- **Icon:** Vinyl record SVG from [SVGRepo](https://www.svgrepo.com/svg/104707/vinyl), inline in the component. Uses `currentColor` for the disc/tonearm and `--accent-regular` for the center dot.
- **Animation:** Subtle opacity pulse when `playing: true`, static when idle.
- **Responsive:** Track info text hidden below 30em; widget compacts at 50em.
- **No album art** by design.

## Landing Page Personalization Ideas

Ideas to make the landing page feel like a living, personal space rather than a static business card:

- ~~**Music "now playing / last played"**~~ — **Done.** See `MusicPlayer.astro`. Uses Spotify with Last.fm fallback.
- **"Now" sentence** — A single manually-updated sentence ("Currently obsessing over..."). Low-tech, high-personality, gives visitors a reason to return.
- **Curated link** — "Something I found interesting this week" with a URL. What you pay attention to reveals more than what you build.
- **Gallery photo on landing** — Pull a recent photo from the existing Gallery collection to give the landing immediate visual identity.
- **Blog fragment** — Surface a random line from existing blog posts to reward exploration.
