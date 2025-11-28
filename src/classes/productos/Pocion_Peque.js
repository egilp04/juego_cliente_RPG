import { Producto } from "./Producto.js";

/**
 * Clase Pocion_Peque
 *
 * Representa un producto consumible: una poción pequeña.
 * Hereda de la clase Producto, incluyendo todas las propiedades básicas:
 * nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Pocion_Peque extends Producto {
  /**
   * Constructor de la clase Pocion_Peque
   * @param {string} nombre - Nombre de la poción
   * @param {string} imagen - Imagen o URL de la poción
   * @param {number} precio - Precio de la poción
   * @param {string} rareza - Rareza de la poción (ej. común, raro, épico)
   * @param {string} tipo - Tipo de producto (ej. "consumible")
   * @param {number} bonus - Valor de bonificación que aporta (ej. vida extra)
   */
  constructor(id, nombre, imagen, precio, rareza, tipo, bonus) {
    super(id, nombre, imagen, precio, rareza, tipo, bonus);
  }
}
