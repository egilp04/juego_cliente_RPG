import { Producto } from "./Producto.js";

export class Mandoble_Epico extends Producto {
  constructor(nombre, imagen, precio, rareza, tipo, bonus) {
    super(nombre, imagen, precio, rareza, tipo, bonus);
  }
}
