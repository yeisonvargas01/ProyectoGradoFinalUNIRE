const residuosAprovechables = [
  "botella plastica",
  "botella de plastico",
  "plastico",
  "papel",
  "carton",
  "vidrio",
  "lata"
];

const residuosOrganicos = [
  "cascara de banano",
  "cascara",
  "restos de comida",
  "organico",
  "hojas"
];

const residuosNoAprovechables = [
  "servilleta",
  "papel higienico",
  "tapabocas",
  "pañal",
  "icopor sucio",
  "colilla",
  "ceramica",
  "espejo roto"
];

const residuosPeligrosos = [
  "pila",
  "pilas",
  "bateria",
  "medicamentos",
  "quimicos",
  "aerosol",
  "aceite usado",
  "jeringa",
  "pintura"
];

const puntosRecoleccion = [
  { nombre: "Punto Verde Central", zona: "centro", horario: "Lun-Sáb 8:00 - 17:00" },
  { nombre: "EcoParque Norte", zona: "norte", horario: "Lun-Vie 9:00 - 18:00" },
  { nombre: "Estación Recicla Sur", zona: "sur", horario: "Lun-Sáb 7:00 - 16:00" },
  { nombre: "Punto Comunitario Occidente", zona: "occidente", horario: "Mar-Dom 10:00 - 19:00" }
];

const reportes = [];

const residuoInput = document.getElementById("residuoInput");
const clasificarBtn = document.getElementById("clasificarBtn");
const resultadoClasificacion = document.getElementById("resultadoClasificacion");
const ilustracionCaneca = document.getElementById("ilustracionCaneca");

const filtroZona = document.getElementById("filtroZona");
const filtrarBtn = document.getElementById("filtrarBtn");
const listaPuntos = document.getElementById("listaPuntos");

const reporteForm = document.getElementById("reporteForm");
const contadorReportes = document.getElementById("contadorReportes");
const mensajeReporte = document.getElementById("mensajeReporte");

function normalizarTexto(texto) {
  return texto.trim().toLowerCase();
}

function clasificarResiduo(residuo) {
  const r = normalizarTexto(residuo);

  if (!r) return { tipo: "vacío", mensaje: "Ingresa un residuo para clasificar." };

  if (residuosAprovechables.includes(r)) {
    return { tipo: "aprovechable", mensaje: "✅ Aprovechable: deposítalo en contenedor de reciclaje." };
  } else if (residuosOrganicos.includes(r)) {
    return { tipo: "organico", mensaje: "🌱 Orgánico: ideal para compostaje." };
  } else if (residuosPeligrosos.includes(r)) {
    return { tipo: "peligroso", mensaje: "⚠️ Peligroso: requiere disposición especializada." };
  } else if (residuosNoAprovechables.includes(r)) {
    return { tipo: "no_aprovechable", mensaje: "🗑️ No aprovechable: deposítalo en caneca negra." };
  } else {
    return { tipo: "no_identificado", mensaje: "ℹ️ No identificado: revisa guía local de clasificación." };
  }
}

function renderCaneca(tipo) {
  if (!ilustracionCaneca) return;

  let clase = "caneca-neutra";
  let texto = "Clasificación no disponible.";

  if (tipo === "aprovechable") {
    clase = "caneca-blanca";
    texto = "Caneca blanca: plástico, vidrio, metales, papel y cartón.";
  } else if (tipo === "organico") {
    clase = "caneca-verde";
    texto = "Caneca verde: residuos orgánicos aprovechables.";
  } else if (tipo === "no_aprovechable") {
    clase = "caneca-negra";
    texto = "Caneca negra: residuos no aprovechables.";
  } else if (tipo === "peligroso") {
    clase = "caneca-roja";
    texto = "Residuo peligroso: requiere manejo especializado.";
  }

  ilustracionCaneca.innerHTML = `
    <div class="caneca ${clase}">
      <div class="caneca-tapa"></div>
      <div class="caneca-cuerpo">
        <span>${texto}</span>
      </div>
    </div>
  `;
}

clasificarBtn.addEventListener("click", () => {
  try {
    const { tipo, mensaje } = clasificarResiduo(residuoInput.value);
    resultadoClasificacion.textContent = mensaje;

    resultadoClasificacion.className = "alert mt-3 mb-0";
    if (tipo === "aprovechable") resultadoClasificacion.classList.add("alert-success");
    else if (tipo === "organico") resultadoClasificacion.classList.add("alert-primary");
    else if (tipo === "peligroso") resultadoClasificacion.classList.add("alert-danger");
    else if (tipo === "no_aprovechable") resultadoClasificacion.classList.add("alert-dark");
    else resultadoClasificacion.classList.add("alert-secondary");

    renderCaneca(tipo);
  } catch (error) {
    resultadoClasificacion.className = "alert alert-warning mt-3 mb-0";
    resultadoClasificacion.textContent = "Se detectó un error inesperado al clasificar (bug controlado).";
    renderCaneca("no_identificado");
    console.error("Error al clasificar residuo:", error);
  }
});

function renderPuntos(items) {
  listaPuntos.innerHTML = "";

  if (items.length === 0) {
    listaPuntos.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning mb-0">No se encontraron puntos para ese filtro.</div>
      </div>
    `;
    return;
  }

  for (const punto of items) {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";
    col.innerHTML = `
      <article class="card-punto p-3 h-100">
        <div class="d-flex justify-content-between align-items-start gap-2 mb-2">
          <h3 class="h6 m-0 fw-bold">${punto.nombre}</h3>
          <span class="badge text-bg-success">${punto.zona}</span>
        </div>
        <p class="m-0 text-muted">Horario: ${punto.horario}</p>
      </article>
    `;
    listaPuntos.appendChild(col);
  }
}

residuoInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    clasificarBtn.click();
  }
});

function filtrarPuntos() {
  const criterio = normalizarTexto(filtroZona.value);

  if (!criterio) {
    renderPuntos(puntosRecoleccion);
    return;
  }

  const filtrados = puntosRecoleccion.filter((p) => {
    return p.zona.includes(criterio) || p.nombre.toLowerCase().includes(criterio);
  });

  renderPuntos(filtrados);
}

filtrarBtn.addEventListener("click", filtrarPuntos);

reporteForm.addEventListener("submit", (event) => {
  event.preventDefault();

  try {
    const nombre = document.getElementById("nombre").value.trim();
    const zona = document.getElementById("zona").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();

    if (!nombre || !zona || !descripcion) {
      mensajeReporte.innerHTML = '<div class="mensaje-error">Todos los campos son obligatorios.</div>';
      return;
    }

    if (descripcion.length < 10) {
      mensajeReporte.innerHTML = '<div class="mensaje-error">La descripción debe tener mínimo 10 caracteres.</div>';
      return;
    }

    const nuevoReporte = {
      id: reportes.length + 1,
      nombre,
      zona: zona.toLowerCase(),
      descripcion,
      fecha: new Date().toISOString()
    };

    reportes.push(nuevoReporte);
    contadorReportes.textContent = reportes.length;

    mensajeReporte.innerHTML = `<div class="mensaje-ok">Reporte enviado correctamente. ¡Gracias por participar!</div>`;
    reporteForm.reset();
  } catch (error) {
    mensajeReporte.innerHTML = '<div class="mensaje-error">Ocurrió un error al enviar el reporte (bug controlado).</div>';
    console.error("Error en reporte:", error);
  }
});

// Carga inicial con bucle de render
renderPuntos(puntosRecoleccion);
