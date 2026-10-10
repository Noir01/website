# Editing the intro

Edit `src/content/intro.md` for the typography prototype at `/alpha/`.
The initial text comes from the existing homepage; replace it with your own.

- Blank lines separate paragraphs. The first paragraph is slightly larger.
- `*text*` gives navy italics; `**text**` gives bold.
- `[text](https://example.com)` gives an underlined link.
- No footnotes or annotations are required.

Run `bun run dev` and open `/alpha/` to preview; `bun run build` checks the build.

Typography and layout live in `src/pages/alpha.astro`. The production homepage
(`src/pages/index.astro`) is unchanged and does not yet use this Markdown file.
