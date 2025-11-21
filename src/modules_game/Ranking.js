/**
 * Determina el nivel de un jugador según su puntuación.
 *
 * @param {number} puntuacion - Puntos actuales del jugador
 * @param {number} [umbral=10] - Valor mínimo para ser considerado "Veterano"
 * @returns {string} "Veterano" si la puntuación supera el umbral, "Novato" en caso contrario
 */
export function distinguirJugador(puntuacion, umbral = 10) {
  return puntuacion > umbral ? "Veterano" : "Novato";
}
