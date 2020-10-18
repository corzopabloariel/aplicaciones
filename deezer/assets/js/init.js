/**
 * @description Obtiene todos los géneros
 * @param {*} url @type STRING
 */
const genre = async (elem) => {
    let url = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/?output=json";
    let aux = await init(url);
    if (aux === null){
      $(elem).append('<div class="no-content">Error al obtener resultados</div>');
      return;
    }
    if (aux.data) {
        aux.data.forEach(e => {
            let target = elem.firstElementChild.cloneNode(true);
            target.classList.remove("d-none");
            target.querySelector("a").textContent = e.name;
            target.querySelector("a").href = `index.html?genre=${e.id}&name=${e.name}`;

      elem.appendChild(target);
    });
  }
}

// función asíncrona con "async"
const init = async url => {
  try {
    let response = await fetch(url);
    return await response.json();
  }
  catch (err) {
    console.error(err);
    return null;
  }
}

/**
 * Cambiar visibilidad del menu lateral
 * @param {*} evt 
 */
const toggle = function (evt) {
  if (this.parentElement.classList.contains("nav--collapse"))
    this.parentElement.classList.remove("nav--collapse");
  else
    this.parentElement.classList.add("nav--collapse");
}

document.addEventListener("DOMContentLoaded", function (event) {
  if (localStorage.fav !== undefined) {
    window.fav = JSON.parse(localStorage.fav);
    $(".nav--header .favoritos").attr("data-favoritos", window.fav.length);
  }
  const nav_title = document.querySelector(".nav__element--title");
  genre(document.querySelector("#genre"));
  if (nav_title)
    nav_title.addEventListener("click", toggle);
  ALUMNOS.forEach(function(alumno) {
    $(".footer .container").append(`<a href="mailto:${alumno.email}">${alumno.nombre}</a>`)
  })
});

function validateEmail(element) {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(element.value).toLowerCase());
}

//VALIDATION MESSAGES
/**
 * crea elemento mensaje en validaciones
 * @param {String} message Texto
 */
function createMessage(message) {
  let messageElement = document.createElement('span');
  messageElement.innerText = message;
  messageElement.classList.add('requiredMessage');
  return messageElement;
}

/**
 * crea mensaje generico de campo obligatorio
 */
function createRequiredMessage() {
  let message = createMessage('*Este campo es requerido');
  return message;
}

/**
 * crea mensaje de formato de mail incorrecto
 */
function createEmailMessage() {
  let message = createMessage('El mail no es correcto');
  return message;
}

//REMOVE MESSAGES FROM FORM
/**
 * quita los mensaje de validaciones en un formulario
 * @param {Node} form Formulario
 */
function resetFormMessages(form) {
  let requiredFields = form.getElementsByClassName("required");
  for (field of requiredFields) {
    field.style.border = '1px solid #ced4da';
    let parent = field.parentElement;
    let messages = parent.getElementsByClassName('requiredMessage');
    let messagesCount = messages.length;
    for (i = 0; i < messagesCount; i++) {
      messages[0].remove();
    }
  }
}

// (function () {
//   if (typeof Object.defineProperty === 'function') {
//     try { Object.defineProperty(Array.prototype, 'sortBy', { value: sb }); } catch (e) { }
//   }
//   if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

//   function sb(f) {
//     for (var i = this.length; i;) {
//       var o = this[--i];
//       this[i] = [].concat(f.call(o, o, i), o);
//     }
//     this.sort(function (a, b) {
//       for (var i = 0, len = a.length; i < len; ++i) {
//         if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1;
//       }
//       return 0;
//     });
//     for (var i = this.length; i;) {
//       this[--i] = this[i][this[i].length - 1];
//     }
//     return this;
//   }
// })();

var sortBy = (function () {
  var toString = Object.prototype.toString,
      // default parser function
      parse = function (x) { return x; },
      // gets the item to be sorted
      getItem = function (x) {
        var isObject = x != null && typeof x === "object";
        var isProp = isObject && this.prop in x;
        return this.parser(isProp ? x[this.prop] : x);
      };
      
  /**
   * Sorts an array of elements.
   *
   * @param {Array} array: the collection to sort
   * @param {Object} cfg: the configuration options
   * @property {String}   cfg.prop: property name (if it is an Array of objects)
   * @property {Boolean}  cfg.desc: determines whether the sort is descending
   * @property {Function} cfg.parser: function to parse the items to expected type
   * @return {Array}
   */
  return function sortby (array, cfg) {
    if (!(array instanceof Array && array.length)) return [];
    if (toString.call(cfg) !== "[object Object]") cfg = {};
    if (typeof cfg.parser !== "function") cfg.parser = parse;
    cfg.desc = !!cfg.desc ? -1 : 1;
    return array.sort(function (a, b) {
      a = getItem.call(cfg, a);
      b = getItem.call(cfg, b);
      return cfg.desc * (a < b ? -1 : +(a > b));
    });
  };
  
}());

/**
 * cambiar el comportamiento del elemento
 */
jQuery.fn.extend({
  modal: function(action) {
    $("#modal-background").css("display", action == "show" ? "block" : "none");
    $(this).css("display", action == "show" ? "block" : "none");
  }
});