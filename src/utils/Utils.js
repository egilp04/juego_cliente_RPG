import { aplicarDescuento } from "../modules_game/Mercado.js";

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

export function encontrarProducto(listaProducto, indiceProducto) {
  return listaProducto[indiceProducto];
}
export function efectosVisuales() {
  console.log("efecto del boton, del color de la tarjeta");
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

export function modificarProductos() {
  //Método que permite modificar algo del producto, opcional por producto.nombre
  const producto = aplicarDescuento();
  console.log(producto);
  producto.forEach((producto, i) => {
    if (i == 0) {
      producto.precio = 10;
      producto.mascota = "teddy";
      producto.nombre = "Espadeve";
    }
  });

  return producto;
}

function formatarDinero(precioNum) {
  const precio = (precioNum / 100).toFixed(2).replace(".", ",") + "€";
  return precio;
}

export function actualizarDinero(jugador) {
  console.log(jugador.dinero);
  console.log(jugador);
  document.querySelector(".dinero-comprar").textContent = `${formatarDinero(
    jugador.dinero
  )}`;
}
