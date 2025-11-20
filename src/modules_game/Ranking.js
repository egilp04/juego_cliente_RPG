export function distinguirJugador(puntuacion, umbral = 10) {
  return puntuacion > umbral ? "Veterano" : "Novato";
}
