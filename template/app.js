/**
 * Brusletto Property Template — springs.estate motion language
 * Content-driven renderer + scroll effects
 */

const CONTENT_URL = window.PROPERTY_CONTENT_URL || './content.json';

function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderNav(data) {
  const { brand, navigation, hero } = data;
  const leftLinks = navigation.filter((n) => n.position !== 'right');
  const rightLinks = navigation.filter((n) => n.position === 'right');
  const brandTitle = brand.displayName || brand.name;

  const leftNav = leftLinks
    .map((l) => `<a class="nav-link" href="${esc(l.href)}">${esc(l.label)}</a>`)
    .join('');

  const rightNav = rightLinks
    .map((l) => `<a class="nav-link" href="${esc(l.href)}">${esc(l.label)}</a>`)
    .join('');

  const drawerLinks = navigation
    .map((l) => `<a href="${esc(l.href)}">${esc(l.label)}</a>`)
    .join('');

  return `
    <header class="hero-nav" id="nav">
      <div class="hero-nav-left">
        <button class="menu-btn" aria-label="Open menu" data-menu-open>
          <span></span> Menu
        </button>
        ${leftNav}
      </div>
      <div class="hero-nav-center">
        <a class="hero-brand" href="#top">
          ${esc(brandTitle)}${brand.mark ? `<span class="hero-brand-mark">${esc(brand.mark)}</span>` : ''}
        </a>
      </div>
      <div class="hero-nav-right">
        ${rightNav}
      </div>
    </header>
    <div class="nav-drawer" id="nav-drawer" aria-hidden="true">
      <button class="nav-drawer-close" data-menu-close>Close</button>
      ${drawerLinks}
    </div>`;
}

function renderHeroGrid(hero) {
  const tiles = (hero.gridImages || [hero.image]).map(
    (src, i) => `
      <div class="hero-tile" style="--tile-i:${i}">
        <img src="${esc(src)}" alt="" loading="${i < 4 ? 'eager' : 'lazy'}">
      </div>`
  ).join('');

  const headline = hero.headline || hero.title || '';
  const displayHeadline = hero.headlineItalic && headline.includes('*')
    ? headline.replace(/\*([^*]+)\*/g, '<em>$1</em>')
    : esc(headline);

  return `
    <section class="hero-grid" id="top">
      <div class="hero-grid-stage" data-parallax="hero">
        <div class="hero-grid-inner">
          ${tiles}
        </div>
      </div>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        ${hero.tagline ? `<p class="hero-tagline reveal">${esc(hero.tagline)}</p>` : ''}
        <h1 class="hero-headline reveal">${displayHeadline}</h1>
      </div>
      <a class="scroll-arrow" href="${esc(hero.scrollTarget || '#opening')}" aria-label="${esc(hero.scrollCue || 'Scroll')}"></a>
    </section>`;
}

function renderOpening(section) {
  const id = section.id ? ` id="${esc(section.id)}"` : ' id="opening"';
  return `
    <section class="chapter-opening reveal"${id}>
      ${section.kicker ? `<p class="kicker">${esc(section.kicker)}</p>` : ''}
      <h2>${esc(section.title)}</h2>
      ${section.lead ? `<p class="lead">${esc(section.lead)}</p>` : ''}
      ${(section.paragraphs || []).map((p) => `<p class="lead">${esc(p)}</p>`).join('')}
    </section>`;
}

function renderWellness(section) {
  const id = section.id ? ` id="${esc(section.id)}"` : '';
  const chips = (section.amenities || []).map(
    (a, i) => `<button class="wellness-chip${i === 0 ? ' active' : ''}" data-panel="${esc(a.id)}" type="button">${esc(a.label)}</button>`
  ).join('');

  const panels = (section.amenities || []).map(
    (a, i) => `
      <div class="wellness-panel${i === 0 ? ' active' : ''}" data-panel="${esc(a.id)}">
        <img src="${esc(a.image)}" alt="${esc(a.imageAlt || a.label)}">
        <div class="wellness-panel-copy">
          <p>${esc(a.text)}</p>
        </div>
      </div>`
  ).join('');

  return `
    <section class="chapter-wellness reveal"${id}>
      <div class="chapter-wellness-header">
        <div>
          ${section.subtitle ? `<p class="subtitle">${esc(section.subtitle)}</p>` : ''}
          <h2>${esc(section.title)}</h2>
        </div>
        <p>${esc(section.intro)}</p>
      </div>
      <div class="wellness-chips">${chips}</div>
      <div class="wellness-panels">${panels}</div>
    </section>`;
}

function renderNature(section) {
  const id = section.id ? ` id="${esc(section.id)}"` : '';
  return `
    <section class="chapter-nature reveal"${id}>
      <div class="chapter-nature-media reveal">
        <img src="${esc(section.image)}" alt="${esc(section.imageAlt || '')}">
      </div>
      <div class="chapter-nature-copy reveal" style="--reveal-delay:120ms">
        ${section.subtitle ? `<p class="subtitle">${esc(section.subtitle)}</p>` : ''}
        <h2>${esc(section.title)}</h2>
        ${(section.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join('')}
        ${section.pullquote ? `<p class="pullquote">${esc(section.pullquote)}</p>` : ''}
      </div>
    </section>`;
}

