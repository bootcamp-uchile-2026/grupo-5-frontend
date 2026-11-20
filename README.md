# LeeConNos — Frontend

Proyecto Frontend del e-commerce **LeeConNos**, librería independiente ficticia con curaduría de libreros y club de lectura. Desarrollado en el marco del Taller de Bootcamps (DCC, Universidad de Chile) por el equipo **Legión Atenea**.

> "Conectamos personas con libros a través de recomendaciones humanas y una comunidad que comparte la pasión por leer."


## Estado del proyecto
La aplicación está desarrollada con React, TypeScript y Vite. Sigue el diseño de alta fidelidad y el UI Kit de UX/UI en Figma, y está conectada con la API de Backend mediante la variable `VITE_API_URL`.

**Pantallas en alta fidelidad:** Home, Catálogo, Ficha de libro, Perfil del librero, Checkout (con sesión, sin sesión y como invitado), pantalla de espera de la compra y Confirmación.

**Con datos reales de la API:**
- Catálogo, búsqueda y filtros.
- Ficha de libro, con reseñas, recomendaciones de libreros y libros relacionados.
- Perfiles de libreros, recomendados del Home y preguntas al librero ("¿No sabes qué leer?").
- Carrito, favoritos y newsletter.
- Inicio de sesión con cookies HttpOnly y renovación automática, registro y acceso según perfil.
- Código de descuento, cotización de envío y compra con cuenta o como invitado, con despacho o retiro en tienda y direcciones guardadas.

