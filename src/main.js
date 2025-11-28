// ====================
// IMPORTACIONES
// ====================
// Clases de jugadores y enemigos y productos
import { Cazador } from "./classes/indexJugadores.js";
import {
  Goblin,
  Bandido,
  Dragon,
  Lobo,
  Jefe,
} from "./classes/indexEnemigos.js";
import { Enemigo } from "./classes/enemigos/Enemigo.js";
import { Producto } from "././classes/productos/Producto.js";
// Avatares de los personajes
import {
  avatarCazador,
  avatarGoblin,
  avatarBandido,
  avatarDragon,
  avatarLobo,
  avatarJefe,
} from "./constants/Constants.js";

// Funciones de combate y ranking
import { combate } from "./modules_game/Batalla.js";
import { distinguirJugador } from "./modules_game/Ranking.js";

// Utilidades para UI y manipulación DOM
import {
  mostrarSeccion,
  encontrarProducto,
  reiniciarJuego,
  batallaAnimacionAleatoria,
} from "./utils/Utils.js";

// Funciones para gestión de productos y mercado
import {
  filtrarProductos,
  aplicarDescuento,
  buscarProductoNombre,
} from "./modules_game/Mercado.js";

// EVENTO DE INICIO
/**
 * Inicia el juego al cargar la ventana
 * @param {Event} e - Evento de carga
 */
window.addEventListener("load", iniciarJuego);

/**
 * Función principal para iniciar el juego.
 * Muestra la primera sección y configura el jugador inicial.
 * @param {Event} e - Evento de carga de la ventana
 */
function iniciarJuego(e) {
  const seccion1 = document.getElementById("seccion-1");
  mostrarSeccion(seccion1.id);
  seccion1Function(seccion1);
}

// SECCIÓN 1: Datos del jugador
/**
 * Configura la sección 1 y crea un jugador inicial.
 * @param {HTMLElement} seccion1 - Contenedor de la sección 1
 */
function seccion1Function(seccion1) {
  const jugador = new Cazador("Cazador", 10, avatarCazador, 10, 10);
  datosJugador(jugador, seccion1.id);
  const boton = seccion1.querySelector(".continuar");
  boton.addEventListener("click", (e) => {
    const seccion2 = document.getElementById("seccion-2");
    mostrarSeccion(seccion2.id);
    seccion2Function(seccion2, jugador);
  });
}

// SECCIÓN 2: Mercado
/**
 * Renderiza el mercado, mostrando productos y permitiendo añadirlos al inventario.
 * @param {HTMLElement} seccion2 - Contenedor de la sección 2
 * @param {Jugador} jugador - Instancia del jugador
 */
