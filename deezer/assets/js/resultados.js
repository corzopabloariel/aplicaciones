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
                      `<li id="artist-${obj.artist.id}" data-type="artist"><a href="index.html?artist=${obj.artist.id}&name=${obj.artist.name}">${obj.artist.name}</a></li>` +
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
                      `<a>Para compartir</a>` +
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

function artista() {
  i = 0;
  if (parametro.has('index'))
    i = parametro.get('index');
  id = parametro.get("artist");
  name = parametro.get("name");
  document.querySelector("#datos__title").textContent = "Artista: " + name;
  url=`https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}/output=json`;
  url2 = `https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/${id}/top/&index=${i}&limit=10?output=json`;

  // result=JSON.parse(result);
  $.get(url2, function (result) {
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
                      //`<li id="artist-${obj.artist.id}" data-type="artist"><a href="index.html?artist=${obj.artist.id}&name=${obj.artist.name}">${obj.artist.name}</a></li>` +
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
                      `<a>Para compartir</a>` +
                  `</div>` +
              `</div>` +
          `</div>`
      );
    });

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
    document.querySelector("#datos__title").textContent = "Género: " + parametro.get("name");
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
                        `<div class="music__title music__title--artist"><a href="index.html?artist=${obj.id}&name=${obj.name}">${obj.name}</a></div>` +
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