function renderPlace(section) {
  const id = section.id ? ` id="${esc(section.id)}"` : '';
  const stats = (section.stats || []).map(
    (s) => `
      <div class="stat reveal">
        <p class="stat-value">${esc(s.value)}</p>
        ${s.unit ? `<p class="stat-unit">${esc(s.unit)}</p>` : ''}
        <p class="stat-label">${esc(s.label)}</p>
      </div>`
  ).join('');

  return `
    <section class="chapter-place reveal"${id}>
      <div class="chapter-place-header">
        <div>
          ${section.subtitle ? `<p class="subtitle">${esc(section.subtitle)}</p>` : ''}
          <h2>${esc(section.title)}</h2>
        </div>
        <p>${esc(section.intro)}</p>
      </div>
      ${stats ? `<div class="stats-strip">${stats}</div>` : ''}
      <div class="chapter-place-body">
        <div class="chapter-media reveal">
          <img src="${esc(section.image)}" alt="${esc(section.imageAlt || '')}">
        </div>
        <div class="chapter-copy reveal" style="--reveal-delay:140ms">
          <p class="pullquote">${esc(section.pullquote)}</p>
        </div>
      </div>
    </section>`;
}

function renderDesign(section) {
  const id = section.id ? ` id="${esc(section.id)}"` : '';
  const materials = (section.materials || []).map(
    (m) => `<span class="material-tag">${esc(m)}</span>`
  ).join('');

  return `
    <section class="chapter-design reveal"${id}>
      <div class="chapter-design-inner">
        <div class="chapter-design-copy reveal">
          ${section.subtitle ? `<p class="kicker">${esc(section.subtitle)}</p>` : ''}
          <h2>${esc(section.title)}</h2>
          ${(section.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join('')}
          ${materials ? `<div class="materials">${materials}</div>` : ''}
        </div>
        <div class="chapter-design-media reveal" style="--reveal-delay:160ms">
          <img src="${esc(section.image)}" alt="${esc(section.imageAlt || '')}">
        </div>
      </div>
    </section>`;
}

function renderResidences(section) {
  const id = section.id ? ` id="${esc(section.id)}"` : '';
  const metrics = (section.metrics || []).map(
    (m) => `
      <div class="metric reveal">
        <p class="metric-value">${esc(m.value)}</p>
        <p class="metric-label">${esc(m.label)}</p>
      </div>`
  ).join('');

  return `
    <section class="chapter-residences reveal"${id}>
      <div class="chapter-residences-header">
        <div>
          ${section.subtitle ? `<p class="subtitle">${esc(section.subtitle)}</p>` : ''}
          <h2>${esc(section.title)}</h2>
        </div>
        <p>${esc(section.intro)}</p>
      </div>
      <div class="metrics-grid">${metrics}</div>
      ${section.feature ? `
        <div class="residence-feature reveal">
          <div class="residence-feature-media">
            <img src="${esc(section.feature.image)}" alt="${esc(section.feature.imageAlt || '')}">
          </div>
          <div>
            <h3>${esc(section.feature.title)}</h3>
            <p>${esc(section.feature.text)}</p>
          </div>
        </div>` : ''}
    </section>`;
}

function renderInteriors(section) {
  const id = section.id ? ` id="${esc(section.id)}"` : '';
  const items = (section.gallery || []).map(
    (g) => `
      <div class="gallery-item reveal">
        <img src="${esc(g.image)}" alt="${esc(g.imageAlt || g.title || '')}">
        ${g.title ? `
          <div class="gallery-caption">
            ${g.kicker ? `<p class="kicker">${esc(g.kicker)}</p>` : ''}
            <h3>${esc(g.title)}</h3>
          </div>` : ''}
      </div>`
  ).join('');

  return `
    <section class="chapter-interiors reveal"${id}>
      <div class="chapter-interiors-header">
        <div>
          ${section.subtitle ? `<p class="kicker">${esc(section.subtitle)}</p>` : ''}
          <h2>${esc(section.title)}</h2>
        </div>
        <p>${esc(section.intro)}</p>
      </div>
      <div class="interiors-gallery">${items}</div>
    </section>`;
}

function renderSection(section) {
  switch (section.type) {
    case 'opening': return renderOpening(section);
    case 'wellness': return renderWellness(section);
    case 'nature': return renderNature(section);
    case 'place': return renderPlace(section);
    case 'design': return renderDesign(section);
    case 'residences': return renderResidences(section);
    case 'interiors': return renderInteriors(section);
    default: return '';
  }
}

function renderFormField(field) {
  const req = field.required ? ' required' : '';
  if (field.type === 'textarea') {
    return `<label>${esc(field.label)}<textarea name="${esc(field.name)}" rows="${field.rows || 3}"${req}></textarea></label>`;
  }
  return `<label>${esc(field.label)}<input name="${esc(field.name)}" type="${esc(field.type || 'text')}"${req}></label>`;
}

