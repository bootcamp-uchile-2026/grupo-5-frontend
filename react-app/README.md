# LeeConNos — Aplicación Web

Esta es la aplicación web de LeeConNos, el e-commerce de libros que estamos
construyendo en el Taller de Bootcamps de la Universidad de Chile. La hicimos
con Vite, React 19 y TypeScript, a partir de los wireframes y el UI Kit que
preparó el equipo de UX/UI en Figma, y ya está conectada con la API de
Backend.

## Qué pide el Hito 2 y dónde está

| Requisito de la Aplicación Web | Dónde verlo |
| --- | --- |
| Aplicación versionada en el repositorio del equipo | `bootcamp-uchile-2026/grupo-5-frontend`, carpeta `react-app/` |
| Proyecto con Vite, React y TypeScript | [Cómo ejecutar](#cómo-ejecutar) |
| Wireframes principales como componentes de React | [Wireframes diseñados vs implementados](#wireframes-diseñados-vs-implementados) |
| Navegación entre vistas con React Router | [Navegación](#navegación) |
| Formularios con manejo de estado y validaciones | [Formularios diseñados vs implementados](#formularios-diseñados-vs-implementados) |
| Control de sesión y estados con Zustand | [Sesión y estado](#sesión-y-estado) |
| Integración con los servicios HTTP/REST de Backend | [Endpoints disponibles vs integrados](#endpoints-disponibles-vs-integrados) |
| Servicios dummy mientras no exista la versión definitiva | [Servicios dummy](#servicios-dummy) |
| DTO de request y response | [DTO](#dto-de-request-y-response) |
| README con instrucciones para ejecutar | [Cómo ejecutar](#cómo-ejecutar) |

## Cómo ejecutar

Necesitas Node.js 20.19 o 22.12 en adelante (es lo que pide Vite 8) y pnpm.
Nosotros trabajamos con Node 26 y pnpm 12.

Desde la carpeta `react-app`, primero instala las dependencias:

```bash
pnpm install
```

Luego crea tu archivo `.env` copiando el ejemplo. Ahí va la URL de la API
(`VITE_API_URL`). Este archivo no se sube al repositorio.

```bash
cp .env.example .env
```

Y levanta la aplicación, que queda en http://localhost:5173:

```bash
pnpm dev
```

Otros comandos que usamos:

| Comando | Para qué sirve |
| --- | --- |
| `pnpm build` | Revisa los tipos y genera la versión de producción en `dist/` |
| `pnpm preview` | Muestra en local la versión generada con `pnpm build` |
| `pnpm lint` | Revisa el código con Oxlint |

Si dejas `VITE_API_URL` vacía (o no creas el `.env`), la aplicación igual
funciona completa con datos de prueba locales. Es útil para trabajar cuando la
API no está disponible. Ojo: Vite solo lee el `.env` al arrancar, así que si lo
cambias tienes que volver a ejecutar `pnpm dev`.

Para probar el flujo de compra puedes usar la cuenta de cliente que entregó el
equipo de Backend, o crear una cuenta nueva desde "Crear cuenta".

## Cómo está organizada

```
react-app/
├─ .env.example          URL de la API (VITE_API_URL)
└─ src/
   ├─ App.tsx            Rutas, barra de navegación, carrito y modal de sesión
   ├─ paginas/           Una vista por ruta (Home, Catálogo, Ficha, Checkout…)
   ├─ componentes/       Componentes y hooks que se reutilizan
   ├─ servicios/         Cliente de la API (api.ts) y un servicio por tema
   ├─ tipos/             DTO de la API y tipos de la aplicación
   ├─ estado/            Stores de Zustand (sesión, carrito y modal de sesión)
   ├─ datos/             Datos de prueba y datos fijos (géneros, regiones…)
   ├─ utils/             Formatos, validaciones y mensajes de error
   ├─ estilos/           CSS de cada vista y componente, y tokens del UI Kit
   └─ assets/            Logos e íconos
```

Las páginas no llaman a la API directamente. Le piden los datos a un servicio
(`src/servicios`), y es el servicio el que decide si consulta la API o usa los
datos de prueba. Así la URL de la API está en un solo lugar (`.env`) y las
llamadas en un solo archivo (`api.ts`).

## Vistas y componentes principales

| Vista | Ruta | Qué la compone |
| --- | --- | --- |
| Home | `/` | Hero, carruseles de recomendados y de libros, comunidad y newsletter |
| Catálogo y búsqueda | `/catalogo` | Filtros, orden, grilla de libros y paginación |
| Ficha de libro | `/ficha-libro?libro=<id>` | Galería, compra, especificaciones, reseñas y libros relacionados |
| Perfiles de libreros | `/perfil-librero?librero=<id>` | Perfil, libros indispensables, colecciones y "¿No sabes qué leer?" |
| Carrito | Panel lateral, disponible en todas las vistas | Libros, cantidades y subtotal |
| Iniciar sesión y crear cuenta | Modal, disponible en todas las vistas | Formularios de acceso y registro |
| Checkout | `/checkout` | Sesión o invitado, envío, pago y resumen del pedido |
| Confirmación | `/confirmacion-compra` | Detalle y resumen del pedido |

Entre los componentes que se comparten están la barra de navegación con sus
menús desplegables, el footer, las tarjetas de producto y de recomendación, el
carrusel, la ruta de navegación ("Inicio / Catálogo / …"), las estrellas de
calificación y los mensajes de carga y de error.

## Navegación

Usamos React Router. Estas son las rutas:

| Ruta | Vista |
| --- | --- |
| `/` | Home |
| `/catalogo` | Catálogo. Los filtros, el orden y la página quedan en la URL; la búsqueda usa `?q=` |
| `/ficha-libro?libro=<id>` | Ficha de libro (sin id muestra el libro más reciente) |
| `/perfil-librero?librero=<id>` | Perfil de librero |
| `/checkout` | Checkout |
| `/confirmacion-compra` | Confirmación de compra |
| `/comunidad`, `/descubrir`, `/recomendaciones`, `/biblioteca`, `/mi-cuenta` | Aún no tienen wireframe; muestran una página "en construcción" |
| Cualquier otra | Página no encontrada |

Se llega a todas desde la barra de navegación y sus menús. El buscador lleva a
`/catalogo?q=…`.

## Wireframes diseñados vs implementados

Seguimos la estructura y las medidas de los wireframes de Figma y mantuvimos
la paleta de colores del sitio.

| Wireframe | Diseñado | Implementado | De dónde salen los datos |
| --- | --- | --- | --- |
| Home | Sí | Sí | Libros desde la API; hero, recomendados y comunidad son de prueba |
| Barra de navegación y menús (Catálogo, Descubre, Comunidad) | Sí | Sí | Datos fijos |
| Catálogo | Sí | Sí | API |
| Búsqueda | Sí | Sí, dentro del Catálogo | API |
| Ficha de libro | Sí | Sí | API; calificación, reseñas y video son de prueba |
| Carrito | Sí | Sí | API con sesión iniciada; local para invitados |
| Iniciar sesión y crear cuenta | Sí | Sí | API |
| Cuenta creada ("¡Ya casi estás dentro!") | Sí | Sí | El correo de verificación todavía no existe |
| Cuenta verificada | Sí | El componente está hecho, pero aún no se muestra | — |
| Checkout | Sí | Sí | API con sesión iniciada; de prueba para invitados |
| Confirmación de compra | Sí | Sí | API (número de pedido) |
| Perfiles de libreros (4) | Sí | Sí | De prueba, porque Backend aún no tiene estos datos |
| Footer y newsletter | Sí | Sí | El newsletter todavía no envía nada |
| Versión mobile | Sí | Solo una adaptación básica | — |

Hay algunas cosas que agregamos aunque no están en los wireframes, porque las
necesitaba la integración: los filtros de Género, Formato y Disponibilidad en
el Catálogo, el estado "Sin stock" en las tarjetas y la ficha, el año y el
formato en la ficha, y el campo Teléfono en la dirección de envío (la API lo
pide para despachar).

## Formularios diseñados vs implementados

Cada formulario guarda sus campos en el estado de React y valida antes de
enviar. Si la API responde con un error, mostramos un mensaje entendible en
vez del código.

| Formulario | Diseñado | Implementado | Qué valida | Conectado a Backend |
| --- | --- | --- | --- | --- |
| Iniciar sesión (modal) | Sí | Sí | Correo válido y contraseña de al menos 8 caracteres | Sí, `POST /auth/login` |
| Crear cuenta (modal) | Sí | Sí | Nombre, apellido, correo, contraseña de al menos 8 caracteres, confirmación y términos | Sí, `POST /auth/registro` |
| Iniciar sesión en el checkout | Sí | Sí | Correo válido y contraseña | Sí, `POST /auth/login` |
| Comprar como invitado | Sí | Sí | Correo y teléfono | No, Backend aún no permite comprar sin cuenta |
| Envío | Sí | Sí | Dirección, número, depto, región y comuna; celular chileno con sesión iniciada; que la comuna tenga despacho | Sí, `POST /envios/cotizar` y `POST /pedidos` |
| Método de pago | Sí | Sí, la selección | Aceptar términos y condiciones | En parte: el pedido se crea, pero queda pendiente de pago |
| Código de descuento | Sí | Sí | Que el código exista (`LEE10`, `BIENVENIDO`) | No, Backend no tiene descuentos |
| Buscador | Sí | Sí | Al menos 2 caracteres, igual que la API | Sí, `GET /libros?q=` |
| Filtros y orden del Catálogo | Sí | Sí | Precio mínimo menor o igual al máximo | Sí, `GET /libros` |
| Cantidad (ficha y carrito) | Sí | Sí | Entre 1 y el stock disponible, con un máximo de 10 | Sí, `/carrito` |
| Newsletter | Sí | Sí | Correo válido | No, Backend no tiene este servicio |
| ¿No sabes qué leer? | Sí | Sí | Máximo 500 caracteres | No, Backend no tiene este servicio |

## Sesión y estado

Usamos Zustand para tres cosas:

| Store | Archivo | Qué guarda |
| --- | --- | --- |
| Sesión | `src/estado/sesionStore.ts` | El usuario y su token; se mantiene al recargar |
| Carrito | `src/estado/carritoStore.ts` | Los libros del carrito y sus avisos |
| Modal de sesión | `src/estado/autenticacionStore.ts` | Si el modal de inicio de sesión está abierto |

Con la API configurada, el inicio de sesión y el registro son reales: Backend
entrega un token que se envía en cada llamada privada. Sin la API, la sesión es
simulada, como pide el Hito.

Algunos detalles de cómo funciona:

- Al recargar la página revisamos si el token sigue vigente (`GET /auth/me`).
  Si ya venció, la sesión se cierra sin mostrar nada.
- Si el token vence mientras alguien está comprando, se cierra la sesión y se
  abre el modal para volver a entrar. Backend define la duración del token
  (2 horas por defecto).
- Si alguien agrega libros como invitado y después inicia sesión, esos libros
  pasan al carrito de su cuenta. Al cerrar sesión el carrito se ve vacío, pero
  el de la cuenta queda guardado y vuelve al entrar de nuevo.

## Endpoints disponibles vs integrados

La API está en `http://3.131.220.134:3000` y su documentación (Swagger) en
`http://3.131.220.134:3000/docs`. Todas las llamadas pasan por
`src/servicios/api.ts`, que agrega el token cuando hay sesión y traduce los
errores de la API a mensajes claros.

De los 58 endpoints que tiene la API, conectamos 13: los de catálogo,
autenticación, carrito, envío y pedidos. El resto todavía no tiene una
pantalla diseñada, es de administración o Backend lo guarda solo en memoria.

| Endpoint | Conectado | Dónde se usa o por qué no |
| --- | --- | --- |
| `GET /libros` | Sí | Catálogo, búsqueda, Home y libros relacionados |
| `GET /libros/generos` | Sí | Filtro "Género" del Catálogo |
| `GET /libros/{id}` | Sí | Ficha de libro |
| `POST /auth/login` | Sí | Modal de sesión y checkout |
| `POST /auth/registro` | Sí | Crear cuenta |
| `GET /auth/me` | Sí | Revisar la sesión al recargar |
| `GET /carrito` | Sí | Carrito con sesión iniciada |
| `POST /carrito/items` | Sí | Agregar al carrito |
| `PATCH /carrito/items/{libroId}` | Sí | Cambiar cantidades |
| `DELETE /carrito/items/{libroId}` | Sí | Quitar un libro |
| `DELETE /carrito` | Sí | Vaciar el carrito |
| `POST /envios/cotizar` | Sí | Costo y días de envío en el checkout |
| `POST /pedidos` | Sí | Crear el pedido |
| `GET /health` | Solo para probar | Lo usamos para comprobar la conexión con la API |
| `POST /pagos`, `GET /pagos/pedido/{pedidoId}` | No | El pago con tarjeta aún no tiene wireframe |
| `GET /pedidos`, `GET /pedidos/{id}`, `GET /pedidos/{id}/seguimiento`, `POST /pedidos/{id}/cancelar` | No | "Mi cuenta" (historial, seguimiento y cancelación) aún no tiene wireframe |
| `GET /usuarios/{id}`, `PATCH /usuarios/{id}`, `DELETE /usuarios/{id}` | No | La gestión de la cuenta aún no tiene wireframe |
| `GET /usuarios` | No | Es solo para administradores |
| `POST /usuarios`, `POST /usuarios/login` | No | Son las rutas antiguas del Hito 1; usamos las de `/auth` |
| `POST /libros`, `PATCH /libros/{id}`, `DELETE /libros/{id}`, `POST /libros/importar-isbn` | No | Son para libreros y administradores, y no tienen pantallas diseñadas |
| `/resenas` (5 endpoints) | No | Backend las guarda en memoria y se borran al reiniciar; la ficha usa reseñas de prueba |
| `/listas-deseos` (6 endpoints) | No | También en memoria; el botón de favoritos funciona solo en el navegador |
| `/libreros` (7 endpoints) | No | En memoria y sin datos; los perfiles usan los contenidos de UX |
| `/club-lectura` (9 endpoints) | No | Comunidad y club de lectura aún no tienen wireframe |
| `GET /recomendaciones/usuario/{id}` | No | El Home muestra recomendaciones de los libreros, no recomendaciones personalizadas |

## DTO de request y response

Los DTO copian lo que documenta el Swagger. Cada servicio los transforma en los
datos que usan las pantallas.

| Archivo | DTO |
| --- | --- |
| `src/tipos/api.ts` | `ErrorRespuestaDto` (formato de error de la API) y `PaginadoDto` (listados paginados) |
| `src/tipos/libro.ts` | `LibroResponseDto`, `GeneroDto` y `BuscarLibrosRequest` (filtros de `GET /libros`) |
| `src/tipos/auth.ts` | `LoginRequestDto`, `RegistroRequestDto`, `AuthResponseDto` y `UsuarioResponseDto` |
| `src/tipos/carrito.ts` | `AgregarItemRequestDto`, `ActualizarItemRequestDto`, `CarritoItemResponseDto` y `CarritoResponseDto` |
| `src/tipos/pedido.ts` | `CotizarEnvioRequestDto`, `CotizacionEnvioDto`, `DireccionDto`, `CrearPedidoRequestDto` y `PedidoResponseDto` |

## Servicios dummy

Cada servicio funciona con la API o, si no está configurada, con datos de
prueba:

| Servicio | Archivo | Con la API | Sin la API |
| --- | --- | --- | --- |
| Catálogo | `catalogoServicio.ts` | `/libros`, `/libros/generos`, `/libros/{id}` | 19 libros de prueba |
| Autenticación | `authServicio.ts` | `/auth/login`, `/auth/registro`, `/auth/me` | Sesión simulada |
| Carrito | `carritoServicio.ts` | `/carrito`, con sesión iniciada | Carrito guardado en el navegador |
| Checkout | `checkoutServicio.ts` | `/envios/cotizar` y `/pedidos`, con sesión iniciada | Envío de costo fijo y pedido simulado |

Aun con la API, hay datos que siguen siendo de prueba porque UX los diseñó y
Backend todavía no los tiene. Los dejamos separados para reemplazarlos cuando
existan:

- De cada libro: calificación, opiniones, ventas, precio anterior (para los
  descuentos), subgénero, encuadernación, páginas, dimensiones y etiquetas.
  Están en `src/datos/complementosLibros.ts`.
- Los filtros del Catálogo que la API no tiene (subgéneros, editorial, varios
  autores a la vez y ofertas). Los aplicamos en la propia aplicación.
- En la ficha: las reseñas de libreros y lectores, el video y la galería.
- Los perfiles de libreros, los recomendados del Home y los géneros y
  temáticas de los menús.
- La compra como invitado, el código de descuento, el newsletter, la opción de
  recibir novedades, "Olvidé mi contraseña" y el acceso con Google o Facebook.

## Pendientes y notas para el equipo

Lo que falta diseñar (Backend ya tiene los servicios):

- El pago con tarjeta. Por ahora el pedido queda pendiente de pago.
- "Mi cuenta", con el historial, el seguimiento y la cancelación de pedidos.

Para UX/UI:

- La pantalla "¡Ya casi estás dentro!" dice que enviamos un correo de
  verificación, pero ese correo todavía no existe.
- La confirmación dice "¡Compra realizada!" aunque el pedido queda pendiente
  de pago.
- Agregamos estados que no estaban diseñados: "Sin stock", los mensajes de
  carga y de error, y el aviso dentro del carrito.

Para Backend:

- *Papelucho* (ISBN 9789561200012) y *Desolación* (ISBN 9789561100015) no
  tienen portada en Open Library, así que mostramos una portada genérica.
- Cada pedido descuenta stock real, y ese stock es el mismo para todo el
  equipo. Sería bueno reiniciar la base de datos antes de la revisión del Hito.
- La API funciona con `http://`. Si publicamos la aplicación con `https://`,
  el navegador va a bloquear las llamadas.
- El nombre y el apellido se guardan juntos, así que el saludo de la barra usa
  solo la primera palabra.

## Diferencias con el diseño

- El color `#6200ee` del wireframe no está en la paleta de `tokens.css`, así
  que lo dejamos como variable local en `barra-navegacion.css`. El degradado
  del banner es el token `--degradado-banner`, que también usa la franja final
  del footer.
- Unificamos el texto de los menús desplegables en 14 px, salvo los títulos de
  columna del Catálogo (16 px) y "¿No sabes qué leer?" (18 px).
- "Misterio y thriller", del menú de UX, corresponde al género "Policial" de la
  API. Es el único género con subgéneros diseñados.

## Código sin uso

Lo identificamos para borrarlo al cerrar el Hito:

- `src/App.css` y `public/icons.svg`, que vienen de la plantilla de Vite.
- `src/componentes/FiltroDesplegable.tsx`, que reemplazamos por `Desplegable`.
- Las imágenes `01-Horizontal-Imagen-Texto-Fondo-Primario-Darker.svg` (logo
  anterior), `03-x-negative.svg` y `05-whatsapp-negative.svg`.
- En `src/estilos/base.css`, los estilos del modal de la versión HTML
  (`.modal-inicio-sesion`, `.modal-overlay`, `.campo-formulario`,
  `.boton-login`, `.boton-social`, etc.), `body.detalle-vacio` y
  `.hero-titulo h2`.
- En `src/estilos/index.css`, la regla `.root`.
- En `src/estilos/checkout.css`, `.checkout-logo-mercadopago` y
  `.checkout-metodo-seleccionado`.
- Algunos íconos de `src/componentes/Icono.tsx` que no se usan; los dejamos
  como referencia del UI Kit.

Una mejora para el Backlog: `base.css` le pone fondo violeta a todos los `h1`,
`h2`, `h3` y `p`, y eso obliga a quitarlo en cada componente.

## UI Kit

Los tokens de tipografía, colores, radios, bordes y sombras están en
`src/estilos/tokens.css`. Usamos Lexend para la interfaz y los textos, y Bree
Serif para los títulos de marca. Los íconos salen de Bootstrap Icons a través
de `src/componentes/Icono.tsx`.
