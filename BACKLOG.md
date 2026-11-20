# Backlog

## Schema de imágenes SEO (un documento por página)

Cada página tiene su propio documento de SEO con una tabla de imágenes:

- **Image name**: nuevo nombre del archivo. Si la fila no trae nombre, no se renombra.
- **Alt-Text**: se usa como `alt` y `title` de la imagen (o `title` del video).
- Los textos van en `app/i18n/dictionaries/en.ts`, con su traducción en `es.ts`.

### Home (HP) — `HP SEO Excellentia Foods.docx`

Estado: **aplicado** (18-nov-2026). Las imágenes y videos que se usan en la home ya tienen el nombre y el alt de la tabla.

Pendiente: las filas con **nombre alterno** para imágenes que ya existen. Cada imagen se usa una sola vez en la home y ya tiene el nombre de su primera fila. Estas se aplican cuando exista la sección o página que las use (por ejemplo, un catálogo), creando una copia del archivo con este nombre:

| Image name (doc) | Alt-Text (doc) | Archivo base en `public/products/` |
|---|---|---|
| premium quesos tio francisco are in excellentia foods catalog | Premium Quesos Tio Francisco authentic Hispanic cheeses are in excellentia foods catalog | Excellentia foods distributes tio francisco queso oaxaca.png |
| Authentic grated cotija cheese from excelsior you can find it at excellentia foods | Authentic Mexican cheese cotija grated from excelsior you can find it at Excellentia foods in several presentations | Excellentia foods distributes excelsior cotija cheese.png |
| Ask for bulk or package of Mexican and Salvadoran chorizo at excellentia foods | Bulk and packages of Mexican and Salvadoran chorizo at your local distributor Excellentia foods | Excellentia foods distributes reynaldos beef chorizo.png |
| Stock your business with the best longaniza from excellentia foods | Find and stock your business and restaurant with the best brands of longaniza at Excellentia Foods | Reynaldos premium pork cured longaniza sausage distributed by excellentia foods.png |
| Buy authentic Neapolitan flan from the best distributor Excellentia Foods | Buy authentic Neapolitan flan for your Hispanic market or restaurant from the best distributor, Excellentia Foods | Excellentia foods distributes flan napolitano from juan j.webp |

Los Alt-Text de la tabla llevan corregidos los errores de dedo del documento ("severak presentaions" → "several presentations").

### About — `About SEO.docx`

Estado: **textos resaltados aplicados** (18-nov-2026): meta title y description, historia 2003 / 2016 / Today y misión.

Pendiente: la tabla de imágenes del documento **no está resaltada**, así que no se aplicó. Trae dos filas, las dos apuntan a `Presentacion pagina web HD.mp4`, que hoy es `public/videos/We are excellentia foods your partner for authentic Latino staples.webm` (renombrado con la tabla de la HP):

| Image name (doc) | Alt-Text (doc) |
|---|---|
| Freshest Latino & international ingredients at excellentia foods | You'll find the best and freshest Latino & international ingredients at Excellentia |
| excellentia foods, a family owned business that has been bringing authentic Latin American products to San Diego for over 10 years | Video presentation of Excellentia Foods, a family-owned business that has been bringing authentic Latin American products to San Diego for over 10 years |

Hay que decidir cuál nombre usa el video, porque un archivo solo puede tener uno.

Sin nombre ni alt en ningún documento: `public/videos/portada about excellentia.webm` (hero de About).

### Otras páginas — pendiente

Terms & Conditions, Privacy Policy y EULA: aplicar su documento cuando exista.

### Archivos sin uso

No se usan en ninguna página: decidir si se borran o a qué página pertenecen. Están en `.gitignore` para no subirlos al repo (47 MB); si se usan en una página, quitar su línea de `.gitignore`.

- `public/videos/services excellentia video website.webm`
