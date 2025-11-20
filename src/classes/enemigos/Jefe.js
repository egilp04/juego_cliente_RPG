import { Enemigo } from "./Enemigo.js";

export class Jefe extends Enemigo {
  constructor(nombre, avatar, ataque, hp, multiplicadorDanio = 1.2) {
    super(nombre, avatar, ataque, hp);
    this._multiplicadorDanio = multiplicadorDanio;
  }

  set multiplicadorDanio(multiplicadorDanio) {
    this._multiplicadorDanio = multiplicadorDanio;
  }
  get multiplicadorDanio() {
    return this._multiplicadorDanio;
  }
}
