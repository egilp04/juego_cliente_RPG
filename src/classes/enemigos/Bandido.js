import { Enemigo } from "./Enemigo.js";

export class Bandido extends Enemigo {
  constructor(nombre, avatar, ataque, hp) {
    super(nombre, avatar, ataque, hp);
  }
}
