import { Producto } from "./Producto.js";
import { rarezaArmas, tipoArma } from "../../constants/Constants.js";

/**
 * Clase Armadura_Cuero
 *
 * Representa un tipo específico de producto: una armadura de cuero.
 * Hereda de la clase Producto, por lo que incluye todas las propiedades
 * de un producto: nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Armadura_Cuero extends Producto {
  /**
   * Constructor de la clase Armadura_Cuero
   * @param {string} nombre - Nombre de la armadura
   * @param {string} imagen - Imagen o URL de la armadura
   * @param {number} precio - Precio de la armadura
   * @param {string} rareza - Rareza de la armadura (ej. común, raro, épico)
   * @param {string} tipo - Tipo de producto (ej. "armadura")
   * @param {number} bonus - Valor de bonificación que aporta
   */
  constructor(
    id,
    nombre,
    imagen = "src/assests/img/objects_img/armadura.webp",
    precio = 180.0,
    rareza = rarezaArmas.comun,
    tipo = tipoArma.armadura,
    bonus = 6,
    descuento = false
  ) {
    super(id, nombre, imagen, precio, rareza, tipo, bonus, descuento);
  }
}
