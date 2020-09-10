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
document.addEventListener("DOMContentLoaded", function(event) {
    file('_txt/categorias.json', data => {
        let ul = document.createElement("ul");
        data.forEach(function(elem) {
            let article = document.createElement("article");
            let li = document.createElement("li");
            let a = document.createElement("a");
            article.id = elem.name_slug;
            article.classList.add("article");
            article.innerHTML = `<h4>${elem.name} (${elem.data.length})</h4>`
            a.href = `#${elem.name_slug}`;
            a.textContent = elem.name;
            li.dataset.code = elem.code;
            li.appendChild(a);
            ul.appendChild(li);
            document.querySelector("#data").appendChild(article);
        });
        Array.prototype.forEach.call(document.querySelectorAll(".categories"), e => {
            e.appendChild(ul.cloneNode(true));
        });
    });

    document.querySelector(".nav-responsive__close").addEventListener("click", visibilityNav);
    document.querySelector("#showMenu").addEventListener("click", visibilityNav);
});