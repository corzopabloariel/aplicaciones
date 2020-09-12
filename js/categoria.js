finish = () => {
    Array.prototype.forEach.call(document.querySelectorAll(`[data-code="${window.category.code}"]`), c => c.classList.add("active"));
}

function init(...args) {
    let container = document.createElement("div");
    container.classList.add("grid");
    window.category = JSON.parse(args[0]);
    window.category.data.forEach(elem => {
        let a = document.createElement("a");
        let html = "";
        let img = elem.img ? elem.img : "";
        a.classList.add("grid-element");
        a.href = `pelicula.html#${window.category.code}-${elem.code}`;
        html += `<picture>`;
            html += `<img src="${img}" onError="this.src='https://www.unaj.edu.ar/wp-content/uploads/2016/06/logo-unaj-2016-01.jpg'" alt="${elem.title}">`;
        html += `</picture>`;
        html += `<h5 class="text-center">${elem.title}</h5>`;
        html += `<p><strong>Año:</strong> ${elem.year}</p>`;
        html += `<p><strong>Clasificación:</strong> ${elem.classification}</p>`;
        html += `<p><strong>Duración:</strong> ${elem.duration}</p>`;
        a.innerHTML = html;
        container.appendChild(a);
    });
    document.querySelector("#data").appendChild(container);
}
document.addEventListener("DOMContentLoaded", function(event) {
    if (localStorage.categoryObj !== undefined)
        init(localStorage.categoryObj);
    else
        window.location.href = "./";
});