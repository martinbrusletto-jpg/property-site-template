# Brusletto Property Template

Reusable premium property website template inspired by springs.estate.
One shared cinematic HTML/CSS/JS experience, driven by per-property content.json.

**Example:** Los Verdiales — Marbella

## Quick start

Use the package.json `dev` script to preview Los Verdiales on port 8847.
You can also open `properties/los-verdiales` with any local static file host on that port.
Each property folder includes a `template` symlink to the shared CSS and JS.

## Create another property

Use the package.json `new` script with the property display name.
Then add photos under `properties/<slug>/assets/`, edit `content.json`, and preview that folder.

## Chapters (springs rhythm)

Hero grid, Opening, Wellness chips, Nature, Place stats, Design materials,
Residences metrics, Interiors gallery, Contact form (Netlify).

## Structure

- template/ — styles.css, app.js, favicon.svg
- properties/los-verdiales/ — content.json, index.html, assets/, thanks.html
- scripts/ — property scaffold helpers
- TEMPLATE.md — likeness/differences, schema, Martin checklist

## Palette

Default Mediterranean. Set theme.palette to springs for forest green/teal.

## Fonts

Italiana / Cormorant Garamond + DM Sans via Google Fonts. No Victor Serif license.

## Deploy

Connect the repo to Netlify. Publish directory: properties/los-verdiales.
Forms use data-netlify=true; thanks.html is included.
