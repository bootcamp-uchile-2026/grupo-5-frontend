const botonCarrito = document.getElementById('boton-carrito');
const carritoOverlay = document.getElementById('carrito-overlay');
const carritoCerrar = document.getElementById('carrito-cerrar');

function abrirCarrito(){
    carritoOverlay.hidden = false;
    botonCarrito.setAttribute('aria-expanded', 'true');
}

function cerrarCarrito(){
    carritoOverlay.hidden = true;
    botonCarrito.setAttribute('aria-expanded', 'false');
}

botonCarrito.addEventListener('click', abrirCarrito);
carritoCerrar.addEventListener('click', cerrarCarrito);
carritoOverlay.addEventListener('click', function (evento){
    if (evento.target === carritoOverlay) cerrarCarrito();
});
document.addEventListener('keydown', function (evento){
    if (evento.key === 'Escape') cerrarCarrito();
});
