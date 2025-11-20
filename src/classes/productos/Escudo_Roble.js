import { Producto } from "./Producto.js";

export class Escudo_Roble extends Producto {
  constructor(nombre, imagen, precio, rareza, tipo, bonus) {
    super(nombre, imagen, precio, rareza, tipo, bonus);
  }
}
