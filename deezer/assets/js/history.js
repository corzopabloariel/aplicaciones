$(document).ready(function(){
  loadSearchHistory();
  $("#paginate").pagination({
    items: PAGINATE,
    contents: 'pagination-contents',
    previous: '<',
    next: '>',
    position: 'bottom',
  });
});

function loadSearchHistory() {
  if (typeof (Storage) !== 'undefined') {
    var historyNode = $('#search-history');

    if (localStorage.searchHistory !== undefined) {
      var searchHistory = JSON.parse(localStorage.searchHistory);
      if (searchHistory.length > 0) {
        searchHistory = sortBy(searchHistory, { prop: "date", desc: true });
        historyNode.html('');
        var content = $('<div class="pagination-contents"></div>');
        $.each(searchHistory, function (index, search) {
          var element = `<div class="history">
                            <a href="index.html${search.search}">
                              <span>
                                ${search.text}
                              </span>
                              <span>
                                ${new Date(search.date).toLocaleString()}
                              </span>
                            </a>
                         </div>`;
          content.append(element);
        });
        historyNode.append(content);
      }
    }
  }
  else {
    console.warn('Navegador no compatible para almacenar busquedas');
  }
}