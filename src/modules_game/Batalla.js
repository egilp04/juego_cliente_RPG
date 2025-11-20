import { Jefe } from "../classes/enemigos/Jefe.js";

export function combate(enemigo, jugador) {
  const muerte = 0;
  let { ataqueTotal, defensaTotal, vidaTotal } =
    jugador.obtenerEstadisticasFinales();
  const ataqueEnemigo = enemigo.ataque;
  let vidaJugador = vidaTotal + defensaTotal;
  let vidaEnemigo = enemigo.hp;

  do {
    let turno = Math.floor(Math.random() * 2);
    if (turno <= 0) {
      vidaJugador = Math.max(vidaJugador - ataqueEnemigo, muerte);
    } else {
      vidaEnemigo = Math.max(vidaEnemigo - ataqueTotal, muerte);
    }

    jugador.hp = vidaJugador;
    enemigo.hp = vidaEnemigo;
  } while (vidaJugador > muerte && vidaEnemigo > muerte);

  const ganador = vidaJugador > 0 ? jugador : enemigo;
  let puntos = 0;

  if (ganador === jugador) {
    if (enemigo instanceof Jefe)
      puntos = jugador.sumarPuntos(ataqueEnemigo * enemigo.multiplicadorDanio);
    else puntos = jugador.sumarPuntos(ataqueEnemigo);
  }

  return { ganador, puntos };
}
