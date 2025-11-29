import { Producto } from "./Producto.js";
import { rarezaArmas, tipoArma } from "../../constants/Constants.js";

/**
 * Clase Casco
 *
 * Representa un tipo específico de producto: un casco para el jugador.
 * Hereda de la clase Producto, incluyendo todas las propiedades básicas:
 * nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Casco extends Producto {
  /**
   * Constructor de la clase Casco
   * @param {string} nombre - Nombre del casco
   * @param {string} imagen - Imagen o URL del casco
   * @param {number} precio - Precio del casco
   * @param {string} rareza - Rareza del casco (ej. común, raro, épico)
   * @param {string} tipo - Tipo de producto (ej. "armadura")
   * @param {number} bonus - Valor de bonificación que aporta
   */
  constructor(
    id,
    nombre,
    imagen,
    precio,
    rareza,
    tipo,
    bonus,
    descuento = false
  ) {
    super(id, nombre, imagen, precio, rareza, tipo, bonus, descuento);
  }
}
