$(document).ready(function() {
    $(".grid-element").click(function(event) {
        event.preventDefault();
        let valor = 0;
        $(this).toggleClass("grid-click");
        $(".grid-click").each(function() {
            valor += parseFloat($(this).data("precio"));
        });
        valor = valor.toFixed(2);
        valor = valor.replace(".", ",");
        $(".carrito").text(`$ ${valor}`);
        return false;
    });
});