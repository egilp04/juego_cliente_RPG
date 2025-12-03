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
  if (id === "seccion-4" || id === "seccion-6" || id === "seccion-7")
    footer.style.display = "none";
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

function castObjt(obj) {}

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

//Resultados
export function guardarResultados(resultado) {
  updateCookie("jugador-resultados-anteriores", resultado);
  createStorageResultados("jugador-resultados-anteriores", resultado);
}
function createStorageResultados(name, resultado) {
  let datosNuevos = [];
  const datosAnteriores = localStorage.getItem(name);
  if (datosAnteriores) {
    datosNuevos = JSON.parse(datosAnteriores);
  }
  //el push no se puede meter dentro, siempre devuelve la length del array
  datosNuevos.push(resultado);
  localStorage.setItem(name, JSON.stringify(datosNuevos));
}

export function verResultadosAnteriores() {
  const cookie = getCookie("jugador-resultados-anteriores");
  if (!cookie) return null;
  return JSON.parse(cookie);
}

function updateCookie(name, newData, jsonAttributes = {}) {
  let newDataObj = [newData];
  let oldCookieData = [];
  let currentCookieData = getCookie(name);
  if (!currentCookieData) {
    createNewCookie(name, newDataObj);
  } else {
    oldCookieData = JSON.parse(currentCookieData);
    const updatedObj = [...oldCookieData, ...newDataObj];
    createNewCookie(name, updatedObj);
  }
}

function createNewCookie(name, value, cookieAttributes = {}) {
  cookieAttributes = {
    path: "/",
    ...cookieAttributes,
  };
  if (cookieAttributes.expires instanceof Date) {
    cookieAttributes.expires = cookieAttributes.expires.toUTCString();
  }
  let newCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(JSON.stringify(value));
  for (let attributeKey in cookieAttributes) {
    newCookie += "; " + attributeKey;
    let attributeValue = cookieAttributes[attributeKey];
    if (attributeValue !== true) {
      newCookie += "=" + attributeValue;
    }
  }
  document.cookie = newCookie;
}
