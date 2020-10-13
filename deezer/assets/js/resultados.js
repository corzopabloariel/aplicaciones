var i;
function resultados() {
  // Validar contenido de #q
  console.log(document.getElementById('q').value);
  busqueda = parametro.get('q').trim();
  if (busqueda === "")
    return;
  document.getElementById('q').value = busqueda;
  i = parametro.get('index');
  console.log(busqueda);
  /**
   * if busqueda is not Empty -> document.getElementById('q').value = busqueda;
   */
  url = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=${busqueda}&index=${i}&limit=10?output=json`;
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
      console.log(index);
      console.log(i);
      var segundos = parseInt(obj.duration);
      $("#datos_encontrados").append(
          `<div id='${obj.id}' class="music">` +
              `<picture>` +
                  `<img class="music__cover" src="${obj.album.cover_medium}">` +
              `</picture>` +
              `<div class="text">` +
                  `<div class="music__title"><a href="#">${obj.title}</a></div>` +
                  `<ul class="music__details">` +
                      `<li id="artist-${obj.artist.id}" data-type="artist"><a href="index.html?artist=${obj.artist.id}">${obj.artist.name}</a></li>` +
                      `<li data-type="time">${aMinutos(segundos)}</li>` +
                      `<li data-type="album"><a href="index.html?album=${obj.album.id}">${obj.album.title}</a></li>` +
                      `<li data-type="preview">` +
                          `<audio controls>` +
                              `<source src="${obj.preview}" type="audio/mpeg">` +
                              `Your browser does not support the audio element.` +
                          `</audio>` +
                      `</li>` +
                  `</ul>` +
                  `<div class="music__share">` +
                      `<button class="share" data-trackId="${obj.id}">Para compartir</button>` +
                  `</div>` +
              `</div>` +
          `</div>`
      );
    });

    if (result.hasOwnProperty('next') || i == 9) {
      index = new URLSearchParams(result.next);
      index = index.get("index")
      $(".paginate").removeClass("d-none");
      $(".paginate--link").attr("href", `index.html?q=${busqueda}&index=${index}`);
    }

    if (result.total > 0){
      $(".share").click(function(){
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

            $("#modal-background").css("display","block");
            $("#modal").css("display","block");
          },
          error: function(xhr, status){
    
          }
        })
      });
    }
  })
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

function genero(){
    id = parametro.get("genre");
    document.querySelector("#datos__title").textContent = parametro.get("name");
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
            $("#datos_encontrados").append(
                `<div id='genre-${obj.id}' class="music">` +
                    `<picture>` +
                        `<img class="music__cover" src='${obj.picture_medium}'>` +
                    `</picture>` +
                    `<div class="text">` +
                        `<div class="music__title music__title--artist"><a href="index.html?artist=${obj.id}">${obj.name}</a></div>` +
                        `<ul class="music__details">` +
                            `<li class="music__track"><a href="index.html?artist=${obj.id}&top=5">Top 5</a></li>` +
                        `</ul>` +
                        `<div class="music__share">` +
                            `<a>Para compartir</a>` +
                        `</div>` +
                    `</div>` +
                `</div>`
            );
        });
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