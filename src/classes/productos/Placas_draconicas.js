import { Producto } from "./Producto.js";

/**
 * Clase Placas_Draconicas
 * 
 * Representa un producto defensivo especial: placas dracónicas.
 * Hereda de la clase Producto, incluyendo todas las propiedades básicas:
 * nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Placas_Draconicas extends Producto {
  /**
   * Constructor de la clase Placas_Draconicas
   * @param {string} nombre - Nombre de las placas
   * @param {string} imagen - Imagen o URL de las placas
   * @param {number} precio - Precio de las placas
   * @param {string} rareza - Rareza de las placas (ej. común, raro, épico)
   * @param {string} tipo - Tipo de producto (ej. "armadura")
   * @param {number} bonus - Valor de bonificación que aporta (ej. defensa extra)
   */
  constructor(nombre, imagen, precio, rareza, tipo, bonus) {
    super(nombre, imagen, precio, rareza, tipo, bonus);
  }
}