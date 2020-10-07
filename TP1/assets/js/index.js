$(document).ready(function () {
  $('#btnSearch').click(function () {
    var search = $('input[name=term]');
    saveSearchHistory(search.val());
  });
});

function saveSearchHistory(search) {
  if (search.trim() !== '') {
    if (typeof (Storage) !== 'undefined') {
      var searchHistory = [];
      if (localStorage.searchHistory !== undefined) {
        searchHistory = JSON.parse(localStorage.searchHistory);
      }

      var searchItem = {
        text: search,
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