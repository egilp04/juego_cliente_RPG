/**
 * Muestra una sección específica por su ID y oculta las demás.
 * @param {string} id - ID de la sección a mostrar.
 */
export function mostrarSeccion(id) {
  mostrarFooter(id);
  const secciones = Array.from(document.querySelectorAll(".seccion"));
  secciones.forEach((seccion) => {
    seccion.style.display = "none";
  });

  const seccionMostrar = document.getElementById(id);
  seccionMostrar.style.display = "";
}

/**
 * Muestra u oculta el footer dependiendo de la sección actual.
 * @param {string} id - ID de la sección actual.
 */
function mostrarFooter(id) {
  const footer = document.querySelector("footer");
  if (id === "seccion-4" || id === "seccion-6" || id === "seccion-0")
    footer.style.display = "none";
  else footer.style.display = "";
}

/**
 * Obtiene un producto de una lista por su índice.
 * @param {Array} listaProducto - Lista de productos.
 * @param {number} indiceProducto - Índice del producto a buscar.
 * @returns {*} El producto encontrado.
 */
export function encontrarProducto(listaProducto, indiceProducto) {
  return listaProducto[indiceProducto];
}

/**
 * Reinicia todos los elementos de la interfaz del juego, limpiando contenido y reseteando eventos.
 */
export function reiniciarJuego() {
  const casillas = Array.from(document.querySelectorAll(".casilla"));
  casillas.forEach((casilla) => {
    casilla.innerHTML = "";
  });

  const mercado = document.querySelector(".mercado-container");
  if (mercado) {
    mercado.innerHTML = "";
    mercado.scrollTop = 0;
  }

  const divEnemigosContainer = document.querySelector(".enemigos-container");
  if (divEnemigosContainer) divEnemigosContainer.innerHTML = "";

  const resumenBatallas = document.querySelector(".resumen-batallas");
  if (resumenBatallas) resumenBatallas.innerHTML = "";

  // Elimina listeners antiguos duplicados clonando los botones.
  document.querySelectorAll("button").forEach((btn) => {
    const nuevo = btn.cloneNode(true);
    btn.replaceWith(nuevo);
  });

  const formularioRegistro = document.querySelector(".formulario-personaje");
  formularioRegistro.reset();

  document.querySelectorAll("form").forEach((form) => {
    const nuevo = form.cloneNode(true);
    form.replaceWith(nuevo);
  });
}

/**
 * Ejecuta las animaciones de ataque entre jugador y enemigo.
 * Reinicia animaciones previas para permitir reproducirlas nuevamente.
 */
export function batallaAnimacionAleatoria() {
  const divJugadorAnimacion = document.querySelector(
    ".jugador-imagen-container"
  );
  const divEnemigoAnimacion = document.querySelector(
    ".enemigo-imagen-container"
  );

  const jugadorImg = document.querySelector(".enemigo-imagen");
  const enemigoImg = document.querySelector(".jugador-imagen");

  divJugadorAnimacion.classList.remove("animate-move-left");
  divEnemigoAnimacion.classList.remove("animate-move-right");
  jugadorImg.classList.remove("appear");
  enemigoImg.classList.remove("appear");

  // Reinicia las animaciones forzando reflow.
  void divJugadorAnimacion.offsetWidth;
  void divEnemigoAnimacion.offsetWidth;

  divJugadorAnimacion.classList.add("animate-move-left");
  divEnemigoAnimacion.classList.add("animate-move-right");
  jugadorImg.classList.add("appear");
  enemigoImg.classList.add("appear");
}

export function comprobaregistro(nombre, ataque, defensa, vida) {
  if (
    !nombre ||
    nombre.trim() === "" ||
    !ataque ||
    ataque.trim() === "" ||
    !defensa ||
    defensa.trim() === "" ||
    !vida ||
    vida.trim() === ""
  )
    return false;

  const regexNombre = /^[A-Z]([a-z]|[A-Z]|\s){0,19}$/;
  let cantidadMaxima = 110;
  let cantidadTotal =
    parseInt(ataque) + (parseInt(vida) + 100) + parseInt(defensa);
  if (!regexNombre.test(nombre)) return false;
  if (cantidadTotal > cantidadMaxima) return false;
  return true;
}

export function mostrarDinero(jugador, precioNuevo = 0, operacion = "ninguna") {
  let dineroJugador = jugador.dinero;
  switch (operacion) {
    case "suma":
      dineroJugador = jugador.dinero + precioNuevo;
      jugador.dinero = dineroJugador;
      break;
    case "resta":
      dineroJugador = jugador.dinero - precioNuevo;
      jugador.dinero = dineroJugador;
      break;
  }
  const dineroSpan = document.querySelector(".dinero-jugador");
  dineroSpan.textContent = `${dineroJugador}€`;
}

export function guardarDatosJugador(ganador) {
  let data = [];
  let puntuacionesGuardadas = localStorage.getItem("puntuaciones");
  if (puntuacionesGuardadas) {
    data = JSON.parse(puntuacionesGuardadas);
  }
  data.push({
    nombre: ganador.nombre,
    puntuacion: ganador.puntos,
    monedas: ganador.dinero,
  });
  localStorage.setItem("puntuaciones", JSON.stringify(data));
}
