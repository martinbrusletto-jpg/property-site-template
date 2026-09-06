# Brusletto Property Template

Reusable premium property website template inspired by [springs.estate](https://springs.estate). One shared cinematic experience, driven by per-property `content.json`.

**Example:** Los Verdiales — Marbella

## Quick start

```bash
npm run dev
# → http://localhost:8847
```

Or serve a property standalone:

```bash
cd properties/los-verdiales
python3 -m http.server 8847
```

Each property folder has a `template` symlink → shared CSS/JS.

## Add a new property (< 10 minutes)

```bash
npm run new "Villa Rosa"
```

1. **Add photos** → `properties/villa-rosa/assets/` (8–12 images for hero grid + chapters)
2. **Edit copy** → `properties/villa-rosa/content.json`
3. **Preview** → `cd properties/villa-rosa && python3 -m http.server 8847`

## Chapter structure (springs rhythm)

| Chapter | Section type | Purpose |
|---------|-------------|---------|
| Hero | `hero.gridImages` | Rotated tile grid, tagline, serif headline |
| Opening | `opening` | "Open the doors…" statement |
| Wellness | `wellness` | Chips: Pool / Spa / Gym / Relax |
| Nature | `nature` | Landscape / light story |
| Place | `place` | Location + stats strip |
| Design | `design` | Materials + architecture |
| Residences | `residences` | Collection metrics + feature |
| Interiors | `interiors` | Asymmetric image gallery |
| Contact | `contact` | Netlify form, by appointment |

See `TEMPLATE.md` for full schema, springs comparison, and Martin's checklist.

## Project structure

```
template/           → styles.css, app.js (shared)
properties/
  los-verdiales/    → content.json, assets/, index.html
scripts/
  new-property.mjs  → scaffold new site
README.md
TEMPLATE.md
```

## Deploy (Netlify)

1. Connect repository
2. Publish directory: `properties/los-verdiales` (or your property slug)
3. Forms work automatically (`data-netlify="true"`)

## Palette

Default: Mediterranean (stone, oak, bronze, sage). For springs green/teal:

```json
"theme": { "palette": "springs" }
```

## Mirror to GitHub

Ready for `martinbrusletto-jpg/property-site-template`:

```bash
git remote add github git@github.com:martinbrusletto-jpg/property-site-template.git
git push github main
```
