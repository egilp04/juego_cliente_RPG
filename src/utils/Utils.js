import {
  aplicarDescuento,
  buscarProductoNombre,
} from "../modules_game/Mercado.js";

export function mostrarSeccion(id) {
  mostrarFooter(id);
  const secciones = Array.from(document.querySelectorAll(".seccion"));
  secciones.forEach((seccion) => {
    seccion.style.display = "none";
  });

  const seccionMostrar = document.getElementById(id);
  seccionMostrar.style.display = "";
}

function mostrarFooter(id) {
  const footer = document.querySelector("footer");
  if (id === "seccion-4" || id === "seccion-6") footer.style.display = "none";
  else footer.style.display = "";
}

/**
 * Reiniciar todos los elementos de la UI
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

  //Quitar listeners antiguos, sino se duplican y atienden a los elementos antiguos y nuevos
  document.querySelectorAll("button").forEach((btn) => {
    const nuevo = btn.cloneNode(true);
    btn.replaceWith(nuevo);
  });
}

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

  void divJugadorAnimacion.offsetWidth;
  void divEnemigoAnimacion.offsetWidth;

  divJugadorAnimacion.classList.add("animate-move-left");
  divEnemigoAnimacion.classList.add("animate-move-right");
  jugadorImg.classList.add("appear");
  enemigoImg.classList.add("appear");
}

export function modificarProducto(producto, dato, valor) {
  productoNuevo = { ...producto, dato: valor };
  console.log(productoNuevo);
  return productoNuevo;
}

export function encontrarIndiceProducto(producto, listaProducto) {
  const index = listaProducto.indexOf(producto);
  return index;
}

export function encontrarProducto(index, listaProducto) {}

export function reiniciarMercado() {
  const mercado = document.querySelector(".mercado-container");
  if (mercado) mercado.innerHTML = "";

  document.querySelectorAll(".mercado-container button").forEach((btn) => {
    const nuevo = btn.cloneNode(true);
    btn.replaceWith(nuevo);
  });
}

export function nombreTipoNuevo(nombre) {
  const nombreCompleto = nombre.split(" ");
  console.log(nombreCompleto);
  if (nombreCompleto.length > 1)
    return `${nombreCompleto[0]}_${nombreCompleto[1]}`;
  else return nombreCompleto[0];
}
