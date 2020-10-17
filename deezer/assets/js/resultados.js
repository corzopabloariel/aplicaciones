const cancion = function(obj, artista = 1, musica = 1, append = "", albumNombreCompleto = 0) {
  let segundos = parseInt(obj.duration);
  let html = "";
  html += `<div class="music">`;
  html += `<picture>`;
    html += `<a class="fav ${window.fav !== undefined && window.fav.indexOf(obj.id) >= 0 ? "fav--ok" : ""}" data-music="${obj.id}"></a>`;
    html += `<img class="music__cover" src="${obj.album.cover_medium}">`;
  html += `</picture>`;
  html += `<div class="text">`;
  if (musica)
    html += `<div class="music__title"><a href="index.html?track=${obj.id}">${obj.title}</a></div>`;
  html += `<ul class="music__details">`;
  if (artista)
    html += `<li id="artist-${obj.artist.id}" data-type="artist"><a href="index.html?artist=${obj.artist.id}&name=${obj.artist.name}">${obj.artist.name}</a></li>`;
  html += `<li data-type="time">${aMinutos(segundos)}</li>`;
  html += `<li data-type="album"><a title="${obj.album.title}" href="index.html?album=${obj.album.id}&artist=${obj.artist.name}">${albumNombreCompleto ? obj.album.title : "Album"}</a></li>`;
  html += append;
  html += `<li data-type="preview">`;
  html += `<audio controls>`;
  html += `<source src="${obj.preview}" type="audio/mpeg">`;
  html += `Your browser does not support the audio element.`;
  html += `</audio>`;
  html += `</li>`;
  html += `</ul>`;
  html += `<div class="music__share">`;
  html += `<button class="share" data-trackId="${obj.id}">Para compartir</button>`;
  html += `</div>`;
  html += `</div>`;
  html += `</div>`;

  return html;
}

var i;
function resultados() {
  // Validar contenido de #q
  console.log(document.getElementById('q').value);
  busqueda = parametro.get('q').trim();
  $(".loader").show()
  if (busqueda === "")
    return;
  document.getElementById('q').value = busqueda;
  i = parametro.get('index');
  console.log(busqueda);
  /**
   * if busqueda is not Empty -> document.getElementById('q').value = busqueda;
   */
  url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}&index=${i}&limit=${PAGINATE}?output=json`;
  console.log(url);
  $.get(url, function (result) {
    if (i == '0') {
      saveSearchHistory(busqueda, window.location.search);
    }

    console.log(result);
    i = 0;
    // result=JSON.parse(result);

    $.each(result.data, function(index,obj){
      i = index ++;
      $("#datos_encontrados").append(cancion(obj));
    });
    $(".loader").hide();

    if (result.hasOwnProperty('next') || i == 9) {
      index = new URLSearchParams(result.next);
      index = index.get("index")
      $(".paginate").removeClass("d-none");
      $(".paginate--link").attr("href", `index.html?q=${busqueda}&index=${index}`);
    }

  })
}
$("body").on("click", ".share", function(){
  $(".loader").show();
  $(".loader").css({position: 'fixed', top: '50%', left: '50%'});

  var trackid = this.dataset.trackid;
  var url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${trackid}?output=json`;
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function(track){
      var trackData = $('#track-data');
      trackData.html('');
      trackData.append(`<span>Titulo: <span id="track-title">${track.title}</span></span>
                        <span>Duracion: <span id="track-duration">${aMinutos(parseInt(track.duration))}</span></span>
                        <span>Artista: <span id="track-artist">${track.artist.name}</span></span>
                        <span>Album: <span id="track-album">${track.album.title}</span></span>`);

      var trackImage = $('#track-image');
      trackImage.html('');
      trackImage.append(`<img src="${track.album.cover_xl}" />`);

      $("#modal").modal("show");
    },
    error: function(xhr, status){
    },
    complete: function(xhr, status){
      $(".loader").hide();
      $(".loader").css({position: 'relative', top: '0', left: '0'});
    }
  })
}).on("click", ".fav", function() {
  if (window.fav === undefined)
    window.fav = [];
  if (window.fav.indexOf($(this).data("music")) >= 0) {
    if (confirm("ATENCIÓN\n¿Está seguro de quitar la canción de los favoritos?")) {
      window.fav.splice(window.fav.indexOf($(this).data("music")), 1);
      $(this).removeClass("fav--ok");
    }
  } else {
    window.fav.push($(this).data("music"));
    $(this).addClass("fav--ok");
  }
  localStorage.fav = JSON.stringify(window.fav);
  $(".nav--header .favoritos").attr("data-favoritos", window.fav.length);
});

