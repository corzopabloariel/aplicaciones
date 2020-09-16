finish = () => {
    if (window.location.href.includes("#")) {
        let href = window.location.href.split("#");
        let category = null;
        try {
            let codes = href[1];
            category = window.json.find(function(c) {
                if (c.code === codes)
                    return c;
            });
            init(category);
            Array.prototype.forEach.call(document.querySelectorAll(`[data-code="${window.category.code}"]`), c => c.classList.add("active"));
        } catch (error) {
            console.error(error);
        }
    }
}

function init(...args) {
    let container = document.createElement("div");
    container.classList.add("grid");

    window.category = args[0];
    if (typeof args[0] === "string")
        window.category = JSON.parse(args[0]);
    if (window.category.data.length == 0) {
        document.querySelector("#data").innerHTML = `<h5 class="text-center">Sin datos en "${window.category.name}"</h5>`;
        return null;
    }
    window.category.data.forEach(elem => {
        let a = document.createElement("a");
        let html = "";
        let img = elem.img ? elem.img : "";
        a.classList.add("grid-element");
        a.href = `pelicula.html#${window.category.code}-${elem.code}`;
        html += `<picture>`;
            html += `<img src="${img}" class="w-100" onError="this.src='https://www.unaj.edu.ar/wp-content/uploads/2016/06/logo-unaj-2016-01.jpg'" alt="${elem.title}">`;
        html += `</picture>`;
        html += `<h5 class="text-center">${elem.title ? elem.title : "-"}</h5>`;
        html += `<p><strong>Año:</strong> ${elem.year ? elem.year : "-"}</p>`;
        html += `<p><strong>Clasificación:</strong> ${elem.classification ? elem.classification : "-"}</p>`;
        html += `<p><strong>Duración:</strong> ${elem.duration ? elem.duration : "-"}</p>`;
        a.innerHTML = html;
        container.appendChild(a);
    });
    document.querySelector("#data").appendChild(container);
}
document.addEventListener("DOMContentLoaded", function(event) {
    if (localStorage.categoryObj !== undefined)
        init(localStorage.categoryObj);
    else {
        if (!window.location.href.includes(".html#")) {
            window.location.href = "./";
            return null;
        }
    }
});