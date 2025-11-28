import { Producto } from "./Producto.js";
import { rarezaArmas, tipoArma } from "../../constants/Constants.js";

/**
 * Clase Espada_Runica
 *
 * Representa un producto ofensivo especial: una espada rúnica.
 * Hereda de la clase Producto, incluyendo todas las propiedades básicas:
 * nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Espada_Runica extends Producto {
  /**
   * Constructor de la clase Espada_Runica
   * @param {string} nombre - Nombre de la espada
   * @param {string} imagen - Imagen o URL de la espada
   * @param {number} precio - Precio de la espada
   * @param {string} rareza - Rareza de la espada (ej. común, raro, épico)
   * @param {string} tipo - Tipo de producto (ej. "arma")
   * @param {number} bonus - Valor de bonificación que aporta (ej. ataque extra)
   */
  constructor(
    id,
    nombre,
    imagen = "src/assests/img/objects_img/espada_runica.webp",
    precio = 460.0,
    rareza = rarezaArmas.raro,
    tipo = tipoArma.arma,
    bonus = 18
  ) {
    super(id, nombre, imagen, precio, rareza, tipo, bonus);
  }
}
