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
| Checkout con formulario validado | Sí | Sí | No (dummy) |
| Inicio de sesión / compra como invitado (checkout) | Sí | Sí | No (dummy) |
| Usuario con sesión: saludo y dirección guardada | Sí | Sí | No (dummy) |
| Pop-up de confirmación al eliminar producto | Sí | Sí (Guardar en favoritos sin acción) | No |
| Confirmación de compra con N° de pedido y total | Sí | Parcial (resto estático) | No (dummy) |

## Checkout (Feature-33, Hito 2)

- Ruta: `/checkout` (React Router). Al pagar navega a `/confirmacion-compra`.
- Vista: `src/paginas/checkout.tsx`; estilos: `src/estilos/checkout.css`. Layout en dos mitades (formulario a la izquierda, resumen del pedido sticky a la derecha), según el wireframe.
- Formulario con estado y validación: correo/contraseña (login), correo/teléfono (invitado), dirección, número, depto, región y comuna (solo despacho), método de pago y aceptación de términos.
- Sesión simulada con Zustand: `src/estado/sesionStore.ts` (persistida en `localStorage`, clave `sesion`). Login dummy: cualquier correo con formato válido y cualquier contraseña (no se valida la cuenta).
- Escenarios de sesión: usuario con cuenta (saludo "Ya puedes realizar tu compra, {nombre}" y dirección guardada seleccionable, con opción de agregar otra), compra como invitado (correo y teléfono) y sin sesión.
- Eliminar producto desde el resumen: pop-up de confirmación (Eliminar producto / Guardar en favoritos, sin acción por ahora / Cancelar).
- Carrito compartido: `src/estado/carritoStore.ts`.
- Códigos de descuento dummy: `LEE10` (10%) y `BIENVENIDO` (15%). Despacho $1.990, retiro $0.
- Logos de pago en `src/assets/logos/` (Onepay, Webpay, Mercado Pago).

| Endpoint (dummy) | DTO request | DTO response | Integrado con Backend |
| --- | --- | --- | --- |
| `POST /auth/login` | `LoginRequest` | `LoginResponse` | No |
| `GET /descuentos/{codigo}` | código | `DescuentoResponse` | No |
| `POST /pedidos` | `CheckoutRequest` | `CheckoutResponse` | No |

DTOs en `src/tipos/checkout.ts`; servicios dummy en `src/servicios/checkoutServicio.ts` (reemplazar por HTTP/REST cuando Backend los exponga).
