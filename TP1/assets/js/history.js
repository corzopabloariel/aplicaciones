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
        orderedList = $('<ol></ol>');
        $.each(searchHistory, function (index, search) {
          var element = `<li>
                          <div>
                            <span>
                              <a href="">
                                ${search.text}
                              </a>
                            </span>
                            <span>
                              ${new Date(search.date).toLocaleString()}
                            </span>
                          </div>
                         </li>`;
          orderedList.append(element);
        });
        historyNode.append(orderedList);
      }
    }
  }
  else {
    console.warn('Navegador no compatible para almacenar busquedas');
  }
}