**Pendiente para la Entrega Final:** "Dejar una reseña", "Mi cuenta" y las secciones de Comunidad. Conectar Webpay o Mercado Pago en su ambiente de pruebas queda como posible desarrollo, sin compromiso. El detalle está en la [wiki](https://github.com/bootcamp-uchile-2026/grupo-5-frontend/wiki/Funcionalidades-y-pendientes).


## Documentación
La documentación técnica está en la [wiki del repositorio](https://github.com/bootcamp-uchile-2026/grupo-5-frontend/wiki):

| Página | Contenido |
| --- | --- |
| [Estado del Hito 3](https://github.com/bootcamp-uchile-2026/grupo-5-frontend/wiki/Estado-del-Hito-3) | Requisitos del Hito 3 para Frontend y su estado |
| [Arquitectura y decisiones técnicas](https://github.com/bootcamp-uchile-2026/grupo-5-frontend/wiki/Arquitectura-y-decisiones-tecnicas) | Estructura del código, sesión, carrito, rutas protegidas y decisiones |
| [Pantallas diseñadas vs implementadas](https://github.com/bootcamp-uchile-2026/grupo-5-frontend/wiki/Pantallas-disenadas-vs-implementadas) | Pantallas y flujos de Figma con su nivel de fidelidad |
| [Formularios](https://github.com/bootcamp-uchile-2026/grupo-5-frontend/wiki/Formularios) | Formularios diseñados vs implementados y sus validaciones |
| [Endpoints](https://github.com/bootcamp-uchile-2026/grupo-5-frontend/wiki/Endpoints) | Endpoints disponibles vs integrados y DTO |
| [Funcionalidades y pendientes](https://github.com/bootcamp-uchile-2026/grupo-5-frontend/wiki/Funcionalidades-y-pendientes) | Lo completado y lo pendiente para la Entrega Final |

- Diseño en Figma: <https://www.figma.com/design/JzdqSyqXuavHa5hV3zJIIT/Versi%C3%B3n-2---Figma>
- Documentación de la API (Swagger): <http://3.131.220.134:3000/docs>
- Repositorio de Backend (API): <https://github.com/bootcamp-uchile-2026/grupo-5-backend>


## Tecnologías
- React 19 y TypeScript 6 (componentes y páginas en TSX)
- React Router DOM 7 para la navegación
- Zustand 5 para el estado global (sesión, carrito y favoritos)
- CSS3 para los estilos, con los tokens del UI Kit en `tokens.css`
- Bootstrap Icons (https://icons.getbootstrap.com/) (vía CDN)
- Vite 8 para desarrollo y build
- pnpm como gestor de paquetes
- Oxlint para linting
- Google Fonts: Lexend (fuente primaria) y Bree Serif (fuente secundaria/de marca), vía CDN
- Portadas de libros desde la API pública de [Open Library](https://openlibrary.org/dev/docs/api/covers)


## Estructura del repositorio
La aplicación está en la carpeta `react-app`:

```
react-app/
├─ .env.development      URL de la API y del proxy para pnpm dev (se sube al repositorio)
├─ .env.production       URL de la API y del proxy para pnpm build y preview (se sube)
├─ vite.config.ts        Proxy /api hacia la API (sesión con cookies HttpOnly)
├─ .env.example          Variables documentadas y ejemplo del modo dummy
└─ src/
   ├─ App.tsx            Rutas, barra de navegación, carrito y modal de sesión
   ├─ paginas/           Una vista por ruta
   ├─ componentes/       Componentes y hooks reutilizables
   ├─ servicios/         Cliente de la API (api.ts) y un servicio por tema
   ├─ tipos/             DTO de la API y tipos de la aplicación
   ├─ estado/            Stores de Zustand
   ├─ datos/             Datos de prueba y datos fijos
   ├─ utils/             Formatos, validaciones y mensajes de error
   ├─ estilos/           CSS de cada vista y componente, y tokens del UI Kit
   └─ assets/            Logos, íconos e imágenes del diseño
```

El detalle de cada carpeta está en [Arquitectura y decisiones técnicas](https://github.com/bootcamp-uchile-2026/grupo-5-frontend/wiki/Arquitectura-y-decisiones-tecnicas).


### Convenciones
- Código y nombres en español.
- Páginas en `paginas/` con nombres en minúsculas y guiones (ej. `ficha-libro.tsx`); componentes en `componentes/` con PascalCase (ej. `TarjetaProducto.tsx`); hooks con el prefijo `use` (ej. `usePeticion.ts`).
- Cada vista y componente principal tiene su hoja de estilos en `estilos/` con el mismo nombre (ej. `catalogo.css`).
- Los tokens del UI Kit (colores, tipografía, radios y sombras) están en `estilos/tokens.css` y deben coincidir con las variables de Figma.
- Las páginas no llaman a la API directamente: lo hacen a través de los servicios de `servicios/`, y la URL de la API se configura solo en los archivos `.env` de `react-app`.


## Cómo ejecutar el proyecto
Requiere Node.js 20.19 o 22.12 en adelante (lo pide Vite 8) y pnpm. El equipo trabaja con Node 26 y pnpm 12.

  **Instructivo**
  1. Abrir la carpeta del proyecto en VS Code.
  2. Dirigirse a la carpeta react-app
  3. Instalar las dependencias: **pnpm install**
  4. No hace falta configurar nada: la URL de la API ya viene en `react-app/.env.development`.
  5. Efectuar el comando en la terminal: **pnpm run dev**
  6. Clic izquierdo y presionar Ctrl sobre la url del Localhost (http://localhost:5173).

Otros comandos, también desde `react-app`:

| Comando | Para qué sirve |
| --- | --- |
| `pnpm build` | Revisa los tipos y genera la versión de producción en `dist/` |
| `pnpm preview` | Muestra en local la versión generada con `pnpm build` |
| `pnpm lint` | Revisa el código con Oxlint |

### Conexión con la API de Backend

La aplicación no incluye el código de Backend. Consume la API que el equipo de Backend tiene desplegada en `http://3.131.220.134:3000`; su código está en el repositorio [grupo-5-backend](https://github.com/bootcamp-uchile-2026/grupo-5-backend) y no es necesario clonarlo para usar la web.

| Archivo | Se sube | Para qué sirve |
| --- | --- | --- |
| `react-app/.env.development` | Sí | `VITE_API_URL=/api` y la URL de la API (`API_DESTINO`) para `pnpm dev` |
| `react-app/.env.production` | Sí | Los mismos valores para `pnpm build` y `pnpm preview` |
| `react-app/.env.development.local` | No | Cambiar la URL solo en tu equipo; tiene prioridad sobre `.env.development` |
| `react-app/.env.example` | Sí | Variables documentadas y ejemplo |

- **La URL es pública:** Swagger está abierto, así que no es un secreto y se puede versionar.
- **Proxy de Vite:** la app llama a `/api/...` en `localhost` y Vite reenvía esas llamadas a la API (`vite.config.ts`). Para el navegador, la API queda en el mismo sitio, así que guarda y envía las cookies HttpOnly de la sesión aunque la API use HTTP. El proxy funciona con `pnpm dev` y `pnpm preview`; si la web se publica en un servidor, este debe hacer lo mismo o la API debe usar HTTPS.
- **Modo dummy:** con `VITE_API_URL=` vacía en `react-app/.env.development.local`, la aplicación funciona completa con datos de prueba locales. Sirve cuando la API no está disponible y para probar sin crear datos en la base compartida. Crea el archivo desde VS Code: si se crea con PowerShell (`Set-Content`), puede quedar con BOM y Vite no lee la variable.
- **Si ya tenías un `react-app/.env` o un `.env.development.local` con la URL de la API:** `.env.development` tiene prioridad sobre el `.env`, pero el `.local` tiene prioridad sobre todos. Si ahí está la URL completa (`http://3.131.220.134:3000`), las llamadas no pasan por el proxy y la sesión no funciona: bórrala o deja `VITE_API_URL=/api`.
- Vite solo lee estos archivos al arrancar: si se cambian, hay que volver a ejecutar `pnpm run dev`.

La documentación de la API (Swagger) está en <http://3.131.220.134:3000/docs>.


## Cómo probar
Se puede comprar con una cuenta (ver abajo), con una cuenta nueva desde "Crear cuenta" o como invitado. Cada pedido descuenta stock real de la base de datos compartida por el equipo.

Códigos de descuento de prueba de la API:

| Código | Descuento |
| --- | --- |
| `BIENVENIDA10` | 10% |
| `DESCUENTO5000` | $5.000 en compras desde $20.000 |
| `LIBRERO15` | 15% en compras desde $30.000 |
| `VERANO2025` | Vencido, para ver el mensaje de error |


## Ingresar como cliente - Para flujo de compra
  1. Ingresar a usuario (en el ícono de persona en el header de la web)
  2. Ingresa las siguientes credenciales:
     -Correo: cliente@leeconnos.cl
     -Contraseña: LeeConNos2026

## Ingresar como librero - Para ver "Mi perfil de librero"
  1. Ingresar a usuario (en el ícono de persona en el header de la web)
  2. Ingresa las siguientes credenciales:
     -Correo: librero@leeconnos.cl
     -Contraseña: LeeConNos2026
  3. En el menú del usuario aparece "Mi perfil de librero", que solo se muestra a esta cuenta. Con la cuenta de cliente, esa ruta muestra "Acceso denegado".


### Navegadores probados
- Google Chrome
- Microsoft Edge


## Navegación
Desde el header se puede acceder a:
└─> Inicio, al seleccionar el logo.
└─> Catálogo, con los géneros y temáticas de la API.
└─> Descubre con nosotros, que lleva a los perfiles de los libreros.
└─> Comunidad *(en construcción)*
└─> Búsqueda, que muestra resultados en el Catálogo.
└─> Inicio de sesión o registro, desde el ícono de usuario; con sesión iniciada, también a Mi cuenta *(en construcción, requiere sesión)* y, para la cuenta librero, a Mi perfil de librero.
└─> Carrito; desde ahí se puede continuar al checkout si hay productos.

Para llegar a la pantalla de compra exitosa:
- En Inicio, Catálogo o la ficha, pulsa Comprar ahora en un libro; o agrégalo al carrito y desde el panel elige Pagar ahora.
- En el checkout, inicia sesión o pulsa "compra como invitado" e ingresa tu correo.
- Elige despacho a domicilio y completa "Información de envío" (nombre, apellido, dirección, región, comuna y un celular como +56912345678), o elige retiro en tienda.
- Si quieres, aplica un código de descuento de prueba, por ejemplo `BIENVENIDA10`.
- Selecciona un método de pago y acepta los términos y condiciones.
- Pulsa Pagar ahora: aparece "¡Tu próxima lectura está cerca!" mientras se crea el pedido y luego la confirmación. No basta con abrir directamente la ruta /confirmacion-compra: necesita los datos de un pedido recién realizado.

Para ver la verificación del correo:
└─> Selecciona el ícono de usuario en el header, pulsa **Regístrate aquí**, completa y envía el formulario: aparece "¡Ya casi estás dentro!".
└─> El enlace del correo lleva a `/verificar-correo?token=<token>`, que muestra "¡Tu cuenta ya está lista!" o, si el enlace no es válido o venció, "No hemos podido verificar tu cuenta".
└─> En el modo dummy (`VITE_API_URL` vacía) se pueden ver los dos resultados: `/verificar-correo?token=prueba` y `/verificar-correo?token=invalido`.

Desde la Confirmación de compra, "Seguir comprando" lleva al Catálogo.


## Datos simulados
La carpeta `src/datos` tiene datos de ejemplo para libros, libreros y reseñas. Se usan cuando `VITE_API_URL` está vacía; con la API configurada, los datos vienen de Backend.

Con la API, algunas imágenes salen del diseño de Figma porque la API todavía no las entrega:
- Las fotos de los libreros y de sus autores favoritos.
- El video de la ficha, que es una imagen de ejemplo.

Algunas portadas de libros se cargan desde Open Library; si no existen, se muestra una portada genérica.


## Licencia

Ver [LICENSE](./LICENSE).
