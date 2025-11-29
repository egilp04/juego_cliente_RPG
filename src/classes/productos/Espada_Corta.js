import { Producto } from "./Producto.js";
import { rarezaArmas, tipoArma } from "../../constants/Constants.js";

/**
 * Clase Espada_Corta
 *
 * Representa un producto ofensivo: una espada corta.
 * Hereda de la clase Producto, incluyendo todas las propiedades básicas:
 * nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Espada_Corta extends Producto {
  /**
   * Constructor de la clase Espada_Corta
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
    imagen = "src/assests/img/objects_img/espada_corta.webp",
    precio = 120.0,
    rareza = rarezaArmas.comun,
    tipo = tipoArma.arma,
    bonus = 8,
    descuento = false
  ) {
    super(id, nombre, imagen, precio, rareza, tipo, bonus, descuento);
  }
}
