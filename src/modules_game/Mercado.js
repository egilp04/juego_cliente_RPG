import { rarezaArmas, tipoArma } from "../constants/Constants.js";
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

/**
 * Filtra productos por rareza
 * @param {string} tipoRareza - Rareza a filtrar (ej. "comun", "raro", "epico")
 * @returns {Producto[]} Lista de productos que coinciden con la rareza
 */
export function filtrarProductosRareza(tipoRareza, listaProductosFinales) {
  if (!tipoRareza || tipoRareza.trim() === "") return listaProductosFinales;
  return listaProductosFinales.filter(
    (producto) => tipoRareza === producto.rareza
  );
}

export function filtrarProductosTipo(tipoArma, listaProductosFinales) {
  if (!tipoArma || tipoArma.trim() === "") return listaProductosFinales;
  return listaProductosFinales.filter((producto) => tipoArma === producto.tipo);
}

/**
 * Aplica un descuento a los productos de la rareza indicada
 * @param {string} tipoRareza - Rareza a la que aplicar el descuento (por defecto "raro")
 * @param {number} descuento - Porcentaje de descuento en formato decimal (por defecto 0.2 → 20%)
 * @returns {Producto[]} Lista de productos finales con descuento aplicado
 */
export function aplicarDescuento(listaProductos, descuento = 0.2) {
  const rarezasDescuento = [
    rarezaArmas.comun,
    rarezaArmas.epico,
    rarezaArmas.raro,
  ];
  let listaProductosFinales = [];
  const tipoRareza =
    rarezasDescuento[Math.floor(Math.random() * rarezasDescuento.length)];
  listaProductos.forEach((producto) => {
    console.log(producto);
    const productoClonado = producto.clonarProducto();
    if (producto.rareza === tipoRareza)
      productoClonado.aplicarDescuento(descuento);
    listaProductosFinales.push(productoClonado);
  });
  return listaProductosFinales;
}

/**
 * Busca productos por nombre exacto
 * @param {string} nombreProducto - Nombre del producto a buscar
 * @returns {Producto[]} Lista de productos que coinciden con el nombre
 */
export function buscarProductoNombre(nombreProducto, listaProductosFinales) {
  if (!nombreProducto || nombreProducto.trim() === "")
    return listaProductosFinales;

  const nombre = nombreProducto.toLowerCase();
  return listaProductosFinales.filter((producto) => {
    const completo = producto.nombre.toLowerCase();
    const primeraPalabra = producto.nombre.split(" ")[0].toLowerCase();
    return nombre === completo || nombre === primeraPalabra;
  });
}

export function addProducto(nombre, productoTipo, listaProductosFinales) {
  const tamLista = listaProductosFinales.length;
  switch (productoTipo) {
    case "arco_caza":
      listaProductosFinales.push(new Arco_Caza(tamLista + 1, nombre));
      break;
    case "armadura_cuero":
      listaProductosFinales.push(new Armadura_Cuero(tamLista + 1, nombre));
      break;
    case "botas":
      listaProductosFinales.push(new Botas(tamLista + 1, nombre));
      break;
    case "casco":
      listaProductosFinales.push(new Casco(tamLista + 1, nombre));
      break;
    case "elixir_legendario":
      listaProductosFinales.push(new Elixir_Legendario(tamLista + 1, nombre));
      break;
    case "escudo_roble":
      listaProductosFinales.push(new Escudo_Roble(tamLista + 1, nombre));
      break;
    case "espada_corta":
      listaProductosFinales.push(new Espada_Corta(tamLista + 1, nombre));
      break;
    case "espada_runica":
      listaProductosFinales.push(new Espada_Runica(tamLista + 1, nombre));
      break;
    case "hacha":
      listaProductosFinales.push(new Hacha(tamLista + 1, nombre));
      break;
    case "mandoble_epico":
      listaProductosFinales.push(new Mandoble_Epico(tamLista + 1, nombre));
      break;
    case "manzana":
      listaProductosFinales.push(new Manzana(tamLista + 1, nombre));
      break;
    case "placas_draconicas":
      listaProductosFinales.push(new Placas_Draconicas(tamLista + 1, nombre));
      break;
    case "pocion_grande":
      listaProductosFinales.push(new Pocion_Grande(tamLista + 1, nombre));
      break;
    case "pocion_peque":
      listaProductosFinales.push(new Pocion_Peque(tamLista + 1, nombre));
      break;
    default:
      break;
  }
  return aplicarDescuento(listaProductosFinales);
}

export async function addProducto2(nombre, productoTipo) {
  const url = `http://localhost:3001/productos`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crearProductoNuevo(nombre, productoTipo)),
    });
    if (!response.ok) throw new Error(`Response status: ${response.status}`);
  } catch (error) {
    console.error(error.message);
  }
}

function crearProductoNuevo(nombre, productoTipo) {
  let productoNuevo;
  switch (productoTipo) {
    case "arco_caza":
      productoNuevo = new Arco_Caza(undefined, nombre);
      break;
    case "armadura_cuero":
      productoNuevo = new Armadura_Cuero(undefined, nombre);
      break;
    case "botas":
      productoNuevo = new Botas(undefined, nombre);
      break;
    case "casco":
      productoNuevo = new Casco(undefined, nombre);
      break;
    case "elixir_legendario":
      productoNuevo = new Elixir_Legendario(undefined, nombre);
      break;
    case "escudo_roble":
      productoNuevo = new Escudo_Roble(undefined, nombre);
      break;
    case "espada_corta":
      productoNuevo = new Espada_Corta(undefined, nombre);
      break;
    case "espada_runica":
      productoNuevo = new Espada_Runica(undefined, nombre);
      break;
    case "hacha":
      productoNuevo = new Hacha(undefined, nombre);
      break;
    case "mandoble_epico":
      productoNuevo = new Mandoble_Epico(undefined, nombre);
      break;
    case "manzana":
      productoNuevo = new Manzana(undefined, nombre);
      break;
    case "placas_draconicas":
      productoNuevo = new Placas_Draconicas(undefined, nombre);
      break;
    case "pocion_grande":
      productoNuevo = new Pocion_Grande(undefined, nombre);
      break;
    case "pocion_peque":
      productoNuevo = new Pocion_Peque(undefined, nombre);
      break;
    default:
      break;
  }
  console.log(productoNuevo);
  return productoNuevo;
}
