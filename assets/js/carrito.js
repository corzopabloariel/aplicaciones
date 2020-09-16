function carritoLink(event, t) {
    event.preventDefault();
    let valor = 0;
    $(t).toggleClass("grid-click");
    $(".grid-click").each(function() {
        valor += parseFloat($(t).data("precio"));
    });
    valor = valor.toFixed(2);
    valor = valor.replace(".", ",");
    $(".carrito").text(`$ ${valor}`);
    return false;
}
$(document).ready(function() {
    $(".grid-element").click(carritoLink);
});