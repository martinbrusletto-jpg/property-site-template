/* Property Site Template — shared behaviour
   Loads content.json, hydrates DOM, motion + wellness chips.
*/
(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  async function loadContent() {
    const el = document.querySelector("[data-content]");
    const url = el?.getAttribute("data-content") || "content.json";
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load " + url);
    return res.json();
  }

  function setText(sel, value) {
    const node = document.querySelector(sel);
    if (node && value != null) node.textContent = value;
  }

  function setHTML(sel, value) {
    const node = document.querySelector(sel);
    if (node && value != null) node.innerHTML = value;
  }

  function hydrate(data) {
    document.documentElement.dataset.palette = data.theme?.palette || "mediterranean";
    if (data.meta?.title) document.title = data.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && data.meta?.description) desc.setAttribute("content", data.meta.description);

    setText("[data-bind='brand.short']", data.brand?.short);
    setText("[data-bind='brand.name']", data.brand?.name);
    setText("[data-bind='brand.location']", data.brand?.location);
    setText("[data-bind='nav.contactLabel']", data.nav?.contactLabel || "Contact");

    // Menu links
    const menuNav = document.querySelector("[data-bind='nav.links']");
    if (menuNav && data.nav?.links) {
      menuNav.innerHTML = data.nav.links
        .map((l) => `<a href="${l.href}">${l.label}</a>`)
        .join("");
    }

    // Hero
    setText("[data-bind='hero.kicker']", data.hero?.kicker);
    setText("[data-bind='hero.headline']", data.hero?.headline);
    setText("[data-bind='hero.subhead']", data.hero?.subhead);
    const grid = document.querySelector("[data-bind='hero.grid']");
    if (grid && data.hero?.gridImages?.length) {
      grid.innerHTML = data.hero.gridImages
        .map((src) => `<div class="tile"><img src="${src}" alt="" loading="eager"></div>`)
        .join("");
    }

    // Opening
    setText("[data-bind='opening.kicker']", data.opening?.kicker);
    setText("[data-bind='opening.headline']", data.opening?.headline);
    const openingBody = document.querySelector("[data-bind='opening.body']");
    if (openingBody && data.opening?.body) {
      openingBody.innerHTML = data.opening.body.map((p) => `<p>${p}</p>`).join("");
    }
    const openingImg = document.querySelector("[data-bind='opening.image']");
    if (openingImg && data.opening?.image) {
      openingImg.src = data.opening.image;
      openingImg.alt = data.brand?.name || "";
    }

    // Wellness
    setText("[data-bind='wellness.kicker']", data.wellness?.kicker);
    setText("[data-bind='wellness.headline']", data.wellness?.headline);
    setText("[data-bind='wellness.body']", data.wellness?.body);
    const wellImg = document.querySelector("[data-bind='wellness.image']");
    if (wellImg && data.wellness?.image) wellImg.src = data.wellness.image;

    const chips = document.querySelector("[data-bind='wellness.chips']");
    if (chips && data.wellness?.chips) {
      chips.innerHTML = data.wellness.chips
        .map(
          (c, i) =>
            `<button type="button" class="chip${i === 0 ? " active" : ""}" data-chip="${c.id}" aria-pressed="${i === 0}">${c.label}</button>`
        )
        .join("");
      setupWellness(data.wellness);
    }

    // Nature
    setText("[data-bind='nature.kicker']", data.nature?.kicker);
    setText("[data-bind='nature.headline']", data.nature?.headline);
    setText("[data-bind='nature.body']", data.nature?.body);
    const n1 = document.querySelector("[data-bind='nature.image']");
    const n2 = document.querySelector("[data-bind='nature.secondaryImage']");
    if (n1 && data.nature?.image) n1.src = data.nature.image;
    if (n2 && data.nature?.secondaryImage) n2.src = data.nature.secondaryImage;

    // Place
    setText("[data-bind='place.kicker']", data.place?.kicker);
    setText("[data-bind='place.headline']", data.place?.headline);
    setText("[data-bind='place.body']", data.place?.body);
    setText("[data-bind='place.pin']", data.brand?.short || "");
    const stats = document.querySelector("[data-bind='place.stats']");
    if (stats && data.place?.stats) {
      stats.innerHTML = data.place.stats
        .map(
          (s) =>
            `<div class="stat"><div class="value">${s.value}</div><div class="label">${s.label}</div></div>`
        )
        .join("");
    }

    // Design
    setText("[data-bind='design.kicker']", data.design?.kicker);
    setText("[data-bind='design.headline']", data.design?.headline);
    setText("[data-bind='design.body']", data.design?.body);
    const dImg = document.querySelector("[data-bind='design.image']");
    if (dImg && data.design?.image) dImg.src = data.design.image;
    const mats = document.querySelector("[data-bind='design.materials']");
    if (mats && data.design?.materials) {
      mats.innerHTML = data.design.materials
        .map(
          (m) =>
            `<div class="material"><div class="name">${m.name}</div><div class="note">${m.note}</div></div>`
        )
        .join("");
    }

    // Residences
    setText("[data-bind='residences.kicker']", data.residences?.kicker);
    setText("[data-bind='residences.headline']", data.residences?.headline);
    setText("[data-bind='residences.body']", data.residences?.body);
    const rImg = document.querySelector("[data-bind='residences.image']");
    if (rImg && data.residences?.image) rImg.src = data.residences.image;
    const metrics = document.querySelector("[data-bind='residences.metrics']");
    if (metrics && data.residences?.metrics) {
      metrics.innerHTML = data.residences.metrics
        .map(
          (m) =>
            `<div class="metric"><div class="value">${m.value}</div><div class="label">${m.label}</div></div>`
        )
        .join("");
    }
    const cta = document.querySelector("[data-bind='residences.cta']");
    if (cta && data.residences?.cta) {
      cta.textContent = data.residences.cta.label;
      cta.setAttribute("href", data.residences.cta.href);
    }

    // Interiors
    setText("[data-bind='interiors.kicker']", data.interiors?.kicker);
    setText("[data-bind='interiors.headline']", data.interiors?.headline);
    setText("[data-bind='interiors.body']", data.interiors?.body);
    const gallery = document.querySelector("[data-bind='interiors.gallery']");
    if (gallery && data.interiors?.gallery) {
      gallery.innerHTML = data.interiors.gallery
        .map(
          (g) =>
            `<figure class="shot zoom reveal"><img src="${g.src}" alt="${g.label}" loading="lazy"><figcaption>${g.label}</figcaption></figure>`
        )
        .join("");
    }

    // Contact
    setText("[data-bind='contact.kicker']", data.contact?.kicker);
    setText("[data-bind='contact.headline']", data.contact?.headline);
    setText("[data-bind='contact.body']", data.contact?.body);
    const form = document.querySelector("form.contact-form");
    if (form && data.contact) {
      if (data.contact.formName) {
        form.setAttribute("name", data.contact.formName);
        const hidden = form.querySelector('input[name="form-name"]');
        if (hidden) hidden.value = data.contact.formName;
      }
      if (data.contact.formAction) form.setAttribute("action", data.contact.formAction);
      const map = data.contact.fields || {};
      Object.entries(map).forEach(([key, label]) => {
        const lab = form.querySelector(`[data-field="${key}"] .field-label`);
        if (lab) lab.textContent = label;
      });
      const submit = form.querySelector("[data-bind='contact.submit']");
      if (submit) submit.textContent = data.contact.submit || "Send";
    }
    const footer = document.querySelector("[data-bind='contact.footer']");
    if (footer && data.contact?.footer) {
      footer.innerHTML = data.contact.footer.map((t) => `<span>${t}</span>`).join("");
    }

    // Re-observe newly injected reveals
    observeReveals();
  }

  function setupWellness(wellness) {
    const chips = [...document.querySelectorAll("[data-chip]")];
    const title = document.querySelector("[data-bind='wellness.chipTitle']");
    const body = document.querySelector("[data-bind='wellness.chipBody']");
    const img = document.querySelector("[data-bind='wellness.image']");
    const byId = Object.fromEntries((wellness.chips || []).map((c) => [c.id, c]));

    function activate(id) {
      const chip = byId[id];
      if (!chip) return;
      chips.forEach((b) => {
        const on = b.dataset.chip === id;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (title) title.textContent = chip.title;
      if (body) body.textContent = chip.body;
      if (img && chip.image) {
        img.style.opacity = "0.7";
        const next = chip.image;
        window.setTimeout(() => {
          img.src = next;
          img.style.opacity = "1";
        }, 180);
      }
    }

    chips.forEach((b) => b.addEventListener("click", () => activate(b.dataset.chip)));
    if (wellness.chips?.[0]) activate(wellness.chips[0].id);
  }

  function setupNav() {
    const nav = document.querySelector("#nav");
    const menuBtn = document.querySelector("[data-menu-toggle]");
    const overlay = document.querySelector("#menu");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    function closeMenu() {
      overlay?.classList.remove("open");
      menuBtn?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    function openMenu() {
      overlay?.classList.add("open");
      menuBtn?.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }
    menuBtn?.addEventListener("click", () => {
      if (overlay?.classList.contains("open")) closeMenu();
      else openMenu();
    });
    overlay?.querySelector(".menu-dim")?.addEventListener("click", closeMenu);
    overlay?.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
  }

  let revealIO;
  function observeReveals() {
    if (reduceMotion) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in"));
      return;
    }
    if (!revealIO) {
      revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              revealIO.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
    }
    document.querySelectorAll(".reveal:not(.in)").forEach((el) => revealIO.observe(el));
  }

  function setupParallax() {
    if (reduceMotion) return;
    const heroGrid = document.querySelector(".hero-grid");
    const zooms = () => [...document.querySelectorAll(".chapter.full .bg img, .zoom img")];

    let ticking = false;
    function update() {
      ticking = false;
      const y = window.scrollY;
      if (heroGrid) {
        const drift = Math.min(y * 0.05, 40);
        heroGrid.style.transform = `rotate(-10deg) scale(1.18) translate3d(0, ${drift}px, 0)`;
      }
      zooms().forEach((img) => {
        const section = img.closest(".chapter, .shot, .media, .frame");
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const progress = (vh - rect.top) / (vh + rect.height);
        const clamped = Math.max(0, Math.min(1, progress));
        const scale = 1.08 - clamped * 0.08;
        img.style.transform = `scale(${scale})`;
      });
    }
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  }

  async function boot() {
    setupNav();
    try {
      const data = await loadContent();
      hydrate(data);
    } catch (err) {
      console.error(err);
      observeReveals();
    }
    setupParallax();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
