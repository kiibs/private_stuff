# Un año de nosotros — web de aniversario

Web estática para GitHub Pages con HTML, CSS y JavaScript. Incluye portada con cuenta atrás al 29 de octubre de 2026, cuestionario y recomendaciones basadas en 15 restaurantes facilitados por la usuaria.

## Archivos
- `index.html`: estructura de la web.
- `styles.css`: diseño responsive y animaciones.
- `script.js`: cuenta atrás, cuestionario y puntuación de restaurantes.
- `restaurants.json`: catálogo editable de restaurantes y clasificaciones orientativas.

## Importante sobre privacidad
La pantalla de palabra secreta es solamente una barrera visual para la sorpresa. **No protege realmente la web**: en un repositorio público, cualquiera puede inspeccionar los archivos, leer `restaurants.json` y descubrir la palabra del JavaScript. No incluyas información personal o sensible. Si necesitas privacidad real, usa un repositorio privado y una modalidad de Pages que permita restringir el acceso, o un servicio con autenticación real. La web no contiene API keys ni backend.

## Personalizar la palabra secreta
En `script.js`, cambia:
```js
const SECRET_WORD = "nosotros";
```
Es solo un pequeño detalle de la experiencia, no seguridad real.

## Publicar en GitHub Pages
1. Crea un repositorio en GitHub.
2. Sube los cuatro archivos (`index.html`, `styles.css`, `script.js`, `restaurants.json`) a la raíz del repositorio.
3. En GitHub abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Elige la rama `main` y la carpeta `/ (root)`, guarda.
6. Espera a que GitHub publique la web y abre la URL que indique Pages.

## Probar en local
Como `fetch("restaurants.json")` puede fallar si abres `index.html` directamente con `file://`, ejecuta un servidor local desde esta carpeta, por ejemplo:
```bash
python -m http.server 8000
```
Después abre `http://localhost:8000`.

## Catálogo
Los precios y descripciones son aproximados, basados en fuentes públicas consultadas durante la preparación. Comprueba carta, horarios, dirección y disponibilidad antes de reservar. Los campos de `restaurants.json` se pueden editar manualmente; la web no analiza las páginas automáticamente.


## Personalizar la foto de pareja

Copia vuestra foto en la carpeta `assets/` y llámala `foto-nuestra.jpg`. La portada ya tiene un marco preparado para mostrarla. Si prefieres otro nombre o formato, cambia `assets/foto-nuestra.jpg` en `styles.css`.

La contraseña de entrada es `52!`. Tras el primer intento fallido aparece la pista `lo mucho que te quiero`. Recuerda que esta pantalla es decorativa y no protege archivos en GitHub Pages.

Las tarjetas incluyen fotos remotas de Diurno, Piotta Romana, Circolo Popolare y Nacha. Para otras opciones se muestra una ilustración de reserva hasta que se añada una foto verificada en el campo `photo` de `restaurants.json`.


**Foto vuestra:** no se incluye ninguna foto personal por privacidad. Para que aparezca vuestra imagen, añade una foto llamada `foto-nuestra.jpg` dentro de `assets/`. La web muestra mientras tanto una ilustración romántica en ese marco. El comentario `FOTO VUESTRA` de `index.html` y `styles.css` señala el lugar correspondiente.
