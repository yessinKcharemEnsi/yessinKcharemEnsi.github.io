# yessinkcharemensi.github.io

Personal portfolio for **Yessin Kcharem** — software engineer, backend and distributed
data systems.

Static HTML, CSS and JavaScript. No build step, no dependencies, no framework. Clone it
and open `index.html`; that is the whole development setup.

## Layout

```
index.html        All content and structure. Sections are commented.
404.html          Styled not-found page.
css/style.css     One stylesheet. Design tokens live at the top.
js/main.js        Theme toggle and scroll-spy. ~70 lines, no dependencies.
assets/cv.pdf     The downloadable CV.
assets/favicon.svg
tools/og-image.html  Source for the social preview image.
docs/             Design spec.
```

## Updating content

Edit `index.html` directly. Each section is delimited by a comment banner
(`<!-- ==== EXPERIENCE ==== -->`), so find the banner and edit the markup under it.

**After any content change, update the footer date:**

```html
<p>Last updated <time datetime="2026-07-25">July 2026</time> · …</p>
```

Both the `datetime` attribute and the visible text. A stale portfolio reads worse than
no portfolio, and this date is what tells a visitor the site is maintained.

## Updating the CV

`assets/cv.pdf` is a copy of `main.pdf` from the LaTeX resume repo. It does **not**
update itself. After rebuilding the resume:

```bash
cp ../yessinKcharemResume_EU_H/main.pdf assets/cv.pdf
```

Then commit the new PDF. If you forget, the Download CV button silently serves an old
version — worth checking whenever the resume changes.

## Colors and theming

Every colour is a CSS custom property defined once in `css/style.css`:

```css
:root            { /* dark theme tokens */ }
[data-theme="light"] { /* light theme tokens */ }
```

Nothing in the stylesheet hardcodes a colour outside this set, which is why the light
theme is a token swap rather than a second stylesheet. The SVG diagrams reference the
same tokens, so they re-colour automatically. **If you add CSS, use the tokens** — a
hardcoded hex will look wrong in one of the two themes.

The theme is applied by a small inline script in `<head>` before first paint, so there
is no flash of the wrong theme on load. It respects `prefers-color-scheme` on a first
visit and remembers the choice in `localStorage` after that.

## Social preview image

`tools/og-image.html` is the source for the 1200×630 card that appears when the link is
shared. To regenerate it, open that file in a browser sized to exactly 1200×630,
screenshot it, and save the result as `assets/og-image.png`.

The `og:image` meta tag in `index.html` is only added once that file exists — a meta tag
pointing at a missing image unfurls worse than no tag at all.

## Deploying

The site is served by GitHub Pages from the `main` branch of a repository named
`yessinKcharemEnsi.github.io`.

1. Create that repository on GitHub (the name must match the username exactly).
2. `git remote add origin https://github.com/yessinKcharemEnsi/yessinKcharemEnsi.github.io.git`
3. `git push -u origin main`
4. In **Settings → Pages**, set Source to *Deploy from a branch*, branch `main`, folder `/`.

It goes live at `https://yessinkcharemensi.github.io/` within a minute or two.

`.nojekyll` is present so GitHub Pages serves the files as-is rather than running them
through Jekyll.

## Attaching a custom domain later

No rebuild is needed — the site is path-independent.

1. Add a file named `CNAME` at the repository root containing only the domain, e.g.
   `yessinkcharem.com`.
2. At your DNS provider, for an apex domain create four `A` records pointing to
   `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (and the matching `AAAA` records if you want IPv6).
   For a `www` subdomain instead, create one `CNAME` record pointing to
   `yessinkcharemensi.github.io`.
3. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS** once the
   certificate has been issued.
4. Update `<link rel="canonical">`, `og:url` and the JSON-LD `url` in `index.html` to
   the new domain.

## Checks before publishing a change

- Both themes look right — toggle and check
- Renders at 375px wide, not only on a desktop
- Every external link still resolves
- Download CV serves the current PDF
- Footer date updated

## License

Code is MIT (see `LICENSE`). The written content, CV and personal details are not
covered by it.
