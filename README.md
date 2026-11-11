# LeeConNos — Frontend

Proyecto Frontend del e-commerce **LeeConNos**, librería independiente ficticia con curaduría de libreros y club de lectura. Desarrollado en el marco del Taller de Bootcamps (DCC, Universidad de Chile) por el equipo **Legión Atenea**.

> "Conectamos personas con libros a través de recomendaciones humanas y una comunidad que comparte la pasión por leer."


## Estado del proyecto
La aplicación está desarrollada con React, TypeScript y Vite, siguiendo los wireframes y lineamientos de UX/UI, y está conectada con la API de Backend mediante la variable `VITE_API_URL`. El catálogo, la búsqueda y los filtros, el carrito, el inicio de sesión (con renovación automática de la sesión), el código de descuento y la compra con cuenta o como invitado usan datos reales. Algunas secciones, como las reseñas y los perfiles de libreros, todavía usan datos de ejemplo.

Mientras no exista la wiki del repositorio, la documentación técnica (diseñado vs implementado, formularios, endpoints, DTO y decisiones técnicas) está en [`react-app/README.md`](./react-app/README.md).


## Tecnologías
- React 19 y TypeScript 6 (componentes y páginas en TSX)
- React Router DOM 7 para la navegación
- Zustand 5 para el manejo del estado
- CSS3 para los estilos
- Bootstrap Icons (https://icons.getbootstrap.com/) (vía CDN)
- Vite 8 para desarrollo y build
- pnpm como gestor de paquetes
- Oxlint para linting
- Google Fonts: Lexend (fuente primaria) y Bree Serif (fuente secundaria/de marca), vía CDN
- Portadas de libro simuladas mediante la API pública de [Open Library](https://openlibrary.org/dev/docs/api/covers)

La aplicación puede conectarse a la API mediante `VITE_API_URL`.


## Estructura del repositorio
```
grupo-5-frontend/
├─ react-app                 
├─ src/
│  └─ assets/
│    ├─iconos
│    └─logos
|
│  └─ datos/
│    ├─generos.ts
│    ├─imagenes.ts
│    ├─libreros.ts
│    ├─libros.ts
│    └─regiones.ts
|
│  └─ componentes/
│    ├─Banner.tsx
│    ├─BarraNavegacion.tsx
│    ├─BotonFavorito.tsx
│    ├─Carrito.tsx
│    ├─Carrusel.tsx
│    ├─ComunidadLectora.tsx
│    ├─CuentaVerificada.tsx
│    ├─Desplegable.tsx
│    ├─EstadoCarga.tsx
│    ├─Estrellas.tsx
│    ├─FiltroDesplegable.tsx
│    ├─FiltroPrecio.tsx
│    ├─Footer.tsx
│    ├─Icono.tsx
│    ├─InicioSesionRegistro.tsx
│    ├─MensajeError.tsx
│    ├─MenuCatalogo.tsx
│    ├─MenuComunidad.tsx
│    ├─MenuDescubre.tsx
│    ├─MenuUsuario.tsx
│    ├─Newsletter.tsx
│    ├─PaginaEnConstruccion.tsx
│    ├─Portada.tsx
│    ├─PreguntaLibrero.tsx
│    ├─RutaNavegacion.tsx
│    ├─RutaProtegida.tsx
│    ├─TarjetaProducto.tsx
│    ├─TarjetaRecomendacion.tsx
│    ├─VolverArriba.tsx
│    ├─useComprarLibro.ts
│    ├─useDesplegable.ts
│    ├─usePeticion.ts
│    └─useTituloPagina.ts
|
│  └─ estado/
│    ├─autenticacionStore.ts
│    ├─carritoStore.ts
│    └─sesionStore.ts
|
│  └─ estilos/
│    ├─ barra-navegacion.css
│    ├─base.css
│    ├─carrito.css
│    ├─catalogo.css
│    ├─checkout.css
│    ├─comunidad-lectora.css
│    ├─confirmacion-compra.css
│    ├─estados.css
│    ├─ficha-libro.css
│    ├─footer.css
│    ├─index.css
│    ├─menu-catalogo.css
│    ├─menu-comunidad.css
│    ├─menu-descubre.css
│    ├─modal-autenticacion.css
│    ├─newsletter.css
│    ├─pagina-en-construccion.css
│    ├─perfil-librero.css
│    ├─pregunta-librero.css
│    ├─ruta-navegacion.css
│    ├─tarjeta-producto.css
│    ├─tarjeta-recomendacion.css
│    └─tokens.css
│             
│  └─ paginas/
│    ├─biblioteca.tsx
│    ├─catalogo.tsx
│    ├─checkout.tsx
│    ├─comunidad.tsx
│    ├─confirmacion-compra.tsx
│    ├─descubrir.tsx
│    ├─ficha-libro.tsx
│    ├─index.tsx
│    ├─mi-cuenta.tsx
│    ├─no-encontrada.tsx
│    ├─perfil-librero.tsx
│    └─recomendaciones.tsx
|
│  └─ servicios/
│    ├─api.ts
│    ├─authServicio.ts
│    ├─carritoServicio.ts
│    ├─catalogoServicio.ts
│    └─checkoutServicio.ts
|
│  └─ tipos/
│    ├─api.ts
│    ├─auth.ts
│    ├─carrito.ts
│    ├─checkout.ts
│    ├─libro.ts
│    └─pedido.ts
|
│  └─ utils/
│    ├─formato.ts
│    ├─libros.ts
│    ├─mensajesError.ts
│    └─validacion.ts
|
├─ App.css
├─ App.tsx
├─ index.css
├─ main.tsx
└─vite-env.d.ts


```


### Convenciones
- Código y nombres en español.
- Páginas en `paginas/` con nombres en minúsculas y guiones (ej. `ficha-libro.tsx`); componentes en `componentes/` con PascalCase (ej. `TarjetaProducto.tsx`); hooks con el prefijo `use` (ej. `usePeticion.ts`).
- Cada vista y componente principal tiene su hoja de estilos en `estilos/` con el mismo nombre (ej. `catalogo.css`).
- Los tokens del UI Kit (colores, tipografía, radios y sombras) están en `estilos/tokens.css` y los estilos transversales en `base.css`.
- Las páginas no llaman a la API directamente: lo hacen a través de los servicios de `servicios/`, y la URL de la API se configura solo en `.env`.
- Los recursos gráficos están en `src/assets/` (`iconos/` y `logos/`).


## Cómo ejecutar el proyecto
Requiere Node.js 20.19 o 22.12 en adelante (lo pide Vite 8) y pnpm. El equipo trabaja con Node 26 y pnpm 12.

  **Instructivo**
  1. Abrir la carpeta del proyecto en VS Code.
  2. Dirigirse a la carpeta react-app
  3. Instalar las dependencias: **pnpm install**
  4. Crear el archivo `.env` copiando `.env.example`: **cp .env.example .env**. Ahí va la URL de la API (`VITE_API_URL`); este archivo no se sube al repositorio.
  5. Efectuar el comando en la terminal: **pnpm run dev**
  6. Clic izquierdo y presionar Ctrl sobre la url del Localhost (http://localhost:5173).

Otros comandos, también desde `react-app`:

| Comando | Para qué sirve |
| --- | --- |
| `pnpm build` | Revisa los tipos y genera la versión de producción en `dist/` |
| `pnpm preview` | Muestra en local la versión generada con `pnpm build` |
| `pnpm lint` | Revisa el código con Oxlint |

Si `VITE_API_URL` queda vacía (o no se crea el `.env`), la aplicación funciona completa con datos de prueba locales, lo que sirve para trabajar cuando la API no está disponible. Vite solo lee el `.env` al arrancar: si se cambia, hay que volver a ejecutar `pnpm run dev`.

La documentación de la API (Swagger) está en la ruta `/docs` de la URL configurada en `VITE_API_URL`.


## Cómo probar
Se puede comprar con una cuenta (ver abajo), con una cuenta nueva desde "Crear cuenta" o como invitado.

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

## Ingresar como librero - Para crear y editar libros, similar a permisos de administrador.
  1. Ingresar a usuario (en el ícono de persona en el header de la web)
  2. Ingresa las siguientes credenciales:
     -Correo: librero@leeconnos.cl
     -Contraseña: LeeConNos2026


### Navegadores probados
- Google Chrome
- Microsoft Edge


## Navegación
Desde el header se puede acceder a:
└─> Inicio, al seleccionar el logo.
└─> Catálogo, incluyendo opciones de géneros y temáticas.
└─> Comunidad *(en construcción)*
└─> Descubre con nosotros, que lleva a perfiles de libreros.
└─> Búsqueda, que muestra resultados en el Catálogo.
└─> Inicio de sesión o registro, desde el ícono de usuario; con sesión iniciada, también a Mi cuenta (requiere sesión; sin ella se abre el inicio de sesión).
└─> Carrito; desde ahí se puede continuar al checkout si hay productos.

Para llegar a la pantalla de compra exitosa:
- En Inicio o Catálogo, pulsa Comprar ahora en un libro; o agrégalo al carrito y desde el panel elige Pago seguro.
- En el checkout, inicia sesión o elige comprar como invitado e ingresa nombre, apellido, correo y teléfono (para despacho, un celular como +56912345678).
- Selecciona despacho e ingresa los datos de dirección, o elige retiro en tienda.
- Si quieres, aplica un código de descuento de prueba, por ejemplo `BIENVENIDA10`.
- Selecciona un método de pago y acepta los términos y condiciones.
- Pulsa Pagar ahora.
- Si el pedido se procesa correctamente, la aplicación te lleva automáticamente a la confirmación. No basta con abrir directamente la ruta /confirmacion-compra: necesita los datos de un pedido recién realizado.

Para acceder a la pantalla de cuenta verificada:
└─> Selecciona el ícono de usuario en el header.
└─> Pulsa **Crear cuenta**, completa y envía el formulario.


Además, desde la Confirmación de compra se puede ir al inicio para "volver a comprar" o ir a Comunidad.
└─> Confirmación compra > Inicio
└─> Confirmación compra > Comunidad


## Documentación técnica
Mientras no exista la wiki, está en [`react-app/README.md`](./react-app/README.md):
- Estado de los requisitos del Hito 3.
- Vistas, rutas y componentes.
- Wireframes y formularios diseñados vs implementados.
- Búsqueda y filtros, sesión y estado.
- Endpoints disponibles vs integrados y DTO.
- Decisiones técnicas, diferencias con el diseño y pendientes.


## Datos simulados
La aplicación contiene datos de ejemplo para libros y perfiles de libreros en archivos TypeScript dentro de `src/datos`. Si `VITE_API_URL` está vacía, toda la aplicación funciona con esos datos; si está configurada, el catálogo, la sesión, el carrito y el checkout usan la API. Con la API, siguen siendo de ejemplo las reseñas de la ficha, los perfiles de libreros, los recomendados del Home y el newsletter. Algunas portadas de libros se cargan desde Open Library y otras son imágenes de relleno.


## Licencia

Ver [LICENSE](./LICENSE).
