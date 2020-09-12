finish = () => {
    Array.prototype.forEach.call(document.querySelectorAll(`[data-code="${window.category.code}"]`), c => c.classList.add("active"));
}

function init(...args) {
    window.obj = JSON.parse(args[0]);
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
    else
        window.location.href = "./";
});