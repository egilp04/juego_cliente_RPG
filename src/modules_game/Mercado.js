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

// ====================
// Lista inicial de productos del juego
// ====================
const listaProductos = [
  new Espada_Corta(
    1,
    "Espada corta",
    "src/assests/img/objects_img/espada_corta.webp",
    120.0,
    rarezaArmas.comun,
    tipoArma.arma,
    8
  ),
  new Arco_Caza(
    2,
    "Arco caza",
    "src/assests/img/objects_img/arco.webp",
    140.0,
    rarezaArmas.comun,
    tipoArma.arma,
    7
  ),
  new Armadura_Cuero(
    3,
    "Armadura cuero",
    "src/assests/img/objects_img/armadura.webp",
    180.0,
    rarezaArmas.comun,
    tipoArma.armadura,
    6
  ),
  new Pocion_Peque(
    4,
    "Poción pequeña",
    "src/assests/img/objects_img/pocion_peque.webp",
    40.0,
    rarezaArmas.comun,
    tipoArma.consumible,
    20
  ),
  new Espada_Runica(
    5,
    "Espada rúnica",
    "src/assests/img/objects_img/espada_runica.webp",
    460.0,
    rarezaArmas.raro,
    tipoArma.arma,
    18
  ),
  new Escudo_Roble(
    6,
    "Escudo roble",
    "src/assests/img/objects_img/escudo.webp",
    320.0,
    rarezaArmas.raro,
    tipoArma.armadura,
    14
  ),
  new Pocion_Grande(
    7,
    "Poción grande",
    "src/assests/img/objects_img/pocion_grande.webp",
    110.0,
    rarezaArmas.raro,
    tipoArma.consumible,
    60
  ),
  new Mandoble_Epico(
    8,
    "Mandoble épico",
    "src/assests/img/objects_img/mandoble.webp",
    950.0,
    rarezaArmas.epico,
    tipoArma.arma,
    32
  ),
  new Placas_Draconicas(
    9,
    "Placas dracónicas",
    "src/assests/img/objects_img/placas_draconicas.webp",
    880.0,
    rarezaArmas.epico,
    tipoArma.armadura,
    28
  ),
  new Elixir_Legendario(
    10,
    "Elixir legendario",
    "src/assests/img/objects_img/elixir.webp",
    520.0,
    rarezaArmas.epico,
    tipoArma.consumible,
    150
  ),
  new Manzana(
    11,
    "Manzana",
    "src/assests/img/objects_img/manzana.webp",
    40.0,
    rarezaArmas.comun,
    tipoArma.consumible,
    10
  ),
  new Casco(
    12,
    "Casco",
    "src/assests/img/objects_img/casco.webp",
    100.0,
    rarezaArmas.comun,
    tipoArma.armadura,
    10
  ),
  new Hacha(
    13,
    "Hacha",
    "src/assests/img/objects_img/hacha.webp",
    120.0,
    rarezaArmas.comun,
    tipoArma.arma,
    8
  ),
  new Botas(
    14,
    "Botas",
    "src/assests/img/objects_img/botas.webp",
    80.0,
    rarezaArmas.comun,
    tipoArma.armadura,
    4
  ),
];

/**
 * Filtra productos por rareza
 * @param {string} tipoRareza - Rareza a filtrar (ej. "comun", "raro", "epico")
 * @returns {Producto[]} Lista de productos que coinciden con la rareza
 */
export function filtrarProductos(tipoRareza, listaProductosFinales) {
  return listaProductosFinales.filter(
    (producto) => tipoRareza === producto.rareza
  );
}
/**
 * Aplica un descuento a los productos de la rareza indicada
 * @param {string} tipoRareza - Rareza a la que aplicar el descuento (por defecto "raro")
 * @param {number} descuento - Porcentaje de descuento en formato decimal (por defecto 0.2 → 20%)
 * @returns {Producto[]} Lista de productos finales con descuento aplicado
 */
export function aplicarDescuento(descuento = 0.2) {
  const rarezasDescuento = [
    rarezaArmas.comun,
    rarezaArmas.epico,
    rarezaArmas.raro,
  ];
  let listaProductosFinales = [];
  const tipoRareza =
    rarezasDescuento[Math.floor(Math.random() * rarezasDescuento.length)];
  listaProductos.forEach((producto) => {
    const productoClonado = producto.clonarProducto();
    if (producto.rareza === tipoRareza)
      productoClonado.aplicarDescuento(descuento);
    listaProductosFinales.push(productoClonado);
  });
  return listaProductosFinales;
}

/**
 * Busca productos por nombre exacto
 * @param {string} nombreProducto - Nombre del producto a buscar
 * @returns {Producto[]} Lista de productos que coinciden con el nombre
 */
export function buscarProductoNombre(nombreProducto, listaProductosFinales) {
  return listaProductosFinales.filter(
    (producto) =>
      nombreProducto.toLocaleLowerCase() === producto.nombre.toLocaleLowerCase()
  );
}
