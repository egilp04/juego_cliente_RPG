import { Cazador } from "./classes/indexJugadores.js";
import {
  Goblin,
  Bandido,
  Dragon,
  Lobo,
  Jefe,
} from "./classes/indexEnemigos.js";
import {
  avatarCazador,
  avatarGoblin,
  avatarBandido,
  avatarDragon,
  avatarLobo,
  avatarJefe,
} from "./constants/Constants.js";

import { combate } from "./modules_game/Batalla.js";
import { distinguirJugador } from "./modules_game/Ranking.js";
import {
  filtrarProductos,
  aplicarDescuento,
  buscarProductoNombre,
} from "./modules_game/Mercado.js";

window.addEventListener("load", iniciarJuego);

function iniciarJuego(e) {
  const seccion1 = document.getElementById("seccion-1");
  mostrarSeccion(seccion1.id);
  seccion1Function(seccion1);
}

// funciones de las secciones
function seccion1Function(seccion1) {
  const jugador = new Cazador("Cazador", 30, avatarCazador, 50, 30);
  datosJugador(jugador, seccion1.id);
  const boton = seccion1.querySelector(".continuar");
  boton.addEventListener("click", (e) => {
    const seccion2 = document.getElementById("seccion-2");
    mostrarSeccion(seccion2.id);
    seccion2Function(seccion2, jugador);
  });
}

function seccion2Function(seccion2, jugador) {
  document.getElementById("title").textContent = "Mercado Negro";
  const mercadoContainer = document.getElementById("mercado-container");
  // mercado productos
  const productosComprar = aplicarDescuento();

  productosComprar.forEach((producto) => {
    const divProducto = document.createElement("div");
    const idProducto = producto.nombre.replace(/\s+/g, "_").toLowerCase();
    divProducto.setAttribute("class", "producto");
    divProducto.setAttribute("id", `${idProducto}`);

    const divImgProducto = document.createElement("div");
    divImgProducto.setAttribute("id", "img-producto-container");
    const imgProducto = document.createElement("img");
    imgProducto.setAttribute("id", "img-producto");
    imgProducto.setAttribute("src", `${producto.imagen}`);

    const divDataProducto = document.createElement("div");
    divDataProducto.setAttribute("id", "data-producto-container");

    const spanNombreProducto = document.createElement("span");
    spanNombreProducto.textContent = `${producto.nombre}`;

    const spanBonusProducto = document.createElement("span");
    const tipoProducto = `${producto.tipo}`;
    spanBonusProducto.textContent = `${estadisticaAportaArma(tipoProducto)}: ${
      producto.bonus
    }`;

    const spanPrecioProducto = document.createElement("span");
    spanPrecioProducto.textContent = `${producto.precio}`;

    const botonComprar = document.createElement("button");
    botonComprar.setAttribute("class", "comprar-button");
    botonComprar.setAttribute("class", "comprar");
    const idBotonIndex = productosComprar.indexOf(producto);
    botonComprar.setAttribute("id", `${idBotonIndex}`);
    botonComprar.textContent = "Añadir";

    botonComprar.addEventListener("click", (e) => {
      const indexProducto = parseInt(e.currentTarget.id);
      const MAX_INVENTARIO = 6;
      const productoSeleccionado = encontrarProducto(
        productosComprar,
        indexProducto
      );

      if (botonComprar.classList.contains("comprar")) {
        if (jugador.inventario.length >= MAX_INVENTARIO) {
          console.warn("Inventario lleno. No se puede comprar más.");
          return;
        }
        jugador.addObjInventario(productoSeleccionado);
        botonComprar.classList.remove("comprar");
        botonComprar.textContent = "retirar";
        efectosVisuales();
      } else {
        jugador.eliminarObjInventario(productoSeleccionado);
        botonComprar.classList.add("comprar");
        botonComprar.textContent = "Añadir";
        efectosVisuales();
      }

      rellenarCasillas(jugador);
    });

    divImgProducto.appendChild(imgProducto);
    divProducto.appendChild(divImgProducto);
    divDataProducto.appendChild(spanNombreProducto);
    divDataProducto.appendChild(spanBonusProducto);
    divDataProducto.appendChild(spanPrecioProducto);
    divProducto.appendChild(divDataProducto);
    divProducto.appendChild(botonComprar);
    mercadoContainer.appendChild(divProducto);
  });

  const boton = seccion2.querySelector(".continuar");
  boton.addEventListener("click", (e) => {
    const seccion3 = document.getElementById("seccion-3");
    mostrarSeccion(seccion3.id);
    seccion3Function(seccion3, jugador);
  });
}

function seccion3Function(seccion3, jugador) {
  datosJugador(jugador, seccion3.id);
  const boton = seccion3.querySelector(".continuar");
  boton.addEventListener("click", (e) => {
    const seccion4 = document.getElementById("seccion-4");
    mostrarSeccion(seccion4.id);
    seccion4Function(seccion4, jugador);
  });
}

