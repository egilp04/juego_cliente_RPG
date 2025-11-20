import { Producto } from "./Producto.js";

export class Botas extends Producto {
  constructor(nombre, imagen, precio, rareza, tipo, bonus) {
    super(nombre, imagen, precio, rareza, tipo, bonus);
  }
}
