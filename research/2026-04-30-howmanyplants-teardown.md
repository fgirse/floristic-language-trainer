# Site Teardown: How Many Plants

**URL:** https://howmanyplants.com  
**Built by:** Not identified (no agency credit in meta tags)  
**Platform:** Webflow (confirmed — `data-wf-domain`, `data-wf-page`, `data-wf-site` attributes; `.webflow.` CSS filename; `w-` class prefix throughout)  
**Date analyzed:** 2026-04-30

---

## Tech Stack (Confirmed from Source)

| Technology | Evidence | Purpose |
|---|---|---|
| Webflow | `data-wf-*` attributes, `.webflow.ea9906214.css`, `w-form`, `w-input`, `w-button` classes | Full site builder and CMS |
| Pure CSS animations | Inline `<style>` keyframes in `<head>` | Plant hover wobble effects |
| Google AdSense | `pagead2.googlesyndication.com` script | Ads |
| Meta Pixel | `fbq('init', '285977807275532')` | Conversion tracking |
| Outseta | `how-many-plants.outseta.com/email/lists/8vW58p94/subscribe` | Email list / membership |
| Pinterest verification | Meta tag | Pinterest presence |

**No GSAP, no Locomotive Scroll, no Barba.js, no external animation library.** Every interaction on this site is pure CSS.

---

## Design System

### Colors

| Variable | Hex | Usage |
|---|---|---|
| `--black` | `#222` | Text, borders |
| `--off-white` | `#f9f5f1` | Primary background |
| `--white` | `#fffef9` | Cards, content boxes |
| `--chartreuse` | `#bfb33b` | All borders, box shadows, shelf lines — the signature accent |
| `--emerald` | `#025050` | Footer background |
| `--plant-bg` | `#ede5dd` | Image placeholders |
| `--ochre` | `#dd9221` | Navigation bars |
| `--terracotta` | `#fad2bd` | Section backgrounds |
| `--lilac` | `#e8d1eb` | Hover states, dividers |
| `--red` | `#f87a5a` | CTAs, alerts |
| `--blue` | `#2f6fe8` | Links, interactive |
| `--sage` | `#d1ddd1` | Subtle backgrounds |

### Typography

| Role | Font Family | Weight | Style | Size |
|---|---|---|---|---|
| Headings (h1–h6) | `Hellenictypewriter, sans-serif` | 500 | h1/h6 italic; h2/h4 uppercase | h1: 28px, h2: 36px, h4: 20px |
| Body / blog text | `Chromatica, sans-serif` | 400 | Normal | 20px |
| Fallback | `Arial, sans-serif` | — | — | — |
| Icon font | `webflow-icons` | Normal | — | Webflow internal |

