var titulo;
var autor;
var fecha;
function resultados () {
busq=document.getElementById('busq').value;
busq=busq.split(' ').join('+');
pais = document.getElementById('pais').value;
opcion = document.getElementById('media').value;
console.log(opcion);
console.log(pais);
console.log(busq);


        // OBTENIENDO JSON DE DETALLES DE UNA PELICULA
        url = `https://itunes.apple.com/search?term=${busq}&country=${pais}&media=${opcion}&limit=10`;
        $.get(url, function (det) {
            console.log(url);
            det=JSON.parse(det);
            console.log(det.results);
          $.each(det.results,function(index,obj){
              
            $(".grid").append(`
            
            <div class="music">
            <picture>
            <img src='${obj.artworkUrl100}'>
            </picture>
            <div class="text">
                <a href="">Título 1</a>
                <ul class="details">
                    <li>Autor</li>
                    <li>Fecha</li>
                    <li>Duración</li>
                </ul>
            </div>
        </div>
            `);})
        })
            
             
              
    
               




/*<!--<div class="productos">
                    <div class="grid">
                        <div class="music">
                            <picture></picture>
                            <div class="text">
                                <a href="">Título 1</a>
                                <ul class="details">
                                    <li>Autor</li>
                                    <li>Fecha</li>
                                    <li>Duración</li>
                                </ul>
                            </div>
                        </div>
                        <div class="music">
                            <picture></picture>
                            <div class="text">
                                <a href="">Título 1</a>
                            </div>
                        </div>
                    </div>
                </div>-->*/
}
