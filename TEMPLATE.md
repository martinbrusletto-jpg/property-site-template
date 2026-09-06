# Template Design Notes

**Reference:** [springs.estate](https://springs.estate) — confirmed design template.  
**Instance:** Los Verdiales — Mediterranean quiet luxury (Fantastic Frank / Brusletto) with springs motion language.

---

## Likheter (springs ↔ template)

| Element | springs.estate | This template |
|---------|----------------|---------------|
| Hero | Rotated multi-image grid (~−10°), dark green/teal overlay, cream serif brand, MENU / nav / CONTACT, scroll arrow, tagline + headline on tiles | ✓ Same structure; palette adapts per property |
| Opening | "Open the doors…" cinematic statement | ✓ `opening` chapter |
| Wellness | Essence of Self-Care + Spa/Yoga/Fitness/Café chips | ✓ `wellness` chapter with interactive chips |
| Nature | Lightness of Breathing — landscape story | ✓ `nature` chapter (LV: Mediterranean Light) |
| Place | Essence of Contemplation + stats strip (3/9/16 min) | ✓ `place` chapter + configurable stats |
| Design | Inspired Architecture — materials story | ✓ `design` chapter + material tags |
| Residences | Collection + metrics | ✓ `residences` chapter (single residence for LV) |
| Interiors | Beauty in the Essence of Things — gallery | ✓ `interiors` chapter — asymmetric gallery |
| Contact | Private enquiry | ✓ Netlify form, "By appointment only" |
| Motion | Cinematic scroll, reveals, parallax, image zoom | ✓ Parallax hero grid, staggered reveals, scroll zoom, chip transitions |
| Typography | Serif display + clean sans, cream on dark | ✓ Cormorant Garamond + DM Sans |

---

## Ulikheter

| springs.estate | Los Verdiales / this template |
|----------------|-------------------------------|
| Dark green/teal/charcoal palette | Mediterranean: sage, stone, oak, bronze, warm charcoal |
| Multi-unit development (138 flats, townhouses, penthouses) | Single private residence — metrics adapted |
| Heavy WebGL / complex scroll-jacking | Lightweight static HTML + CSS + vanilla JS — deployable anywhere |
| Architect bureau credits (Tabanlioglu) | No third-party credits yet — Martin provides per property |
| Video backgrounds | Image-only (video section type can be added) |
| Norwegian/English | English only — copy variants not yet scaffolded |

---

## Adaptations made (springs → reusable template)

1. **Hero grid** — 4×3 tile grid rotated −10°, dark overlay gradient, fixed nav (Menu / brand / Contact), tagline top-left, serif headline bottom-right, circular scroll arrow
2. **Thematic chapters** — not room-by-room; follows springs narrative arc (opening → wellness → nature → place → design → residences → interiors → contact)
3. **Wellness chips** — Spa / Pool / Gym / Relax tabs swap image + copy without page reload
4. **Stats strip** — three-column metrics bar (walk/drive times for LV Marbella)
5. **Materials tags** — Stone / Oak / Bronze / Linen chips in design chapter
6. **Interiors gallery** — asymmetric 12-column grid with hover zoom
7. **Palette system** — `theme.palette` in content.json (`mediterranean` default, `springs` for green/teal)
8. **Content-driven** — entire page from `content.json`; no HTML edits per property

---

## content.json schema

```jsonc
{
  "meta": { "title", "description", "lang", "themeColor" },
  "theme": { "palette": "mediterranean" | "springs" },
  "brand": { "mark", "displayName", "name" },
  "navigation": [{ "label", "href", "position?": "right" }],
  "hero": {
    "tagline", "headline", "headlineItalic",
    "gridImages": ["assets/..."],
    "scrollTarget", "scrollCue"
  },
  "sections": [
    { "type": "opening", "title", "lead", "kicker?" },
    { "type": "wellness", "subtitle", "title", "intro", "amenities": [{ "id", "label", "image", "text" }] },
    { "type": "nature", "subtitle", "title", "image", "paragraphs", "pullquote" },
    { "type": "place", "subtitle", "title", "intro", "stats": [{ "value", "unit", "label" }], "image", "pullquote" },
    { "type": "design", "subtitle", "title", "paragraphs", "materials": [], "image" },
    { "type": "residences", "subtitle", "title", "intro", "metrics": [], "feature": { "title", "text", "image" } },
    { "type": "interiors", "subtitle", "title", "intro", "gallery": [{ "image", "kicker", "title" }] }
  ],
  "identity": { "monogram", "title", "location" },
  "contact": { "kicker", "title", "text", "form": { ... } },
  "footer": { "items": [] }
}
```

Use `*word*` in `hero.headline` with `headlineItalic: true` for italic emphasis (springs-style).

---

## What Martin still needs to provide (per property)

### Required for launch

- [ ] **Exterior / landscape hero tiles** — LV grid uses interiors; add facade, pool exterior, garden shots
- [ ] **Dedicated wellness photography** — pool, gym, spa (currently interior placeholders)
- [ ] **Floor plans** — PDF download or new `plans` section type
- [ ] **Exact location stats** — verify Marbella drive/walk times with Martin
- [ ] **Netlify site** — connect repo, set publish dir to `properties/<slug>/`
- [ ] **Thank-you page** — `thanks.html` after form submit
- [ ] **Custom domain** — e.g. `losverdiales.com`

### Optional enhancements

- [ ] **Video** — hero loop or chapter background (new `chapter-video` type)
- [ ] **Norwegian / Spanish copy** — `content.no.json`, `content.es.json` + locale switcher
- [ ] **Architect / interior designer credits**
- [ ] **Open Graph / social preview image**
- [ ] **Analytics** — Plausible, Fathom, or GA
- [ ] **springs palette** — set `"palette": "springs"` in content.json for green/teal variant

### Los Verdiales asset gaps

| Chapter | Current asset | Needed |
|---------|---------------|--------|
| Hero grid | interior-1…7 (repeated) | Exterior, landscape, pool aerial |
| Wellness / Pool | interior-7 | Real pool photography |
| Wellness / Training | interior-3 | Gym or training room |
| Place | interior-3 | Exterior arrival shot |
| Nature | interior-4 | Garden / terrace with light |

---

## GitHub mirror

This repo is ready to mirror as `martinbrusletto-jpg/property-site-template`:

```bash
git remote add github git@github.com:martinbrusletto-jpg/property-site-template.git
git push github main
```

Structure is self-contained: shared `template/`, per-property `properties/<slug>/`, scaffold script, and docs.
