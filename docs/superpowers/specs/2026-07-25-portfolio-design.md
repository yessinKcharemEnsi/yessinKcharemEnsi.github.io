# Portfolio Site — Design

**Date:** 2026-07-25
**Owner:** Yessin Kcharem
**Status:** Approved

## Goal

A public portfolio site that helps Yessin Kcharem land a software engineering role in
the EU, including relocation. The audience is EU recruiters and hiring managers who
will spend 8–20 seconds deciding whether to keep reading.

Success means: a recruiter lands on the page, understands within seconds that Yessin
is a backend engineer with four years of measurable impact who is open to relocating,
and can reach him or download his CV without hunting.

## Non-goals

- Not a reusable template for other people. Content is Yessin's, hardcoded.
- No blog. An abandoned blog signals neglect and is worse than none.
- No CMS, build step, or JavaScript framework.
- No contact form, analytics, or third-party services.

## Source material

**Resume:** `C:\Users\chaima\Desktop\yessinKcharemResume_EU_H` — LaTeX source under
`src/`, compiled to `main.pdf`.

Sections used: `header.tex`, `summary.tex`, `experience.tex`, `internships.tex`,
`skills.tex`, `education.tex`, `extra/honors_and_awards.tex`, `languages.tex`.

Sections deliberately **not** used: `extra/Certifications.tex` and
`extra/Patents_and_Publications.tex` are unfilled template placeholders containing
dummy content ("Certification A", "Your Name, et al."). `projects.tex` is commented
out of `main.tex`; its Kings Card Game content is reused here from the repo directly.

**GitHub:** `https://github.com/yessinKcharemEnsi`

| Repo | Included | Notes |
|---|---|---|
| `financial-app` (FINT) | Yes — lead project | Live demo at financial-app-fin6.vercel.app |
| `AdVeris` | Yes | Corroborates the Future Proof internship |
| `KingsCardGame` | Yes — lightest entry | Student project, already written up in `projects.tex` |
| `ResumeMobileClassifier` | No | Empty repo, since made private by the owner |

## Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Nature | Public site about Yessin | Not a reusable template |
| Stack | Static HTML/CSS/JS | No build step, no dependencies to rot, instant load |
| Host | GitHub Pages | Free, permanent, HTTPS |
| Repo name | `yessinKcharemEnsi.github.io` | Serves at the apex user domain, not a subpath |
| Structure | Single scrolling page | Recruiters skim; one link to share |
| Visual direction | "Observability" — dark grid, monospace, stat tiles | Mirrors the Grafana/Prometheus work; legible to infra people |
| Theme | Dark default + light toggle | Accessibility, printing, system preference |
| Photo | None | Type and work carry it |
| Contact shown | Email, LinkedIn, GitHub, "Tunis, Tunisia" | Phone and street address withheld from a public indexed page |
| Metrics | CV percentages | Raw before/after absolutes not available |
| Confidentiality | Employer-internal feature names softened | Public page is permanent and indexed |

## Page structure

Order, top to bottom:

1. **Nav** — sticky, jump links (Work, Projects, Skills, About), theme toggle
2. **Hero** — availability badge, name, positioning line, summary, four CTAs, three stat tiles
3. **Experience** — ELYADATA, COGNIRA, TELNET, then Future Proof internship
4. **Projects** — FINT (with architecture diagram), AdVeris, Kings Card Game
5. **How I work** — ~200 words plus the distributed-ingestion diagram
6. **Skills** — six labelled category rows
7. **Education · Honors · Languages** — two-column
8. **Contact** — email-forward CTA, links, last-updated date

Experience leads because it is the strongest asset. "How I work" sits after Projects
because it is the one text-heavy block and belongs below the fast-skim material.

### Hero stat tiles

Three tiles, all traceable to the CV:

- `50%` — response time reduced
- `1K/s` — requests sustained under load
- `80%` — unit test coverage

"4 languages" was considered and moved to the Languages block; the tile row stays
purely about technical impact.

### Honors

Included: promotion to Software Engineer II within one year (COGNIRA, 2023);
technical interviewer (COGNIRA, 2023); Top 5% academic distinction (ENSI, 2021);
Top 7% nationwide, National Engineering Entrance Exam (2019).

Excluded: Baccalaureate class ranking (2017) — nine years and three jobs old, reads
junior next to "Software Engineer II".

## File layout

```
Portfolio/
├── index.html
├── css/style.css
├── js/main.js
├── assets/
│   ├── cv.pdf
│   ├── favicon.svg
│   └── og-image.png
├── tools/og-image.html      # source for the 1200×630 social card
├── docs/superpowers/specs/
├── 404.html
├── README.md
├── LICENSE
├── .nojekyll
└── .gitignore
```

The existing PyCharm stub `main.py` is deleted; it is unrelated sample code.

Content is written directly into `index.html` rather than extracted to a data file.
For a single page with one author, the indirection would cost more than it saves.

## Components

Each is independently understandable and independently editable.

**`index.html`** — all content and structure. Semantic landmarks (`header`, `nav`,
`main`, `section`, `footer`). Both SVG diagrams inline so they inherit theme colors
and cost no extra requests.

**`css/style.css`** — one stylesheet. Design tokens as custom properties on `:root`,
overridden under `[data-theme="light"]`:

| Token | Purpose |
|---|---|
| `--bg` | page background |
| `--surface` | cards, tiles |
| `--border` | hairlines, card borders |
| `--text` | primary text |
| `--text-dim` | secondary text, labels |
| `--accent` | links, stat figures (blue) |
| `--ok` | availability badge, current-role marker (green) |
| `--warn` | observability accents in diagram 2 (amber) |

