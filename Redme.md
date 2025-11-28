# Juego cliente y diseño RPG - IES Albarregas

## Pasos para usar JSDoc

### 1. Instalar JSDoc
Instalar JSDoc de forma global:
npm install -g jsdoc

2. Añadir comentarios JSDoc en el código
Los comentarios deben escribirse usando el formato:
js

/**
 * Descripción de la función.
 * @param {number} a - Primer número.
 * @param {number} b - Segundo número.
 * @returns {number} Resultado de la suma.
 */
function sumar(a, b) {
  return a + b;
}

Fuente: KeepCoding (https://keepcoding.io/blog/comentarios-js-doc/)

3. Generar la documentación
Para generar la documentación de todos los archivos .js del proyecto:

jsdoc ./ -r

./ → indica el directorio actual
-r → busca los archivos de forma recursiva en subcarpetas

La documentación generada se guardará automáticamente en la carpeta:
out/