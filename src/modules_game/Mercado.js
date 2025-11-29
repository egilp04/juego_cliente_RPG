import { rarezaArmas, tipoArma } from "../constants/Constants.js";


// ====================
// Lista inicial de productos del juego
// ====================

/**
 * Filtra productos por rareza
 * @param {string} tipoRareza - Rareza a filtrar (ej. "comun", "raro", "epico")
 * @returns {Producto[]} Lista de productos que coinciden con la rareza
 */
export function filtrarProductosRareza(tipoRareza, listaProductosFinales) {
  return listaProductosFinales.filter(
    (producto) => tipoRareza === producto.rareza
  );
}
/**
 * Aplica un descuento a los productos de la rareza aleatoria
 * @param {number} descuento - Porcentaje de descuento en formato decimal (por defecto 0.2 → 20%)
 * @returns {Producto[]} Lista de productos finales con descuento aplicado
 */
export function aplicarDescuento(listaProductos, descuento = 0.2) {
  const rarezasDescuento = [
    rarezaArmas.comun,
    rarezaArmas.epico,
    rarezaArmas.raro,
  ];
  const tipoRareza =
    rarezasDescuento[Math.floor(Math.random() * rarezasDescuento.length)];
  let listaProductosFinales = [];
  listaProductos.forEach((producto) => {
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
  return listaProductosFinales.filter(
    (producto) => nombreProducto === producto.nombre
  );
}
