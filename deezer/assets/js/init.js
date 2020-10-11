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
            target.querySelector("a").href = `index.html?categoria=${e.id}`;

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

const toggle = function(evt) {
    if (this.parentElement.classList.contains("nav--collapse"))
        this.parentElement.classList.remove("nav--collapse");
    else
        this.parentElement.classList.add("nav--collapse");
}

document.addEventListener("DOMContentLoaded", function(event) {
    const nav_title = document.querySelector(".nav__element--title");
    genre(document.querySelector("#genre"));
    if (nav_title)
        nav_title.addEventListener("click", toggle);
});