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

/**
 * Reiniciar todos los elementos de la UI
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

export function verInventarioAnterior() {
  let cookieInventario = getCookie("jugador-inventario");
  if (!cookieInventario) return null;
  // console.log(typeof cookieInventario);
  const inventarioAnterior = JSON.parse(cookieInventario);
  return inventarioAnterior;
}

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function castObjt(obj) {
  
}

export function guardarInventario(inventarioJugador) {
  if (inventarioJugador.length > 0) {
    createNewCookieInventario("jugador-inventario", inventarioJugador);
    createStorageInventario("jugador-inventario", inventarioJugador);
  }
}
function createStorageInventario(name, value) {
  localStorage.setItem(name, propiedadesSinBarra(JSON.stringify(value)));
}

function createNewCookieInventario(name, value, cookieAttributes = {}) {
  cookieAttributes = {
    path: "/",
    ...cookieAttributes,
  };
  if (cookieAttributes.expires instanceof Date) {
    cookieAttributes.expires = cookieAttributes.expires.toUTCString();
  }
  let newCookie =
    encodeURIComponent(name) +
    "=" +
    encodeURIComponent(propiedadesSinBarra(JSON.stringify(value)));
  for (let attributeKey in cookieAttributes) {
    newCookie += "; " + attributeKey;
    let attributeValue = cookieAttributes[attributeKey];
    if (attributeValue !== true) {
      newCookie += "=" + attributeValue;
    }
  }
  document.cookie = newCookie;
}

function propiedadesSinBarra(data) {
  return data.replace(/\_/gi, "");
}

export function filtrarNombre() {}

export function filtrarRareza() {}
