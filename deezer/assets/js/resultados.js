var i;
function resultados () {
    console.log(document.getElementById('q').value);
busqueda=document.getElementById('q').value;
console.log(busqueda);


url=`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}&index=0&limit=10?output=json`;
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
    
        $("#datos").append(`
    

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
/*if(result.hasOwnProperty('next')){
    var total=result.total;
    total=total/10;
    while (index<total){

    }
}*/

})})}

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