function seccion4Function(seccion4, jugador) {
  const enemigos = [
    new Goblin("Goblin", avatarGoblin, 6, 30),
    new Lobo("Lobo", avatarLobo, 9, 42),
    new Dragon("Dragon", avatarDragon, 28, 140, "aliento Igeno"),
    new Bandido("Bandido", avatarBandido, 12, 55),
    new Jefe("Jefe", avatarJefe, 12, 55),
  ];
  const divEnemigosContainer = document.getElementById("enemigos-container");

  enemigos.forEach((enemigo, i) => {
    const divEnemigo = document.createElement("div");
    divEnemigo.setAttribute("class", "enemigo-container");

    const divImagenEnemigo = document.createElement("div");
    divImagenEnemigo.setAttribute("class", "imagen-enemigo-container");
    const imagenEnemigo = document.createElement("img");
    imagenEnemigo.setAttribute("src", `${enemigo.avatar}`);
    divImagenEnemigo.appendChild(imagenEnemigo);
    divEnemigo.appendChild(divImagenEnemigo);

    const divDataEnemigo = document.createElement("div");
    divDataEnemigo.setAttribute("class", "enemigo-data-container");
    const spanNombreEnemigo = document.createElement("span");
    spanNombreEnemigo.textContent = `${enemigo.nombre}`;
    const spanPuntosEnemigo = document.createElement("span");
    spanPuntosEnemigo.textContent = `${enemigo.ataque} puntos de ataque`;
    divDataEnemigo.appendChild(spanNombreEnemigo);
    divDataEnemigo.appendChild(spanPuntosEnemigo);
    divEnemigo.appendChild(divDataEnemigo);

    divEnemigosContainer.appendChild(divEnemigo);
  });

  const boton = seccion4.querySelector(".continuar");
  boton.addEventListener("click", (e) => {
    const seccion5 = document.getElementById("seccion-5");
    mostrarSeccion(seccion5.id);
    seccion5Function(seccion5, jugador, enemigos);
  });
}

function seccion5Function(seccion5, jugador, enemigos) {
  document.getElementById("title").textContent = "Combate";
  const enemigo = enemigos[Math.floor(Math.random() * enemigos.length)];
  const { ganador, puntos } = combate(enemigo, jugador);
  document
    .getElementById("jugador-imagen")
    .setAttribute("src", `${jugador.avatar}`);
  document
    .getElementById("enemigo-imagen")
    .setAttribute("src", `${enemigo.avatar}`);
  document
    .getElementById("resultados-container")
    .querySelector("h2").textContent = `Ganador: ${ganador.nombre}`;
  document
    .getElementById("resultados-container")
    .querySelector("p").textContent = `Puntos Obtenidos: ${puntos}`;

  const boton = seccion5.querySelector(".continuar");
  boton.addEventListener("click", (e) => {
    const seccion6 = document.getElementById("seccion-6");
    mostrarSeccion(seccion6.id);
    seccion6Function(seccion6, puntos);
  });
}

function seccion6Function(seccion6, puntuacion) {
  document.getElementById("title").textContent = "Resultado Final";
  const spanRanking = document.getElementById("ranking-data");
  spanRanking.textContent = `El jugador ha logrado ser un: ${distinguirJugador(
    puntuacion
  )}`;
  const spanPuntuacion = document.getElementById("puntuacion-data");
  spanPuntuacion.textContent = `Puntos totales: ${puntuacion}`;

  const boton = seccion6.querySelector(".reiniciar");
  boton.addEventListener("click", (e) => {
    const seccion1 = document.getElementById("seccion-1");
    mostrarSeccion(seccion1.id);
    seccion1Function(seccion1);
  });
}

// Datos a mostrar
function mostrarSeccion(id) {
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

function datosJugador(jugador, seccionid) {
  let { ataqueTotal, defensaTotal, vidaTotal } =
    jugador.obtenerEstadisticasFinales();

  document.getElementById("title").textContent = "Aventura JS";
  document
    .getElementById(`imagen-jugador-${seccionid}`)
    .setAttribute("src", `${jugador.avatar}`);
  document
    .getElementById(`nombre-jugador-container-${seccionid}`)
    .querySelector("h2").textContent = `${jugador.nombre}`;
  const valores = Array.from(document.querySelectorAll(`.valor-${seccionid}`));
  const valoresJugador = [ataqueTotal, defensaTotal, vidaTotal, jugador.puntos];
  valores.forEach((valor, i) => {
    valor.textContent = `${valoresJugador[i]}`;
  });
}
function encontrarProducto(listaProducto, indiceProducto) {
  return listaProducto[indiceProducto];
}
function estadisticaAportaArma(tipoArma) {
  switch (tipoArma) {
    case "arma":
      return "Ataque";
    case "armadura":
      return "Defensa";
    case "consumible":
      return "Vida";
    default:
      break;
  }
}
function rellenarCasillas(jugador) {
  const inventario = jugador.inventario;
  const casillas = Array.from(document.querySelectorAll(".casilla"));
  casillas.forEach((casilla, i) => {
    casilla.innerHTML = "";
    const imagenProdcutoDiv = document.createElement("div");
    imagenProdcutoDiv.setAttribute("id", `${i}`);
    const imagenProducto = document.createElement("img");
    const producto = inventario[i];
    if (producto) {
      const src = producto.imagen;
      imagenProducto.setAttribute("src", `${src}`);
      imagenProdcutoDiv.appendChild(imagenProducto);
      casilla.appendChild(imagenProdcutoDiv);
    }
  });
}
function efectosVisuales() {
  console.log("efecto del boton, del color de la tarjeta");
}
