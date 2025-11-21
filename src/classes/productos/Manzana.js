import { Producto } from "./Producto.js";

/**
 * Clase Manzana
 *
 * Representa un producto consumible: una manzana.
 * Hereda de la clase Producto, incluyendo todas las propiedades básicas:
 * nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Manzana extends Producto {
  /**
   * Constructor de la clase Manzana
   * @param {string} nombre - Nombre de la manzana
   * @param {string} imagen - Imagen o URL de la manzana
   * @param {number} precio - Precio de la manzana
   * @param {string} rareza - Rareza de la manzana (ej. común, raro, épico)
   * @param {string} tipo - Tipo de producto (ej. "consumible")
   * @param {number} bonus - Valor de bonificación que aporta (ej. vida extra)
   */
  constructor(nombre, imagen, precio, rareza, tipo, bonus) {
    super(nombre, imagen, precio, rareza, tipo, bonus);
  }
}
