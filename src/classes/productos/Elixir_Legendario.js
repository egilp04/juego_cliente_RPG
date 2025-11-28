import { Producto } from "./Producto.js";

/**
 * Clase Elixir_Legendario
 *
 * Representa un producto consumible especial: un elixir legendario.
 * Hereda de la clase Producto, incluyendo todas las propiedades básicas:
 * nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Elixir_Legendario extends Producto {
  /**
   * Constructor de la clase Elixir_Legendario
   * @param {string} nombre - Nombre del elixir
   * @param {string} imagen - Imagen o URL del elixir
   * @param {number} precio - Precio del elixir
   * @param {string} rareza - Rareza del elixir (ej. común, raro, épico)
   * @param {string} tipo - Tipo de producto (ej. "consumible")
   * @param {number} bonus - Valor de bonificación que aporta (ej. vida extra)
   */
  constructor(id, nombre, imagen, precio, rareza, tipo, bonus) {
    super(id, nombre, imagen, precio, rareza, tipo, bonus);
  }
}
