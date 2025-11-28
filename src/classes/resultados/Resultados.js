export class Resultados {
  constructor(
    atacante,
    atacado,
    vidaJugadorTotal,
    vidaEnemigoTotal,
    danioRecibido
  ) {
    this._atacante = atacante;
    this._atacado = atacado;
    this._vidaJugadorTotal = vidaJugadorTotal;
    this._vidaEnemigoTotal = vidaEnemigoTotal;
    this._danioRecibido = danioRecibido;
  }

  get atacante() {
    return this._atacante;
  }
  get atacado() {
    return this._atacado;
  }

  get vidaEnemigoTotal() {
    return this._vidaEnemigoTotal;
  }

  get vidaJugadorTotal() {
    return this._vidaJugadorTotal;
  }

  get danioRecibido() {
    return this._danioRecibido;
  }

  set atacante(atacante) {
    this._atacante = atacante;
  }

  set atacado(atacado) {
    this._atacado = atacado;
  }

  set vidaEnemigoTotal(vidaEnemigoTotal) {
    this._vidaEnemigoTotal = vidaEnemigoTotal;
  }

  set vidaJugadorTotal(vidaJugadorTotal) {
    this._vidaJugadorTotal = vidaJugadorTotal;
  }

  set danioRecibido(danioRecibido) {
    this._danioRecibido = danioRecibido;
  }
}
