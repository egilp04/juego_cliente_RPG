import { rarezaArmas, tipoArma } from "../constants/Constants.js";
import {
  Arco_Caza,
  Armadura_Cuero,
  Botas,
  Casco,
  Elixir_Legendario,
  Escudo_Roble,
  Espada_Corta,
  Espada_Runica,
  Hacha,
  Mandoble_Epico,
  Manzana,
  Placas_Draconicas,
  Pocion_Grande,
  Pocion_Peque,
} from "../classes/indexProductos.js";

const listaProductos = [
  new Espada_Corta(
    "Espada corta",
    "src/assests/img/objects_img/espada_corta.png",
    120.0,
    rarezaArmas.comun,
    tipoArma.arma,
    8
  ),
  new Arco_Caza(
    "Arco caza",
    "src/assests/img/objects_img/arco.png",
    140.0,
    rarezaArmas.comun,
    tipoArma.arma,
    7
  ),
  new Armadura_Cuero(
    "Armadura cuero",
    "src/assests/img/objects_img/armadura.png",
    180.0,
    rarezaArmas.comun,
    tipoArma.armadura,
    6
  ),
  new Pocion_Peque(
    "Poción pequeña",
    "src/assests/img/objects_img/pocion_peque.png",
    40.0,
    rarezaArmas.comun,
    tipoArma.consumible,
    20
  ),
  new Espada_Runica(
    "Espada rúnica",
    "src/assests/img/objects_img/espada_runica.png",
    460.0,
    rarezaArmas.raro,
    tipoArma.arma,
    18
  ),
  new Escudo_Roble(
    "Escudo roble",
    "src/assests/img/objects_img/escudo.png",
    320.0,
    rarezaArmas.raro,
    tipoArma.armadura,
    14
  ),
  new Pocion_Grande(
    "Poción grande",
    "src/assests/img/objects_img/pocion_grande.png",
    110.0,
    rarezaArmas.raro,
    tipoArma.consumible,
    60
  ),
  new Mandoble_Epico(
    "Mandoble épico",
    "src/assests/img/objects_img/mandoble.png",
    950.0,
    rarezaArmas.epico,
    tipoArma.arma,
    32
  ),
  new Placas_Draconicas(
    "Placas dracónicas",
    "src/assests/img/objects_img/placas_draconicas.png",
    880.0,
    rarezaArmas.epico,
    tipoArma.armadura,
    28
  ),
  new Elixir_Legendario(
    "Elixir legendario",
    "src/assests/img/objects_img/elixir.png",
    520.0,
    rarezaArmas.epico,
    tipoArma.consumible,
    150
  ),
  new Manzana(
    "Manzana",
    "src/assests/img/objects_img/manzana.png",
    40.0,
    rarezaArmas.comun,
    tipoArma.consumible,
    10
  ),
  new Casco(
    "Casco",
    "src/assests/img/objects_img/casco.png",
    100.0,
    rarezaArmas.comun,
    tipoArma.armadura,
    10
  ),
  new Hacha(
    "Hacha",
    "src/assests/img/objects_img/hacha.png",
    120.0,
    rarezaArmas.comun,
    tipoArma.arma,
    8
  ),
  new Botas(
    "Botas",
    "src/assests/img/objects_img/botas.png",
    80.0,
    rarezaArmas.comun,
    tipoArma.armadura,
    4
  ),
];

let listaProductosFinales = [];

export function filtrarProductos(tipoRareza) {
  return listaProductosFinales.filter(
    (producto) => tipoRareza === producto.rareza
  );
}

export function aplicarDescuento(tipoRareza = "raro", descuento = 0.2) {
  listaProductosFinales = [];
  listaProductos.forEach((producto) => {
    const productoClonado = producto.clonarProducto();
    if (producto.rareza === tipoRareza)
      productoClonado.aplicarDescuento(descuento);
    listaProductosFinales.push(productoClonado);
  });
  return listaProductosFinales;
}

export function buscarProductoNombre(nombreProducto) {
  return listaProductosFinales.filter(
    (producto) => nombreProducto === producto.nombre
  );
}
