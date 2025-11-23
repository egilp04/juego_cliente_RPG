import { Enemigo } from "./Enemigo.js";

/**
 * Clase Lobo
 *
 * Representa un enemigo de tipo Lobo en el juego.
 * Hereda todas las propiedades y métodos de la clase Enemigo:
 * - nombre
 * - avatar
 * - ataque
 * - hp
 *
 * Actualmente no añade propiedades ni métodos adicionales,
 * pero se puede extender en el futuro para incluir habilidades propias de un Lobo.
 */
export class Lobo extends Enemigo {
  /**
   * Constructor de la clase Lobo
   * @param {string} nombre - Nombre del Lobo
   * @param {string} avatar - Imagen o referencia visual del Lobo
   * @param {number} ataque - Valor de ataque del Lobo
   * @param {number} hp - Puntos de vida del Lobo
   */
  constructor(nombre, avatar, ataque, hp) {
    super(nombre, avatar, ataque, hp);
  }
}
