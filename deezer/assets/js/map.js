function iniciarMap(){
   
    var mymap = L.map('mapid').setView([-34.9228,-57.956], 13);
  //  var marker = L.marker([-34.9228,-57.956]).addTo(mymap);
    var iconoPua = L.icon({
        iconUrl: '../deezer/assets/img/pua2.png',
       // shadowUrl: '../deezer/assets/img/pua2.png',
    
        iconSize:     [30, 40], // size of the icon
        iconAnchor:   [15, 40], // point of the icon which will correspond to marker's location
        popupAnchor:  [0, -30] // point from which the popup should open relative to the iconAnchor
    });
    L.marker([-34.9228,-57.956], {icon: iconoPua}).addTo(mymap).bindPopup("I am a green leaf.");
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicGFibG92ZWludGV2ZWludGUiLCJhIjoiY2tnN2RkN205MDY5YzJybXoydGx4djhrciJ9.Lq6upFNxQhamVhtJv-hJWw'
}).addTo(mymap);

}
function inciarMapa(){
    var map = L.map('map').setView([51.505, -0.09],2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    L.marker([51.5, -0.09]).addTo(map)
        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
        .openPopup();
}