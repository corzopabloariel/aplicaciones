$(document).ready(function () {
  $('#btnSearch').click(function () {
    var search = $('input[name=term]');
    saveSearchHistory(search.val());
  });
});

function saveSearchHistory(text, search) {
  if (text.trim() !== '') {
    if (typeof (Storage) !== 'undefined') {
      var searchHistory = [];
      if (localStorage.searchHistory !== undefined) {
        searchHistory = JSON.parse(localStorage.searchHistory);
      }

      var searchItem = {
        search: search,
        text: text,
        date: new Date()
      }

      searchHistory.push(searchItem);
      localStorage.searchHistory = JSON.stringify(searchHistory);
    }
    else {
      console.warn('Navegador no compatible para almacenar busquedas');
    }
  }
}