export class Enemigo {
  constructor(nombre, avatar, ataque, hp) {
    this._nombre = nombre;
    this._avatar = avatar;
    this._ataque = ataque;
    this._hp = hp;
  }
  set nombre(nombre) {
    this._nombre = nombre;
  }
  set avatar(url) {
    this._avatar = url;
  }
  set ataque(ataque) {
    this._ataque = ataque;
  }
  set hp(hp) {
    this._hp = hp;
  }
  get nombre() {
    return this._nombre;
  }
  get avatar() {
    return this._avatar;
  }
  get ataque() {
    return this._ataque;
  }
  get hp() {
    return this._hp;
  }
}
