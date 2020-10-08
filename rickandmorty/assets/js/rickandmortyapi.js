/**
 * @description Obtiene todos los géneros
 * @param {*} url @type STRING
 */
const gender = async (url) => {
    let aux = await init(url);
    if (window.genders === undefined)
        window.genders = [];
    if (aux && aux.info.next) {
        let array = aux.results.map(function(x) {
            return x.gender;
        });
        array = Array.from(new Set(array));
        window.genders = window.genders.concat(array);
        window.genders = Array.from(new Set(window.genders));
        return gender(aux.info.next);
    } else
        console.log(window.genders)
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

document.addEventListener("DOMContentLoaded", function(event) {
    gender("https://rickandmortyapi.com/api/character/");
});