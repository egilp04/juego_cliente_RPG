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

//productos
import {
  Arco_Caza,
  Armadura_Cuero,
  Botas,
  Casco,
  Elixir_Legendario,
  Escudo_Roble,
  Espada_Corta,
  Espada_Runica,
  Hacha,
  Mandoble_Epico,
  Manzana,
  Placas_Draconicas,
  Pocion_Grande,
  Pocion_Peque,
} from "./classes/indexProductos.js";

import { rarezaArmas, tipoArma } from "./constants/Constants.js";

// Utilidades para UI y manipulación DOM
import {
  mostrarSeccion,
  reiniciarJuego,
  batallaAnimacionAleatoria,
  reiniciarMercado,
  nombreTipoNuevo,
  comprobarJugador,
  validarJugador,
  mostrarFormularioSeccion0,
  obtenerDatosApi,
  // reemplazarProducto,
} from "./utils/Utils.js";

// Funciones para gestión de productos y mercado
import {
  filtrarProductosRareza,
  aplicarDescuento,
  buscarProductoNombre,
  // addProducto,
  filtrarProductosTipo,
  addProducto2,
} from "./modules_game/Mercado.js";

// EVENTO DE INICIO
window.addEventListener("load", iniciarJuego);

/**
 * Función principal para iniciar el juego
 * @param {Event} e - Evento de carga de la ventana
 */
function iniciarJuego(e) {
  const seccion0 = document.getElementById("seccion-0");
  mostrarSeccion(seccion0.id);
  seccion0Function(seccion0);
}

// SECCIÓN 1: Datos del jugador
function seccion0Function(seccion0) {
  const boton = seccion0.querySelector(".continuar");
  boton.disabled = true;

  const botonVolverInicioSesion = document.querySelector(".volverInicioSesion");
  botonVolverInicioSesion.style.display = "none";
  const botonRegistro = document.querySelector(".registrarUsuario");

  botonVolverInicioSesion.addEventListener("click", (e) => {
    botonVolverInicioSesion.style.display = "none";
    mostrarFormularioSeccion0("formulario-iniciarSesion-jugador");
    botonRegistro.style.display = "block";
  });

  botonRegistro.addEventListener("click", (e) => {
    botonRegistro.style.display = "none";
    mostrarFormularioSeccion0("formulario-registro-jugador");
    botonVolverInicioSesion.style.display = "block";
  });

  const formularioJugadorInicio = document.querySelector(
    ".formulario-iniciarSesion-jugador"
  );
  const formularioJugadorRegistro = document.querySelector(
    ".formulario-registro-jugador"
  );
  const pMensajeError = document.createElement("p");
  pMensajeError.style.color = "#f5eac5";

  let nombreJugadorIngresado;
  mostrarFormularioSeccion0("formulario-iniciarSesion-jugador");

  formularioJugadorInicio.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombreJugadorInicio = document.querySelector(".nombreJugadorInicio");
    const claveJugadorInicio = document.querySelector(".claveJugadorInicio");

    if (
      !comprobarJugador(nombreJugadorInicio.value, claveJugadorInicio.value)
    ) {
      nombreJugadorInicio.style.backgroundColor = "red";
      claveJugadorInicio.style.backgroundColor = "red";
      e.currentTarget.reset();
      pMensajeError.textContent =
        "No existes en el juego o datos incorrectos, registrate";
      seccion0.appendChild(pMensajeError);
      setTimeout(() => {
        nombreJugadorInicio.style.backgroundColor = "";
        claveJugadorInicio.style.backgroundColor = "";
        pMensajeError.remove();
      }, 2000);
    } else {
      nombreJugadorIngresado = nombreJugadorInicio.value;
      boton.disabled = false;
    }
  });

  formularioJugadorRegistro.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombreJugadorRegistro = document.querySelector(
      ".nombreJugadorRegistro"
    );
    const claveJugadorRegistro = document.querySelector(
      ".claveJugadorRegistro"
    );
    if (
      comprobarJugador(nombreJugadorRegistro.value, claveJugadorRegistro.value)
    ) {
      nombreJugadorRegistro.style.backgroundColor = "red";
      claveJugadorRegistro.style.backgroundColor = "red";
      e.currentTarget.reset();
      pMensajeError.textContent = "Jugador con nombre y clave ya existe";
      seccion0.appendChild(pMensajeError);
      setTimeout(() => {
        nombreJugadorRegistro.style.backgroundColor = "";
        claveJugadorRegistro.style.backgroundColor = "";
        pMensajeError.remove();
      }, 2000);
    } else {
      if (
        !validarJugador(nombreJugadorRegistro.value, claveJugadorRegistro.value)
      ) {
        nombreJugadorRegistro.style.backgroundColor = "red";
        claveJugadorRegistro.style.backgroundColor = "red";
        e.currentTarget.reset();
        pMensajeError.textContent =
          "Clave y Nombre en minusculas, de 1 a 9 letras, sin espacios, solo un nombre";
        seccion0.appendChild(pMensajeError);
        setTimeout(() => {
          nombreJugadorRegistro.style.backgroundColor = "";
          claveJugadorRegistro.style.backgroundColor = "";
          pMensajeError.remove();
        }, 2000);
      } else {
        mostrarFormularioSeccion0("formulario-iniciarSesion-jugador");
        botonRegistro.style.display = "block";
        botonVolverInicioSesion.style.display = "none";
        e.currentTarget.reset();
      }
    }
  });

  boton.addEventListener("click", (e) => {
    const seccion1 = document.getElementById("seccion-1");
    mostrarSeccion(seccion1.id);
    seccion1Function(seccion1, nombreJugadorIngresado);
  });
}

