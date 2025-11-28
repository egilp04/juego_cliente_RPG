import { Producto } from "./Producto.js";

/**
 * Clase Botas
 *
 * Representa un tipo específico de producto: botas para el jugador.
 * Hereda de la clase Producto, incluyendo todas las propiedades
 * básicas de un producto: nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Botas extends Producto {
  /**
   * Constructor de la clase Botas
   * @param {string} nombre - Nombre de las botas
   * @param {string} imagen - Imagen o URL de las botas
   * @param {number} precio - Precio de las botas
   * @param {string} rareza - Rareza de las botas (ej. común, raro, épico)
   * @param {string} tipo - Tipo de producto (ej. "armadura", "accesorio")
   * @param {number} bonus - Valor de bonificación que aporta
   */
  constructor(id, nombre, imagen, precio, rareza, tipo, bonus) {
    super(id, nombre, imagen, precio, rareza, tipo, bonus);
  }
}
