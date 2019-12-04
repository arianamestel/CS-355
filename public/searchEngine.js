$(document).ready(function() {
	if (window.location.pathname == "/my-search-engine") {
		var customSearchInput = document.getElementById("customSearchInput");
		var submitCustomSearch = document.getElementById("submitCustomSearch");

		submitCustomSearch.addEventListener("click", function() {
			if (customSearchInput.value) {
				getSearchEngineResults(customSearchInput.value);
			}
		});
		customSearchInput.addEventListener("keypress", function(e) {
			if (e.which === 13 || e.keyCode === 13)  {
				getSearchEngineResults(customSearchInput.value);
			}
		});

	}
});

function getSearchEngineResults(searchTerm) {
	$.post("/my-search-engine", 
	{
		"searchTerm": searchTerm
	}, 
	function(data) {
		console.log(data);
	});
}