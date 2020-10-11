var i;
function resultados () {
    // Validar contenido de #q
console.log(document.getElementById('q').value);
busqueda=parametro.get('q');
i=parametro.get('index');
console.log(busqueda);
/**
 * if busqueda is not Empty -> document.getElementById('q').value = busqueda;
 */
    
    url=`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}&index=${i}&limit=10?output=json`;
    console.log(url);
$.get(url, function (result) {
    console.log(result);
    i=0;
   // result=JSON.parse(result);

  $.each(result.data,function(index,obj){
    i=index++;
    console.log(index);

    console.log(i);
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

if(result.hasOwnProperty('next')||i==9){
index=new URLSearchParams(result.next);
index=index.get("index")
$(".paginate").removeClass("d-none");
$(".paginate--link").attr("href",`index.html?q=${busqueda}&index=${index}`);}
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