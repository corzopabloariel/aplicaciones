const file = async (file, callbackOK) => {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200")
            callbackOK.call(null, JSON.parse(rawFile.responseText));
    }
    rawFile.send(null);
    /*const response = await fetch(file)
    const text = await response.text()
    */
}

const isVisible = el => {
    let style = window.getComputedStyle(el);
    return (style.display !== 'none')
};

function visibilityNav() {
    let nav = document.querySelector(".nav-responsive");
    if (isVisible(nav))
        nav.classList.add("none");
    else
        nav.classList.remove("none");
}
function products(...args) {
    if (args[0].length === 0)
        return "";
    let container = document.createElement("div");
    container.classList.add("grid");
    args[0].forEach(elem => {
        let a = document.createElement("a");
        let html = "";
        let img = elem.img ? elem.img : "";
        a.classList.add("grid-element");
        a.dataset.precio = elem.price === undefined ? 50 : elem.price;
        a.href = window.flagCarrito === undefined ? `pelicula.html#${args[1]}-${elem.code}` : "#";
        if (window.flagCarrito !== undefined)
            a.setAttribute("onclick", "carritoLink(event, this)");
        html += `<picture>`;
            html += `<img src="${img}"  class="w-100" onError="this.src='https://www.unaj.edu.ar/wp-content/uploads/2016/06/logo-unaj-2016-01.jpg'" alt="${elem.title}">`;
        html += `</picture>`;
        html += `<h5 class="text-center">${elem.title ? elem.title : "-"}</h5>`;
        html += `<p><strong>Año:</strong> ${elem.year ? elem.year : "-"}</p>`;
        html += `<p><strong>Clasificación:</strong> ${elem.classification ? elem.classification : "-"}</p>`;
        html += `<p><strong>Duración:</strong> ${elem.duration ? elem.duration : "-"}</p>`;
        if (window.flagCarrito !== undefined && elem.price !== undefined)
            html += `<p><strong>Precio:</strong> $${elem.price.toFixed(2).replace(".", ",")}</p>`;
        a.innerHTML = html;
        container.appendChild(a);
    });
    return container.outerHTML;
}
function link(event) {
    event.preventDefault();
    let obj = null;
    let category = null;
    try {
        let href = this.href.split("#");
        let codes = href[1].split("-");
        console.warn("Función que usa localStorage");
        category = window.json.find(function(c) {
            if (c.code === codes[0])
                return c;
        });
        obj = category.data.find(function(p) {
            if (p.code === codes[1])
                return p;
        });
        localStorage.setItem("obj", JSON.stringify(obj));
        localStorage.setItem("category", JSON.stringify(category));
        window.location.href = "pelicula.html";
    } catch (error) {
        console.error(error);
    }
}
function linkCategory(event) {
    event.preventDefault();
    let category = null;
    try {
        let href = this.href.split("#");
        let codes = href[1];
        console.warn("Función que usa localStorage");
        category = window.json.find(function(c) {
            if (c.code === codes)
                return c;
        });
        localStorage.setItem("categoryObj", JSON.stringify(category));
        window.location.href = "categoria.html";
    } catch (error) {
        console.error(error);
    }
}
let finish = () => {
    if (localStorage.obj !== undefined)
        window.localStorage.clear();
}
document.addEventListener("DOMContentLoaded", function(event) {
    file('assets/_json/categorias.json', data => {
        window.json = data;
        let ul = document.createElement("ul");
        let a = document.createElement("a");
        let li = document.createElement("li");
        a.href = "encuesta.html";
        a.textContent = "Encuesta";
        li.appendChild(a);
        li.classList.add("encuesta");
        let li2 = li.cloneNode(true);
        li2.querySelector("a").href = "carrito.html";
        li2.querySelector("a").textContent = "Carrito";
        data.forEach(elem => {
            let section = document.createElement("section");
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.href = !window.location.pathname.includes(".html") ? `./#${elem.name_slug}` : `./categoria.html#${elem.code}`;
            a.textContent = elem.name;
            if (window.location.pathname.includes(".html"))
                a.classList.add("category");
            li.dataset.code = elem.code;
            li.appendChild(a);
            ul.appendChild(li);

            if (!window.location.pathname.includes(".html") || window.flagCarrito !== undefined) {
                section.id = elem.name_slug;
                section.classList.add("article");
                section.innerHTML = `<h4 class="article-name">${elem.name} (${elem.data.length})</h4>`
                section.innerHTML += products(elem.data, elem.code);
                document.querySelector("#data").appendChild(section);
            }
        });
        ul.appendChild(li);
        ul.appendChild(li2);
        document.querySelector(".categories").appendChild(ul.cloneNode(true));
        document.querySelector("nav").appendChild(ul.cloneNode(true));
        finish();
        if (window.flagCarrito === undefined)
            Array.prototype.forEach.call(document.querySelectorAll(".grid-element"), a => a.addEventListener("click", link));
        Array.prototype.forEach.call(document.querySelectorAll(".category"), a => a.addEventListener("click", linkCategory));
    });
    document.querySelector(".nav-responsive__close").addEventListener("click", visibilityNav);
    document.querySelector("#showMenu").addEventListener("click", visibilityNav);
});