finish = () => {
    if (window.location.href.includes("#")) {
        let href = window.location.href.split("#");
        let codes = href[1].split("-");
        try {
            let obj = null;
            let category = null;
            category = window.json.find(function(c) {
                if (c.code === codes[0])
                    return c;
            });
            obj = category.data.find(function(p) {
                if (p.code === codes[1])
                    return p;
            });
            init(obj, category);
            Array.prototype.forEach.call(document.querySelectorAll(`[data-code="${window.category.code}"]`), c => c.classList.add("active"));
        } catch (error) {
            console.error(error);
        }
    }
}

function init(...args) {
    window.obj = args[0];
    window.category = args[1];
    if (typeof args[0] === "string")
        window.obj = JSON.parse(args[0]);
    if (typeof args[1] === "string")
        window.category = JSON.parse(args[1]);
    let html = "";

    let img = window.obj.img ? window.obj.img : "";

    html += `<h2>${window.obj.title}</h2>`;
    html += `<picture>`;
        html += `<img src="${img}" onError="this.src='https://www.unaj.edu.ar/wp-content/uploads/2016/06/logo-unaj-2016-01.jpg'" class="w-50 block margin-auto" alt="${window.obj.title}">`;
    html += `</picture>`;
    html += `<hr/>`;
    html += `<p><strong>Categoría:</strong> ${window.category.name}</p>`;
    html += `<p><strong>Año:</strong> ${window.obj.year ? window.obj.year : ""}</p>`;
    html += `<p><strong>Clasificación:</strong> ${window.obj.classification ? window.obj.classification : ""}</p>`;
    html += `<p><strong>Duración:</strong> ${window.obj.duration ? window.obj.duration : ""}</p>`;
    html += `<p><strong>Resumen:</strong></p><div>${window.obj.resume ? window.obj.resume : ""}</div>`;

    document.querySelector("#data").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function(event) {
    if (localStorage.obj !== undefined)
        init(localStorage.obj, localStorage.category);
    else {
        if (!window.location.href.includes(".html#")) {
            window.location.href = "./";
            return null;
        }
    }
});