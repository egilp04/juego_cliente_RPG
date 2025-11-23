import { Enemigo } from "./Enemigo.js";
/**
 * Clase Bandido
 * Representa un enemigo de tipo Bandido en el juego.
 * Hereda de la clase Enemigo, por lo que tiene nombre, avatar, ataque y hp.
 */
export class Bandido extends Enemigo {
  /**
   * Constructor de la clase Bandido
   * @param {string} nombre - El nombre del Bandido
   * @param {string} avatar - La URL o referencia al avatar del Bandido
   * @param {number} ataque - El valor de ataque del Bandido
   * @param {number} hp - Los puntos de vida (Health Points) del Bandido
   */
  constructor(nombre, avatar, ataque, hp) {
    // Llamamos al constructor de la clase padre (Enemigo)
    // Esto inicializa las propiedades heredadas con los valores recibidos
    super(nombre, avatar, ataque, hp);
  }
}
