# Template guide — springs.estate and Brusletto property sites

## Likheter (similarities)

- Chapter rhythm: Hero, Opening, Wellness, Nature, Place, Design, Residences, Interiors, Contact
- Fixed nav: Menu, brand mark, Contact (Residences link on desktop)
- Hero: rotated (~-10 deg) multi-tile image grid, dark sage/charcoal overlay, cream serif headline, scroll cue
- Typography: large display serif + light sans body; uppercase kickers with wide tracking
- Wellness chips: Pool / Training / Spa / Relax — active bright, inactive muted; switches copy and image
- Place stats strip and Design materials (stone / oak / bronze / linen)
- Residences metrics plus CTA into private viewing
- Quiet premium motion: staggered .reveal, hero slow drift, image zoom-on-scroll (respects prefers-reduced-motion)
- Dual palette: Mediterranean (default) and theme.palette = springs (forest/teal)

## Ulikheter (differences)

| Springs.estate | This template |
|----------------|---------------|
| Pinned / full-screen cinematic scroll (scene advances) | Normal scrollable long-form HTML approximation |
| Victor Serif + TT Commons Pro | Italiana / Cormorant Garamond + DM Sans (Google Fonts) — no Victor license |
| Dedicated exterior, nature, wellness photo sets | LV currently uses interior set only (exterior/wellness dedicated shots still needed) |
| Custom stylised map artwork | Lightweight CSS place-map placeholder with brand pin |
| Productised multi-residence collection | Single private residence instance (metrics still present) |
| Heart / wishlist UI | Omitted for appointment-led private sales |

## content.json schema (high level)

brand, theme.palette, meta, nav.links, hero.gridImages, opening, wellness.chips,
nature, place.stats, design.materials, residences.metrics + cta, interiors.gallery,
contact (Netlify formName / formAction / fields / footer).

Hydration: template/app.js fetches content.json and fills [data-bind] nodes.
HTML fallbacks remain visible if fetch fails.

## How to create another property

1. Run the package `new` script with the display name (or call scripts/new-property.py).
2. Drop 8-12 images into properties/<slug>/assets/.
3. Wire paths and copy in content.json.
4. Preview that folder with a local static host on port 8847.

## Martin checklist (still needed)

- Exterior tiles for hero grid (architecture / facade / landscape)
- Dedicated wellness / pool photos (chips currently reuse interiors)
- Floorplans (locked/unlocked presentation flow if desired)
- Verified location stats (distances, municipality claims)
- Netlify project pointed at properties/los-verdiales + confirm thanks.html
- Optional NO / ES copy (EN only today)
- Optional video (hero / dusk) — not required for the scroll template
- Confirm brand mark / favicon lockup
- Legal footer lines (brokerage, privacy) if publishing publicly

## Local QA

From properties/los-verdiales, host statically on 8847 and check:
hero grid rotation, menu overlay, wellness chips, form fields, gallery.
