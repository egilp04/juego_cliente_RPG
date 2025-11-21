import { Enemigo } from "./Enemigo.js";

/**
 * Clase Dragon
 * Representa un enemigo de tipo Dragón en el juego.
 * Hereda de la clase Enemigo (nombre, avatar, ataque, hp)
 * y añade una habilidad especial propia de los Dragones.
 */
export class Dragon extends Enemigo {
  /**
   * Constructor de la clase Dragon
   * @param {string} nombre - Nombre del Dragón
   * @param {string} avatar - Imagen o referencia visual del Dragón
   * @param {number} ataque - Valor de ataque del Dragón
   * @param {number} hp - Puntos de vida del Dragón
   * @param {string} habilidad - Habilidad especial del Dragón (por ejemplo "Llama", "Gélido")
   */
  constructor(nombre, avatar, ataque, hp, habilidad) {
    // Llamamos al constructor de la clase padre (Enemigo)
    // Esto inicializa las propiedades heredadas: nombre, avatar, ataque y hp
    super(nombre, avatar, ataque, hp);

    // Propiedad adicional exclusiva de Dragon
    // Representa la habilidad especial de este Dragón
    this._habilidad = habilidad;
  }
}
