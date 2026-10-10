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
- UI: `src/componentes/Carrito.tsx`, se abre desde la bolsa de la barra de navegación.

| Elemento | Diseñado | Implementado | Integrado con Backend |
| --- | --- | --- | --- |
| Vista carrito (overlay) | Sí | Sí | No (dummy) |
| Agregar desde catálogo / ficha | Sí | Sí | No (dummy) |
| Modificar cantidad / eliminar | Sí | Sí | No (dummy) |
| Checkout con formulario validado | Sí | Sí (simulado) | No |
| Confirmación con resumen del pedido | Sí | Sí (estado de navegación) | No |

Las secciones de Biblioteca, Comunidad, Descubrir, Mi cuenta y Recomendaciones
indican que están en construcción hasta contar con sus funcionalidades.
La suscripción al newsletter también informa que su servicio aún no está
conectado; no confirma una suscripción inexistente.

## UI Kit

- Los tokens de tipografía, paleta, radios, strokes y sombras están en
  `src/estilos/tokens.css`. Lexend se usa para UI y cuerpo; Bree Serif, para
  títulos de marca y display.
- Los iconos del UI Kit se reutilizan mediante `src/componentes/Icono.tsx`,
  basado en Bootstrap Icons. Header y footer son componentes compartidos.
- Carruseles y tarjetas de libros son componentes funcionales de la aplicación,
  no componentes de iconografía del UI Kit.
