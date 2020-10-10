/**
 * @description Obtiene todos los géneros
 * @param {*} url @type STRING
 */
const genre = async (elem) => {
    let url = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/?output=json";
    let aux = await init(url);
    if (aux.data) {
        aux.data.forEach(e => {
            let target = elem.firstElementChild.cloneNode(true);
            target.classList.remove("d-none");
            target.querySelector("a").textContent = e.name;
            target.querySelector("a").href = `https://api.deezer.com/genre/${e.id}/artists/?index=0&limit=10`;

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

document.addEventListener("DOMContentLoaded", function(event) {
    genre(document.querySelector("#genre"));
});