function favoritos() {
  $(".loader").show()
  document.querySelector("#datos__title").textContent = "Favoritos";
  html = "";
  if (window.fav !== undefined) {
    window.fav.forEach(function(id) {
      url=`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${id}?output=json`;
      $.get(url, function (result) {
        $("#datos_encontrados").append(cancion(result));
      });
    })
    $(".loader").hide()
  } else {
    html = "<p>Sin registros</p>";
    $("#datos_encontrados").addClass("datos__encontrados--comun");
    $("#datos_encontrados").append(html)
    $(".loader").hide()
  }
}

function aMinutos(time) {
  var hr = ~~(time / 3600);
  var min = ~~((time % 3600) / 60);
  var sec = time % 60;
  var sec_min = "";
  if (hr > 0)
    sec_min = `${hrs}:`;
  sec_min += `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
  return sec_min + " min";
}

function track() {
  id = parametro.get("track");
  $(".loader").show()
  url=`https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/${id}?output=json`;
  $.get(url, function (result) {
    regexData = /([0-9]{4})-([0-9]{2})-([0-9]{2})/;
    match = match = regexData.exec(result.release_date);
    day = `${match[3]}-${match[2]}-${match[1]}`;
    html = "";
    append = "";
    append += `<li data-type="album"><strong>ISRC:</strong> ${result.isrc}</li>`;
    append += `<li data-type="album"><strong>Ranking:</strong> ${result.rank}</li>`;
    append += `<li data-type="album"><strong>Lanzamiento:</strong> ${day}</li>`;
    append += `<li data-type="album"><strong>Link de Deezer:</strong> <a href="${result.share}" target="_blank">LINK</a></li>`;
    document.querySelector("#datos__title").innerHTML = `Artista: <a href="index.html?artist=${result.artist.id}&name=${result.artist.name}">${result.artist.name}</a> / Canción: ${result.title}`;
    html = cancion(result, 0, 0, append, 1)

    table = "<div class='table-responsive'><table class='tracks'>";
      table += "<thead>";
        table += "<tr>";
          table += "<th colspan='4'>Contribuyentes</th>";
        table += "</tr>";
        table += "<tr>";
          table += "<th style='max-width:100px; width:200px'>Nombre</th>";
          table += "<th style='max-width:100px; width:100px'>Imagen</th>";
          table += "<th style='max-width:100px; width:100px'>Role</th>";
          table += "<th>-</th>";
        table += "</tr>";
      table += "</thead>";
      table += "<tbody>";
        $.each(result.contributors, function(index,obj){
          table += `<tr>` +
              `<td>${obj.name}</td>` +
              `<td><img src="${obj.picture_big}" style="width:100%" /></td>` +
              `<td>${obj.role}</td>` +
              `<td><a href="index.html?artist=${obj.id}&name=${obj.name}">Canciones</a></td>` +
          `</tr>`
        });
      table += "</tbody>";
    table += "</table>";
    html += table;
    $("#datos_encontrados").append(html).addClass("datos__encontrados--comun");
    $(".loader").hide()
  });
}

function generos() {
  $(".loader").show()
  url=`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre?output=json`;
  $.get(url, function (result) {
    if (result.data) {
      result.data.forEach(function(obj) {
        html = "";
        html += `<a href="index.html?genre=${obj.id}&name=${obj.name}">`;
          html += `<div class="music">`;
            html += `<picture>`;
              html += `<img class="music__cover" src="${obj.picture_big}">`;
            html += `</picture>`;
            html += `<div class="music__title music__title--simple">${obj.name}</div>`;
          html += `</div>`;
        html += `</a>`;
        $("#datos_encontrados").append(html);
      })
      $(".loader").hide()
    }
  });
}

function album() {
  artist = parametro.get("artist");
  id = parametro.get("album");
  $(".loader").show()
  url=`https://cors-anywhere.herokuapp.com/https://api.deezer.com/album/${id}?output=json`;
  $.get(url, function (result) {
    document.querySelector("#datos__title").innerHTML = `Artista: <a href="index.html?artist=${result.artist.id}&name=${result.artist.name}">${result.artist.name}</a> / Album: ${result.title}`;
    table = "<div class='table-responsive'><table class='tracks'>";
      table += "<thead>";
        table += "<tr>";
          table += "<th style='max-width:100px; width:100px'>Nombre</th>";
          table += "<th style='max-width:100px; width:100px'>Duración</th>";
          table += "<th style='max-width:100px; width:100px'>Ranking</th>";
          table += "<th>Preview</th>";
        table += "</tr>";
      table += "</thead>";
    $.each(result.tracks.data, function(index,obj){
      var segundos = parseInt(obj.duration);
      table += `<tr>` +
          `<td><a href="index.html?track=${obj.id}">${obj.title}</a></td>` +
          `<td>${aMinutos(segundos)}</td>` +
          `<td style="text-align: center">${obj.rank}</td>` +
          `<td>` +
              `<audio controls>` +
                  `<source src="${obj.preview}" type="audio/mpeg">` +
                  `Your browser does not support the audio element.` +
              `</audio>` +
          `</td>` +
        `</tr>`;
    });
    table += "</table></div>";
    $("#datos_encontrados").append(table).addClass("datos__encontrados--comun");
    $(".loader").hide()
  })
}

