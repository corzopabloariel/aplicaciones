/**
 * Recorro todos los elementos del formulario y los limpio
 */
function restablecer() {
    Array.prototype.forEach.call(document.querySelectorAll(".form-input"), i => i.value = "");
}

/**
 * Cancelo encuesta y retornar en el historial.
 */
function cancelar() {
    if (confirm("¿Desea volver a la página anterior?"))
        window.history.back();
    console.info("Nada por hacer");
}

/**
 * Detengo la propagación del evento submit y capturo los valores
 * @param evt
 */
function enviar(evt) {
    evt.preventDefault();
    let datos = Array.prototype.map.call(document.querySelectorAll(".form-input"), i => `${i.getAttribute("aria-label")}: ${i.value}`).join("\n");
    alert(datos);
    restablecer();
}