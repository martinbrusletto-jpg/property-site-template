#!/usr/bin/env node
/**
 * Scaffold a new property site from the shared template.
 *
 * Usage:
 *   node scripts/new-property.mjs villa-rosa
 *   node scripts/new-property.mjs "Casa del Sol" --slug casa-del-sol
 */

import { mkdir, writeFile, symlink, copyFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PROPERTIES = join(ROOT, 'properties');

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function titleCase(slug) {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

const args = process.argv.slice(2);
const slugArg = args.find((a) => a.startsWith('--slug='))?.split('=')[1];
const slugFlagIdx = args.indexOf('--slug');
const slugFromFlag = slugFlagIdx >= 0 ? args[slugFlagIdx + 1] : null;
const nameArg = args.find((a) => !a.startsWith('--') && a !== slugFromFlag);

if (!nameArg) {
  console.error('Usage: node scripts/new-property.mjs <property-name> [--slug custom-slug]');
  process.exit(1);
}

const slug = slugArg || slugFromFlag || slugify(nameArg);
const displayName = nameArg.includes('-') && !nameArg.includes(' ') ? titleCase(slug) : nameArg;
const dir = join(PROPERTIES, slug);

if (existsSync(dir)) {
  console.error(`Property already exists: properties/${slug}`);
  process.exit(1);
}

const initials = displayName.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

const content = {
  meta: {
    title: `${displayName} — Property`,
    description: `${displayName} — a private residence.`,
    lang: 'en',
    themeColor: '#1a1814',
  },
  theme: { palette: 'mediterranean' },
  brand: {
    mark: initials,
    displayName,
    name: displayName,
  },
  navigation: [
    { label: 'Residence', href: '#residence' },
    { label: 'Interiors', href: '#interiors' },
    { label: 'Wellness', href: '#wellness' },
    { label: 'Private viewing', href: '#contact', position: 'right' },
  ],
  hero: {
    tagline: 'A private residence shaped by light, natural materials and a quieter idea of luxury.',
    headline: `Splendour of *${displayName.split(' ')[0]}*`,
    headlineItalic: true,
    scrollTarget: '#opening',
    scrollCue: 'Discover',
    gridImages: [
      'assets/hero-1.jpg', 'assets/hero-2.jpg', 'assets/hero-3.jpg', 'assets/hero-4.jpg',
      'assets/hero-5.jpg', 'assets/hero-6.jpg', 'assets/hero-7.jpg', 'assets/hero-8.jpg',
      'assets/hero-1.jpg', 'assets/hero-2.jpg', 'assets/hero-3.jpg', 'assets/hero-4.jpg',
    ],
  },
  sections: [
    {
      type: 'opening',
      id: 'opening',
      kicker: 'The residence',
      title: 'A home designed to be felt before it is understood.',
      lead: 'Replace with your property story — architecture, interiors and landscape as one experience.',
    },
    {
      type: 'wellness',
      id: 'wellness',
      subtitle: 'Essence of Self-Care',
      title: 'Wellness',
      intro: 'Describe pool, spa, gym and relaxation spaces.',
      amenities: [
        { id: 'pool', label: 'Pool', image: 'assets/wellness-pool.jpg', text: 'Pool description.' },
        { id: 'spa', label: 'Spa', image: 'assets/wellness-spa.jpg', text: 'Spa description.' },
        { id: 'gym', label: 'Training', image: 'assets/wellness-gym.jpg', text: 'Training description.' },
        { id: 'relax', label: 'Relax', image: 'assets/wellness-relax.jpg', text: 'Relaxation description.' },
      ],
    },
    {
      type: 'nature',
      id: 'landscape',
      subtitle: 'Lightness of Being',
      title: 'Nature',
      image: 'assets/nature.jpg',
      paragraphs: ['Describe the landscape and natural setting.'],
      pullquote: 'A pullquote about light, air, or surroundings.',
    },
    {
      type: 'place',
      id: 'residence',
      subtitle: 'Essence of Place',
      title: 'Location',
      intro: 'Describe the neighbourhood and setting.',
      stats: [
        { value: '5', unit: 'min', label: 'to landmark' },
        { value: '10', unit: 'min', label: 'to centre' },
        { value: '30', unit: 'min', label: 'to airport' },
      ],
      image: 'assets/place.jpg',
      pullquote: 'A statement about privacy and arrival.',
    },
    {
      type: 'design',
      id: 'design',
      subtitle: 'Inspired Materiality',
      title: 'Stone. Oak. Bronze. Linen.',
      paragraphs: ['Describe materials and architectural approach.'],
      materials: ['Stone', 'Oak', 'Bronze', 'Linen'],
      image: 'assets/design.jpg',
    },
    {
      type: 'residences',
      id: 'collection',
      subtitle: 'The Residence',
      title: 'A Complete Private World',
      intro: 'Describe the residence collection or single property.',
      metrics: [
        { value: '1', label: 'Private residence' },
        { value: '—', label: 'Panoramic views' },
        { value: '1', label: 'Wellness level' },
      ],
      feature: {
        title: 'Primary Suite',
        text: 'Describe the primary suite.',
        image: 'assets/suite.jpg',
      },
    },
    {
      type: 'interiors',
      id: 'interiors',
      subtitle: 'Beauty in the Essence of Things',
      title: 'Interiors',
      intro: 'Describe the interior philosophy and finishes.',
      gallery: [
        { image: 'assets/interior-1.jpg', kicker: 'Living', title: 'Living spaces.' },
        { image: 'assets/interior-2.jpg', kicker: 'Suite', title: 'Primary suite.' },
        { image: 'assets/interior-3.jpg', kicker: 'Bath', title: 'Private spaces.' },
        { image: 'assets/interior-4.jpg', kicker: 'Detail', title: 'Material detail.' },
      ],
    },
  ],
  identity: {
    monogram: initials,
    title: displayName.toUpperCase(),
    location: 'Location',
  },
  contact: {
    id: 'contact',
    kicker: 'Private presentation',
    title: 'By appointment only.',
    text: 'For specifications, plans, availability and a private viewing, request the full presentation.',
    form: {
      name: 'private-viewing',
      action: '/thanks.html',
      submitLabel: 'Request private presentation',
      fields: [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'phone', label: 'Phone', type: 'tel', required: false },
        { name: 'message', label: 'Message', type: 'textarea', required: false, rows: 3 },
      ],
    },
  },
  footer: {
    items: [displayName, 'Location · Country', 'Private residence'],
  },
};

const indexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
  <meta name="theme-color" content="#1a1814">
  <meta name="description" content="${displayName} — a private residence.">
  <title>${displayName}</title>
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="template/styles.css">
</head>
<body>
  <div id="app" aria-busy="true"></div>
  <script>
    window.PROPERTY_CONTENT_URL = './content.json';
  </script>
  <script src="template/app.js" defer></script>
</body>
</html>
`;

await mkdir(join(dir, 'assets'), { recursive: true });
await writeFile(join(dir, 'content.json'), JSON.stringify(content, null, 2) + '\n');
await writeFile(join(dir, 'index.html'), indexHtml);
await copyFile(join(ROOT, 'template', 'favicon.svg'), join(dir, 'favicon.svg'));

// Symlink shared template so property can be served standalone
try {
  await symlink('../../template', join(dir, 'template'), 'dir');
} catch {
  // symlink may already exist on re-run
}

// Copy a placeholder readme in assets
await writeFile(
  join(dir, 'assets', 'README.txt'),
  `Add your property images here.\n\nHero grid (8–12 images):\n  hero-1.jpg … hero-8.jpg\n\nChapters:\n  wellness-pool.jpg, wellness-spa.jpg, nature.jpg, place.jpg, design.jpg, suite.jpg\n  interior-1.jpg … interior-4.jpg\n`
);

console.log(`\n✓ Created property: properties/${slug}/`);
console.log(`\nNext steps:`);
console.log(`  1. Add photos to properties/${slug}/assets/`);
console.log(`  2. Edit properties/${slug}/content.json`);
console.log(`  3. Preview: npm run dev:${slug}  (or cd properties/${slug} && python3 -m http.server 8847)`);
console.log('');
