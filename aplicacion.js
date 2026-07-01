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
  {
    nombre: "Barrio Payuco",
    zona: "norte",
    horario: "Lun-Sáb 8:00 - 17:00"
  },
  {
    nombre: "Barrio La Aldea",
    zona: "occidente",
    horario: "Lun-Vie 9:00 - 18:00"
  },
  {
    nombre: "Barrio La Suiza",
    zona: "norte",
    horario: "Lun-Sáb 7:00 - 16:00"
  },
  {
    nombre: "Barrio Villas de la Cruz",
    zona: "sur",
    horario: "Mar-Dom 10:00 - 19:00"
  },
  {
    nombre: "Barrio San Judas",
    zona: "sur",
    horario: "Lun-Sáb 8:00 - 17:00"
  },
  {
    nombre: "Barrio San Nicolás",
    zona: "centro",
    horario: "Lun-Vie 9:00 - 18:00"
  },
  {
    nombre: "Barrio San Cayetano",
    zona: "occidente",
    horario: "Lun-Sáb 7:00 - 16:00"
  },
  {
    nombre: "Barrio La Milagrosa",
    zona: "norte",
    horario: "Mar-Dom 10:00 - 19:00"
  },
  {
    nombre: "Centro Parque Principal",
    zona: "centro",
    horario: "Lun-Sáb 8:00 - 17:00"
  },
  {
    nombre: "Vereda Las Lomitas",
    zona: "sur",
    horario: "Lun-Vie 9:00 - 18:00"
  }
];

/*
 * Dirección local de la API.
 */
const API_BASE_URL = "http://localhost:8081/api/v1";

const residuoInput =
  document.getElementById("residuoInput");

const clasificarBtn =
  document.getElementById("clasificarBtn");

const resultadoClasificacion =
  document.getElementById("resultadoClasificacion");

const ilustracionCaneca =
  document.getElementById("ilustracionCaneca");

const filtroZona =
  document.getElementById("filtroZona");

const filtrarBtn =
  document.getElementById("filtrarBtn");

const listaPuntos =
  document.getElementById("listaPuntos");

const reporteForm =
  document.getElementById("reporteForm");

const zonaSelect =
  document.getElementById("zona");

const tipoReporteSelect =
  document.getElementById("tipoReporte");

const btnEnviarReporte =
  document.getElementById("btnEnviarReporte");

const numeroReporte =
  document.getElementById("numeroReporte");

const mensajeReporte =
  document.getElementById("mensajeReporte");


function normalizarTexto(texto) {
  return texto
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function obtenerValorCampo(idCampo) {
  return document
    .getElementById(idCampo)
    .value
    .trim();
}


function clasificarResiduo(residuo) {
  const residuoNormalizado =
    normalizarTexto(residuo);

  if (!residuoNormalizado) {
    return {
      tipo: "vacio",
      mensaje: "Ingresa un residuo para clasificar."
    };
  }

  if (
    residuosAprovechables.includes(
      residuoNormalizado
    )
  ) {
    return {
      tipo: "aprovechable",
      mensaje:
        "✅ Aprovechable: deposítalo en el contenedor de reciclaje."
    };
  }

  if (
    residuosOrganicos.includes(
      residuoNormalizado
    )
  ) {
    return {
      tipo: "organico",
      mensaje:
        "🌱 Orgánico: puede aprovecharse para compostaje."
    };
  }

  if (
    residuosPeligrosos.includes(
      residuoNormalizado
    )
  ) {
    return {
      tipo: "peligroso",
      mensaje:
        "⚠️ Peligroso: requiere una disposición especializada."
    };
  }

  if (
    residuosNoAprovechables.includes(
      residuoNormalizado
    )
  ) {
    return {
      tipo: "no_aprovechable",
      mensaje:
        "🗑️ No aprovechable: deposítalo en la caneca negra."
    };
  }

  return {
    tipo: "no_identificado",
    mensaje:
      "ℹ️ No identificado: revisa la guía local de clasificación."
  };
}

function renderCaneca(tipo) {
  if (!ilustracionCaneca) {
    return;
  }

  let clase = "caneca-neutra";
  let texto = "Clasificación no disponible.";

  if (tipo === "aprovechable") {
    clase = "caneca-blanca";
    texto =
      "Caneca blanca: plástico, vidrio, metales, papel y cartón.";
  } else if (tipo === "organico") {
    clase = "caneca-verde";
    texto =
      "Caneca verde: residuos orgánicos aprovechables.";
  } else if (tipo === "no_aprovechable") {
    clase = "caneca-negra";
    texto =
      "Caneca negra: residuos no aprovechables.";
  } else if (tipo === "peligroso") {
    clase = "caneca-roja";
    texto =
      "Residuo peligroso: requiere manejo especializado.";
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

function ejecutarClasificacion() {
  try {
    const resultado =
      clasificarResiduo(residuoInput.value);

    resultadoClasificacion.textContent =
      resultado.mensaje;

    resultadoClasificacion.className =
      "alert mt-3 mb-0";

    if (resultado.tipo === "aprovechable") {
      resultadoClasificacion.classList.add(
        "alert-success"
      );
    } else if (resultado.tipo === "organico") {
      resultadoClasificacion.classList.add(
        "alert-primary"
      );
    } else if (resultado.tipo === "peligroso") {
      resultadoClasificacion.classList.add(
        "alert-danger"
      );
    } else if (
      resultado.tipo === "no_aprovechable"
    ) {
      resultadoClasificacion.classList.add(
        "alert-dark"
      );
    } else {
      resultadoClasificacion.classList.add(
        "alert-secondary"
      );
    }

    renderCaneca(resultado.tipo);
  } catch (error) {
    resultadoClasificacion.className =
      "alert alert-warning mt-3 mb-0";

    resultadoClasificacion.textContent =
      "Se presentó un error inesperado al clasificar.";

    renderCaneca("no_identificado");

    console.error(
      "Error al clasificar el residuo:",
      error
    );
  }
}

clasificarBtn.addEventListener(
  "click",
  ejecutarClasificacion
);

residuoInput.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      ejecutarClasificacion();
    }
  }
);


