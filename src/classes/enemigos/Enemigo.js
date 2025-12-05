/**
 * Clase Enemigo
 *
 * Representa un enemigo genérico en el juego.
 * Esta clase se puede extender para crear tipos específicos de enemigos,
 * como Bandido, Goblin, Dragón, Lobo o Jefe.
 */
export class Enemigo {
  /**
   * Constructor de la clase Enemigo
   * @param {string} nombre - Nombre del enemigo
   * @param {string} avatar - URL o referencia visual del enemigo
   * @param {number} ataque - Valor de ataque base del enemigo
   * @param {number} hp - Puntos de vida del enemigo
   */
  constructor(nombre, avatar, ataque, hp) {
    this._nombre = nombre;
    this._avatar = avatar;
    this._ataque = ataque;
    this._hp = hp;
  }

  /**
   * Setter para modificar el nombre del enemigo
   * @param {string} nombre
   */
  set nombre(nombre) {
    this._nombre = nombre;
  }

  /**
   * Setter para modificar el avatar del enemigo
   * @param {string} url
   */
  set avatar(url) {
    this._avatar = url;
  }

  /**
   * Setter para modificar el ataque del enemigo
   * @param {number} ataque
   */
  set ataque(ataque) {
    this._ataque = ataque;
  }

  /**
   * Setter para modificar los puntos de vida (hp) del enemigo
   * @param {number} hp
   */
  set hp(hp) {
    this._hp = hp;
  }

  /**
   * Getter para obtener el nombre del enemigo
   * @returns {string}
   */
  get nombre() {
    return this._nombre;
  }

  /**
   * Getter para obtener el avatar del enemigo
   * @returns {string}
   */
  get avatar() {
    return this._avatar;
  }

  /**
   * Getter para obtener el valor de ataque del enemigo
   * @returns {number}
   */
  get ataque() {
    return this._ataque;
  }

  /**
   * Getter para obtener los puntos de vida del enemigo
   * @returns {number}
   */
  get hp() {
    return this._hp;
  }
}
