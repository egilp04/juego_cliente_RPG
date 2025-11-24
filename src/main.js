// ====================
// IMPORTACIONES
// ====================
// Clases de jugadores y enemigos
import { Cazador } from "./classes/indexJugadores.js";
import {
  Goblin,
  Bandido,
  Dragon,
  Lobo,
  Jefe,
} from "./classes/indexEnemigos.js";
import { Enemigo } from "./classes/enemigos/Enemigo.js";
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
  efectosVisuales,
  encontrarProducto,
} from "./utils/Utils.js";

// Funciones para gestión de productos y mercado
import {
  filtrarProductos,
  aplicarDescuento,
  buscarProductoNombre,
} from "./modules_game/Mercado.js";

//funcion para reiniciar el juego
import { reiniciarJuego } from "./utils/Utils.js";

// EVENTO DE INICIO
window.addEventListener("load", iniciarJuego);

/**
 * Función principal para iniciar el juego
 * @param {Event} e - Evento de carga de la ventana
 */
function iniciarJuego(e) {
  const seccion1 = document.getElementById("seccion-1");
  mostrarSeccion(seccion1.id);
  seccion1Function(seccion1);
}

// SECCIÓN 1: Datos del jugador
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

// SECCIÓN 2: Mercado
function seccion2Function(seccion2, jugador) {
  document.getElementById("title").textContent = "Mercado Negro";
  const mercadoContainer = document.getElementById("mercado-container");
  const productosComprar = aplicarDescuento();
  productosComprar.forEach((producto) => {
    const divProducto = document.createElement("div");
    const idProducto = producto.nombre.replace(/\s+/g, "_").toLowerCase();
    divProducto.setAttribute("class", "producto");
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
    divDataProducto.setAttribute("id", "data-producto-container");
    const spanNombreProducto = document.createElement("span");
    spanNombreProducto.textContent = `${producto.nombre}`;
    const spanBonusProducto = document.createElement("span");
    spanBonusProducto.textContent = `${estadisticaAportaArma(producto.tipo)}: ${
      producto.bonus
    }`;
    const spanPrecioProducto = document.createElement("span");
    spanPrecioProducto.textContent = `Precio. ${producto.precio}`;
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
        botonComprar.classList.remove("comprar");
        botonComprar.textContent = "retirar";
      } else {
        // Retirar del inventario
        jugador.eliminarObjInventario(producto);
        botonComprar.classList.add("comprar");
        botonComprar.textContent = "Añadir";
      }
      efectosVisuales();
      rellenarCasillas(jugador);
    });

    divProducto.appendChild(divImgProducto);
    divProducto.appendChild(divDataProducto);
    divProducto.appendChild(botonComprar);
    mercadoContainer.appendChild(divProducto);
  });

  // Continuar a sección 3
  const boton = seccion2.querySelector(".continuar");
  boton.addEventListener("click", (e) => {
    const seccion3 = document.getElementById("seccion-3");
    mostrarSeccion(seccion3.id);
    seccion3Function(seccion3, jugador);
  });
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
// SECCIÓN 3: Stats jugador
function seccion3Function(seccion3, jugador) {
  datosJugador(jugador, seccion3.id);
  const boton = seccion3.querySelector(".continuar");
  boton.addEventListener("click", (e) => {
    const seccion4 = document.getElementById("seccion-4");
    mostrarSeccion(seccion4.id);
    seccion4Function(seccion4, jugador);
  });
}

// SECCIÓN 4: Selección de enemigos
function seccion4Function(seccion4, jugador) {
  const enemigos = [
    new Goblin("Goblin", avatarGoblin, 6, 30),
    new Lobo("Lobo", avatarLobo, 9, 42),
    new Dragon("Dragon", avatarDragon, 28, 140, "aliento Igeno"),
    new Bandido("Bandido", avatarBandido, 12, 55),
    new Jefe("Jefe", avatarJefe, 20, 55),
  ];

  const divEnemigosContainer = document.getElementById("enemigos-container");
  enemigos.forEach((enemigo) => {
    const divEnemigo = document.createElement("div");
    divEnemigo.setAttribute("class", "enemigo-container");

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

    divData.appendChild(spanNombre);
    divData.appendChild(spanPuntos);

    divEnemigo.appendChild(divImagen);
    divEnemigo.appendChild(divData);

    divEnemigosContainer.appendChild(divEnemigo);
  });

  // Continuar a sección 5
  const boton = seccion4.querySelector(".continuar");
  boton.addEventListener("click", (e) => {
    const seccion5 = document.getElementById("seccion-5");
    mostrarSeccion(seccion5.id);
    seccion5Function(seccion5, jugador, enemigos);
  });
}