function seccion2Function(seccion2, jugador) {
  document.getElementById("title").textContent = "Mercado Negro";
  const mercadoContainer = document.querySelector(".mercado-container");
  const productosComprar = aplicarDescuento();

  productosComprar.forEach((producto) => {
    const divProducto = document.createElement("div");
    const idProducto = producto.nombre.replace(/\s+/g, "_").toLowerCase();
    divProducto.setAttribute("class", "producto tarjeta");
    divProducto.setAttribute("id", `${idProducto}`);

    // Imagen del producto
    const divImgProducto = document.createElement("div");
    divImgProducto.setAttribute("class", "img-producto-container");
    const imgProducto = document.createElement("img");
    imgProducto.setAttribute("id", "img-producto");
    imgProducto.setAttribute("src", `${producto.imagen}`);
    divImgProducto.appendChild(imgProducto);

    // Datos del producto
    const divDataProducto = document.createElement("div");
    divDataProducto.setAttribute("class", "data-producto-container");
    const spanNombreProducto = document.createElement("span");
    spanNombreProducto.textContent = `${producto.nombre}`;
    const spanBonusProducto = document.createElement("span");
    spanBonusProducto.textContent = `${estadisticaAportaArma(producto.tipo)}: ${
      producto.bonus
    }`;
    const spanPrecioProducto = document.createElement("span");
    spanPrecioProducto.textContent = `Precio. ${producto.formatearAtributos(
      producto.precio
    )}`;
    divDataProducto.appendChild(spanNombreProducto);
    divDataProducto.appendChild(spanBonusProducto);
    divDataProducto.appendChild(spanPrecioProducto);

    const botonComprar = document.createElement("button");
    botonComprar.setAttribute("class", "comprar");
    botonComprar.textContent = "Añadir";
    botonComprar.addEventListener("click", (e) => {
      const MAX_INVENTARIO = 6;

      if (botonComprar.classList.contains("comprar")) {
        // Añadir al inventario si no está lleno
        if (jugador.inventario.length >= MAX_INVENTARIO) return;
        jugador.addObjInventario(producto);
        const productoTarjeta = botonComprar.closest(".producto");
        const colorAntiguo = productoTarjeta.style.backgroundColor;
        productoTarjeta.style.backgroundColor = "#edefc9ff";
        setTimeout(() => {
          productoTarjeta.style.backgroundColor = colorAntiguo;
        }, 250);
        botonComprar.textContent = "Gracias!😁";
        botonComprar.classList.remove("comprar");
        botonComprar.classList.add("retirar");
        setTimeout(() => {
          botonComprar.textContent = "retirar";
        }, 500);
      } else {
        // Retirar del inventario
        jugador.eliminarObjInventario(producto);
        botonComprar.classList.remove("retirar");
        botonComprar.classList.add("comprar");
        botonComprar.textContent = "😭";
        setTimeout(() => {
          botonComprar.textContent = "Añadir";
        }, 500);
      }
      rellenarCasillas(jugador);
    });

    divProducto.appendChild(divImgProducto);
    divProducto.appendChild(divDataProducto);
    divProducto.appendChild(botonComprar);

    mercadoContainer.appendChild(divProducto);
  });

  // Continuar a sección 3
  const boton = seccion2.querySelector(".continuar");
  boton.addEventListener("click", () => {
    const seccion3 = document.getElementById("seccion-3");
    mostrarSeccion(seccion3.id);
    seccion3Function(seccion3, jugador);
  });
}

/**
 * Maneja la compra y retirada de un producto del inventario.
 * @param {Jugador} jugador - Jugador
 * @param {Producto} producto - Producto a comprar o retirar
 * @param {HTMLButtonElement} botonComprar - Botón presionado
 */
function manejarCompra(jugador, producto, botonComprar) {
  const MAX_INVENTARIO = 6;

  if (botonComprar.classList.contains("comprar")) {
    // Añadir al inventario
    if (jugador.inventario.length >= MAX_INVENTARIO) return;
    jugador.addObjInventario(producto);
    botonComprar.textContent = "Gracias!😁";
    botonComprar.classList.replace("comprar", "retirar");
    setTimeout(() => (botonComprar.textContent = "retirar"), 500);
  } else {
    // Retirar del inventario
    jugador.eliminarObjInventario(producto);
    botonComprar.classList.replace("retirar", "comprar");
    botonComprar.textContent = "😭";
    setTimeout(() => (botonComprar.textContent = "Añadir"), 500);
  }
  rellenarCasillas(jugador);
}

/**
 * Determina qué estadística aporta un producto según su tipo
 * @param {string} tipoArma - Tipo del producto (arma, armadura, consumible)
 * @returns {string} Nombre de la estadística que modifica
 */
function estadisticaAportaArma(tipoArma) {
  switch (tipoArma) {
    case "arma":
      return "Ataque";
    case "armadura":
      return "Defensa";
    case "consumible":
      return "Vida";
    default:
      return "";
  }
}

// SECCIÓN 3
/**
 * Muestra las estadísticas del jugador antes del combate.
 * @param {HTMLElement} seccion3
 * @param {Jugador} jugador
 */
function seccion3Function(seccion3, jugador) {
  datosJugador(jugador, seccion3.id);
  const boton = seccion3.querySelector(".continuar");
  boton.addEventListener("click", () => {
    const seccion4 = document.getElementById("seccion-4");
    mostrarSeccion(seccion4.id);
    seccion4Function(seccion4, jugador);
  });
}

// SECCIÓN 4
/**
 * Renderiza los enemigos disponibles y pasa al combate.
 * @param {HTMLElement} seccion4
 * @param {Jugador} jugador
 */
