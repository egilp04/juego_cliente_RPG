import { Enemigo } from "./Enemigo.js";

/**
 * Clase Goblin
 * Representa un enemigo de tipo Goblin en el juego.
 * Hereda de la clase Enemigo, por lo que tiene las propiedades:
 * nombre, avatar, ataque y hp.
 */
export class Goblin extends Enemigo {
  /**
   * Constructor de la clase Goblin
   * @param {string} nombre - Nombre del Goblin
   * @param {string} avatar - Imagen o referencia visual del Goblin
   * @param {number} ataque - Valor de ataque del Goblin
   * @param {number} hp - Puntos de vida del Goblin
   */
  constructor(nombre, avatar, ataque, hp) {
    // Llamamos al constructor de la clase padre (Enemigo)
    // Esto inicializa las propiedades heredadas: nombre, avatar, ataque y hp
    super(nombre, avatar, ataque, hp);
  }
}
