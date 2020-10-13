function iniciarMap(){
    var mymap = L.map('mapid').setView([-34.9228,-57.956], 13);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicGFibG92ZWludGV2ZWludGUiLCJhIjoiY2tnN2RkN205MDY5YzJybXoydGx4djhrciJ9.Lq6upFNxQhamVhtJv-hJWw'
}).addTo(mymap);
}