function seccion4Function(seccion4, jugador) {
  const enemigos = [
    new Goblin("Goblin", avatarGoblin, 6, 30),
    new Lobo("Lobo", avatarLobo, 9, 42),
    new Dragon("Dragon", avatarDragon, 28, 140, "aliento Igeno"),
    new Bandido("Bandido", avatarBandido, 12, 50),
    new Jefe("Jefe", avatarJefe, 20, 55),
  ];

  const divEnemigosContainer = document.querySelector(".enemigos-container");
  enemigos.forEach((enemigo) => {
    const divEnemigo = document.createElement("div");
    divEnemigo.setAttribute("class", "enemigo-container enemigo-tarjeta");

    const divImagen = document.createElement("div");
    divImagen.setAttribute("class", "imagen-enemigo-container");
    const img = document.createElement("img");
    img.setAttribute("src", enemigo.avatar);
    divImagen.appendChild(img);

    const divData = document.createElement("div");
    divData.setAttribute("class", "enemigo-data-container");
    const spanNombre = document.createElement("span");
    spanNombre.textContent = enemigo.nombre;
    const spanPuntos = document.createElement("span");
    spanPuntos.textContent = `${enemigo.ataque} puntos de ataque`;
    const spanVida = document.createElement("span");
    spanVida.textContent = `${enemigo.hp} hp (vida)`;

    divData.appendChild(spanNombre);
    divData.appendChild(spanPuntos);
    divData.appendChild(spanVida);

    divEnemigo.appendChild(divImagen);
    divEnemigo.appendChild(divData);

    divEnemigosContainer.appendChild(divEnemigo);
  });

  const boton = seccion4.querySelector(".continuar");
  boton.addEventListener("click", () => {
    const seccion5 = document.getElementById("seccion-5");
    mostrarSeccion(seccion5.id);
    seccion5Function(seccion5, jugador, enemigos);
  });
}

// SECCIÓN 5: Combate
/**
 * Simula el combate entre jugador y enemigo.
 * @param {HTMLElement} seccion5
 * @param {Jugador} jugador
 * @param {Enemigo[]} enemigos
 */
function seccion5Function(seccion5, jugador, enemigos) {
  const boton = seccion5.querySelector(".continuar");
  boton.disabled = true;
  const resumenBatallas = document.querySelector(".resumen-batallas");
  const resultadosContainer = document.querySelector(".resultados-container");
  resumenBatallas.style.opacity = "0";
  resultadosContainer.style.opacity = "0";
  batallaAnimacionAleatoria();

  document.getElementById("title").textContent = "Combate";
  const enemigo = enemigos[Math.floor(Math.random() * enemigos.length)];

  const { ganador, puntos, resultadoBatallas } = combate(enemigo, jugador);

  document.querySelector(".jugador-imagen").setAttribute("src", jugador.avatar);
  document.querySelector(".enemigo-imagen").setAttribute("src", enemigo.avatar);
  document
    .querySelector(".resultados-container")
    .querySelector("h2").textContent = `Ganador: ${ganador.nombre}`;
  document
    .querySelector(".resultados-container")
    .querySelector("p").textContent = `Puntos Obtenidos: ${puntos}`;

  setTimeout(() => {
    resumenBatallas.style.opacity = "1";
    resultadosContainer.style.opacity = "1";
  }, 3000);

  resultadoBatallas.forEach((resultado, i) => {
    const divBatalla = document.createElement("div");
    divBatalla.setAttribute("class", "batallita-container");
    const turno = document.createElement("span");
    turno.textContent = `Batalla ${i + 1}`;

    const atacante = document.createElement("span");
    atacante.textContent = `Atacante: ${resultado.atacante}`;
    const atacado = document.createElement("span");
    atacado.textContent = `Atacado: ${resultado.atacado}`;
    const danio = document.createElement("span");
    danio.textContent = `Daño recibido: ${resultado.danioRecibido}`;
    const vidaJugador = document.createElement("span");
    vidaJugador.textContent = `Vida jugador: ${resultado.vidaJugadorTotal}`;
    const vidaEnemigo = document.createElement("span");
    vidaEnemigo.textContent = `Vida enemigo: ${resultado.vidaEnemigoTotal}`;

    divBatalla.appendChild(turno);
    divBatalla.appendChild(atacante);
    divBatalla.appendChild(atacado);
    divBatalla.appendChild(danio);
    divBatalla.appendChild(vidaJugador);
    divBatalla.appendChild(vidaEnemigo);

    resumenBatallas.appendChild(divBatalla);
  });

  setTimeout(() => {
    boton.disabled = false;
  }, 3500);

  boton.addEventListener("click", () => {
    const seccion6 = document.getElementById("seccion-6");
    mostrarSeccion(seccion6.id);
    seccion6Function(seccion6, puntos, ganador);
  });
}

