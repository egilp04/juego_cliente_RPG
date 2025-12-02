import {
  aplicarDescuento,
  buscarProductoNombre,
} from "../modules_game/Mercado.js";
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
} from "../classes/indexProductos.js";
import { Producto } from "../classes/productos/Producto.js";

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
  if (id === "seccion-4" || id === "seccion-6" || id === "seccion-0")
    footer.style.display = "none";
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

  document.querySelectorAll("form").forEach((form) => {
    const nuevoForm = form.cloneNode(true);
    form.replaceWith(nuevoForm);
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

// export function encontrarIndiceProducto(producto, listaProducto) {
//   const index = listaProducto.indexOf(producto);
//   return index;
// }

// export function encontrarProducto(index, listaProducto) {}

export function reiniciarMercado() {
  const mercado = document.querySelector(".mercado-container");
  if (mercado) {
    mercado.innerHTML = "";
    mercado.scrollTop = 0;
  }
  document.querySelectorAll(".mercado-container button").forEach((btn) => {
    const nuevo = btn.cloneNode(true);
    btn.replaceWith(nuevo);
  });
}

export function nombreTipoNuevo(nombre) {
  const nombreCompleto = nombre.split(" ");
  if (nombreCompleto.length > 1)
    return `${nombreCompleto[0]}_${nombreCompleto[1]}`;
  else return nombreCompleto[0];
}

export function validarJugador(nombre, clave) {
  const nombreRegex = /^[a-z]{1,9}$/;
  const claveRegex = /^[a-z]{1,9}$/;
  if (!nombreRegex.test(nombre) || !claveRegex.test(clave)) {
    return false;
  } else {
    let datos = [];
    const nuevoJugador = { nombre: nombre, clave: clave };
    if (localStorage.getItem("jugadoresRegistrados")) {
      datos = JSON.parse(localStorage.getItem("jugadoresRegistrados"));
    }
    datos.push(nuevoJugador);
    localStorage.setItem("jugadoresRegistrados", JSON.stringify(datos));
  }
  return true;
}

export function mostrarFormularioSeccion0(formularioClass) {
  const formularios = Array.from(document.querySelectorAll(".form-seccion-0"));
  formularios.forEach((formulario) => {
    formulario.style.display = "none";
  });

  const formInicioMostrar = document.querySelector(`.${formularioClass}`);
  formInicioMostrar.style.display = "";
}

export function comprobarJugador(nombre, clave) {
  let datos = [];
  let encontrado = false;
  if (localStorage.getItem("jugadoresRegistrados")) {
    datos = JSON.parse(localStorage.getItem("jugadoresRegistrados"));
    datos.forEach((dato) => {
      if (
        dato.nombre.toLowerCase() == nombre &&
        dato.clave.toLowerCase() == clave
      ) {
        encontrado = true;
      }
    });
    if (encontrado) return true;
    else return false;
  }
  return false;
}

export async function obtenerDatosApi() {
  const url = `http://localhost:3001/productos`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
    const result = await response.json();
    const infoDatos = result.map((item) => {
      return castProducto(item);
    });
    return infoDatos;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
}

function castProducto(obj) {
  const { id, nombre, imagen, precio, rareza, tipo, bonus, descuento } = obj;

  if (tipo === "arma") {
    if (nombre === "Espada corta")
      return new Espada_Corta(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
    if (nombre === "Arco caza")
      return new Arco_Caza(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
    if (nombre === "Hacha")
      return new Hacha(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
    if (nombre.includes("Mandoble"))
      return new Mandoble_Epico(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
    if (nombre === "Espada rúnica")
      return new Espada_Runica(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
  }

  if (tipo === "armadura") {
    if (nombre === "Armadura cuero")
      return new Armadura_Cuero(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
    if (nombre === "Escudo roble")
      return new Escudo_Roble(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
    if (nombre.includes("Placas"))
      return new Placas_Draconicas(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
    if (nombre === "Casco")
      return new Casco(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
    if (nombre === "Botas")
      return new Botas(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
  }

  if (tipo === "consumible") {
    if (nombre === "Poción pequeña")
      return new Pocion_Peque(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
    if (nombre === "Poción grande")
      return new Pocion_Grande(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
    if (nombre === "Elixir legendario")
      return new Elixir_Legendario(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
    if (nombre === "Manzana")
      return new Manzana(
        id,
        nombre,
        imagen,
        precio,
        rareza,
        tipo,
        bonus,
        descuento
      );
  }
  return new Producto(
    id,
    nombre,
    imagen,
    precio,
    rareza,
    tipo,
    bonus,
    descuento
  );
}

// export async function reemplazarProducto(id, producto, habilidad = null) {
//   if (!id) {
//     console.error("ID del producto no definido:", producto);
//     return null;
//   }

//   const url = `http://localhost:3001/productos/${id}`;
//   console.log("Preparando producto para reemplazar:", producto);

//   // Clonamos el producto (para no modificar el original directamente)
//   // Cambiamos el nombre y agregamos habilidad si aplica
//   producto.nombre = "Rariiiisimo";
//   if (habilidad) {
//     producto.habilidadEspecial = habilidad;
//   }

//   // Creamos objeto plano para enviar a JSON Server
//   const productoModificado = {
//     id: producto.id,
//     nombre: producto.nombre,
//     precio: producto.precio,
//     imagen: producto.imagen,
//     rareza: producto.rareza,
//     tipo: producto.tipo,
//     valor: producto.valor,
//     bonus: producto.bonus,
//     descuento: producto.descuento,
//     habilidadEspecial: producto.habilidadEspecial ?? null,
//   };

//   console.log("Producto modificado listo para PUT:", productoModificado);

//   try {
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(productoModificado),
//       redirect: "manual", // evita que el navegador siga redirects automáticamente
//     });

//     if (!response.ok) {
//       throw new Error(`Error al reemplazar producto: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log("Producto actualizado en DB:", data);
//   } catch (error) {
//     console.error("Error en reemplazarProducto:", error);
//     return null;
//   }
// }
