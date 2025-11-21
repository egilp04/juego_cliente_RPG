import { Jefe } from "../classes/enemigos/Jefe.js";

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
  // Valor mínimo de vida
  const muerte = 0;

  // Obtener estadísticas totales del jugador (incluyendo bonus de inventario)
  let { ataqueTotal, defensaTotal, vidaTotal } =
    jugador.obtenerEstadisticasFinales();

  // Ataque base del enemigo
  const ataqueEnemigo = enemigo.ataque;

  // Vida inicial del jugador y enemigo
  let vidaJugador = vidaTotal + defensaTotal; // defensa añadida a la vida
  let vidaEnemigo = enemigo.hp;

  // ====================
  // Bucle de combate
  // ====================
  do {
    // Determina quién ataca: 0 -> enemigo, 1 -> jugador
    let turno = Math.floor(Math.random() * 2);

    if (turno <= 0) {
      // El enemigo ataca al jugador
      vidaJugador = Math.max(vidaJugador - ataqueEnemigo, muerte);
    } else {
      // El jugador ataca al enemigo
      vidaEnemigo = Math.max(vidaEnemigo - ataqueTotal, muerte);
    }

    // Actualizar los puntos de vida actuales
    jugador.hp = vidaJugador;
    enemigo.hp = vidaEnemigo;
  } while (vidaJugador > muerte && vidaEnemigo > muerte); // continuar hasta que alguien muera

  // ====================
  // Determinar ganador
  // ====================
  const ganador = vidaJugador > 0 ? jugador : enemigo;

  // Puntos obtenidos por el jugador si gana
  let puntos = 0;

  if (ganador === jugador) {
    if (enemigo instanceof Jefe) {
      // Si es un jefe, los puntos se multiplican según su multiplicador de daño
      puntos = jugador.sumarPuntos(ataqueEnemigo * enemigo.multiplicadorDanio);
    } else {
      // Puntos normales igual al ataque del enemigo
      puntos = jugador.sumarPuntos(ataqueEnemigo);
    }
  }

  return { ganador, puntos };
}
