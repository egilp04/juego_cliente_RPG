import { Producto } from "./Producto.js";

export class Hacha extends Producto {
  constructor(nombre, imagen, precio, rareza, tipo, bonus) {
    super(nombre, imagen, precio, rareza, tipo, bonus);
  }
}
