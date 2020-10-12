$(document).ready(function () {
  parametro = window.location.search;
  console.log(parametro);
  parametro = new URLSearchParams(parametro);
  console.log(parametro);

  if (parametro.has('q')) {
    resultados();
  }

  if (parametro.has('categoria')) {
    genero();
  }
});