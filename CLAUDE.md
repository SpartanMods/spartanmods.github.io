# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

A static single-page portfolio website for Johnathan Margheret (Product Manager), deployed via GitHub Pages. No build tools, no package manager, no framework — just HTML, CSS, and vanilla JS served directly.

## Development

Open `index.html` directly in a browser, or use any static file server:

```bash
python3 -m http.server 8080
# or
npx serve .
```

There is no build step, no linting configuration, and no test suite.

**Deployment**: Pushing to `main` automatically triggers GitHub Pages to publish the site.

## Architecture

All content lives in a single file:
- `index.html` — the entire page; sections are in order: hero → about → work → projects → personal → skills → contact
- `style.css` — all styles (~500 lines); dark mode is the default, light mode overrides at the bottom
- `main.js` — theme toggle, scroll progress bar, scroll-reveal animations, count-up for stats
- `app.js` / `main.css` — legacy files from an earlier design iteration; not used by `index.html`

## Key Conventions

### Theme system
Theme is stored in `localStorage` and applied via `data-theme` on `<html>`. Dark is default; light mode styles live at the bottom of `style.css` under `[data-theme="light"]`. When adding new color uses, add light-mode overrides there.

### Scroll reveal
Add `class="reveal-up"` to any element to animate it in on scroll. Use `style="--delay:0.08s"` (multiples of `0.08s`) to stagger sibling elements. The IntersectionObserver in `main.js` handles it automatically.

### Stat count-up
Add `data-count="<number>"` and optionally `data-suffix="+"` to a `.stat-num` element; `main.js` animates it when it enters the viewport.

### Section numbering
Sections are tagged `02 / About`, `03 / Experience`, etc. Maintain the sequence when adding sections.

### Card accent colors
Project cards use `c-teal`, `c-mint`, `c-coral`, `c-amber` modifier classes for their hover border color. These map to CSS variables `--teal`, `--mint`, `--coral`, `--amber`.

### CSS variables
All design tokens are in `:root` at the top of `style.css`. Use those variables — never hardcode colors or spacing values.

## Content Placeholders

- `[RESUME_PDF_URL]` in `index.html` — the "Download Resume" button href needs a real PDF URL
- The Work Experience section has a commented-out template for prior roles (`<!-- PRIOR ROLE: ... -->`)

## Feature Flag

`const OPEN_TO_WORK = false;` at the top of `main.js` — currently unused in the UI but signals intent to show/hide an "open to work" indicator.