function artista() {
  i = 0;
  if (parametro.has('index'))
    i = parametro.get('index');
  id = parametro.get("artist");
  name = parametro.get("name");
  $(".loader").show()
  document.querySelector("#datos__title").textContent = "Artista: " + name;
  url=`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}/output=json`;
  url2 = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}/top/&index=${i}&limit=${PAGINATE}?output=json`;

  // result=JSON.parse(result);
  $.get(url2, function (result) {
    $.each(result.data, function(index,obj){
      i = index ++;
      console.log(index);
      console.log(i);
      var segundos = parseInt(obj.duration);
      $("#datos_encontrados").append(cancion(obj, 0));
    });
    $(".loader").hide()
    if (result.hasOwnProperty('next') || i == 9) {
      index = new URLSearchParams(result.next);
      index = index.get("index")
      $(".paginate").removeClass("d-none");
      $(".paginate--link").attr("href", `index.html?artist=${id}&name=${name}&index=${index}`);
    }
  });
}

function genero(){
    id = parametro.get("genre");
    $(".loader").show()
    document.querySelector("#datos__title").textContent = "Género: " + parametro.get("name");
    url=`https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/${id}/artists/?index=0&limit=${PAGINATE}?output=json`;
    $.get(url, function (result) {
        console.log(url);
        index=0;
        index=result.total;
        parseInt(index);
        $.each(result.data,function(index,obj){
            console.log(index);
            var segundos=parseInt(obj.duration);
            $("#datos_encontrados").append(
                `<div id='genre-${obj.id}' class="music">` +
                    `<picture>` +
                        `<img class="music__cover" src='${obj.picture_medium}'>` +
                    `</picture>` +
                    `<div class="text">` +
                        `<div class="music__title music__title--artist"><a href="index.html?artist=${obj.id}&name=${obj.name}">${obj.name}</a></div>` +
                        /*`<div class="music__share">` +
                            `<a>Para compartir</a>` +
                        `</div>` +*/
                    `</div>` +
                `</div>`
            );
        });
        $(".loader").hide()
    });
}

function saveSearchHistory(text, search) {
  if (text.trim() !== '') {
    if (typeof (Storage) !== 'undefined') {
      var searchHistory = [];
      if (localStorage.searchHistory !== undefined) {
        searchHistory = JSON.parse(localStorage.searchHistory);
      }

      var searchItem = {
        search: search,
        text: text,
        date: new Date()
      }

      searchHistory.push(searchItem);
      localStorage.searchHistory = JSON.stringify(searchHistory);
    }
    else {
      console.warn('Navegador no compatible para almacenar busquedas');
    }
  }
}