**Both fonts are custom/non-Google.** They are loaded as Webflow assets (no `@font-face` CDN URLs visible in CSS — they may be embedded or loaded via Webflow's font hosting). You will need to source alternatives:
- **Hellenictypewriter** → look for "Hellenic Wide" or use a typewriter-style display font like **Courier Prime** or **Special Elite** (Google Fonts)
- **Chromatica** → a clean geometric sans; substitute **DM Sans** or **Inter** (Google Fonts)

### Box Shadow System

The site's signature look is the **chartreuse offset shadow**:

```css
box-shadow: 6px 6px 0 0 var(--chartreuse);   /* standard */
box-shadow: 11px 11px 0 0 var(--chartreuse); /* medium */
box-shadow: 17px 17px 0 0 var(--chartreuse); /* large */
box-shadow: 20px 20px 0 0 var(--chartreuse); /* XL */
```

Applied to cards, nav items, CTA buttons, and the home page title blocks.

### Spacing System

Consistent 8-point grid: 4, 8, 12, 16, 24, 32, 48, 64, 96, 112, 128, 160px.

### Containers

```css
.container      { max-width: 1376px; padding: 0 64px; }
.container1440  { max-width: 1440px; }
```

### Border Style

Almost everything uses `border: 4px solid var(--chartreuse)` (shelves) or `border: 2px solid var(--black)` (cards, titles). Zero border-radius except Webflow internal elements.

---

## Effects Breakdown

| Effect | Implementation | Complexity | Cloneable? |
|---|---|---|---|
| Plant hover wobble | Pure CSS `@keyframes` + two-layer PNG | Low | Yes |
| "HOW MANY PLANTS" title spelled across shelves | 6 SVG fragments positioned absolute at shelf bottoms | Medium | Yes |
| Custom watering can cursor | `cursor: url(watering-can.svg), auto` on `.home-page-shelf-area` | Low | Yes |
| Chartreuse offset box shadow | CSS `box-shadow` with no blur | Low | Yes |
| Shelf system with decorative objects | Absolute-positioned SVG/PNG layers on each shelf div | Medium | Yes |
| Sticky plant row on plant guide pages | `position: absolute` row of plant PNGs above footer | Medium | Yes |
| Footer leaf sticker overlay | Absolute-positioned PNG stickers with `pointer-events: none` | Low | Yes |
| Search bar slide | Webflow interaction toggling `display: none/block` | Low | Yes |
| Mobile hamburger menu | Webflow built-in mobile nav | Low | Yes (use Webflow or JS toggle) |

---

## Implementation Details

### 1. Plant Hover Wobble (The Signature Effect)

**How it works:** Every plant has two stacked PNGs — a static `pot` image and an animated `plant` image. The plant image has class `.animate` or `.animate-small`. The parent wrapper has class `.hover-animate`. On hover of the parent, the child `.animate` fires a CSS keyframe loop.

```css
/* Parent triggers child animation on hover */
@media only screen and (min-width: 992px) and (max-width: 1025px) {
  .hover-animate:hover .animate {
    animation-duration: 600ms;
    animation-fill-mode: both;
    animation-name: contre;
    animation-iteration-count: infinite;
    transform-origin: bottom;
  }
}

/* The wobble — cubic-bezier gives it an organic spring feel */
@keyframes contre {
  0%, 33%, 100% { animation-timing-function: cubic-bezier(.17,.67,.79,1.83); }
  33% { transform: translateY(4px) rotate(-2deg); }
  66% { transform: translateY(0px) rotate(4deg); }
}

/* Smaller variant for stiffer plants */
@keyframes small {
  0%, 33%, 100% { animation-timing-function: cubic-bezier(.17,.67,.79,1.83); }
  33% { transform: translateX(2px) rotate(-2deg); }
  66% { transform: translateX(2px) rotate(2deg); }
}
```

**The key insight:** The pot stays static; only the plant part wobbles. This sells the illusion that the plant is swaying in a pot. The cubic-bezier `.17,.67,.79,1.83` creates a slight overshoot (the `1.83` Y value > 1) which makes it bouncy.

**To recreate:** Wrap pot + plant images in a div. Give the plant image an `animate` class. Apply the CSS above. Works with any two-layer illustration.

### 2. "HOW MANY PLANTS" Spelled Across 6 Shelves

**How it works:** The site title is not rendered as text — it's split into 6 SVG files, each containing part of the word "HOW MANY PLANTS":
- Shelf 1: `home-page-how-export.svg` → "HOW"
- Shelf 2: `home-page-ma-export.svg` → "MA"
- Shelf 3: `home-page-ny-export.svg` → "NY"
- Shelf 4: `home-page-pla-export.svg` → "PLA"
- Shelf 5: `home-page-nt-export.svg` → "NT"
- Shelf 6: `home-page-s-export.svg` → "S"

Each SVG is `position: absolute; bottom: 0` at the base of its shelf, aligned so the letters visually line up horizontally across all 6 shelves when scrolled. The shelf area has `overflow: hidden` to clip them cleanly.

```css
.home-page-how { z-index: 2; left: 19%; bottom: 0; position: absolute; }
.home-page-ma  { left: 35%; bottom: 0; position: absolute; }
.home-page-ny  { z-index: 2; left: 52.45%; bottom: 0; position: absolute; }
.home-page-pla { left: 27%; bottom: 0; position: absolute; }
.home-page-nt  { left: 55%; bottom: 0; position: absolute; }
.home-page-s   { z-index: 1; left: 70%; bottom: 1px; position: absolute; }
```

**To recreate:** Export your title as an SVG, slice it into segments, and position each segment absolutely at the bottom of its corresponding shelf. Or skip this entirely and just render the title as a large heading — the effect is purely cosmetic.

### 3. Custom Cursor on Shelf Area

```css
@media only screen and (min-width: 480px) {
  .home-page-shelf-area {
    cursor: url('https://cdn.prod.website-files.com/.../watering-can.svg'), auto;
  }
}
```

**Desktop only** (480px+). The cursor becomes a watering can SVG over the entire shelf section. Dead simple — one CSS line. Sourced from their CDN.

**To recreate:** Export a watering can SVG (or any plant-care icon), host it, and set `cursor: url('path/to/icon.svg'), auto` on the container.

### 4. Shelf Structure

Each shelf is a relative-positioned div with:
- `border: 4px solid var(--chartreuse)`
- `background-color: var(--white)`
- A chartreuse line at 65% height: `.home-page-shelf-line { height: 4px; background-color: var(--chartreuse); position: absolute; top: 65%; }`
- An `.outline` div that creates a 4px chartreuse inset border effect (positioned -4px on all sides)
- A drop shadow SVG (`.shelf-shadow`) positioned behind

Plant images are positioned with `position: relative; bottom: [negative value]` so they sit on the shelf line and overflow slightly above and below.

### 5. Chartreuse Offset Shadow (The Visual Signature)

Used everywhere for depth:

```css
/* CTA buttons and title blocks */
box-shadow: 6px 6px 0 0 #bfb33b;
border: 2px solid #222;
background-color: #fffef9;
```

No blur. Hard-edge offset. This single pattern defines the entire visual style of the site.

---

## Assets Needed to Recreate

1. **Plant illustrations (pot + plant as separate PNGs)** — 12 plants on the homepage alone. Each needs two files: a pot layer and a plant layer. Source options:
   - Commission plant illustrators on Fiverr/Dribbble
   - Use `plant pot illustration` search on Creative Market
   - Midjourney prompt: `flat vector illustration [plant name] in ceramic pot, separated pot and plant layers, white background, editorial style, warm muted palette`

2. **Decorative shelf objects (SVGs)** — ~30+ individual SVG illustrations of books, vases, candles, bowls, candlesticks, pitchers. Source from:
   - Noun Project (search "home decor objects", "vintage decor")
   - Illustrative SVG packs on Creative Market

3. **"HOW MANY PLANTS" title SVGs** — Can be replaced with a styled font heading

4. **Watering can cursor SVG** — Simple to make or find on Noun Project

5. **Hellenictypewriter font** — Custom/licensed. Substitute: Special Elite (Google Fonts, free) or Courier Prime

6. **Chromatica font** — Substitute: DM Sans or Inter (Google Fonts, free)

7. **Footer leaf sticker PNGs** — 10 illustrated leaf PNG stickers. Source: Etsy botanical sticker packs, or generate with Midjourney

---

## Build Plan

### Recommended Stack

- **Framework:** Next.js (App Router) — for plant guide CMS pages with ISR
- **Styling:** Tailwind CSS + CSS Modules for the shelf animations
- **CMS:** Contentful or Sanity — for plant guide content (Webflow CMS equivalent)
- **Email:** Resend or ConvertKit — replacing Outseta
- **Font loading:** `next/font` with Google Fonts substitutes
- **Images:** `next/image` with the plant PNGs

### NPM Packages

```bash
npm install next react react-dom
npm install -D tailwindcss @tailwindcss/typography
```

No animation library needed — the wobble is pure CSS.

### Section-by-Section Build Order

**Section 1: Navbar**
- Fixed-height (150px desktop, 116px mobile) with 3-column grid: `nav-left | nav-home | nav-right`
- Logo is a styled `h2` with `Hellenictypewriter` font, not an image
- Nav underlines use SVG images (squiggle for Guides, rounded blob for Care) positioned absolute below the link text
- Search bar toggles visibility below navbar
- Mobile: hamburger opens a `.menu-bar` panel below

**Section 2: Home Page Shelf Area**
- 6 `.home-page-shelf` divs stacked vertically inside `.home-page-shelf-area`
- Each shelf: chartreuse border + chartreuse 4px line at 65% height + decorative SVG objects
- Plant PNGs: position relative with negative bottom values to sit on shelf line
- Two-layer pot + plant images, `.hover-animate` parent, `.animate`/`.animate-small` child
- Custom watering can cursor via CSS
- The title SVG fragments positioned at the base of each shelf

**Section 3: Content Sections (A/B/C)**
- Alternating two-column layout (image left/right with text box)
- Text box: white bg, 64px padding, chartreuse offset box shadow
- CTA button: absolute positioned at bottom-right, transforms 50% down
- `margin-top: -3%` on section A creates slight overlap with shelves above

**Section 4: Footer**
- Deep emerald `#025050` background
- Two-column grid: email signup left, nav links right
- Email form: borderless input, SVG arrow submit button
- Leaf sticker PNGs: absolutely positioned, `pointer-events: none`
- Fine print row below grid

---

## Notes

- **Webflow CMS** drives the plant guides and care articles — you'll need a headless CMS to replace it. Sanity is the closest match for content modeling flexibility.
- **Outseta** handles their membership/Plant Club waitlist. Replace with a dedicated auth provider (Clerk) + email list (Resend/Mailchimp).
- **The plant illustrations are the hardest part to clone** — they're clearly custom-commissioned. Budget ~$50–150/plant for a consistent illustrator, or accept substitutes.
- **No performance concerns** — Webflow serves assets from a global CDN. With Next.js + `next/image`, you'll match or beat their load times.
- **The wobble animation is desktop-only** (`min-width: 992px and max-width: 1025px` in the original inline CSS — this looks like a Webflow breakpoint artifact; in a rebuild you'd probably want `min-width: 768px` or just `hover: hover` media query).
- **AdSense** is enabled sitewide — if you're monetizing, add `@next/third-parties` for the script.
