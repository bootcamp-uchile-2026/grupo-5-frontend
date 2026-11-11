# LeeConNos — Documentación técnica de la Aplicación Web

Este documento reúne la documentación técnica de la aplicación web de
LeeConNos mientras no exista la wiki del repositorio: lo que pide el Hito 3,
lo diseñado versus lo implementado, los endpoints integrados y las decisiones
técnicas. Para instalar, ejecutar y probar la aplicación, ver el
[README principal](../README.md).

La aplicación está hecha con Vite, React 19 y TypeScript, a partir de los
wireframes y el UI Kit que preparó el equipo de UX/UI en Figma, y está
conectada con la API de Backend.

## Qué pide el Hito 3 y dónde está

| Requisito de la Aplicación Web | Estado | Dónde verlo |
| --- | --- | --- |
| Vistas Home, Catálogo, Ficha de producto, Carrito y Checkout | Listo | [Vistas y componentes](#vistas-y-componentes-principales) |
| Componentes reutilizables a partir del UI Kit | Listo | [UI Kit](#ui-kit) |
| Formularios con sus validaciones | Listo | [Formularios](#formularios-diseñados-vs-implementados) |
| Navegación entre vistas | Listo | [Navegación](#navegación) |
| Consumo de servicios HTTP/REST con DTO de request y response | Listo | [Endpoints](#endpoints-disponibles-vs-integrados) y [DTO](#dto-de-request-y-response) |
| Búsqueda y filtros conectados a Backend | Listo | [Búsqueda y filtros](#búsqueda-y-filtros) |
| Manejo de respuestas y errores de la API | Listo | [Endpoints](#endpoints-disponibles-vs-integrados) |
| Autenticación con JWT | Listo | [Sesión y estado](#sesión-y-estado) |
| Sesión con cookies HttpOnly | Pendiente de Backend | [Pendientes](#pendientes-y-notas-para-el-equipo) |
| Vistas protegidas según el perfil | En parte: sesión lista, falta una vista por perfil con diseño | [Sesión y estado](#sesión-y-estado) |
| Carrito global con Zustand, actualizable desde varias vistas | Listo | [Sesión y estado](#sesión-y-estado) |

## Arquitectura

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
| `/mi-cuenta` | Requiere sesión. Aún no tiene wireframe, así que muestra una página "en construcción" |
| `/comunidad`, `/descubrir`, `/recomendaciones`, `/biblioteca` | Aún no tienen wireframe; muestran una página "en construcción" |
| Cualquier otra | Página no encontrada |

Se llega a todas desde la barra de navegación y sus menús. El buscador lleva a
`/catalogo?q=…`.

## Wireframes diseñados vs implementados

Seguimos la estructura y las medidas de los wireframes de Figma y mantuvimos
la paleta de colores del sitio.

| Wireframe | Diseñado | Implementado | De dónde salen los datos |
| --- | --- | --- | --- |
| Home | Sí | Sí | Carruseles de libros desde la API (más vendidos, novedades y más comentados); hero, recomendados de libreros y comunidad son de prueba |
| Barra de navegación y menús (Catálogo, Descubre, Comunidad) | Sí | Sí | Datos fijos |
| Catálogo | Sí | Sí | API, incluidos los filtros |
| Búsqueda | Sí | Sí, dentro del Catálogo | API |
| Ficha de libro | Sí | Sí | API (precio, descuento, calificación y ficha técnica); reseñas y video son de prueba |
| Carrito | Sí | Sí | API con sesión iniciada; local para invitados |
| Iniciar sesión y crear cuenta | Sí | Sí | API |
| Cuenta creada ("¡Ya casi estás dentro!") | Sí | Sí | El correo de verificación todavía no existe |
| Cuenta verificada | Sí | El componente está hecho, pero aún no se muestra | — |
| Checkout | Sí | Sí | API, con sesión iniciada y como invitado |
| Confirmación de compra | Sí | Sí | API (número de pedido y montos calculados por Backend) |
| Perfiles de libreros (4) | Sí | Sí | De prueba, porque Backend aún no tiene estos datos |
| Footer y newsletter | Sí | Sí | El newsletter todavía no envía nada |
| Versión mobile | Sí | Solo una adaptación básica | — |

Hay algunas cosas que agregamos aunque no están en los wireframes, porque las
necesitaba la integración: los filtros de Género, Formato y Disponibilidad en
el Catálogo, el estado "Sin stock" en las tarjetas y la ficha, el año y el
formato en la ficha, el campo Teléfono en la dirección de envío (la API lo
pide para despachar) y los campos Nombre y Apellido en la compra como invitado
(la API los pide para crear el pedido).

## Formularios diseñados vs implementados

Cada formulario guarda sus campos en el estado de React y valida antes de
enviar. Si la API responde con un error, mostramos un mensaje entendible en
vez del código.

| Formulario | Diseñado | Implementado | Qué valida | Conectado a Backend |
| --- | --- | --- | --- | --- |
| Iniciar sesión (modal) | Sí | Sí | Correo válido y contraseña de al menos 8 caracteres | Sí, `POST /auth/login` |
| Crear cuenta (modal) | Sí | Sí | Nombre, apellido, correo, contraseña de al menos 8 caracteres, confirmación y términos | Sí, `POST /auth/registro` |
| Iniciar sesión en el checkout | Sí | Sí | Correo válido y contraseña | Sí, `POST /auth/login` |
| Comprar como invitado | Sí | Sí | Nombre, apellido, correo y teléfono (celular chileno si es despacho) | Sí, `POST /pedidos/invitado` |
| Envío | Sí | Sí | Dirección, número, depto, región y comuna; celular chileno con sesión iniciada; que la comuna tenga despacho | Sí, `POST /envios/cotizar` y `POST /pedidos` |
| Método de pago | Sí | Sí, la selección | Aceptar términos y condiciones | En parte: el pedido se crea, pero queda pendiente de pago |
| Código de descuento | Sí | Sí | Que el código exista, esté vigente y alcance el monto mínimo (lo valida Backend) | Sí, `POST /cupones/validar` y `codigoDescuento` al crear el pedido |
| Buscador | Sí | Sí | Al menos 2 caracteres, igual que la API | Sí, `GET /libros?q=` |
| Filtros y orden del Catálogo | Sí | Sí | Precio mínimo menor o igual al máximo | Sí, `GET /libros` |
| Cantidad (ficha y carrito) | Sí | Sí | Entre 1 y el stock disponible, con un máximo de 10 | Sí, `/carrito` |
| Newsletter | Sí | Sí | Correo válido | No todavía; Backend ya tiene `POST /newsletter/suscripciones` (tarea #328) |
| ¿No sabes qué leer? | Sí | Sí | Máximo 500 caracteres | No, Backend no tiene este servicio |

## Búsqueda y filtros

El Catálogo envía la búsqueda y los filtros a `GET /libros`, que filtra,
ordena y pagina en una sola petición:

| Filtro | Parámetro de la API |
| --- | --- |
| Búsqueda | `q` (título, autor o ISBN) |
| Género | `genero` |
| Subgénero | `subgenero` |
| Autor, uno o varios | `autores` (se repite el parámetro) |
| Editorial | `editorial` |
| Solo ofertas | `enOferta` |
| Formato | `formato` |
| Solo con stock | `enStock` |
| Precio | `precioMin` y `precioMax` |
| Orden | `orden`: más relevantes, novedades, más vendidos, mejor calificados, más comentados, mayor descuento, A-Z y precio |

Dos decisiones técnicas:

- La API acepta una sola editorial y un solo subgénero. Si se marcan varios,
  pedimos los libros que cumplen el resto de los filtros y terminamos de
  filtrar en la aplicación.
- Las opciones del panel (subgéneros, autores, editoriales y rango de precios)
  se calculan con los libros de la búsqueda y el género actuales. No usamos
  `GET /libros/filtros` porque entrega las opciones de todo el catálogo y
  mostraría valores sin resultados.

Los filtros quedan en la URL, así que se pueden recargar o compartir.

## Sesión y estado

Usamos Zustand para tres cosas:

| Store | Archivo | Qué guarda |
| --- | --- | --- |
| Sesión | `src/estado/sesionStore.ts` | El usuario, su perfil, el token y el refreshToken; se mantiene al recargar |
| Carrito | `src/estado/carritoStore.ts` | Los libros del carrito y sus avisos |
| Modal de sesión | `src/estado/autenticacionStore.ts` | Si el modal de inicio de sesión está abierto |

Con la API configurada, el inicio de sesión y el registro son reales: Backend
entrega un token que se envía en cada llamada privada. Sin la API, la sesión es
simulada, como pide el Hito.

Algunos detalles de cómo funciona:

- Al recargar la página revisamos si el token sigue vigente (`GET /auth/me`).
- El token dura 2 horas y el refreshToken, 7 días. Si una llamada privada
  responde 401, pedimos un token nuevo con `POST /auth/refresh` y repetimos la
  llamada sin que el usuario lo note. Si varias llamadas fallan a la vez,
  renovamos una sola vez. Solo si la renovación también falla se cierra la
  sesión y se abre el modal para volver a entrar.
- Las rutas privadas se envuelven en `RutaProtegida`
  (`src/componentes/RutaProtegida.tsx`). Sin sesión abre el inicio de sesión y,
  al iniciarla, muestra la página. Acepta perfiles (`roles={["LIBRERO"]}`): con
  un perfil sin permiso muestra "Acceso denegado", igual que el 403 de la API.
  Hoy protege `/mi-cuenta`; el checkout queda abierto para comprar como
  invitado.
- Si alguien agrega libros como invitado y después inicia sesión, esos libros
  pasan al carrito de su cuenta. Al cerrar sesión el carrito se ve vacío, pero
  el de la cuenta queda guardado y vuelve al entrar de nuevo. Renovar el token
  no cambia el carrito.

## Endpoints disponibles vs integrados

La URL de la API se configura en `VITE_API_URL` (ver [Cómo ejecutar el proyecto](../README.md#cómo-ejecutar-el-proyecto))
y su documentación (Swagger) está en la ruta `/docs` de esa misma URL. Todas
las llamadas pasan por
`src/servicios/api.ts`, que agrega el token cuando hay sesión, lo renueva si
venció y traduce los errores de la API a mensajes claros.

De los 101 endpoints que tiene la API (versión 0.3.0), conectamos 16: los de
catálogo, autenticación, carrito, cupones, envío y pedidos. Los que siguen
pendientes ya tienen su tarea en el Backlog, no tienen pantalla diseñada o son
de administración.

| Endpoint | Conectado | Dónde se usa o por qué no |
| --- | --- | --- |
| `GET /libros` | Sí | Catálogo, búsqueda, filtros, carruseles del Home y libros relacionados |
| `GET /libros/generos` | Sí | Filtro "Género" del Catálogo |
| `GET /libros/{id}` | Sí | Ficha de libro |
| `POST /auth/login` | Sí | Modal de sesión y checkout |
| `POST /auth/registro` | Sí | Crear cuenta |
| `GET /auth/me` | Sí | Revisar la sesión al recargar |
| `POST /auth/refresh` | Sí | Renovar el token vencido sin pedir la contraseña |
| `GET /carrito` | Sí | Carrito con sesión iniciada |
| `POST /carrito/items` | Sí | Agregar al carrito |
| `PATCH /carrito/items/{libroId}` | Sí | Cambiar cantidades |
| `DELETE /carrito/items/{libroId}` | Sí | Quitar un libro |
| `DELETE /carrito` | Sí | Vaciar el carrito |
| `POST /cupones/validar` | Sí | Código de descuento del checkout |
| `POST /envios/cotizar` | Sí | Costo y días de envío en el checkout |
| `POST /pedidos` | Sí | Crear el pedido con sesión iniciada |
| `POST /pedidos/invitado` | Sí | Crear el pedido como invitado |
| `GET /health` | Solo para probar | Lo usamos para comprobar la conexión con la API |
| `GET /libros/filtros` | No, por decisión | Entrega las opciones de todo el catálogo, sin considerar el género (ver [Búsqueda y filtros](#búsqueda-y-filtros)) |
| `GET /libros/categorias` | Pendiente | Menú Catálogo (tarea #66); hoy usa los géneros fijos de UX |
| `GET /libros/{id}/relacionados` | Pendiente | "Te podría interesar" de la ficha (tarea #322) |
| `GET /libros/{id}/resenas`, `POST /libros/{id}/resenas` | Pendiente | Reseñas de la ficha y "Dejar una reseña" (tareas #323 y #325) |
| `GET /libros/{id}/recomendaciones-libreros` | Pendiente | Recomendaciones de libreros en la ficha (tarea #324) |
| `GET /libreros`, `GET /libreros/{id}`, `GET /recomendaciones/destacadas` | Pendiente | Perfiles de libreros y carrusel del Home (tareas #326 y #327) |
| `/listas-deseos/favoritos` | Pendiente | Botón de favoritos (tarea #337); hoy funciona solo en el navegador |
| `POST /newsletter/suscripciones` | Pendiente | Formulario del newsletter (tarea #328) |
| `POST /pagos`, `POST /pagos/invitado` | No | Piden los datos de una tarjeta y el formulario de tarjeta aún no tiene diseño |
| `GET /pedidos`, `GET /pedidos/{id}`, seguimiento y cancelación | No | "Mi cuenta" (historial, seguimiento y cancelación) aún no tiene diseño |
| `/auth/olvide-password`, `/auth/restablecer-password`, `/auth/verificar-email` | No | "Olvidé mi contraseña" y la verificación de correo aún no tienen pantalla |
| `/auth/google`, `/auth/facebook` | No | Necesitan las credenciales de Google y Facebook |
| `/usuarios` (6 endpoints) | No | Gestión de la cuenta sin diseño, rutas de administración y rutas antiguas del Hito 1 |
| `POST /libros`, `PATCH /libros/{id}`, `DELETE /libros/{id}`, `POST /libros/importar-isbn` | No | Son para libreros y administradores, y no tienen pantallas diseñadas |
| `/cupones` (administración), `/admin/reiniciar-stock` | No | Son solo para administradores |
| `/club-lectura` (13 endpoints) | No | Comunidad y club de lectura aún no tienen diseño |
| `GET /recomendaciones/para-mi` | No | El Home muestra recomendaciones de los libreros, no recomendaciones personalizadas |

## DTO de request y response

Los DTO copian lo que documenta el Swagger. Cada servicio los transforma en los
datos que usan las pantallas.

| Archivo | DTO |
| --- | --- |
| `src/tipos/api.ts` | `ErrorRespuestaDto` (formato de error de la API) y `PaginadoDto` (listados paginados) |
| `src/tipos/libro.ts` | `LibroResponseDto`, `GeneroDto` y `BuscarLibrosRequest` (filtros de `GET /libros`) |
| `src/tipos/auth.ts` | `LoginRequestDto`, `RegistroRequestDto`, `RefreshTokenRequestDto`, `AuthResponseDto` y `UsuarioResponseDto` |
| `src/tipos/carrito.ts` | `AgregarItemRequestDto`, `ActualizarItemRequestDto`, `CarritoItemResponseDto` y `CarritoResponseDto` |
| `src/tipos/pedido.ts` | `CotizarEnvioRequestDto`, `CotizacionEnvioDto`, `DireccionDto`, `CrearPedidoRequestDto`, `CrearPedidoInvitadoRequestDto`, `PedidoResponseDto`, `PedidoInvitadoResponseDto`, `ValidarCuponRequestDto` y `CuponAplicadoDto` |

## Servicios dummy

Cada servicio funciona con la API o, si no está configurada, con datos de
prueba:

| Servicio | Archivo | Con la API | Sin la API |
| --- | --- | --- | --- |
| Catálogo | `catalogoServicio.ts` | `/libros`, `/libros/generos`, `/libros/{id}` | 19 libros de prueba |
| Autenticación | `authServicio.ts` | `/auth/login`, `/auth/registro`, `/auth/me`, `/auth/refresh` | Sesión simulada |
| Carrito | `carritoServicio.ts` | `/carrito`, con sesión iniciada | Carrito guardado en el navegador |
| Checkout | `checkoutServicio.ts` | `/cupones/validar`, `/envios/cotizar`, `/pedidos` y `/pedidos/invitado` | Cupón de prueba, envío de costo fijo y pedido simulado |

Aun con la API, hay datos que siguen siendo de prueba. Los dejamos separados
para reemplazarlos con las tareas pendientes del Backlog:

- En la ficha: las reseñas de libreros y lectores, el video y la galería.
- Los perfiles de libreros, los recomendados del Home y los géneros y
  temáticas de los menús.
- El newsletter, la opción de recibir novedades, "Olvidé mi contraseña" y el
  acceso con Google o Facebook.

## Pendientes y notas para el equipo

Lo que falta diseñar (Backend ya tiene los servicios):

- El formulario de tarjeta para pagar. Por ahora el pedido queda pendiente de
  pago.
- "Mi cuenta", con el historial, el seguimiento y la cancelación de pedidos.
- Una vista solo para libreros o administradores, para demostrar las rutas
  protegidas por perfil.

Para UX/UI:

- La pantalla "¡Ya casi estás dentro!" dice que enviamos un correo de
  verificación, pero ese correo todavía no existe.
- La confirmación dice "¡Compra confirmada!" aunque el pedido queda pendiente
  de pago.
- Agregamos estados que no estaban diseñados: "Sin stock", "Acceso denegado",
  los mensajes de carga y de error, y el aviso dentro del carrito.

Para Backend:

- La sesión se guarda en el navegador (`localStorage`), incluido el
  refreshToken. Para cumplir con las cookies HttpOnly que pide el Hito, Backend
  tiene que entregar el token en una cookie y aceptar credenciales en CORS.
- `GET /libros` acepta una sola editorial y un solo subgénero; si aceptara
  varios, como `autores`, todo el filtrado quedaría en Backend.

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
  API.
- Los subgéneros del filtro salen de los libros de la API, no de una lista
  fija: solo aparecen los que tienen libros en el género elegido.
- En "Ordenar por" no están "Más recomendado" ni "Alfabéticamente, Z-A",
  porque la API no tiene esos órdenes.

## Código sin uso

Lo identificamos para borrarlo al cerrar el Hito:

- `src/App.css` y `public/icons.svg`, que vienen de la plantilla de Vite.
- `src/componentes/FiltroDesplegable.tsx`, que reemplazamos por `Desplegable`.
- Las imágenes `01-Horizontal-Imagen-Texto-Fondo-Primario-Darker.svg` (logo
  anterior) y `03-x-negative.svg`.
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
