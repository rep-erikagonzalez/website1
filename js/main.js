const stories = [
  {
    index: "01",
    title: "Una IA para una tarea. Otra para otra.",
    note: "Pequeños asistentes para organizar, aprender, crear y quitarme lo repetitivo.",
  },
  {
    index: "02",
    title: "No es la próxima gran IA.",
    note: "Es un experimento que crece conmigo. Y que va a cambiar. Muchas veces.",
  },
  {
    index: "03",
    title: "Versión actual: en construcción.",
    note: "Apenas estoy empezando. Pruebo, me equivoco y vuelvo a intentar.",
  },
];

const regions = [
  {
    name: "Estudios",
    more: "Y sigo aprendiendo.",
    shift: 0.2,
    venues: [
      ["Maestría en Dirección y Gestión de Tecnologías de la Información (TI)", "En curso · Universidad Internacional de La Rioja"],
      ["Ingeniería de sistemas", "2017–2021 · Universidad nacional abierta y a distancia"],
      ["Tecnología en Análisis y desarrollo de sistemas de información", "2014–2016 · SENA"],
      ["Bachillerato Técnico Programación informática", "2013 · Colegio Cristóbal Colon - SENA"],
    ],
  },
  {
    name: "Cursos",
    more: "Un curso termina. Al día siguiente sale otra cosa.",
    shift: 1.7,
    venues: [
      ["Ciberseguridad de Google", "2025 · Certificado profesional · Google"],
      ["Google AI Essentials", "2025 · Curso · Google"],
      ["Diplomado en Diseño de la Interacción UI-UX", "2025 · Universidad del Quindío"],
      ["Diplomado en Diseño UX/UI-2", "2024 · Universidad nacional de Colombia"],
      ["Diplomado en docencia y didáctica universitaria", "2023 · Politécnico superior"],
      ["Diplomado en ambientes y herramientas virtuales de aprendizaje", "2023 · Politécnico superior"],
    ],
  },
  {
    name: "Ahora mismo",
    more: "Trabajando, aprendiendo y probando.",
    shift: 3.1,
    venues: [
      ["Ecosistema de IAs", "Asistentes para el día a día"],
      ["Nuevas herramientas", "Automatizar lo repetido"],
      ["Proyectos personales", "Ideas que todavía cambian de forma"],
      ["Aprendizaje", "Porque, al parecer, no se acaba"],
    ],
  },
];

