# Grupo 5 - Frontend

Proyecto frontend de LeeConNos.

## Feature-27

Esta rama continúa el trabajo de `73-1` y contiene exclusivamente el desarrollo inicial del Catálogo y la preparación de la página de detalle de libros.

### Catálogo

- Se incorporó una grilla responsive de tarjetas de libros.
- Se agregaron controles de filtrado, ordenamiento y contador de resultados.
- Las tarjetas muestran portada, título, autor, precio, etiquetas y acciones de compra.
- Se incorporaron portadas mock mediante URLs de Open Library.
- Todas las tarjetas permiten acceder a una única página de detalle.
- Se mantuvo el banner, header y footer heredados de `73-1`.

### Página de detalle

- Se creó `paginas/detalle-libro.html` como destino común de todas las tarjetas.
- La página queda vacía para un desarrollo posterior.
- Actualmente contiene únicamente el banner, header y footer compartidos.
- Se dejó espacio vertical entre header y footer para el futuro contenido.

### Archivos incorporados o modificados

- `paginas/catalogo.html`: vista del Catálogo y navegación hacia el detalle.
- `CSS/catalogo.css`: estilos propios de la grilla, tarjetas, filtros y newsletter.
- `paginas/detalle-libro.html`: página base vacía para el detalle.
- `CSS/base.css`: estilos compartidos necesarios para la estructura transversal.

No se modificó el desarrollo de la página de Inicio perteneciente a `73-1`.