function renderPuntos(items) {
  listaPuntos.innerHTML = "";

  if (items.length === 0) {
    listaPuntos.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning mb-0">
          No se encontraron puntos para ese filtro.
        </div>
      </div>
    `;

    return;
  }

  for (const punto of items) {
    const columna =
      document.createElement("div");

    columna.className =
      "col-md-6 col-lg-4";

    const tarjeta =
      document.createElement("article");

    tarjeta.className =
      "card-punto p-3 h-100";

    const encabezado =
      document.createElement("div");

    encabezado.className =
      "d-flex justify-content-between align-items-start gap-2 mb-2";

    const nombre =
      document.createElement("h3");

    nombre.className =
      "h6 m-0 fw-bold";

    nombre.textContent =
      punto.nombre;

    const zona =
      document.createElement("span");

    zona.className =
      "badge text-bg-success";

    zona.textContent =
      punto.zona;

    const horario =
      document.createElement("p");

    horario.className =
      "m-0 text-muted";

    horario.textContent =
      `Horario: ${punto.horario}`;

    encabezado.appendChild(nombre);
    encabezado.appendChild(zona);

    tarjeta.appendChild(encabezado);
    tarjeta.appendChild(horario);

    columna.appendChild(tarjeta);
    listaPuntos.appendChild(columna);
  }
}

function filtrarPuntos() {
  const criterio =
    normalizarTexto(filtroZona.value);

  if (!criterio) {
    renderPuntos(puntosRecoleccion);
    return;
  }

  const puntosFiltrados =
    puntosRecoleccion.filter((punto) => {

      const nombreNormalizado =
        normalizarTexto(punto.nombre);

      const zonaNormalizada =
        normalizarTexto(punto.zona);

      return (
        zonaNormalizada.includes(criterio) ||
        nombreNormalizado.includes(criterio)
      );
    });

  renderPuntos(puntosFiltrados);
}

filtrarBtn.addEventListener(
  "click",
  filtrarPuntos
);

filtroZona.addEventListener(
  "keydown",
  (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      filtrarPuntos();
    }
  }
);

/* --------------------------------------------------
   COMUNICACIÓN CON LA API
-------------------------------------------------- */

async function procesarRespuestaHttp(respuesta) {
  let contenido = null;

  try {
    contenido = await respuesta.json();
  } catch (error) {
    contenido = null;
  }

  if (!respuesta.ok) {
    const mensaje =
      contenido?.mensaje ||
      "No fue posible completar la solicitud.";

    throw new Error(mensaje);
  }

  return contenido;
}

function llenarSelect(
  select,
  elementos,
  propiedadId,
  propiedadNombre,
  textoInicial
) {
  select.innerHTML = "";

  const opcionInicial =
    document.createElement("option");

  opcionInicial.value = "";
  opcionInicial.textContent = textoInicial;
  opcionInicial.selected = true;

  select.appendChild(opcionInicial);

  for (const elemento of elementos) {
    const opcion =
      document.createElement("option");

    opcion.value =
      elemento[propiedadId];

    opcion.textContent =
      elemento[propiedadNombre];

    select.appendChild(opcion);
  }

  select.disabled =
    elementos.length === 0;
}

function mostrarMensajeReporte(
  tipo,
  texto
) {
  mensajeReporte.innerHTML = "";

  const mensaje =
    document.createElement("div");

  mensaje.className =
    tipo === "exito"
      ? "mensaje-ok"
      : "mensaje-error";

  mensaje.textContent = texto;

  mensajeReporte.appendChild(mensaje);
}

async function cargarCatalogos() {
  btnEnviarReporte.disabled = true;
  zonaSelect.disabled = true;
  tipoReporteSelect.disabled = true;

  try {
    const [
      respuestaZonas,
      respuestaTipos
    ] = await Promise.all([
      fetch(
        `${API_BASE_URL}/zonas`,
        {
          headers: {
            "Accept": "application/json"
          }
        }
      ),

      fetch(
        `${API_BASE_URL}/tipos-reporte`,
        {
          headers: {
            "Accept": "application/json"
          }
        }
      )
    ]);

    const zonas =
      await procesarRespuestaHttp(
        respuestaZonas
      );

    const tiposReporte =
      await procesarRespuestaHttp(
        respuestaTipos
      );

    llenarSelect(
      zonaSelect,
      zonas,
      "idZona",
      "nombreZona",
      "Seleccione una zona"
    );

    llenarSelect(
      tipoReporteSelect,
      tiposReporte,
      "idTipoReporte",
      "nombreTipo",
      "Seleccione un tipo de reporte"
    );

    const catalogosDisponibles =
      zonas.length > 0 &&
      tiposReporte.length > 0;

    btnEnviarReporte.disabled =
      !catalogosDisponibles;

    if (!catalogosDisponibles) {
      mostrarMensajeReporte(
        "error",
        "No existen zonas o tipos de reporte disponibles."
      );
    }
  } catch (error) {
    zonaSelect.innerHTML = `
      <option value="">
        No fue posible cargar las zonas
      </option>
    `;

    tipoReporteSelect.innerHTML = `
      <option value="">
        No fue posible cargar los tipos
      </option>
    `;

    mostrarMensajeReporte(
      "error",
      "No fue posible conectar con la API de EcoRuta. Verifica que Spring Boot esté encendido."
    );

    console.error(
      "Error al cargar los catálogos:",
      error
    );
  }
}

/* --------------------------------------------------
   REGISTRO DEL REPORTE
-------------------------------------------------- */

reporteForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    mensajeReporte.innerHTML = "";

    if (!reporteForm.checkValidity()) {
      reporteForm.reportValidity();
      return;
    }

    const textoOriginalBoton =
      btnEnviarReporte.textContent;

    btnEnviarReporte.disabled = true;

    btnEnviarReporte.textContent =
      "Enviando reporte...";

    const direccionReferencia =
      obtenerValorCampo(
        "direccionReferencia"
      );

    const evidenciaUrl =
      obtenerValorCampo(
        "evidenciaUrl"
      );

    const datosReporte = {
      nombreCompleto:
        obtenerValorCampo("nombre"),

      identificacion:
        obtenerValorCampo("identificacion"),

      contacto:
        obtenerValorCampo("contacto"),

      correoElectronico:
        obtenerValorCampo("correo"),

      idZona:
        Number(zonaSelect.value),

      idTipoReporte:
        Number(tipoReporteSelect.value),

      descripcion:
        obtenerValorCampo("descripcion"),

      direccionReferencia:
        direccionReferencia || null,

      evidenciaUrl:
        evidenciaUrl || null
    };

    try {
      const respuesta = await fetch(
        `${API_BASE_URL}/reportes`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "Accept":
              "application/json"
          },

          body:
            JSON.stringify(datosReporte)
        }
      );

      const reporteRegistrado =
        await procesarRespuestaHttp(
          respuesta
        );

      numeroReporte.textContent =
        reporteRegistrado.idReporte;

      mostrarMensajeReporte(
        "exito",
        `Reporte número ${reporteRegistrado.idReporte} registrado correctamente. Estado: ${reporteRegistrado.nombreEstadoReporte}.`
      );

      reporteForm.reset();
    } catch (error) {
      const mensaje =
        error instanceof TypeError
          ? "No fue posible conectar con la API. Verifica que Spring Boot esté encendido."
          : error.message;

      mostrarMensajeReporte(
        "error",
        mensaje
      );

      console.error(
        "Error al registrar el reporte:",
        error
      );
    } finally {
      btnEnviarReporte.disabled = false;

      btnEnviarReporte.textContent =
        textoOriginalBoton;
    }
  }
);

/* --------------------------------------------------
   CARGA INICIAL
-------------------------------------------------- */

btnEnviarReporte.disabled = true;

renderPuntos(
  puntosRecoleccion
);

cargarCatalogos();
