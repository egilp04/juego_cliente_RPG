import { Jefe } from "../classes/enemigos/Jefe.js";
import { Resultados } from "../classes/resultados/Resultados.js";
/**
 * Simula un combate entre un enemigo y un jugador.
 *
 * @param {Object} enemigo - Instancia de un enemigo (puede ser Jefe u otro Enemigo)
 * @param {Object} jugador - Instancia del jugador
 * @returns {Object} Devuelve un objeto con:
 *  - ganador: la entidad que sobrevivió (jugador o enemigo)
 *  - puntos: puntos obtenidos por el jugador si gana
 */
export function combate(enemigo, jugador) {
  const muerte = 0;
  let resultadoBatallas = [];
  let { ataqueTotal, defensaTotal, vidaTotal } =
    jugador.obtenerEstadisticasFinales();
  const ataqueEnemigo = enemigo.ataque;
  let vidaJugador = vidaTotal + defensaTotal;
  let vidaEnemigo = enemigo.hp;
  do {
    let turno = Math.floor(Math.random() * 2);
    if (turno <= 0) {
      vidaJugador = Math.max(vidaJugador - ataqueEnemigo, muerte);
      resultadoBatallas.push(
        new Resultados(
          "Enemigo",
          "Jugador",
          vidaJugador,
          vidaEnemigo,
          ataqueEnemigo
        )
      );
    } else {
      vidaEnemigo = Math.max(vidaEnemigo - ataqueTotal, muerte);
      resultadoBatallas.push(
        new Resultados(
          "Jugador",
          "Enemigo",
          vidaJugador,
          vidaEnemigo,
          ataqueTotal
        )
      );
    }
    jugador.hp = vidaJugador;
    enemigo.hp = vidaEnemigo;
  } while (vidaJugador > muerte && vidaEnemigo > muerte);
  const ganador = vidaJugador > 0 ? jugador : enemigo;
  let puntos = 0;
  if (ganador === jugador) {
    if (enemigo instanceof Jefe) {
      puntos = jugador.sumarPuntos(ataqueEnemigo * enemigo.multiplicadorDanio);
    } else {
      puntos = jugador.sumarPuntos(ataqueEnemigo);
    }
  }
  return { ganador, puntos, resultadoBatallas };
}
