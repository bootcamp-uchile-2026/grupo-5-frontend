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
| Desplegable Catálogo (Géneros y Temáticas) | Sí | Sí (todas las opciones van a `/catalogo`) | No |
| Desplegable Descubre con nosotros | Sí | Sí (todas las opciones van a `/perfil-librero`) | No |
| Desplegable Comunidad | Sí | Sí (todas las opciones van a `/comunidad`) | No |
| Barra en mobile | Sí (wireframe mobile) | Provisorio (adaptación básica) | No |

Diferencias con el diseño:

- Los colores `#6200ee` y `#094faa` del wireframe no existen en `tokens.css`;
  quedaron como variables locales en `barra-navegacion.css` hasta alinear los
  tokens con las variables del UI Kit en Figma.
- Los textos de los desplegables se unificaron en 14 px (salvo los títulos de
  columna de Catálogo, en 16 px, y "¿No sabes qué leer?", en 18 px).
- Los géneros, temáticas y libreros están escritos en los componentes; aún no
  vienen de un servicio.

## UI Kit

- Los tokens de tipografía, paleta, radios, strokes y sombras están en
  `src/estilos/tokens.css`. Lexend se usa para UI y cuerpo; Bree Serif, para
  títulos de marca y display.
- Los iconos del UI Kit se reutilizan mediante `src/componentes/Icono.tsx`,
  basado en Bootstrap Icons. Header y footer son componentes compartidos.
- Carruseles y tarjetas de libros son componentes funcionales de la aplicación,
  no componentes de iconografía del UI Kit.
