import { Producto } from "../productos/Producto.js";
export class Jugador {
  constructor(
    nombre,
    hp,
    avatar,
    ataque,
    defensa,
    puntos,
    vidaMaxima,
    inventario
  ) {
    this._nombre = nombre;
    this._hp = hp;
    this._avatar = avatar;
    this._ataque = ataque;
    this._defensa = defensa;
    this._puntos = puntos;
    this._vidaMaxima = vidaMaxima;
    this._inventario = inventario;
  }
  get nombre() {
    return this._nombre;
  }
  get hp() {
    return this._hp;
  }
  get avatar() {
    return this._avatar;
  }
  get puntos() {
    return this._puntos;
  }
  get vidaMaxima() {
    return this._vidaMaxima;
  }
  get inventario() {
    return this._inventario;
  }
  get ataque() {
    return this._ataque;
  }
  get defensa() {
    return this._defensa;
  }
  set nombre(nombre) {
    this._nombre = nombre;
  }
  set hp(hp) {
    this._hp = hp;
  }
  set avatar(avatar) {
    this._avatar = avatar;
  }
  set puntos(puntos) {
    this._puntos = puntos;
  }
  set vidaMaxima(vidaMaxima) {
    this._vidaMaxima = vidaMaxima;
  }
  set inventario(inventario) {
    this._inventario = inventario;
  }
  set ataque(ataque) {
    this._ataque = ataque;
  }
  set defensa(defensa) {
    this._defensa = defensa;
  }

  sumarPuntos = function (puntos) {
    this._puntos += puntos;
    return this._puntos;
  };

  addObjInventario = function (producto, longitudMax = 6) {
    const productoComprado = producto.clonarProducto();
    this._inventario.push(productoComprado);
  };

  eliminarObjInventario = function (producto) {
    const indexDelete = this._inventario.findIndex(
      (p) => p.nombre === producto.nombre
    );
    if (indexDelete === -1) return;
    this._inventario.splice(indexDelete, 1);
  };

  obtenerEstadisticasFinales = function () {
    if (!this.verificarTamInventario()) {
      return {
        ataqueTotal: this._ataque,
        defensaTotal: this._defensa,
        vidaTotal: this._hp,
      };
    }
    return {
      ataqueTotal: this.obtenerAtaqueTotal(),
      defensaTotal: this.obtenerDefensaTotal(),
      vidaTotal: this.obtenerVidaTotal(),
    };
  };

  obtenerAtaqueTotal = function () {
    const bonusAtaque = this._inventario
      .filter((producto) => producto.tipo === "arma")
      .reduce((total, producto) => total + producto.bonus, 0);
    this._ataque += bonusAtaque;
    return this._ataque;
  };

  obtenerDefensaTotal = function () {
    const bonusDefensa = this._inventario
      .filter((producto) => producto.tipo === "armadura")
      .reduce((total, producto) => total + producto.bonus, 0);
    this._defensa += bonusDefensa;
    return this._defensa;
  };

  obtenerVidaTotal = function () {
    const bonusHp = this._inventario
      .filter((producto) => producto.tipo === "consumible")
      .reduce((total, producto) => total + producto.bonus, 0);
    this._hp = Math.min(this._hp + bonusHp, this._vidaMaxima);
    return this._hp;
  };

  verificarTamInventario = function () {
    if (!this.inventario || this.inventario.length <= 0) return false;
    else return true;
  };
}
