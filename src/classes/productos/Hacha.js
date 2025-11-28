import { Producto } from "./Producto.js";
import { rarezaArmas, tipoArma } from "../../constants/Constants.js";

/**
 * Clase Hacha
 *
 * Representa un producto ofensivo: un hacha para el jugador.
 * Hereda de la clase Producto, incluyendo todas las propiedades básicas:
 * nombre, imagen, precio, rareza, tipo y bonus.
 */
export class Hacha extends Producto {
  /**
   * Constructor de la clase Hacha
   * @param {string} nombre - Nombre del hacha
   * @param {string} imagen - Imagen o URL del hacha
   * @param {number} precio - Precio del hacha
   * @param {string} rareza - Rareza del hacha (ej. común, raro, épico)
   * @param {string} tipo - Tipo de producto (ej. "arma")
   * @param {number} bonus - Valor de bonificación que aporta (ej. ataque extra)
   */
  constructor(
    id,
    nombre,
    imagen = "src/assests/img/objects_img/hacha.webp",
    precio = 120.0,
    rareza = rarezaArmas.comun,
    tipo = tipoArma.arma,
    bonus = 8
  ) {
    super(id, nombre, imagen, precio, rareza, tipo, bonus);
  }
}
