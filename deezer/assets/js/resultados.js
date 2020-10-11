var i;
function resultados () {
    // Validar contenido de #q
console.log(document.getElementById('q').value);
busqueda=parametro.get('q');
console.log(busqueda);
/**
 * if busqueda is not Empty -> document.getElementById('q').value = busqueda;
 */
if(parametro.has('url')){
    url=`https://cors-anywhere.herokuapp.com/${pg}`;
}
    else{
        url=`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}&index=0&limit=10?output=json`;
    }
$.get(url, function (result) {
    console.log(result);
    index=0;
    console.log(result.data);
    index=result.total;
    parseInt(index);
   // result=JSON.parse(result);

  $.each(result.data,function(index,obj){
 
    var segundos=parseInt(obj.duration);
    
        $("#datos_encontrados").append(`
    

    <div id='${obj.id}' class="music">
    <picture>
    <img src='${obj.album.cover_medium}'>
    </picture>
    <div class="text">
        <a href="">${obj.title}</a>
        <ul class="details">
           
            <li id='"${obj.artist.id}"'>${obj.artist.name}</li>
            <li>${aMinutos(segundos)} </li>
        </ul>
    </div>
</div>`
)

})
/**
 * la clase de css d-none, tiene para ocultar
 * cada vez que se haga una nueva búsqueda debería ocultarse
 */

$(".paginate").removeClass("d-none");
$(".paginate--link").attr("href",`index.html?url="${result.next}"`);
})
}

function aMinutos(time) {
    var hr = ~~(time / 3600);
    var min = ~~((time % 3600) / 60);
    var sec = time % 60;
    var sec_min = "";
    if (hr > 0) {
       sec_min += "" + hrs + ":" + (min < 10 ? "0" : "");
    }
    sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
    sec_min += "" + sec;
    return sec_min+ " min";
 }

 function genero(){
     id=parametro.get("categoria")
    url=`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${id}/artists/?index=0&limit=10?output=json`;
    $.get(url, function (result) {
        console.log(url);
        index=0;
        index=result.total;
        parseInt(index);
       // result=JSON.parse(result);
        console.log(result.data);
      $.each(result.data,function(index,obj){
        console.log(index);
        var segundos=parseInt(obj.duration);
        
            $("#datos_encontrados").append(`
        
    
        <div id='${obj.id}' class="music">
        <picture>
        <img src='${obj.picture_medium}'>
        </picture>
        <div class="text">
            <a href="">${obj.name}</a>
            <ul class="details">
  
            </ul>
        </div>
    </div>`
    )
 })})
}