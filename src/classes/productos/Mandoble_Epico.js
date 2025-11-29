import { Producto } from "./Producto.js";
import { rarezaArmas, tipoArma } from "../../constants/Constants.js";

/**
 * Clase Mandoble_Epico
 *
 * Representa un producto ofensivo especial: un mandoble épico.
 * Hereda de la clase Producto, incluyendo todas las propiedades básicas:
 * nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Mandoble_Epico extends Producto {
  /**
   * Constructor de la clase Mandoble_Epico
   * @param {string} nombre - Nombre del mandoble
   * @param {string} imagen - Imagen o URL del mandoble
   * @param {number} precio - Precio del mandoble
   * @param {string} rareza - Rareza del mandoble (ej. común, raro, épico)
   * @param {string} tipo - Tipo de producto (ej. "arma")
   * @param {number} bonus - Valor de bonificación que aporta (ej. ataque extra)
   */
  constructor(
    id,
    nombre,
    imagen = "src/assests/img/objects_img/mandoble.webp",
    precio = 950.0,
    rareza = rarezaArmas.epico,
    tipo = tipoArma.arma,
    bonus = 32,
    descuento = false
  ) {
    super(id, nombre, imagen, precio, rareza, tipo, bonus, descuento);
  }
}