function seccion1Function(seccion1, nombreJugadorIngresado) {
  const jugador = new Cazador(
    `${nombreJugadorIngresado}`,
    30,
    avatarCazador,
    20,
    20,
    1000
  );
  datosJugador(jugador, seccion1.id);
  const boton = seccion1.querySelector(".continuar");
  boton.addEventListener("click", (e) => {
    e.preventDefault();
    const seccion2 = document.getElementById("seccion-2");
    mostrarSeccion(seccion2.id);
    seccion2Function(seccion2, jugador);
  });
}

// SECCIÓN 2: Mercado
async function seccion2Function(seccion2, jugador) {
  document.getElementById("title").textContent = "Mercado Negro";
  reiniciarMercado();
  let listaProductos = await obtenerDatosApi();

  // for (const producto of listaProductos) {
  //   console.log(producto);
  //   if (producto.rareza === "raro") {
  //     console.log(`p if ${producto}`);

  //     await reemplazarProducto(producto.id, producto, "true");
  //   }
  // }
  // listaProductos = await obtenerDatosApi();

  //si no hay api, hay que crear la lista de productos sin la API
  // const listaProductos = [ new Espada_Corta( 1, "Espada corta", "src/assests/img/objects_img/espada_corta.webp", 120.0, rarezaArmas.comun, tipoArma.arma, 8 ), new Arco_Caza( 2, "Arco caza", "src/assests/img/objects_img/arco.webp", 140.0, rarezaArmas.comun, tipoArma.arma, 7 ), new Armadura_Cuero( 3, "Armadura cuero", "src/assests/img/objects_img/armadura.webp", 180.0, rarezaArmas.comun, tipoArma.armadura, 6 ), new Pocion_Peque( 4, "Poción pequeña", "src/assests/img/objects_img/pocion_peque.webp", 40.0, rarezaArmas.comun, tipoArma.consumible, 20 ), new Espada_Runica( 5, "Espada rúnica", "src/assests/img/objects_img/espada_runica.webp", 460.0, rarezaArmas.raro, tipoArma.arma, 18 ), new Escudo_Roble( 6, "Escudo roble", "src/assests/img/objects_img/escudo.webp", 320.0, rarezaArmas.raro, tipoArma.armadura, 14 ), new Pocion_Grande( 7, "Poción grande", "src/assests/img/objects_img/pocion_grande.webp", 110.0, rarezaArmas.raro, tipoArma.consumible, 60 ), new Mandoble_Epico( 8, "Mandoble épico", "src/assests/img/objects_img/mandoble.webp", 950.0, rarezaArmas.epico, tipoArma.arma, 32 ), new Placas_Draconicas( 9, "Placas dracónicas", "src/assests/img/objects_img/placas_draconicas.webp", 880.0, rarezaArmas.epico, tipoArma.armadura, 28 ), new Elixir_Legendario( 10, "Elixir legendario", "src/assests/img/objects_img/elixir.webp", 520.0, rarezaArmas.epico, tipoArma.consumible, 150 ), new Manzana( 11, "Manzana", "src/assests/img/objects_img/manzana.webp", 40.0, rarezaArmas.comun, tipoArma.consumible, 10 ), new Casco( 12, "Casco", "src/assests/img/objects_img/casco.webp", 100.0, rarezaArmas.comun, tipoArma.armadura, 10 ), new Hacha( 13, "Hacha", "src/assests/img/objects_img/hacha.webp", 120.0, rarezaArmas.comun, tipoArma.arma, 8 ), new Botas( 14, "Botas", "src/assests/img/objects_img/botas.webp", 80.0, rarezaArmas.comun, tipoArma.armadura, 4 ), ];

  const selectProductos = document.querySelector(".tipoProductoNuevo");
  const optionDft = document.createElement("option");
  optionDft.value = "";
  optionDft.textContent = "Seleccione un tipo de producto";
  selectProductos.appendChild(optionDft);

  listaProductos.forEach((producto) => {
    const option = document.createElement("option");
    option.value = `${nombreTipoNuevo(producto.nombre.toLowerCase())}`;
    option.textContent = producto.nombre;
    selectProductos.appendChild(option);
  });

  let productosComprar = aplicarDescuento(listaProductos);

  crearMercado(productosComprar, jugador);

  document.querySelector(
    ".dinero-comprar"
  ).textContent = `${jugador.dineroFormateo(jugador.dinero)}`;

  const formularioNombre = document.querySelector(".formNombre");
  const formularioRareza = document.querySelector(".formRareza");
  const formularioTipoProducto = document.querySelector(".formTipo");
  const formularioNuevoProducto = document.querySelector(
    ".nuevoElementoMercado"
  );

  const pMensajeError = document.createElement("p");
  pMensajeError.style.color = "#f5eac5";

  formularioNombre.addEventListener("submit", (e) => {
    e.preventDefault();
    const productosNombre = buscarProductoNombre(
      document.querySelector(".nombreProducto").value,
      productosComprar
    );
    if (productosNombre.length > 0) crearMercado(productosNombre, jugador);
    else {
      pMensajeError.textContent = "No existen productos con este nombre";
      formularioNombre.appendChild(pMensajeError);

      setTimeout(() => {
        pMensajeError.remove();
      }, 2000);
    }
    e.currentTarget.reset();
  });

  formularioRareza.addEventListener("submit", (e) => {
    e.preventDefault();
    const rarezaSelect = document.querySelector(".rareza").value;
    const productosRareza = filtrarProductosRareza(
      rarezaSelect,
      productosComprar
    );
    if (productosRareza.length > 0) crearMercado(productosRareza, jugador);
    else {
      pMensajeError.textContent = "No existen productos con esta rareza";
      formularioRareza.appendChild(pMensajeError);
      setTimeout(() => {
        pMensajeError.remove();
      }, 2000);
    }
  });

  formularioTipoProducto.addEventListener("submit", (e) => {
    e.preventDefault();
    const tipoProductoSelect = document.querySelector(".tipoProducto").value;
    const productosTipo = filtrarProductosTipo(
      tipoProductoSelect,
      productosComprar
    );
    if (productosTipo.length > 0) crearMercado(productosTipo, jugador);
    else {
      pMensajeError.textContent = "No existen productos con este tipo";
      formularioTipoProducto.appendChild(pMensajeError);

      setTimeout(() => {
        pMensajeError.remove();
      }, 2000);
    }
  });

  formularioNuevoProducto.addEventListener("submit", async (e) => {
    e.preventDefault();
    const nombreProducto = document.querySelector(".nombreProductoNuevo").value;
    const tipoProductoNuevo =
      document.querySelector(".tipoProductoNuevo").value;
    let nombreValido = true;
    const nombreRegex = /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)$/;

    if (!nombreRegex.test(nombreProducto)) {
      console.log("no ha pasado la regex");
      nombreValido = false;
    } else {
      productosComprar.forEach((producto) => {
        if (producto.nombre.toLowerCase() == nombreProducto.toLowerCase())
          nombreValido = false;
      });
    }
    if (nombreValido) {
      addProducto2(nombre, tipoProductoNuevo);
      productosComprar = await obtenerDatosApi();
      //productoComprar =  addProducto(
      //   nombreProducto,
      //   tipoProductoNuevo,
      //   productosComprar
      // );
      crearMercado(productosComprar, jugador);
    } else {
      const nombreProductoNuevoDiv = document.getElementById(
        "nombreProductoNuevo"
      );
      console.log(nombreProductoNuevoDiv.style.backgroundColor);

      nombreProductoNuevoDiv.style.backgroundColor = "red";
      nombreProductoNuevoDiv.title = "Nombre ya existente";

      pMensajeError.textContent = "El nombre ya existe";
      pMensajeError.style.color = "#f5eac5";
      formularioNuevoProducto.appendChild(pMensajeError);
      setTimeout(() => {
        nombreProductoNuevoDiv.style.backgroundColor = "";
        nombreProductoNuevoDiv.title = "";
        pMensajeError.remove();
      }, 2000);
    }
    e.currentTarget.reset();
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
  jugador.eliminarCuraciones();
  rellenarCasillas(jugador);
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
  boton.addEventListener("click", (e) => {
    const seccion6 = document.getElementById("seccion-6");
    mostrarSeccion(seccion6.id);
    seccion6Function(seccion6, puntos, ganador);
  });
}

function seccion6Function(seccion6, puntuacion, ganador) {
  document.getElementById("title").textContent = "Resultado Final";
  const spanRanking = document.querySelector(".ranking-data");
  const spanPuntuacion = document.querySelector(".puntuacion-data");
  const boton = seccion6.querySelector(".reiniciar");
  boton.disabled = true;

  if (ganador instanceof Enemigo) {
    spanRanking.textContent = `El jugador ha perdido`;
    spanPuntuacion.textContent = `¡Vuelve a intentarlo!`;
    const loserDiv = document.querySelector(".loser");
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

function actualizarDinero(jugador, precio, operacion) {
  const dineroAntiguo = jugador.dinero;
  if (operacion == "sumar") jugador.dinero = dineroAntiguo + precio;
  else if (operacion == "restar") jugador.dinero = dineroAntiguo - precio;
  document.querySelector(
    ".dinero-comprar"
  ).textContent = `${jugador.dineroFormateo(jugador.dinero)}`;
}

function crearMercado(productosComprar, jugador) {
  reiniciarMercado();
  const mercadoContainer = document.querySelector(".mercado-container");

  productosComprar.forEach((producto) => {
    const divProducto = document.createElement("div");
    divProducto.setAttribute("class", "producto tarjeta");

    // Imagen del producto
    const divImgProducto = document.createElement("div");
    divImgProducto.setAttribute("class", "img-producto-container");
    const imgProducto = document.createElement("img");
    imgProducto.setAttribute("class", "img-producto");
    imgProducto.setAttribute("src", `${producto.imagen}`);
    divImgProducto.appendChild(imgProducto);

    // Datos del producto
    const divDataProducto = document.createElement("div");
    divDataProducto.setAttribute("class", "data-producto-container");
    const spanNombreProducto = document.createElement("span");
    // const nombreP =
    //   producto.nombre.toLowerCase() === "espadeve"
    //     ? `${producto.nombre}🐶`
    //     : `${producto.nombre} `;

    spanNombreProducto.textContent = producto.descuento
      ? `${producto.nombre} 💸`
      : `${producto.nombre}`;
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
    let existe = false;

    if (jugador.inventario.length > 0) {
      for (let i = 0; i < jugador.inventario.length; i++) {
        if (jugador.inventario[i].id === producto.id) {
          existe = true;
        }
      }
      if (existe) {
        botonComprar.setAttribute("class", "retirar");
        botonComprar.textContent = "Retirar";
      } else {
        botonComprar.setAttribute("class", "comprar");
        botonComprar.textContent = "Añadir";
      }
    } else {
      botonComprar.setAttribute("class", "comprar");
      botonComprar.textContent = "Añadir";
    }

    botonComprar.addEventListener("click", (e) => {
      const MAX_INVENTARIO = 6;

      if (botonComprar.classList.contains("comprar")) {
        // Añadir al inventario si no está lleno
        if (jugador.inventario.length >= MAX_INVENTARIO) return;
        if (jugador.dinero < producto.precio) {
          return;
        }
        jugador.addObjInventario(producto);
        actualizarDinero(jugador, producto.precio, "restar");
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
        actualizarDinero(jugador, producto.precio, "sumar");
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
}