No element in the stylesheet may hardcode a color outside this token set. That is
what makes the light theme a variable swap rather than a rewrite.

**`js/main.js`** — approximately 60 lines, no dependencies. Two responsibilities:
theme toggle (read/write `localStorage`, set `data-theme` on `<html>`) and scroll-spy
(highlight the nav link for the section currently in view, via `IntersectionObserver`).

A separate inline script in `<head>` applies the stored theme before first paint to
prevent a flash of the wrong theme. This is the only inline script.

**Diagrams** — two hand-authored inline SVGs.

*Diagram 1 (FINT)* — statement export → parse → deduplicate (idempotent import) →
categorize (learned rules) → analytics; down to PostgreSQL 16 on Neon; up to React
web on Vercel and Expo mobile. Lives inside the FINT project card.

*Diagram 2 (distributed ingestion)* — S3/CSV/Parquet sources → coordinator that
partitions the workload → N parallel worker pods on Kubernetes, each validating,
transforming and writing → target store with rejects quarantined; rule config feeding
the workers; Prometheus → Grafana → Elastic APM along the bottom. Lives in "How I
work".

Diagram 2 describes the *pattern*, not any employer's system, and is labelled as
generalized. Same technical credibility, nothing confidential.

Both use token-driven fills so they re-color with the theme, carry `<title>` and
`<desc>` for screen readers, and sit in `overflow-x: auto` wrappers.

## Responsive behavior

Mobile-first. Breakpoints at 640px and 1024px.

- Stat tiles: 3-up → stacked
- Projects: FINT full-width always; AdVeris and Kings side by side above 640px, stacked below
- Education/Honors: two-column above 640px, stacked below
- Diagrams: horizontally scrollable within their own container; the page body never scrolls horizontally
- Nav: jump links collapse to icon-free compact row on narrow screens

375px is an explicit verification target, since a majority of recruiters open
portfolios on a phone.

## Accessibility

- Semantic landmarks and a skip-to-content link
- Visible focus rings on every interactive element
- `aria-label` on the theme toggle, `aria-current` on the active nav link
- `<title>` and `<desc>` on both SVGs
- WCAG AA contrast verified in both themes
- Page is fully readable and navigable with JavaScript disabled; only the theme
  toggle and scroll-spy degrade, and the page falls back to `prefers-color-scheme`

## SEO and sharing

Meta description, Open Graph and Twitter card tags, canonical URL, and JSON-LD
`Person` schema (name, job title, location, `sameAs` links to GitHub and LinkedIn).
The structured data is what makes a search for his name surface the site correctly.

**Social preview image.** `assets/og-image.png` must be a raster image at 1200×630;
SVG is not reliably supported by LinkedIn or Slack unfurlers. It is produced by
authoring `tools/og-image.html` (name, role, availability line, in the site's dark
theme) and screenshotting it at exactly 1200×630 via the browser automation skill.

If that capture is not possible, the fallback is to ship without an image and omit
`og:image` entirely — a card with title and description still unfurls correctly. A
broken `og:image` reference is worse than no reference, so the tag is only written
once the file exists.

`assets/favicon.svg` is an SVG favicon with an `.ico` fallback declared for older
clients.

## Error handling

A static page has a narrow failure surface. The cases that matter:

- **`localStorage` unavailable** (private browsing, blocked cookies) — theme code is
  wrapped in `try/catch`; on failure the page uses `prefers-color-scheme` and the
  toggle still works for the session.
- **JavaScript disabled or failed** — content is plain HTML and fully readable.
- **Missing `cv.pdf`** — a broken Download CV button is a visible embarrassment, so
  the file's presence is a release check, not a runtime concern.
- **Dead external links** — every outbound link is verified before release and
  re-checked whenever the site is updated.
- **404s on GitHub Pages** — a `404.html` styled to match, linking home.

## Verification

Not a unit test suite; this is a static page. Before it is called done:

1. HTML validates (W3C validator, zero errors)
2. Renders correctly at 375px, 768px, and 1440px
3. Both themes verified at all three widths, including diagram legibility
4. Every external link opened and confirmed live (LinkedIn, GitHub, all repos, FINT
   demo, ENSI EUR-ACE accreditation, three employer sites)
5. Download CV serves the real, current PDF
6. Lighthouse ≥ 95 on Performance, Accessibility, Best Practices, SEO
7. Page confirmed rendering on the live `yessinKcharemEnsi.github.io` URL, not only
   locally
8. Page readable with JavaScript disabled

## Maintenance

The main risk to this site is not that it is built wrong — it is that it goes stale.
An outdated portfolio signals neglect more strongly than no portfolio at all.

The README documents:

- How to update content (edit `index.html` directly; sections are commented)
- That `assets/cv.pdf` must be re-copied from the resume repo after any LaTeX rebuild
- How to attach a custom domain later (CNAME file plus the exact DNS records), so the
  move off `github.io` needs no rebuild
- A prompt to update the footer's last-updated date on every content change

## Open items

- **CV currency** — `main.pdf` in the resume repo will be copied to `assets/cv.pdf`.
  Yessin to confirm the committed build is the version he wants public.
- **GitHub profile metadata** — bio, per-repo descriptions and topics were drafted and
  handed over for manual entry; `gh` CLI is not installed on this machine, so they
  cannot be applied programmatically. Independent of this build.