function renderContact(contact, footer) {
  const form = contact.form;
  const fields = (form.fields || []).map(renderFormField).join('');
  const footerItems = (footer.items || []).map((item) => `<span>${esc(item)}</span>`).join('');

  return `
    <section class="closing" id="${esc(contact.id || 'contact')}">
      <div class="closing-grid">
        <div class="reveal">
          <p class="kicker">${esc(contact.kicker)}</p>
          <h2>${esc(contact.title)}</h2>
          <p class="closing-copy">${esc(contact.text)}</p>
        </div>
        <form class="reveal" style="--reveal-delay:160ms"
          name="${esc(form.name)}" method="POST"
          data-netlify="true" netlify-honeypot="bot-field"
          action="${esc(form.action || '/thanks.html')}">
          <input type="hidden" name="form-name" value="${esc(form.name)}">
          <p class="hidden"><label>Leave empty <input name="bot-field"></label></p>
          ${fields}
          <button type="submit">${esc(form.submitLabel)}</button>
        </form>
      </div>
      <footer>${footerItems}</footer>
    </section>`;
}

function renderIdentity(identity) {
  return `
    <section class="identity reveal">
      <div class="monogram">${esc(identity.monogram)}</div>
      <h3>${esc(identity.title)}</h3>
      <p>${esc(identity.location)}</p>
    </section>`;
}

function renderPage(data) {
  const sections = (data.sections || []).map(renderSection).join('');
  return `
    ${renderNav(data)}
    <main>
      ${renderHeroGrid(data.hero)}
      ${sections}
      ${data.identity ? renderIdentity(data.identity) : ''}
      ${renderContact(data.contact, data.footer)}
    </main>`;
}

function applyMeta(data) {
  document.title = data.meta.title;
  document.documentElement.lang = data.meta.lang || 'en';
  if (data.theme?.palette) {
    document.body.dataset.palette = data.theme.palette;
  }

  const setMeta = (name, content) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.name = name;
      document.head.appendChild(el);
    }
    el.content = content;
  };
  setMeta('description', data.meta.description);
  setMeta('theme-color', data.meta.themeColor || '#1a1814');
}

/* ─── Interactions ─── */

function initMenu() {
  const drawer = document.getElementById('nav-drawer');
  const openBtn = document.querySelector('[data-menu-open]');
  const closeBtn = document.querySelector('[data-menu-close]');

  const open = () => {
    drawer?.classList.add('open');
    drawer?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    drawer?.classList.remove('open');
    drawer?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  drawer?.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
}

function initWellnessChips() {
  document.querySelectorAll('.chapter-wellness').forEach((section) => {
    const chips = section.querySelectorAll('.wellness-chip');
    const panels = section.querySelectorAll('.wellness-panel');

    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const id = chip.dataset.panel;
        chips.forEach((c) => c.classList.toggle('active', c === chip));
        panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === id));
      });
    });
  });
}

function initReveals() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -4% 0px' }
  );

  document.querySelectorAll('.reveal, .gallery-item, .chapter-nature-media, .residence-feature, .hero-grid').forEach((el, i) => {
    if (!el.style.getPropertyValue('--reveal-delay')) {
      const siblings = el.parentElement ? [...el.parentElement.querySelectorAll('.reveal')].indexOf(el) : i;
      el.style.setProperty('--reveal-delay', `${Math.min(Math.max(siblings, 0) * 80, 400)}ms`);
    }
    io.observe(el);
  });
}

function initParallax() {
  const heroStage = document.querySelector('[data-parallax="hero"]');
  if (!heroStage) return;

  let ticking = false;
  const update = () => {
    const y = Math.min(scrollY, window.innerHeight);
    heroStage.style.transform = `translate3d(0, ${y * 0.22}px, 0)`;
    ticking = false;
  };

  addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
}

function initScrollZoom() {
  const panels = document.querySelectorAll('.chapter-design-media img, .chapter-place-body img, .residence-feature-media img');
  if (!panels.length) return;

  const onScroll = () => {
    panels.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const progress = 1 - rect.top / vh;
      const scale = 1 + Math.max(0, Math.min(1, progress)) * 0.05;
      if (!img.closest('.gallery-item:hover')) {
        img.style.transform = `scale(${scale})`;
      }
    });
  };

  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initEffects() {
  initMenu();
  initWellnessChips();
  initReveals();
  initParallax();
  initScrollZoom();
}

async function boot() {
  const app = document.getElementById('app');
  if (!app) return;

  try {
    const res = await fetch(CONTENT_URL);
    if (!res.ok) throw new Error(`Failed to load ${CONTENT_URL}`);
    const data = await res.json();
    applyMeta(data);
    app.innerHTML = renderPage(data);
    app.removeAttribute('aria-busy');
    initEffects();
    document.querySelector('.hero-grid')?.classList.add('in');
    document.querySelectorAll('.hero-content .reveal').forEach((el) => el.classList.add('in'));
  } catch (err) {
    console.error(err);
    app.innerHTML = `<div class="app-error"><p>Unable to load property content.<br>${esc(err.message)}</p></div>`;
    app.removeAttribute('aria-busy');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
