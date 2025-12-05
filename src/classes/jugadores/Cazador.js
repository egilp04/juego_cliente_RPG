import { vidaMaximaJugador, puntosBase } from "../../constants/Constants.js";
import { Jugador } from "./Jugador.js";

/**
 * Clase Cazador
 *
 * Representa un jugador de tipo Cazador en el juego.
 * Hereda de la clase Jugador y utiliza las propiedades básicas de un jugador:
 * nombre, hp, avatar, ataque, defensa, puntos, vida máxima e inventario.
 */
export class Cazador extends Jugador {
  /**
   * Constructor de la clase Cazador
   * @param {string} nombre - Nombre del jugador
   * @param {number} hp - Puntos de vida iniciales del jugador
   * @param {string} avatar - Imagen o referencia visual del jugador
   * @param {number} ataque - Valor de ataque del jugador
   * @param {number} defensa - Valor de defensa del jugador
   * @param {number} [puntos=puntosBase] - Puntos iniciales del jugador (por defecto puntosBase)
   * @param {number} [vidaMaxima=vidaMaximaJugador] - Vida máxima del jugador (por defecto vidaMaximaJugador)
   * @param {Array} [inventario=[]] - Inventario inicial del jugador (por defecto vacío)
   */
  constructor(
    nombre,
    hp,
    avatar,
    ataque,
    defensa,
    puntos = puntosBase,
    vidaMaxima = vidaMaximaJugador,
    inventario = []
  ) {
    super(nombre, hp, avatar, ataque, defensa, puntos, vidaMaxima, inventario);
  }
}