// SECCIÓN 5: Combate
function seccion5Function(seccion5, jugador, enemigos) {
  document.getElementById("title").textContent = "Combate";
  const enemigo = enemigos[Math.floor(Math.random() * enemigos.length)];

  const { ganador, puntos, resultadoBatallas } = combate(enemigo, jugador);

  document.getElementById("jugador-imagen").setAttribute("src", jugador.avatar);
  document.getElementById("enemigo-imagen").setAttribute("src", enemigo.avatar);
  document
    .getElementById("resultados-container")
    .querySelector("h2").textContent = `Ganador: ${ganador.nombre}`;
  document
    .getElementById("resultados-container")
    .querySelector("p").textContent = `Puntos Obtenidos: ${puntos}`;

  //resultado batallas
  const resumenBatallas = document.getElementById("resumen-batallas");
  console.log(resultadoBatallas);
  for (turno in resultadoBatallas) {
    const turno = document.createElement("span");
    turno.textContent = `${turno}`;
    const atacante = document.createElement("span");
    atacante.textContent = `${resultadoBatallas[turno.atacante]}`;
    console.log(resultadoBatallas[turno.atacante]);
    const atacado = document.createElement("span");
    const danio = document.createElement("span");
    const vidaJugador = document.createElement("span");
    const vidaEnemigo = document.createElement("span");
  }

  const boton = seccion5.querySelector(".continuar");
  boton.addEventListener("click", (e) => {
    const seccion6 = document.getElementById("seccion-6");
    mostrarSeccion(seccion6.id);
    seccion6Function(seccion6, puntos, ganador);
  });
}

function seccion6Function(seccion6, puntuacion, ganador) {
  document.getElementById("title").textContent = "Resultado Final";
  const spanRanking = document.getElementById("ranking-data");
  const spanPuntuacion = document.getElementById("puntuacion-data");
  if (ganador instanceof Enemigo) {
    spanRanking.textContent = `El jugador ha perdido 😭`;
    spanPuntuacion.textContent = `¡Vuelve a intentarlo!`;
  } else {
    spanRanking.textContent = `El jugador ha logrado ser un: ${distinguirJugador(
      puntuacion
    )}`;
    spanPuntuacion.textContent = `Puntos totales: ${puntuacion}`;
  }

  const boton = seccion6.querySelector(".reiniciar");
  boton.addEventListener("click", (e) => {
    const seccion1 = document.getElementById("seccion-1");
    reiniciarJuego();
    mostrarSeccion(seccion1.id);
    seccion1Function(seccion1);
  });
}

// FUNCIÓN AUXILIAR: mostrar datos del jugador
function datosJugador(jugador, seccionid) {
  let { ataqueTotal, defensaTotal, vidaTotal } =
    jugador.obtenerEstadisticasFinales();

  document.getElementById("title").textContent = "Aventura JS";
  document
    .getElementById(`imagen-jugador-${seccionid}`)
    .setAttribute("src", jugador.avatar);
  document
    .getElementById(`nombre-jugador-container-${seccionid}`)
    .querySelector("h2").textContent = jugador.nombre;

  const valores = Array.from(document.querySelectorAll(`.valor-${seccionid}`));
  const valoresJugador = [ataqueTotal, defensaTotal, vidaTotal, jugador.puntos];
  valores.forEach((valor, i) => {
    valor.textContent = `${valoresJugador[i]}`;
  });
}

/**
 * Rellena las casillas de inventario en la UI
 * @param {Jugador} jugador
 */
function rellenarCasillas(jugador) {
  const inventario = jugador.inventario;
  const casillas = Array.from(document.querySelectorAll(".casilla"));
  casillas.forEach((casilla, i) => {
    casilla.innerHTML = "";
    const producto = inventario[i];
    if (producto) {
      const divCasillas = document.createElement("div");
      divCasillas.style.width = "100%";
      divCasillas.style.height = "100%";

      const img = document.createElement("img");
      img.setAttribute("src", producto.imagen);
      divCasillas.appendChild(img);
      casilla.appendChild(divCasillas);
    }
  });
}
