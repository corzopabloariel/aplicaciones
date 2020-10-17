$(document).ready(function () {
  //iniciarMap();   
  parametro = window.location.search;
  console.log(parametro);
  parametro = new URLSearchParams(parametro);
  console.log(parametro);

  if (parametro.has('favoritos')) {
    favoritos();
  } else if (parametro.has('q')) {
    resultados();
  } else if (parametro.has('genre')) {
    genero();
  } else if (parametro.has('artist') && !parametro.has('album')) {
    artista();
  } else if (parametro.has('album')) {
    album();
  } else if (parametro.has('track')) {
    track();
  } else {
    generos();
  }
});