const studioTabs = {
  intraweb: {
    kicker: "Intraweb",
    label: "Dónde",
    value: "Quindío",
    sub: "alcaldía y entidades públicas",
    path: "M0 100 C40 88 80 70 120 78 C170 88 210 40 270 52 C320 64 360 28 420 44 C470 58 510 22 560 16",
    stroke: "#ff8ec8",
    hot: 0,
    lines: ["Gestión documental", "que ya se usa", "en la alcaldía", "y en entidades públicas del Quindío."],
  },
  epa: {
    kicker: "EPA",
    label: "Módulo",
    value: "Agua",
    sub: "mantenimientos para empresas de agua",
    path: "M0 70 C50 90 90 40 140 55 C190 70 230 110 290 88 C350 66 390 30 450 48 C500 62 530 36 560 24",
    stroke: "#ff7ad9",
    hot: 1,
    lines: ["El módulo", "de mantenimientos", "desarrollado en EPA,", "entidad de empresas de agua."],
  },
  ia: {
    kicker: "IA en el desarrollo",
    label: "Ejemplo",
    value: "Cursor",
    sub: "la IA entra mientras se construye",
    path: "M0 90 L70 90 L70 46 L150 46 L150 108 L230 108 L230 28 L320 28 L320 74 L410 74 L410 18 L490 18 L490 64 L560 40",
    stroke: "#e879f9",
    hot: 3,
    lines: ["La IA va", "dentro del proceso,", "no solo al cierre.", "Cursor es un ejemplo."],
  },
  google: {
    kicker: "Integraciones con Google",
    label: "Piezas",
    value: "2 APIs",
    sub: "Google Drive y Google Docs, con OAuth",
    path: "M0 80 C40 60 90 100 140 70 C190 40 230 90 290 76 C350 60 390 30 450 50 C500 66 530 40 560 28",
    stroke: "#c084fc",
    hot: 1,
    lines: ["Dos sistemas", "que por fin", "se hablan.", "A veces eso es todo el proyecto."],
  },
  cursos: {
    kicker: "Formación digital",
    label: "Alcance",
    value: "+100",
    sub: "personas certificadas en cuatro cursos",
    path: "M0 90 L80 90 L80 50 L160 50 L160 110 L240 110 L240 30 L320 30 L320 80 L400 80 L400 20 L480 20 L480 70 L560 70",
    stroke: "#e879f9",
    hot: 3,
    lines: ["Cuatro cursos.", "Más de cien", "personas al otro lado.", "Potencia tu vida, potencia digital."],
  },
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function setupMenu() {
  const toggle = $(".menu-toggle");
  const menu = $("#menu-full");
  const close = () => {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  };
  toggle.addEventListener("click", () => {
    const open = menu.hidden;
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#menu-full a").forEach((link) => link.addEventListener("click", close));

  $$(".drop-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const wrap = btn.parentElement;
      const open = wrap.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });
}

function setupTheme() {
  const nav = $("[data-nav]");
  const zones = $$("[data-theme]");
  const apply = () => {
    const mark = 80;
    let theme = "light";
    for (const zone of zones) {
      const rect = zone.getBoundingClientRect();
      if (rect.top <= mark && rect.bottom > mark) theme = zone.dataset.theme;
    }
    nav.classList.toggle("is-dark", theme === "dark");
  };
  apply();
  window.addEventListener("scroll", apply, { passive: true });
}

function setupStory() {
  const section = $(".story");
  const title = $("[data-story-title]");
  const note = $("[data-story-note]");
  const index = $("[data-story-index]");
  const scenes = $$(".scene");
  let current = 0;

  const render = (i) => {
    if (i === current) return;
    current = i;
    title.textContent = stories[i].title;
    note.textContent = stories[i].note;
    index.textContent = stories[i].index;
    scenes.forEach((scene, n) => scene.classList.toggle("is-on", n === i));
  };

  const onScroll = () => {
    const rect = section.getBoundingClientRect();
    const total = section.offsetHeight - window.innerHeight;
    const passed = Math.min(Math.max(-rect.top, 0), total);
    const progress = total === 0 ? 0 : passed / total;
    const i = Math.min(stories.length - 1, Math.floor(progress * stories.length));
    render(i);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupStudio() {
  const label = $("[data-studio-label]");
  const value = $("[data-studio-value]");
  const sub = $("[data-studio-sub]");
  const path = $(".ui-chart path");
  const lines = $$("[data-studio-headline] span");
  $$(".studio-tabs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const data = studioTabs[btn.dataset.tab];
      $$(".studio-tabs button").forEach((item) => {
        const on = item === btn;
        item.classList.toggle("is-active", on);
        item.setAttribute("aria-selected", String(on));
      });
      const kicker = $(".brand-mini");
      if (kicker && data.kicker) kicker.textContent = data.kicker;
      label.textContent = data.label;
      value.textContent = data.value;
      sub.textContent = data.sub;
      path.setAttribute("d", data.path);
      path.setAttribute("stroke", data.stroke);
      lines.forEach((line, i) => {
        if (data.lines?.[i]) line.textContent = data.lines[i];
        line.classList.toggle("is-hot", i === data.hot);
      });
    });
  });
}

function setupNetwork() {
  const list = $("[data-venues]");
  const name = $("[data-region-name]");
  const more = $("[data-region-more]");
  const seeAll = $("[data-see-all]");
  let index = 0;
  let expanded = false;

  const paint = () => {
    const region = regions[index];
    name.textContent = region.name;
    more.textContent = region.more;
    list.classList.toggle("is-open", expanded);
    seeAll.textContent = expanded ? "Ver menos" : "Ver todos";
    list.innerHTML = region.venues
      .map((venue, i) => {
        const hidden = !expanded && i > 4 ? " hidden" : "";
        return `<li${hidden}><strong>${venue[0]}</strong><span>${venue[1]}</span></li>`;
      })
      .join("");
    window.__globeShift = region.shift;
  };

  $("[data-region-prev]").addEventListener("click", () => {
    index = (index - 1 + regions.length) % regions.length;
    expanded = false;
    paint();
  });
  $("[data-region-next]").addEventListener("click", () => {
    index = (index + 1) % regions.length;
    expanded = false;
    paint();
  });
  seeAll.addEventListener("click", () => {
    expanded = !expanded;
    paint();
  });
  paint();
}

function setupGlobe() {
  const canvas = $("#globe");
  const ctx = canvas.getContext("2d");
  const points = [];
  for (let i = 0; i < 420; i += 1) {
    const lat = Math.acos(2 * Math.random() - 1) - Math.PI / 2;
    const lon = Math.random() * Math.PI * 2;
    points.push({ lat, lon, s: Math.random() });
  }
  let spin = 0;

  const draw = () => {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w * 0.58;
    const cy = h * 0.46;
    const r = w * 0.42;
    ctx.clearRect(0, 0, w, h);

    const glow = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
    glow.addColorStop(0, "rgba(210, 70, 200, 0.22)");
    glow.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(230, 130, 210, 0.22)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    const shift = window.__globeShift || 0;
    spin += 0.004;
    for (const point of points) {
      const lon = point.lon + spin + shift;
      const x3 = Math.cos(point.lat) * Math.sin(lon);
      const y3 = Math.sin(point.lat);
      const z3 = Math.cos(point.lat) * Math.cos(lon);
      if (z3 < 0) continue;
      const x = cx + x3 * r;
      const y = cy - y3 * r;
      const alpha = 0.25 + z3 * 0.75;
      ctx.fillStyle = `rgba(255, 170, 220, ${alpha})`;
      ctx.beginPath();
      ctx.arc(x, y, point.s > 0.92 ? 2.4 : 1.15, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  };
  draw();
}

function setupForm() {
  const form = $(".contact-form");
  const note = $("[data-form-note]");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      note.textContent = "Completa nombre, correo y mensaje.";
      form.reportValidity();
      return;
    }
    const data = new FormData(form);
    const subject = encodeURIComponent("Hola Erika, vengo desde tu web");
    const body = encodeURIComponent(
      `${data.get("nombre")} (${data.get("correo")})\n\n${data.get("mensaje")}`
    );
    window.location.href = `mailto:ejgonzalez971@gmail.com?subject=${subject}&body=${body}`;
    note.textContent = "Se abre tu correo para escribirle a Erika.";
    form.reset();
  });
}

