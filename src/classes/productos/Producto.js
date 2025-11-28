import { rarezaArmas, tipoArma } from "../../constants/Constants.js";

export class Producto {
  constructor(id, nombre, imagen, precio, rareza, tipo, bonus) {
    this._id = id;
    this._nombre = nombre;
    this._imagen = imagen;
    this._precio = precio;
    this._rareza = rareza;
    this._tipo = tipo;
    this._bonus = bonus;
  }
  get nombre() {
    return this._nombre;
  }
  get imagen() {
    return this._imagen;
  }
  get precio() {
    return this._precio;
  }
  get rareza() {
    return this._rareza;
  }
  get tipo() {
    return this._tipo;
  }
  get bonus() {
    return this._bonus;
  }
  get id() {
    return this._id;
  }
  set nombre(nombre) {
    this._nombre = nombre;
  }
  set imagen(imagen) {
    this._imagen = imagen;
  }
  set precio(precio) {
    this._precio = precio;
  }
  set rareza(rareza) {
    this._rareza = rareza;
  }
  set tipo(tipo) {
    this._tipo = tipo;
  }
  set bonus(bonus) {
    this._bonus = bonus;
  }
  set id(id) {
    this._id = id;
  }
  formatearAtributos = function (precioNum) {
    const precio = (precioNum / 100).toFixed(2).replace(".", ",") + "€";
    return precio;
  };

  aplicarDescuento = function (descuento) {
    this._precio *= 1 - descuento;
  };

  clonarProducto = function () {
    return new Producto(
      this._id,
      this._nombre,
      this._imagen,
      this._precio,
      this._rareza,
      this._tipo,
      this._bonus
    );
  };
}
