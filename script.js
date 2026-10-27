const TARGET = new Date("2026-10-29T19:30:00+01:00");
const SECRET_WORD = "52!"; // Contraseña sorpresa; solo es una pantalla visual, no seguridad real.
const QUESTIONS = [
  {
    key: "mood",
    title: "¿Qué energía queremos para esta noche?",
    sub: "No hay respuestas incorrectas. Sigue tu intuición.",
    multi: false,
    options: [
      {
        v: "romantico",
        e: "🕯️",
        t: "Romántico e íntimo",
        d: "Luz tenue y una cita especial",
      },
      {
        v: "animado",
        e: "✨",
        t: "Animado y divertido",
        d: "Música, energía y brindis",
      },
      {
        v: "casual",
        e: "🍝",
        t: "Relajado y sin formalidades",
        d: "Comer rico sin complicaciones",
      },
      { v: "sorpresa", e: "🎁", t: "Sorpréndeme", d: "Que decida el destino" },
    ],
  },
  {
    key: "food",
    title: "¿Qué nos apetece comer?",
    sub: "Puedes marcar varias opciones.",
    multi: true,
    options: [
      { v: "italiana", e: "🍕", t: "Italia", d: "Pizza, pasta y focaccia" },
      {
        v: "japonesa",
        e: "🍜",
        t: "Japón",
        d: "Ramen, sushi y sabores asiáticos",
      },
      {
        v: "tailandesa",
        e: "🌶️",
        t: "Tailandia",
        d: "Curris, noodles y especias",
      },
      {
        v: "española",
        e: "🍷",
        t: "Española / mediterránea",
        d: "Tapas, cocina de mercado y producto",
      },
      {
        v: "americana",
        e: "🍔",
        t: "Americana / barbacoa",
        d: "Hamburguesas, carne y BBQ",
      },
      { v: "india", e: "🍛", t: "India", d: "Curry, tandoori y especias" },
      { v: "carne", e: "🥩", t: "Carne", d: "Un buen plato contundente" },
      {
        v: "cualquiera",
        e: "💫",
        t: "Nos da igual",
        d: "Queremos descubrir algo nuevo",
      },
    ],
  },
  {
    key: "budget",
    title: "¿Cuánto queremos gastar?",
    sub: "Estimación por persona, sin asumir que el precio esté garantizado.",
    multi: false,
    options: [
      { v: "low", e: "🌱", t: "Hasta 30 €", d: "Algo rico y asequible" },
      { v: "mid", e: "🥂", t: "30–50 €", d: "Nuestro presupuesto ideal" },
      {
        v: "high",
        e: "💎",
        t: "Podemos estirarnos",
        d: "Si la experiencia merece la pena",
      },
    ],
  },
  {
    key: "area",
    title: "¿En qué parte de Madrid?",
    sub: "La ciudad entera está sobre la mesa.",
    multi: false,
    options: [
      {
        v: "any",
        e: "🗺️",
        t: "Donde sea",
        d: "Si merece la pena, nos movemos",
      },
      { v: "central", e: "🏙️", t: "Centro", d: "Sol, Gran Vía, Chueca, Ópera" },
      {
        v: "north",
        e: "🌿",
        t: "Norte de Madrid",
        d: "Chamartín, Arturo Soria, Las Tablas",
      },
      {
        v: "chamberi",
        e: "🍷",
        t: "Chamberí / Ponzano",
        d: "Una zona perfecta para salir",
      },
    ],
  },
  {
    key: "experience",
    title: "¿Qué haría especial la cita?",
    sub: "Esto nos ayudará a ordenar las recomendaciones.",
    multi: false,
    options: [
      {
        v: "decor",
        e: "📸",
        t: "Un sitio espectacular",
        d: "Decoración, detalles y fotos bonitas",
      },
      {
        v: "foodie",
        e: "🍽️",
        t: "La comida es la protagonista",
        d: "Una carta que merezca la pena",
      },
      {
        v: "talk",
        e: "💗",
        t: "Poder hablar tranquilamente",
        d: "Acogedor y sin demasiado ruido",
      },
      {
        v: "music",
        e: "🎶",
        t: "Música y ambiente",
        d: "Que la noche tenga energía",
      },
    ],
  },
];
let answers = {
  mood: "sorpresa",
  food: ["cualquiera"],
  budget: "mid",
  area: "any",
  experience: "foodie",
};
let step = 0,
  restaurants = [],
  rankedRestaurants = [],
  showAllRestaurants = false,
  failedAttempts = 0;