function setupPromo() {
  const promo = $("[data-promo]");
  $(".promo-close").addEventListener("click", () => promo.classList.add("is-gone"));
}

function setupScrollCues() {
  $$("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = $(btn.dataset.scroll);
      target?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function setupHeaderScroll() {
  const hero = $(".hero");
  const nav = $("[data-nav]");
  let frame = 0;

  const update = () => {
    frame = 0;
    const y = window.scrollY || document.scrollingElement.scrollTop || 0;
    const range = Math.max(hero.offsetHeight - window.innerHeight, 1);
    const p = Math.min(Math.max(y / range, 0), 1);
    hero.style.setProperty("--p", p.toFixed(4));
    nav.style.setProperty("--nav-p", Math.min(y / 240, 1).toFixed(4));
    nav.style.setProperty("--scroll", p.toFixed(4));
  };

  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(update);
  };

  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", update);
}

function setupPlay() {
  const pin = document.querySelector(".hero-pin");
  const eyes = [...document.querySelectorAll("[data-eye]")];
  if (!pin || !eyes.length) return;
  if (!window.matchMedia("(pointer: fine)").matches) return;

  const look = (event) => {
    eyes.forEach((eye) => {
      const box = eye.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      const len = Math.hypot(dx, dy) || 1;
      const max = box.width * 0.22;
      const mag = Math.min(max, len);
      eye.style.setProperty("--ex", `${((dx / len) * mag).toFixed(2)}px`);
      eye.style.setProperty("--ey", `${((dy / len) * mag).toFixed(2)}px`);
    });
  };

  const reset = () => {
    eyes.forEach((eye) => {
      eye.style.setProperty("--ex", "0px");
      eye.style.setProperty("--ey", "0px");
    });
  };

  pin.addEventListener("pointermove", look);
  pin.addEventListener("pointerleave", reset);
}

function setupAboutMotion() {
  const about = $("[data-about]");
  if (!about) return;
  const photo = about.querySelector(".about-photo");
  const fine = window.matchMedia("(pointer: fine)").matches;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frame = 0;

  const onScroll = () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = about.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const start = view * 0.92;
      const end = view * 0.28;
      const s = Math.min(Math.max((start - rect.top) / (start - end), 0), 1);
      about.style.setProperty("--s", s.toFixed(3));
    });
  };

  if (fine && !reduced) {
    about.addEventListener("pointermove", (event) => {
      const rect = about.getBoundingClientRect();
      about.style.setProperty("--mx", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
      about.style.setProperty("--my", ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
      if (!photo) return;
      const box = photo.getBoundingClientRect();
      const inside = event.clientX >= box.left && event.clientX <= box.right && event.clientY >= box.top && event.clientY <= box.bottom;
      if (!inside) return;
      photo.style.setProperty("--px", ((event.clientX - box.left) / box.width - 0.5).toFixed(3));
      photo.style.setProperty("--py", ((event.clientY - box.top) / box.height - 0.5).toFixed(3));
    });
    about.addEventListener("pointerleave", () => {
      about.style.setProperty("--mx", "0");
      about.style.setProperty("--my", "0");
      photo?.style.setProperty("--px", "0");
      photo?.style.setProperty("--py", "0");
    });
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
}

function setupColorMode() {
  const root = document.documentElement;
  const button = $(".theme-toggle");
  const apply = (mode) => {
    root.dataset.mode = mode;
    const light = mode === "light";
    button.setAttribute("aria-pressed", String(light));
    button.setAttribute("aria-label", light ? "Cambiar a modo oscuro" : "Cambiar a modo claro");
    try { localStorage.setItem("color-mode", mode); } catch (e) {}
  };
  apply(root.dataset.mode === "light" ? "light" : "dark");
  button.addEventListener("click", () => {
    apply(root.dataset.mode === "dark" ? "light" : "dark");
  });
}

setupColorMode();
setupMenu();
setupTheme();
setupStory();
setupStudio();
setupNetwork();
setupGlobe();
setupForm();
setupPromo();
setupScrollCues();
setupHeaderScroll();
setupPlay();
setupAboutMotion();
