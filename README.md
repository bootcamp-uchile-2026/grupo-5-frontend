# LeeConNos — Frontend

Proyecto Frontend del e-commerce **LeeConNos**, librería independiente ficticia con curaduría de libreros y club de lectura. Desarrollado en el marco del Taller de Bootcamps (DCC, Universidad de Chile) por el equipo **Legión Atenea**.

> "Conectamos personas con libros a través de recomendaciones humanas y una comunidad que comparte la pasión por leer."

## Estado del proyecto

La aplicación se encuentra en etapa de maquetación y construcción de su base visual, utilizando HTML y CSS puro (sin framework ni bundler) a partir de los wireframes y lineamientos entregados por UX/UI. Se usan datos e imágenes simuladas mientras se avanza en la futura integración con Backend. Las vistas actuales no representan una versión final del producto.

## Tecnologías

- HTML5
- CSS3 (sin preprocesadores ni frameworks)
- JavaScript (básico)
- [Bootstrap Icons](https://icons.getbootstrap.com/) (vía CDN)
- Google Fonts: Lexend (fuente primaria) y Bree Serif (fuente secundaria/de marca), vía CDN
- Portadas de libro simuladas mediante la API pública de [Open Library](https://openlibrary.org/dev/docs/api/covers)

No se utiliza Node.js, npm ni ninguna herramienta de build: el proyecto es HTML y CSS estático.

## Estructura del repositorio

```
grupo-5-frontend/
├─ index.html                  # Página de Inicio
├─ CSS/
│  ├─ base.css                 # Paleta, tipografías y estilos globales compartidos
│  ├─ carrito.css              # Estilos específicos de Carrito
│  ├─ catalogo.css             # Estilos específicos de Catálogo
│  ├─ checkout.css             # Estilos específicos de Check out
│  ├─ confirmacion-compra.css  # Estilos específicos de Confirmacion de compra
│  ├─ ficha-libro.css          # Estilos específicos de Ficha de libro
│  ├─ inicio-sesion.css        # Estilos específicos de Inicio de sesión
│  └─ index.css                # Estilos específicos de Inicio
├─ paginas/
│  ├─ biblioteca.html
│  ├─ catalogo.html
│  ├─ checkout.html
│  ├─ comunidad.html
│  ├─ confirmacion-compra.html
│  ├─ descubrir.html
│  ├─ inicio-sesion.html
│  ├─ ficha-libro.html
│  ├─ mi-cuenta.html
│  ├─ biblioteca.html
│  └─ recomendaciones.html
├─ js
│  ├─ carrito.js
│  └─ inicio-sesion.js
├─ imagenes/
│  └─ iconos/                  # Íconos de redes sociales (footer)
├─ Logos/                      # Variantes del logo de LeeConNos
└─ LICENSE
```

### Convenciones

- Nombres de archivo en español, en minúsculas y separados por guiones (ej. `ficha-libro.html`, `catalogo.css`).
- Cada vista principal tiene su propia hoja de estilos con el mismo nombre.
- Los estilos transversales (paleta de colores, tipografía, escala tipográfica, header, footer) se centralizan en `base.css`.
- Los recursos gráficos se separan por tipo en `imagenes/` y `Logos/`.

## Cómo ejecutar el proyecto

No requiere instalación ni dependencias.

**Opción 1 — Abrir directamente**
Abrir `index.html` haciendo doble clic desde el explorador de archivos.

**Opción 2 — Live Server (recomendada)**
1. Abrir la carpeta del proyecto en VS Code.
2. Instalar la extensión [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer), si no está instalada.
3. Clic derecho sobre `index.html` → **Open with Live Server** (o el botón **Go Live** en la barra inferior).

Se recomienda esta segunda opción para que las rutas relativas entre páginas y estilos se sirvan correctamente.

### Navegadores probados

- Google Chrome
- Microsoft Edge

## Navegación

Desde el header se accede a: Inicio, Catálogo, Comunidad, Descubrir, Recomendaciones, Biblioteca, Mi Cuenta, Inicio de sesión y Carrito.
Desde el ícono de persona, se puede acceder a inicio de sesión (`inicio-sesion.html`).
└─> Inicio > Inicio de sesión
Desde las tarjetas de libro (en Inicio y Catálogo) se accede a la ficha de detalle del libro (`ficha-libro.html`).
└─> Inicio > Ficha libro
└─> Catálogo > Ficha libro

Desde el ícono de bolsa de comprar (`Carrito.html`), se puede acceder al Check out (`checkout.html`), además, desde el Check out se puede acceder a la Confirmación de la compra (`confirmacion-compra.html`) **sólo si es que se llenan todos los campos obligatorios correctamente.**
└─> Inicio > Carrito > Check out > Confirmación compra
└─> Catálogo > Carrito > Check out > Confirmación compra
└─> Comunidad > Carrito > Check out > Confirmación compra
└─> Descubrir > Carrito > Check out > Confirmación compra
└─> Recomendaciones > Carrito > Check out > Confirmación compra
└─> Biblioteca > Carrito > Check out > Confirmación compra
└─> Mi cuenta > Carrito > Check out > Confirmación compra

Además, desde la Confirmación de compra se puede ir al inicio para "volver a comprar" o ir a Comunidad.
└─> Confirmación compra > Inicio
└─> Confirmación compra > Comunidad

## Componentes reutilizables

| Componente | Uso |
|---|---|
| `.tarjeta-libro-*` (portada, título, autor, precio, favorito) | Inicio, Catálogo, Ficha de libro |
| `.tarjeta-*-curador` (imagen, header, nombre) | Perfiles de librero en Inicio |
| `.catalogo-tarjeta`, `.catalogo-etiqueta`, `.catalogo-precio-actual` / `.catalogo-precio-anterior` | Grilla del Catálogo |
| `.header-icono`, `.footer-columna` | Navegación y footer, compartidos en todas las vistas |

## Datos simulados

Los datos de ejemplo (títulos, autores, precios, etiquetas) están escritos directamente en el HTML. Las portadas de libro se obtienen mediante URLs de la API pública de Open Library (`covers.openlibrary.org`). No existe aún un archivo de datos independiente (JSON u otro); su consistencia con las interfaces de Backend queda pendiente de validar una vez definidos los contratos de datos (DTOs).


## Licencia

Ver [LICENSE](./LICENSE).
