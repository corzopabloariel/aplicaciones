const file = async (file, callbackOK) => {
    const response = await fetch(file)
    const text = await response.text()
    callbackOK.call(null, JSON.parse(text));
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
        let img = elem.img ? elem.img : "https://www.unaj.edu.ar/wp-content/uploads/2016/06/logo-unaj-2016-01.jpg";
        a.classList.add("grid-element");
        a.href = `pelicula.html#${args[1]}-${elem.code}`;
        html += `<picture>`;
            html += `<img src="${img}" alt="${elem.title}">`;
        html += `</picture>`;
        html += `<h5 class="text-center">${elem.title}</h5>`;
        html += `<p><strong>Año:</strong> ${elem.year}</p>`;
        html += `<p><strong>Clasificación:</strong> ${elem.classification}</p>`;
        html += `<p><strong>Duración:</strong> ${elem.duration}</p>`;
        a.innerHTML = html;
        container.appendChild(a);
    });
    return container.outerHTML;
}
function link(event) {
    event.preventDefault();
    let obj = null;
    try {
        let href = this.href.split("#");
        let codes = href[1].split("-");
        console.warn("Función que usa localStorage");
        obj = window.json.find(function(c) {
            if (c.code === codes[0])
                return c;
        }).data.find(function(p) {
            if (p.code === codes[1])
                return p;
        });
    } catch (error) {
        console.error(error);
    }
    localStorage.setItem("obj", JSON.stringify(obj));
    window.location.href = "pelicula.html";
}
function linkCategory(event) {
    event.preventDefault();
}
document.addEventListener("DOMContentLoaded", function(event) {
    file('_txt/categorias.json', data => {
        window.json = data;
        let ul = document.createElement("ul");
        data.forEach(elem => {
            let article = document.createElement("article");
            let li = document.createElement("li");
            let a = document.createElement("a");
            a.href = !window.location.pathname.includes(".html") ? `./#${elem.name_slug}` : `./categoria.html#${elem.code}`;
            a.textContent = elem.name;
            if (window.location.pathname.includes(".html"))
                a.classList.add("category");
            li.dataset.code = elem.code;
            li.appendChild(a);
            ul.appendChild(li);

            if (!window.location.pathname.includes(".html")) {
                article.id = elem.name_slug;
                article.classList.add("article");
                article.innerHTML = `<h4 class="article-name">${elem.name} (${elem.data.length})</h4>`
                article.innerHTML += products(elem.data, elem.code);
                document.querySelector("#data").appendChild(article);
            }
        });
        Array.prototype.forEach.call(document.querySelectorAll(".categories"), e => {
            e.appendChild(ul.cloneNode(true));
        });
        Array.prototype.forEach.call(document.querySelectorAll(".grid-element"), a => a.addEventListener("click", link));
        Array.prototype.forEach.call(document.querySelectorAll(".category"), a => a.addEventListener("click", linkCategory));
    });

    document.querySelector(".nav-responsive__close").addEventListener("click", visibilityNav);
    document.querySelector("#showMenu").addEventListener("click", visibilityNav);
});