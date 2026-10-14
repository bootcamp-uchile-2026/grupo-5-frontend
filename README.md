# LeeConNos — Frontend

Proyecto Frontend del e-commerce **LeeConNos**, librería independiente ficticia con curaduría de libreros y club de lectura. Desarrollado en el marco del Taller de Bootcamps (DCC, Universidad de Chile) por el equipo **Legión Atenea**.

> "Conectamos personas con libros a través de recomendaciones humanas y una comunidad que comparte la pasión por leer."


## Estado del proyecto
La aplicación se encuentra en etapa de maquetación y construcción de su base visual, utilizando HTML y CSS puro (sin framework ni bundler) a partir de los wireframes y lineamientos entregados por UX/UI. Se usan datos e imágenes simuladas mientras se avanza en la futura integración con Backend. Las vistas actuales no representan una versión final del producto.


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
│    ├─complementosLibros.ts
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
│    ├─TarjetaProducto.tsx
│    ├─TarjetaRecomendacion.tsx
│    └─VolverArriba.tsx
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
│    ├─catalogoServicios.ts
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
├─ App.css
├─ App.tsx
├─ index.css
├─ main.tsx
└─vite-env.d.ts


```


### Convenciones
- Nombres de archivo en español, en minúsculas y separados por guiones (ej. `ficha-libro.html`, `catalogo.css`).
- Cada vista principal tiene su propia hoja de estilos con el mismo nombre.
- Los estilos transversales (paleta de colores, tipografía, escala tipográfica, header, footer) se centralizan en `base.css`.
- Los recursos gráficos se separan por tipo en `imagenes/` y `Logos/`.


## Cómo ejecutar el proyecto
No requiere instalación ni dependencias.
  **Instructivo**
  1. Abrir la carpeta del proyecto en VS Code.
  2. Dirigirse a la carpeta react-app
  3. Efectuar el comando en la terminal: **pnpm run dev**
  4. Clic izquierdo y presionar Ctrl sobre la url del Localhost.


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
└─> Inicio de sesión o registro, desde el ícono de usuario; con sesión iniciada, también a Mi cuenta.
└─> Carrito; desde ahí se puede continuar al checkout si hay productos.

Para llegar a la pantalla de compra exitosa:
- En Inicio o Catálogo, pulsa Comprar ahora en un libro; o agrégalo al carrito y desde el panel elige Pago seguro.
- En el checkout, inicia sesión o elige comprar como invitado e ingresa un correo y teléfono válidos.
- Selecciona despacho e ingresa los datos de dirección, o elige retiro en tienda.
- Selecciona un método de pago y acepta los términos y condiciones.
- Pulsa Pagar ahora.
- Si el pedido se procesa correctamente, la aplicación te lleva automáticamente a la confirmación. No basta con abrir directamente la ruta /confirmacion-compra: necesita los datos de un pedido recién realizado.

Para acceder a la pantalla de cuenta verificada:
└─> Selecciona el ícono de usuario en el header.
└─> Pulsa **Crear cuenta**, completa y envía el formulario.
└─> En el mensaje de confirmación, pulsa **Continuar**.
**[En estos momentos sólo está vinculado a ese botón, hasta que añadamos la acción de verificación real.]**

Además, desde la Confirmación de compra se puede ir al inicio para "volver a comprar" o ir a Comunidad.
└─> Confirmación compra > Inicio
└─> Confirmación compra > Comunidad


## Datos simulados
Los datos de ejemplo (títulos, autores, precios, etiquetas) están escritos directamente en el HTML. Las portadas de libro se obtienen mediante URLs de la API pública de Open Library (`covers.openlibrary.org`). No existe aún un archivo de datos independiente (JSON u otro); su consistencia con las interfaces de Backend queda pendiente de validar una vez definidos los contratos de datos (DTOs).


## Licencia

Ver [LICENSE](./LICENSE).
