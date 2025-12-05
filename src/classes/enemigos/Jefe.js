import { Enemigo } from "./Enemigo.js";

/**
 * Clase Jefe
 * Representa un enemigo especial de tipo Jefe en el juego.
 * Hereda de Enemigo (nombre, avatar, ataque, hp) y añade un
 * multiplicador de daño exclusivo.
 */
export class Jefe extends Enemigo {
  /**
   * Constructor de la clase Jefe
   * @param {string} nombre - Nombre del Jefe
   * @param {string} avatar - Imagen o referencia visual del Jefe
   * @param {number} ataque - Valor de ataque del Jefe
   * @param {number} hp - Puntos de vida del Jefe
   * @param {number} multiplicadorDanio - Multiplicador para aumentar el daño (por defecto 1.2)
   */
  constructor(nombre, avatar, ataque, hp, multiplicadorDanio = 1.2) {
    // Llamamos al constructor de la clase padre (Enemigo)
    super(nombre, avatar, ataque, hp);

    // Propiedad exclusiva del Jefe
    // Representa un factor por el cual se multiplica su daño
    this._multiplicadorDanio = multiplicadorDanio;
  }

  // Setter para modificar el multiplicador de daño
  set multiplicadorDanio(multiplicadorDanio) {
    this._multiplicadorDanio = multiplicadorDanio;
  }

  // Getter para obtener el multiplicador de daño
  get multiplicadorDanio() {
    return this._multiplicadorDanio;
  }
}
