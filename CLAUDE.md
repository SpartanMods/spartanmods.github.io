# CLAUDE.md

Guidance for AI assistants (Claude Code and others) working in this repository.

## What this is

A **static personal portfolio website** for Johnathan Margheret, a product
leader specializing in data and AI products. It is hosted on **GitHub Pages**
at the repo `spartanmods.github.io` (a GitHub org/user Pages site, so it serves
from the root of the `main` branch at the org's `github.io` domain).

There is **no build step, framework, package manager, or test suite.** It is
hand-authored HTML, CSS, and vanilla JavaScript. Editing a file and pushing to
`main` is the deploy.

## Layout

| Path | Role |
| --- | --- |
| `index.html` | The entire portfolio — a single-page site (hero, about, work, projects, personal, skills, contact). This is the main file you'll edit. |
| `style.css` | All styles for `index.html`. CSS custom properties at `:root`, dark theme is the default with a light theme via `[data-theme]`. |
| `main.js` | All behavior for `index.html`: theme toggle (persisted to `localStorage`), scroll progress bar, `IntersectionObserver` reveal animations, and stat count-up. Respects `prefers-reduced-motion`. |
| `secret.html` | Hidden "easter egg" page — a casual/personal version of the bio. Self-contained: all CSS and JS are **inline**, it does not use `style.css` or `main.js`. Reached via the `✦` link in the nav. |
| `404.md` | Jekyll-processed 404 page (just sets `permalink: /404.html`). |
| `assets/` | `profile.jpg`, `work.jpg`, `personal.jpg`, and `resume.pdf` (linked from the hero "Download Resume" button). |
| `README.md` | Stock GitHub Pages / Jekyll boilerplate. Not meaningful project docs. |

### Orphaned / legacy files — do not edit these expecting them to take effect

- `app.js` and `main.css` — an earlier theme-toggle prototype (`.btn`,
  `.light-theme` / `.dark-theme`). **Nothing references them.** The live site
  uses `main.js` + `style.css` instead.
- `docs/` — leftover Jekyll theme scaffolding (`docs/assets/css/style.scss`,
  a logo). Not part of the served site.

If asked to clean up, these are the candidates — but confirm with the user
before deleting, since they are committed history.

## How it works (the parts worth knowing)

- **Theming.** `data-theme` is set on `<html>`. Default resolves from
  `localStorage` → system `prefers-color-scheme` → `dark`. The toggle button
  (`#themeToggle`) flips it and persists the choice. All colors come from CSS
  variables in `style.css`, so theme changes flow through the variables — don't
  hardcode hex colors in new rules; use the existing tokens (`--teal`,
  `--coral`, `--text`, `--bg`, etc.).
- **Animations** are driven by adding classes (`.reveal-up` → `.in-view`,
  `.stat-card` → `.lit`) via `IntersectionObserver` in `main.js`. New animated
  elements should use these existing class hooks rather than new bespoke logic.
- **The secret page** is gated by a client-side password check (`secret.html`,
  password compared in inline JS). This is an easter egg, **not security** —
  treat it as cosmetic and don't represent it as access control.

## Conventions

- **Single source of truth per concern:** styles in `style.css`, behavior in
  `main.js`, content in `index.html`. The one exception is `secret.html`, which
  is intentionally self-contained with inline styles/script — keep it that way.
- Indentation is **2 spaces** in `index.html` / `style.css` / `main.js`.
- Sections in `index.html` use `id` anchors (`#about`, `#work`, …) that the nav
  links to, and numbered `.section-tag` labels (`02 · About`). Keep numbering
  and anchors consistent when adding or reordering sections.
- Fonts are loaded from Google Fonts (Roboto + Roboto Mono) in the `<head>`.
- Use semantic HTML and the existing ARIA attributes (`aria-label`,
  `aria-labelledby`, `role`) — the markup is accessibility-conscious; preserve
  that when editing.
- Content is real résumé/portfolio data (company names, metrics, links). Treat
  copy changes as factual edits — don't invent or embellish accomplishments,
  metrics, or links.

## Workflow

- **Verify visually.** With no test suite, open `index.html` (and
  `secret.html`) in a browser to confirm changes. There is nothing to build or
  lint.
- **Deploy = push to `main`.** GitHub Pages serves the repo root directly.
  Per this session's instructions, develop on the assigned feature branch and
  push there; do not push to `main` or open a PR unless the user explicitly
  asks.
- Commit messages in this repo are short, imperative summaries of the visible
  change (e.g. "Fix work photo layout and add WanderMate personal project").

## Gotchas

- `assets/profile.jpg` is ~18 MB — large for a hero image. If touching hero
  performance, flag/optimize it rather than adding more large assets.
- When adding a new section, wire up all three: the `<section>` in
  `index.html`, a nav link in the header, and any needed styles in `style.css`
  reusing existing tokens and `.reveal-up` hooks.
- Don't reintroduce references to `app.js` / `main.css`; they're dead code.
