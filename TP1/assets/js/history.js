$(document).ready(function(){
  loadSearchHistory();
});

function loadSearchHistory() {
  if (typeof (Storage) !== 'undefined') {
    var historyNode = $('#search-history');

    if (localStorage.searchHistory !== undefined) {
      var searchHistory = JSON.parse(localStorage.searchHistory);
      if (searchHistory.length > 0) {
        historyNode.html('');
        $.each(searchHistory, function (index, search) {
          var element = `<div>
                            <a href="${search.search}">
                              ${search.text}
                              <span>
                                ${new Date(search.date).toLocaleString()}
                              </span>
                            </a>
                         </div>`;
          historyNode.append(element);
        });
      }
    }
  }
  else {
    console.warn('Navegador no compatible para almacenar busquedas');
  }
}