const $ = (s) => document.querySelector(s);
const couplePhotoImage = $("#couplePhotoImage");
if (couplePhotoImage) {
  couplePhotoImage.addEventListener("load", () => {
    couplePhotoImage.classList.add("loaded");
    $("#couplePhotoPlaceholder").hidden = true;
    $(".couple-photo").classList.add("has-image");
  });
  couplePhotoImage.addEventListener("error", () => {
    couplePhotoImage.classList.remove("loaded");
  });
}
function setVisible(el, visible) {
  el.hidden = !visible;
}
function safeText(s) {
  return String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[
        c
      ])
  );
}
function updateCountdown() {
  const now = new Date(),
    diff = TARGET - now,
    el = $("#countdown");
  if (diff <= 0) {
    el.innerHTML =
      '<div class="time-unit"><strong>♥</strong><span>HOY ES EL DÍA</span></div>';
    $("#countdownCaption").textContent = "FELIZ PRIMER ANIVERSARIO";
    return;
  }
  const days = Math.floor(diff / 86400000),
    hours = Math.floor((diff % 86400000) / 3600000),
    mins = Math.floor((diff % 3600000) / 60000),
    secs = Math.floor((diff % 60000) / 1000);
  el.innerHTML = [
    [days, "DÍAS"],
    [hours, "HORAS"],
    [mins, "MIN"],
    [secs, "SEG"],
  ]
    .map(
      ([n, l]) =>
        `<div class="time-unit"><strong>${String(n).padStart(
          2,
          "0"
        )}</strong><span>${l}</span></div>`
    )
    .join("");
}
function showApp() {
  setVisible($("#gate"), false);
  setVisible($("#app"), true);
  $("#lockBtn").hidden = false;
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
$("#gateForm").addEventListener("submit", (e) => {
  e.preventDefault();
  if ($("#password").value.trim() === SECRET_WORD) {
    sessionStorage.setItem("anniversaryOpen", "yes");
    showApp();
  } else {
    failedAttempts++;
    $("#gateError").textContent =
      failedAttempts === 1
        ? "Casi, cariño… prueba una vez más ♥"
        : "Esa tampoco era. Te dejo una pista ♥";
    if (failedAttempts >= 1) $("#gateHint").hidden = false;
    $("#password").select();
  }
});
$("#lockBtn").addEventListener("click", () => {
  sessionStorage.removeItem("anniversaryOpen");
  $("#password").value = "";
  $("#gateError").textContent = "";
  $("#gateHint").hidden = true;
  failedAttempts = 0;
  setVisible($("#app"), false);
  setVisible($("#gate"), true);
  $("#lockBtn").hidden = true;
  window.scrollTo(0, 0);
});
$("#startBtn").addEventListener("click", () => {
  setVisible($("#quiz"), true);
  setVisible($("#results"), false);
  $("#quiz").scrollIntoView({ behavior: "smooth" });
  renderQuestion();
});
function renderQuestion() {
  const q = QUESTIONS[step];
  $("#stepCounter").textContent = `${String(step + 1).padStart(
    2,
    "0"
  )} / ${String(QUESTIONS.length).padStart(2, "0")}`;
  $("#progressBar").style.width = `${((step + 1) / QUESTIONS.length) * 100}%`;
  $("#questionMount").innerHTML = `<h2 class="question-title">${safeText(
    q.title
  )}</h2><p class="question-sub">${safeText(
    q.sub
  )}</p><div class="option-grid">${q.options
    .map((o) => {
      const selected = q.multi
        ? answers[q.key].includes(o.v)
        : answers[q.key] === o.v;
      return `<button type="button" class="option ${
        selected ? "selected" : ""
      }" data-value="${safeText(
        o.v
      )}" aria-pressed="${selected}"><span class="emoji">${
        o.e
      }</span><span><strong>${safeText(o.t)}</strong><small>${safeText(
        o.d
      )}</small></span></button>`;
    })
    .join("")}</div>`;
  $("#questionMount")
    .querySelectorAll(".option")
    .forEach((b) =>
      b.addEventListener("click", () => {
        const v = b.dataset.value;
        if (q.multi) {
          let arr = answers[q.key];
          if (v === "cualquiera") {
            answers[q.key] = ["cualquiera"];
          } else {
            answers[q.key] = arr.filter((x) => x !== "cualquiera");
            answers[q.key].includes(v)
              ? (answers[q.key] = answers[q.key].filter((x) => x !== v))
              : answers[q.key].push(v);
            if (!answers[q.key].length) answers[q.key] = ["cualquiera"];
          }
        } else answers[q.key] = v;
        renderQuestion();
      })
    );
  $("#backBtn").disabled = step === 0;
  $("#backBtn").style.opacity = step === 0 ? ".4" : "1";
  $("#nextBtn").textContent =
    step === QUESTIONS.length - 1 ? "Ver nuestras opciones ♥" : "Siguiente →";
}
$("#backBtn").addEventListener("click", () => {
  if (step > 0) {
    step--;
    renderQuestion();
  }
});
$("#nextBtn").addEventListener("click", () => {
  if (step < QUESTIONS.length - 1) {
    step++;
    renderQuestion();
  } else showResults();
});
function score(r) {
  let s = 0;
  const food = answers.food || ["cualquiera"];
  if (
    food.includes("cualquiera") ||
    food.some(
      (f) =>
        r.cuisine.includes(f) ||
        (f === "española" && r.cuisine.includes("mediterránea")) ||
        (f === "carne" && r.cuisine.includes("argentina"))
    )
  )
    s += 5;
  if (
    answers.mood === "romantico" &&
    r.vibe.some((v) =>
      [
        "romántico",
        "íntimo",
        "sofisticado",
        "acogedor",
        "tranquilo",
        "nocturno",
      ].includes(v)
    )
  )
    s += 4;
  if (
    answers.mood === "animado" &&
    r.vibe.some((v) =>
      ["animado", "social", "dine-and-dance", "espectacular"].includes(v)
    )
  )
    s += 4;
  if (
    answers.mood === "casual" &&
    r.vibe.some((v) =>
      ["casual", "informal", "auténtico", "para compartir"].includes(v)
    )
  )
    s += 4;
  if (answers.mood === "sorpresa") s += 2;
  if (answers.budget === "mid") {
    if (r.priceMin <= 50 && r.priceMax >= 30) s += 4;
    if (r.budgetFit === "puede-superar" || r.budgetFit === "por confirmar")
      s -= 2;
  }
  if (answers.budget === "low") {
    if (r.priceMax <= 30) s += 5;
    else if (r.priceMin > 35) s -= 4;
  }
  if (answers.budget === "high" && r.priceMax >= 40) s += 3;
  if (
    answers.area === "central" &&
    /Chueca|Sol|Gran Vía|Ópera|Centro|Huertas/i.test(r.area)
  )
    s += 3;
  if (
    answers.area === "north" &&
    /Norte|Chamartín|Arturo Soria|Las Tablas|Tetuán/i.test(r.area)
  )
    s += 3;
  if (answers.area === "chamberi" && /Chamberí|Ponzano/i.test(r.area)) s += 3;
  if (
    answers.experience === "decor" &&
    r.vibe.some((v) => ["espectacular", "moderno", "sofisticado"].includes(v))
  )
    s += 2;
  if (
    answers.experience === "talk" &&
    r.vibe.some((v) => ["íntimo", "tranquilo", "acogedor"].includes(v))
  )
    s += 3;
  if (
    answers.experience === "music" &&
    r.vibe.some((v) => ["animado", "social", "dine-and-dance"].includes(v))
  )
    s += 3;
  if (answers.experience === "foodie") s += 2;
  if (r.budgetFit === "por confirmar") s -= 1;
  return s;
}
function priceLabel(r) {
  if (r.budgetFit === "puede-superar") return "Puede superar 50 €";
  if (r.budgetFit === "por confirmar") return "Precio por confirmar";
  return `≈ ${r.priceMin}–${r.priceMax} €/persona`;
}
function restaurantCard(r, i) {
  const photo = r.photo
    ? `<div class="restaurant-photo"><img src="${safeText(
        r.photo
      )}" alt="Foto de ${safeText(
        r.name
      )}" loading="lazy" referrerpolicy="no-referrer"><span>UNA IDEA PARA NUESTRA CITA</span></div>`
    : `<div class="restaurant-photo photo-fallback"><span class="fallback-heart">♡</span><span>${safeText(
        r.cuisine.slice(0, 2).join(" · ")
      )}</span></div>`;
  return `<article class="restaurant-card">${photo}<div class="card-content"><div class="card-top"><span class="card-index">0${
    i + 1
  }</span><span class="price-pill">${safeText(
    priceLabel(r)
  )}</span></div><h3>${safeText(r.name)}</h3><p class="meta">${safeText(
    r.area
  )} · ${safeText(r.cuisine.slice(0, 2).join(" / "))}</p><p>${safeText(
    r.description
  )}</p><div class="tags">${r.tags
    .map((t) => `<span class="tag">${safeText(t)}</span>`)
    .join("")}</div><div class="card-links"><a href="${safeText(
    r.url
  )}" target="_blank" rel="noopener noreferrer">Web oficial ↗</a>${
    r.menu && r.menu !== r.url
      ? `<a href="${safeText(
          r.menu
        )}" target="_blank" rel="noopener noreferrer">Carta / menú ↗</a>`
      : ""
  }</div></div></article>`;
}
async function loadRestaurants() {
  const res = await fetch("restaurants.json", { cache: "no-store" });
  if (!res.ok) throw new Error("No se pudo cargar restaurants.json");
  return res.json();
}
function renderRestaurantResults() {
  const shown = showAllRestaurants
    ? rankedRestaurants
    : rankedRestaurants.slice(0, 4);
  $("#restaurantGrid").innerHTML = shown.map(restaurantCard).join("");
  $("#resultStatus").textContent = showAllRestaurants
    ? `Aquí tienes los ${rankedRestaurants.length} restaurantes, ordenados según tus respuestas. Las primeras opciones son las que mejor encajan.`
    : `Hemos comparado ${restaurants.length} restaurantes y seleccionado 4 según tus respuestas. La clasificación es orientativa, no una reserva ni una garantía de disponibilidad.`;
  const moreBtn = $("#moreOptionsBtn");
  moreBtn.hidden = rankedRestaurants.length <= 4;
  moreBtn.textContent = showAllRestaurants
    ? "Mostrar solo mis 4 favoritas ↑"
    : "Ver las demás opciones ↓";
  moreBtn.setAttribute("aria-expanded", String(showAllRestaurants));
}
async function showResults() {
  setVisible($("#quiz"), false);
  setVisible($("#results"), true);
  $("#results").scrollIntoView({ behavior: "smooth" });
  $("#resultStatus").textContent =
    "Buscando las mejores coincidencias de tu lista…";
  $("#restaurantGrid").innerHTML = "";
  $("#moreOptionsBtn").hidden = true;
  showAllRestaurants = false;
  try {
    restaurants = await loadRestaurants();
    rankedRestaurants = restaurants
      .map((r) => ({ ...r, _score: score(r) }))
      .sort((a, b) => b._score - a._score);
    renderRestaurantResults();
  } catch (e) {
    $("#resultStatus").textContent =
      "No hemos podido cargar el catálogo. Comprueba que restaurants.json esté en la misma carpeta que index.html.";
    console.error(e);
  }
}
$("#moreOptionsBtn").addEventListener("click", () => {
  showAllRestaurants = !showAllRestaurants;
  renderRestaurantResults();
  if (showAllRestaurants)
    $("#moreOptionsBtn").scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
});
$("#restartBtn").addEventListener("click", () => {
  step = 0;
  answers = {
    mood: "sorpresa",
    food: ["cualquiera"],
    budget: "mid",
    area: "any",
    experience: "foodie",
  };
  setVisible($("#results"), false);
  setVisible($("#quiz"), true);
  renderQuestion();
  $("#quiz").scrollIntoView({ behavior: "smooth" });
});
$("#refreshBtn").addEventListener("click", showResults);
if (sessionStorage.getItem("anniversaryOpen") === "yes") showApp();
document.addEventListener("DOMContentLoaded", () => {
  const polaroid = document.getElementById("couplePolaroid");
  const area = document.querySelector(".polaroid-area");
  const image = document.getElementById("couplePhotoImage");
  const placeholder = document.getElementById("couplePhotoPlaceholder");

  if (!polaroid || !area) return;

  // Mostrar el espacio de reserva si no existe la foto.
  if (image && placeholder) {
    const updatePhoto = () => {
      const hasPhoto = image.complete && image.naturalWidth > 0;
      placeholder.style.display = hasPhoto ? "none" : "flex";
    };

    image.addEventListener("load", updatePhoto);
    image.addEventListener("error", updatePhoto);
    updatePhoto();
  }

  let startX = 0;
  let startY = 0;
  let originalX = 0;
  let originalY = 0;
  let currentX = 0;
  let currentY = 0;
  let activePointer = null;

  function limit(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function movePolaroid(event) {
    if (activePointer !== event.pointerId) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    const maxX = Math.max(0, (area.clientWidth - polaroid.offsetWidth) / 2);
    const maxY = Math.max(0, (area.clientHeight - polaroid.offsetHeight) / 2);

    currentX = limit(originalX + dx, -maxX, maxX);
    currentY = limit(originalY + dy, -maxY, maxY);

    polaroid.style.transform = `translate(${currentX}px, ${currentY}px) rotate(-3deg)`;
  }

  function stopDragging(event) {
    if (activePointer !== event.pointerId) return;

    activePointer = null;
    polaroid.classList.remove("is-dragging");

    if (polaroid.hasPointerCapture(event.pointerId)) {
      polaroid.releasePointerCapture(event.pointerId);
    }
  }

  polaroid.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;

    activePointer = event.pointerId;

    startX = event.clientX;
    startY = event.clientY;
    originalX = currentX;
    originalY = currentY;

    polaroid.classList.add("is-dragging");
    polaroid.setPointerCapture(event.pointerId);
  });

  polaroid.addEventListener("pointermove", movePolaroid);
  polaroid.addEventListener("pointerup", stopDragging);
  polaroid.addEventListener("pointercancel", stopDragging);

  // Si cambia el tamaño de la pantalla, evita que quede fuera de la zona.
  window.addEventListener("resize", () => {
    const maxX = Math.max(0, (area.clientWidth - polaroid.offsetWidth) / 2);
    const maxY = Math.max(0, (area.clientHeight - polaroid.offsetHeight) / 2);

    currentX = limit(currentX, -maxX, maxX);
    currentY = limit(currentY, -maxY, maxY);

    polaroid.style.transform = `translate(${currentX}px, ${currentY}px) rotate(-3deg)`;
  });
});
