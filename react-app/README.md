# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Carrito (Hito 2)

- Ejecutar: `pnpm install` y `pnpm dev` (http://localhost:5173).
- Estado: Zustand en `src/estado/carritoStore.ts`, persistido en `localStorage`.
- DTO: `src/tipos/carrito.ts` (`AgregarAlCarritoRequest`, `CarritoResponse`).
- Servicio dummy: `src/servicios/carritoServicio.ts` (sin Backend aún; reemplazar por HTTP/REST).
- UI: `src/componentes/Carrito.tsx`, se abre desde el ícono de carrito de la barra de navegación.

| Elemento | Diseñado | Implementado | Integrado con Backend |
| --- | --- | --- | --- |
| Vista carrito (overlay) | Sí | Sí | No (dummy) |
| Agregar desde catálogo / ficha | Sí | Sí | No (dummy) |
| Modificar cantidad / eliminar | Sí | Sí | No (dummy) |
| Checkout con formulario validado | Sí | Sí (simulado) | No |
| Confirmación con resumen del pedido | Sí | Sí (estado de navegación) | No |

Las secciones de Biblioteca, Comunidad, Descubrir, Mi cuenta y Recomendaciones
indican que están en construcción hasta contar con sus funcionalidades.
Descubrir, Biblioteca, Mi cuenta y Recomendaciones no tienen acceso desde la
barra de navegación.
La suscripción al newsletter también informa que su servicio aún no está
conectado; no confirma una suscripción inexistente.

## Barra de navegación (Hito 2)

- UI: `src/componentes/BarraNavegacion.tsx` (banner, logo, menú, buscador,
  usuario y carrito), con estilos en `src/estilos/barra-navegacion.css`.
- Desplegables: `MenuCatalogo.tsx`, `MenuDescubre.tsx` y `MenuComunidad.tsx`,
  con estilos en `src/estilos/menu-*.css`. Comparten el hook
  `src/componentes/useDesplegable.ts` (cierre con Esc o clic fuera).
- Sesión: lee `src/estado/sesionStore.ts` (Zustand, autenticación dummy) para
  mostrar "Hola, {nombre}" y el ícono de usuario en morado.
- Búsqueda: navega con React Router a `/catalogo?q=...`; ignora textos vacíos.
- Referencias de Figma: componente Header (node `1996:9439`), wireframe Home
  (`1839:7011`) y desplegables (`2294:20831`, `2294:20860`, `1547:6030`,
  `1547:6136`).

| Elemento | Diseñado | Implementado | Integrado con Backend |
| --- | --- | --- | --- |
| Banner con avisos rotativos | Sí | Sí (un aviso fijo) | No |
| Barra: logo, menú, buscador, usuario y carrito | Sí | Sí | No |
| Saludo "Hola, {nombre}" con sesión iniciada | Sí | Sí (sesión dummy) | No (dummy) |
| Contador del carrito | Sí | Sí | No (dummy) |
| Desplegable Catálogo (Géneros y Temáticas) | Sí | Sí ("Misterio y thriller" va a su página filtrada; el resto, a `/catalogo`) | No |
| Desplegable Descubre con nosotros | Sí | Sí (cada librero con perfil va a su perfil) | No |
| Desplegable Comunidad | Sí | Sí (todas las opciones van a `/comunidad`) | No |
| Menú del usuario (Mi cuenta / Cerrar sesión) | No | Sí | No (dummy) |
| Barra en mobile | Sí (wireframe mobile) | Provisorio (adaptación básica) | No |

Diferencias con el diseño:

- El color `#6200ee` del wireframe no existe en la paleta de `tokens.css`;
  quedó como variable local en `barra-navegacion.css`. El degradado del banner
  (`#094faa` → violeta) es el token `--degradado-banner`, compartido con la
  franja legal del footer.
- Los textos de los desplegables se unificaron en 14 px (salvo los títulos de
  columna de Catálogo, en 16 px, y "¿No sabes qué leer?", en 18 px).
- Los géneros y temáticas están en `src/datos/generos.ts` y los libreros en
  `src/datos/libreros.ts` (datos dummy, aún sin servicio).

## Sesión y formularios (Hito 2)

- Sesión: Zustand en `src/estado/sesionStore.ts`, persistida en `localStorage`,
  con autenticación dummy (`iniciarSesion` y `registrarse` en
  `src/servicios/checkoutServicio.ts`; DTO `LoginRequest`, `RegistroRequest` y
  `LoginResponse` en `src/tipos/checkout.ts`).
- Se puede iniciar sesión o crear una cuenta desde el ícono de usuario de la
  barra (modal) o desde el checkout. Con sesión iniciada, el ícono abre un menú
  con "Mi cuenta" y "Cerrar sesión".
- Validaciones compartidas en `src/utils/validacion.ts`.

| Formulario | Diseñado | Implementado | Validaciones | Integrado con Backend |
| --- | --- | --- | --- | --- |
| Iniciar sesión (modal) | Sí | Sí | Correo válido, contraseña de 8+ caracteres | No (dummy) |
| Crear cuenta (modal) | Sí | Sí | Nombre, apellido, correo, contraseña, confirmación y términos | No (dummy) |
| Checkout (sesión, invitado, envío, pago) | Sí | Sí | Correo, teléfono, dirección, términos | No (dummy) |
| Código de descuento | Sí | Sí | Código existente (`LEE10`, `BIENVENIDO`) | No (dummy) |
| Buscador de la barra | Sí | Sí | No permite búsquedas vacías | No |
| Filtros del catálogo | Sí | Sí | Rango de precio mínimo ≤ máximo | No |
| Newsletter | Sí | Sí (sin envío real) | Correo válido | No |
| ¿No sabes qué leer? (perfil de librero) | Sí | Parcial (sin envío) | Largo máximo | No |

## Catálogo, ficha y perfiles (Hito 2)

- Catálogo (`/catalogo`): filtros a la izquierda (subgéneros, precio, autor y
  editorial) guardados en la URL, orden, grilla de 3 columnas con la tarjeta de
  producto y paginación de muestra (sin cambio de página).
- Ficha de libro (`/ficha-libro?libro=<id>`): muestra el libro indicado; sin id,
  "El perfume" (libro del wireframe).
- Perfiles de libreros (`/perfil-librero?librero=<id>`): Gregorio Samsa,
  Ana Karenina, Tyler Durden y Clara del Valle; sin id, Gregorio Samsa.
- La vista vuelve arriba al cambiar de página (`VolverArriba.tsx`), cada
  pestaña tiene su título (`useTituloPagina.ts`) y las direcciones inexistentes
  muestran una página 404.

| Vista (wireframe) | Diseñado | Implementado | Integrado con Backend |
| --- | --- | --- | --- |
| Home | Sí | Sí | No (dummy) |
| Menús desplegables | Sí | Sí | No |
| Catálogo | Sí | Sí | No (dummy) |
| Búsqueda | Sí | Sí (dentro del catálogo) | No |
| Ficha de libro | Sí | Sí | No (dummy) |
| Iniciar sesión / Crear cuenta | Sí | Sí | No (dummy) |
| Cuenta creada | Sí | No (el modal se cierra con la sesión iniciada) | No |
| Checkout | Sí | Sí | No (dummy) |
| Confirmación | Sí | Sí | No |
| Perfiles de libreros (4) | Sí | Sí | No (datos dummy) |

## Servicios y DTO

Todos los servicios son dummy hasta que Backend exponga los endpoints.

| Servicio | Endpoint esperado | DTO | Integrado |
| --- | --- | --- | --- |
| `catalogoServicio.obtenerLibros` | `GET /libros` | `LibroDto` (`src/tipos/libro.ts`) | No (dummy) |
| `catalogoServicio.obtenerLibro` | `GET /libros/:id` | `LibroDto` | No (dummy) |
| `carritoServicio.agregarAlCarrito` | `POST /carrito` | `AgregarAlCarritoRequest`, `CarritoResponse` | No (dummy) |
| `checkoutServicio.iniciarSesion` | `POST /auth/login` | `LoginRequest`, `LoginResponse` | No (dummy) |
| `checkoutServicio.registrarse` | `POST /auth/registro` | `RegistroRequest`, `LoginResponse` | No (dummy) |
| `checkoutServicio.validarDescuento` | `GET /descuentos/:codigo` | `DescuentoResponse` | No (dummy) |
| `checkoutServicio.crearPedido` | `POST /pedidos` | `CheckoutRequest`, `CheckoutResponse` | No (dummy) |

Las páginas piden los libros con el hook `useLibros`; los datos dummy están en
`src/datos/` y solo los leen los servicios (salvo libreros, géneros y
subgéneros, que aún no tienen servicio).

## Componentes y utilidades compartidas

- Tarjetas: `TarjetaProducto` (Home, Catálogo y Ficha) y `TarjetaRecomendacion`
  (Home y Perfil de librero), cada una con su CSS.
- `RutaNavegacion`, `Desplegable`, `BotonFavorito`, `Estrellas`, `FiltroPrecio`,
  `PaginaEnConstruccion` (también para la página 404).
- Hooks: `useDesplegable`, `useComprarLibro`, `useLibros`, `useTituloPagina`.
- Utilidades: `src/utils/formato.ts` (precios y descuentos),
  `src/utils/validacion.ts` y `src/utils/libros.ts`.
- Imágenes de relleno centralizadas en `src/datos/imagenes.ts`.

## Código sin uso identificado

Pendiente de eliminar al cierre del Hito (se identificó, pero no se borró):

- `src/App.css` y `public/icons.svg`: restos de la plantilla de Vite.
- `src/componentes/FiltroDesplegable.tsx`: reemplazado por `Desplegable`.
- Imágenes: `01-Horizontal-Imagen-Texto-Fondo-Primario-Darker.svg` (logo
  anterior), `03-x-negative.svg` y `05-whatsapp-negative.svg`.
- `src/estilos/base.css`: estilos del modal de inicio de sesión de la versión
  HTML (`.modal-inicio-sesion`, `.modal-overlay`, `.campo-formulario`,
  `.boton-login`, `.boton-social`, etc.), `body.detalle-vacio` y
  `.hero-titulo h2` (el Home usa la suya).
- `src/estilos/index.css`: regla `.root` (no aplica a ningún elemento).
- `src/estilos/checkout.css`: `.checkout-logo-mercadopago` y
  `.checkout-metodo-seleccionado`.
- `src/componentes/Icono.tsx`: 26 íconos del catálogo sin uso (se mantienen
  como referencia del UI Kit).

Mejora sugerida para el Backlog: `base.css` da fondo violeta a `h1`, `h2`, `h3`
y `p` de forma global, lo que obliga a anular el fondo en cada componente.

## UI Kit

- Los tokens de tipografía, paleta, radios, strokes y sombras están en
  `src/estilos/tokens.css`. Lexend se usa para UI y cuerpo; Bree Serif, para
  títulos de marca y display.
- Los iconos del UI Kit se reutilizan mediante `src/componentes/Icono.tsx`,
  basado en Bootstrap Icons. Header y footer son componentes compartidos.
- Carruseles y tarjetas de libros son componentes funcionales de la aplicación,
  no componentes de iconografía del UI Kit.
