import { Producto } from "./Producto.js";

/**
 * Clase Escudo_Roble
 *
 * Representa un producto defensivo: un escudo de roble.
 * Hereda de la clase Producto, incluyendo todas las propiedades básicas:
 * nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Escudo_Roble extends Producto {
  /**
   * Constructor de la clase Escudo_Roble
   * @param {string} nombre - Nombre del escudo
   * @param {string} imagen - Imagen o URL del escudo
   * @param {number} precio - Precio del escudo
   * @param {string} rareza - Rareza del escudo (ej. común, raro, épico)
   * @param {string} tipo - Tipo de producto (ej. "armadura", "defensa")
   * @param {number} bonus - Valor de bonificación que aporta (ej. defensa extra)
   */
  constructor(nombre, imagen, precio, rareza, tipo, bonus) {
    super(nombre, imagen, precio, rareza, tipo, bonus);
  }
}
