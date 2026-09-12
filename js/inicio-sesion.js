const botonLogin = document.getElementById("boton-iniciar-sesion");
const modalLogin = document.getElementById("modal-inicio-sesion");

botonLogin.addEventListener("click", function () {
    modalLogin.classList.add("activo");
});

modalLogin.addEventListener("click", function (event) {
    if (event.target === modalLogin) {
        modalLogin.classList.remove("activo");
    }
});