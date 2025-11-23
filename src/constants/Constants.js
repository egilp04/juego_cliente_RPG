// Datos armas
// ====================
// Tipos y rarezas de armas
// ====================

/**
 * Tipos de productos disponibles en el juego.
 * @enum {string}
 */
export const tipoArma = {
  arma: "arma", // Para armas ofensivas
  armadura: "armadura", // Para equipo defensivo
  consumible: "consumible", // Para objetos que se consumen (pociones, elixires)
};

/**
 * Rareza de las armas o productos.
 * @enum {string}
 */
export const rarezaArmas = {
  comun: "comun", // Común, fácil de conseguir
  raro: "raro", // Raro, más difícil de conseguir
  epico: "epico", // Épico, muy difícil de conseguir
};

// ====================
// Datos del jugador
// ====================

/**
 * Vida máxima que puede tener cualquier jugador
 * @type {number}
 */
export const vidaMaximaJugador = 100;

/**
 * Puntos base que recibe cualquier jugador al inicio
 * @type {number}
 */
export const puntosBase = 100;

// ====================
// Imágenes / Avatares
// ====================

/**
 * Ruta del avatar del Cazador (jugador principal)
 * @type {string}
 */
export const avatarCazador = "src/assests/img/character_img/cazador.webp";

/**
 * Ruta del avatar del Goblin (enemigo)
 * @type {string}
 */
export const avatarGoblin = "src/assests/img/enemies_img/goblin.webp";

/**
 * Ruta del avatar del Lobo (enemigo)
 * @type {string}
 */
export const avatarLobo = "src/assests/img/enemies_img/lobo.webp";

/**
 * Ruta del avatar del Bandido (enemigo)
 * @type {string}
 */
export const avatarBandido = "src/assests/img/enemies_img/bandido.webp";

/**
 * Ruta del avatar del Dragón (enemigo)
 * @type {string}
 */
export const avatarDragon = "src/assests/img/enemies_img/dragon.webp";

/**
 * Ruta del avatar del Jefe (enemigo)
 * @type {string}
 */
export const avatarJefe = "src/assests/img/enemies_img/jefe.webp";
