import { Producto } from "../productos/Producto.js";

/**
 * Clase Jugador
 *
 * Representa a un jugador en el juego con atributos básicos
 * como nombre, puntos de vida, ataque, defensa, inventario y puntos.
 * También incluye métodos para gestionar el inventario y calcular estadísticas totales.
 */
export class Jugador {
  /**
   * Constructor de la clase Jugador
   * @param {string} nombre - Nombre del jugador
   * @param {number} hp - Puntos de vida actuales
   * @param {string} avatar - Imagen o referencia visual del jugador
   * @param {number} ataque - Valor de ataque base del jugador
   * @param {number} defensa - Valor de defensa base del jugador
   * @param {number} puntos - Puntos del jugador
   * @param {number} vidaMaxima - Vida máxima del jugador
   * @param {Producto[]} inventario - Lista de objetos que posee el jugador
   */
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

  /**
   * Devuelve el nombre del jugador.
   * @returns {string} Nombre del jugador
   */
  get nombre() {
    return this._nombre;
  }

  /**
   * Devuelve los puntos de vida actuales del jugador.
   * @returns {number} Puntos de vida
   */
  get hp() {
    return this._hp;
  }

  /**
   * Devuelve la referencia visual o avatar del jugador.
   * @returns {string} URL o referencia del avatar
   */
  get avatar() {
    return this._avatar;
  }

  /**
   * Devuelve los puntos acumulados del jugador.
   * @returns {number} Puntos del jugador
   */
  get puntos() {
    return this._puntos;
  }

  /**
   * Devuelve la vida máxima que puede tener el jugador.
   * @returns {number} Vida máxima
   */
  get vidaMaxima() {
    return this._vidaMaxima;
  }

  /**
   * Devuelve el inventario completo del jugador.
   * @returns {Producto[]} Array de productos en el inventario
   */
  get inventario() {
    return this._inventario;
  }

  /**
   * Devuelve el valor de ataque base del jugador.
   * @returns {number} Ataque
   */
  get ataque() {
    return this._ataque;
  }

  /**
   * Devuelve el valor de defensa base del jugador.
   * @returns {number} Defensa
   */
  get defensa() {
    return this._defensa;
  }
  /**
   * Establece el nombre del jugador.
   * @param {string} nombre - Nuevo nombre
   */
  set nombre(nombre) {
    this._nombre = nombre;
  }

  /**
   * Establece los puntos de vida actuales del jugador.
   * @param {number} hp - Nuevos puntos de vida
   */
  set hp(hp) {
    this._hp = hp;
  }

  /**
   * Establece la referencia visual o avatar del jugador.
   * @param {string} avatar - Nueva URL o referencia
   */
  set avatar(avatar) {
    this._avatar = avatar;
  }

  /**
   * Establece los puntos acumulados del jugador.
   * @param {number} puntos - Nuevos puntos
   */
  set puntos(puntos) {
    this._puntos = puntos;
  }

  /**
   * Establece la vida máxima que puede tener el jugador.
   * @param {number} vidaMaxima - Nueva vida máxima
   */
  set vidaMaxima(vidaMaxima) {
    this._vidaMaxima = vidaMaxima;
  }

  /**
   * Establece el inventario del jugador.
   * @param {Producto[]} inventario - Nuevo array de productos
   */
  set inventario(inventario) {
    this._inventario = inventario;
  }

  /**
   * Establece el valor de ataque base del jugador.
   * @param {number} ataque - Nuevo valor de ataque
   */
  set ataque(ataque) {
    this._ataque = ataque;
  }

  /**
   * Establece el valor de defensa base del jugador.
   * @param {number} defensa - Nuevo valor de defensa
   */
  set defensa(defensa) {
    this._defensa = defensa;
  }
  /**
   * Suma puntos al total del jugador
   * @param {number} puntos - Cantidad de puntos a sumar
   * @returns {number} Total actualizado de puntos
   */
  sumarPuntos = function (puntos) {
    this._puntos += puntos;
    return this._puntos;
  };

  /**
   * Añade un objeto al inventario
   * @param {Producto} producto - Producto a añadir
   * @param {number} [longitudMax=6] - Longitud máxima del inventario
   */
  addObjInventario = function (producto, longitudMax = 6) {
    const productoComprado = producto.clonarProducto();
    this._inventario.push(productoComprado);
  };

  /**
   * Elimina un objeto del inventario
   * @param {Producto} producto - Producto a eliminar
   */
  eliminarObjInventario = function (producto) {
    const indexDelete = this._inventario.findIndex(
      (p) => p.nombre === producto.nombre
    );
    if (indexDelete === -1) return;
    this._inventario.splice(indexDelete, 1);
  };

  /**
   * Devuelve las estadísticas finales del jugador
   * teniendo en cuenta los bonus de los objetos en el inventario
   * @returns {Object} Contiene ataqueTotal, defensaTotal y vidaTotal
   */
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

  /**
   * Calcula el ataque total del jugador sumando bonus de armas
   * @returns {number} Ataque total
   */
  obtenerAtaqueTotal = function () {
    const bonusAtaque = this._inventario
      .filter((producto) => producto.tipo === "arma")
      .reduce((total, producto) => total + producto.bonus, 0);
    this._ataque += bonusAtaque;
    return this._ataque;
  };

  /**
   * Calcula la defensa total del jugador sumando bonus de armaduras
   * @returns {number} Defensa total
   */
  obtenerDefensaTotal = function () {
    const bonusDefensa = this._inventario
      .filter((producto) => producto.tipo === "armadura")
      .reduce((total, producto) => total + producto.bonus, 0);
    this._defensa += bonusDefensa;
    return this._defensa;
  };

  /**
   * Calcula la vida total del jugador sumando bonus de consumibles
   * sin superar la vida máxima
   * @returns {number} Vida total
   */
  obtenerVidaTotal = function () {
    const bonusHp = this._inventario
      .filter((producto) => producto.tipo === "consumible")
      .reduce((total, producto) => total + producto.bonus, 0);
    this._hp = Math.min(this._hp + bonusHp, this._vidaMaxima);
    return this._hp;
  };

  /**
   * Verifica si el inventario tiene objetos
   * @returns {boolean} true si hay objetos, false si está vacío
   */
  verificarTamInventario = function () {
    if (!this.inventario || this.inventario.length <= 0) return false;
    else return true;
  };
}
