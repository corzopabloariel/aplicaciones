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
    $(".section .sideBar").addClass("d-none");
    $(".section").addClass("section--simple")
    generos();
  }

  //EVENTO PARA GUARDAR EN EL HISTORIAL LA CANCION REPRODUCIDA
  document.addEventListener('play', async function (e) {
    var audios = $('audio');
    playOnlyOne(audios, e.target);
    let trackid = $(e.target).data('id');
    let track = await trackById(trackid);
    if (track){
      let text = `<i class="fas fa-music"></i> ${track.title} - ${track.artist.name}</i>`;
      let url = `?track=${trackid}`;
      saveSearchHistory(text, url);
    }
  }, true);

  /**
   * pausa todos los elementos dejando solo el actual
   * @param {Array<Node>} elements lista de elementos
   * @param {Node} playing elemento actual reproduciendo
   */
  function playOnlyOne(elements, playing){
    for (var i = 0; i < elements.length; i++) {
      if (elements[i] != playing) {
        elements[i].pause();
      }
    }
  }
});