/**
 * Muestra los resultados finales y ranking.
 * @param {HTMLElement} seccion6
 * @param {number} puntuacion
 * @param {Jugador|Enemigo} ganador
 */
function seccion6Function(seccion6, puntuacion, ganador) {
  const loserDiv = document.querySelector(".loser");
  loserDiv.style.visibility = "hidden";

  document.getElementById("title").textContent = "Resultado Final";
  const spanRanking = document.querySelector(".ranking-data");
  const spanPuntuacion = document.querySelector(".puntuacion-data");
  const boton = seccion6.querySelector(".reiniciar");
  boton.disabled = true;

  if (ganador instanceof Enemigo) {
    spanRanking.textContent = `El jugador ha perdido`;
    spanPuntuacion.textContent = `¡Vuelve a intentarlo!`;
    loserDiv.style.visibility = "visible";
    loserDiv.style.display = "block";
  } else {
    var heart = confetti.shapeFromPath({
      path: "M10 30 A20 20 0 0 1 50 30 A20 20 0 0 1 90 30 Q90 60 50 90 Q10 60 10 30 Z",
    });
    confetti({
      shapes: [heart],
      startVelocity: 30,
      spread: 80,
      particleCount: 200,
    });
    spanRanking.textContent = `El jugador ha logrado ser un: ${distinguirJugador(
      puntuacion
    )}`;
    spanPuntuacion.textContent = `Puntos totales: ${puntuacion}`;
  }

  setTimeout(() => {
    boton.disabled = false;
  }, 3000);

  boton.addEventListener("click", () => {
    const seccion1 = document.getElementById("seccion-1");
    reiniciarJuego();
    mostrarSeccion(seccion1.id);
    seccion1Function(seccion1);
  });
}

/**
 * Muestra los datos finales del jugador en la UI.
 * @param {Jugador} jugador
 * @param {string} seccionid
 */
function datosJugador(jugador, seccionid) {
  let { ataqueTotal, defensaTotal, vidaTotal } =
    jugador.obtenerEstadisticasFinales();

  document.getElementById("title").textContent = "Aventura JS";
  document
    .querySelector(`.imagen-jugador-${seccionid}`)
    .setAttribute("src", jugador.avatar);
  document
    .querySelector(`.nombre-jugador-container-${seccionid}`)
    .querySelector("h2").textContent = jugador.nombre;

  const valores = Array.from(document.querySelectorAll(`.valor-${seccionid}`));
  const valoresJugador = [ataqueTotal, defensaTotal, vidaTotal, jugador.puntos];
  valores.forEach((valor, i) => {
    valor.textContent = `${valoresJugador[i]}`;
  });
}

/**
 * Rellena las casillas de inventario en la UI
 * @param {Jugador} jugador - Instancia del jugador
 */
function rellenarCasillas(jugador) {
  const inventario = jugador.inventario;
  const casillas = Array.from(document.querySelectorAll(".casilla"));
  casillas.forEach((casilla, i) => {
    casilla.innerHTML = "";
    const producto = inventario[i];
    if (producto) {
      const divCasillas = document.createElement("div");
      divCasillas.setAttribute("class", "img-casilla-container");
      divCasillas.style.width = "100%";
      divCasillas.style.height = "100%";
      divCasillas.style.overflow = "hidden";

      const img = document.createElement("img");
      img.setAttribute("src", producto.imagen);
      img.setAttribute("class", "img-inventario");
      divCasillas.appendChild(img);
      casilla.appendChild(divCasillas);
    }
  });
}
