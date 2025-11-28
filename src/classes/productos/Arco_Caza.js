import { Producto } from "./Producto.js";
import { rarezaArmas, tipoArma } from "../../constants/Constants.js";

/**
 * Clase Arco_Caza
 *
 * Representa un tipo específico de producto: un arco de caza.
 * Hereda de la clase Producto, por lo que tiene todas las propiedades
 * de un producto: nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Arco_Caza extends Producto {
  /**
   * Constructor de la clase Arco_Caza
   * @param {string} nombre - Nombre del arco
   * @param {string} imagen - Imagen o URL del arco
   * @param {number} precio - Precio del arco
   * @param {string} rareza - Rareza del arco (ej. común, raro, épico)
   * @param {string} tipo - Tipo de producto (ej. "arma")
   * @param {number} bonus - Valor de bonificación que aporta
   */
  constructor(
    id,
    nombre,
    imagen = "src/assests/img/objects_img/espada_corta.webp",
    precio = 140.0,
    rareza = rarezaArmas.comun,
    tipo = tipoArma.arma,
    bonus = 7
  ) {
    super(id, nombre, imagen, precio, rareza, tipo, bonus);
  }
}
