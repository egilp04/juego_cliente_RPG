import { vidaMaximaJugador, puntosBase } from "../../constants/Constants.js";
import { Jugador } from "./Jugador.js";

export class Cazador extends Jugador {
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
