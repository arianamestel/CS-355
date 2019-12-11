$(document).ready(function() {
	if (window.location.pathname == "/my-search-engine") {
		var customSearchInput = document.getElementById("customSearchInput");
		var submitCustomSearch = document.getElementById("submitCustomSearch");
		var partialMatch = document.getElementById("partialMatch");
		var caseInsens = document.getElementById("caseInsens");


		submitCustomSearch.addEventListener("click", function() {
			if (customSearchInput.value) {
				getSearchEngineResults(customSearchInput.value, partialMatch.checked, caseInsens.checked);
			}
		});
		customSearchInput.addEventListener("keypress", function(e) {
			if (e.which === 13 || e.keyCode === 13)  {
				getSearchEngineResults(customSearchInput.value, partialMatch.checked, caseInsens.checked);
			}
		});

	}
});

function getSearchEngineResults(searchTerm, partialMatch, caseInsens) {
	$.post("/my-search-engine", 
	{
		"searchTerm": searchTerm,
		"partialMatch": partialMatch,
		"caseInsens": caseInsens
	}, 
	function(data) {
		console.log(...data);
		var results = $("#results");
		var resultTitle = $("#resultsTitle");
		clearResults(results, resultTitle);
		var start = 1;
		var allItems;
		resultTitle.text(`Results for ${searchTerm}...`);
		allItems = [...data];
		printItems(results, allItems, start, allItems);
		displayButtons(allItems);
	});
}