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
  if (id === "seccion-4" || id === "seccion-6") footer.style.display = "none";
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
  if (mercado) mercado.innerHTML = "";

  const divEnemigosContainer = document.querySelector(".enemigos-container");
  if (divEnemigosContainer) divEnemigosContainer.innerHTML = "";

  const resumenBatallas = document.querySelector(".resumen-batallas");
  if (resumenBatallas) resumenBatallas.innerHTML = "";

  // Elimina listeners antiguos duplicados clonando los botones.
  document.querySelectorAll("button").forEach((btn) => {
    const nuevo = btn.cloneNode(true);
    btn.replaceWith(nuevo);
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
