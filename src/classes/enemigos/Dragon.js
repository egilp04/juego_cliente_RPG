import { Enemigo } from "./Enemigo.js";

export class Dragon extends Enemigo {
  constructor(nombre, avatar, ataque, hp, habilidad) {
    super(nombre, avatar, ataque, hp);
    this._habilidad = habilidad;
  }
}
