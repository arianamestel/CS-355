$(document).ready(function() {
	if (window.location.pathname == "/google-api") {
		setTimeout(function() {
			var searchBtn = document.getElementById("submitGoogleApi");
			var query =  document.getElementById("googleInput");
			searchBtn.addEventListener("click", function() {
				getResults(query);
			});
			query.addEventListener("keypress", function(e) {
				if (e.which === 13 || e.keyCode === 13)  {
					getResults(query);
				}
			});
		});
	}
});

function getResults(query) {
	if (query.value) {
		var results = $("#results");
		var resultTitle = $("#resultsTitle");
		var loadMoreResults = document.getElementById("loadMore");
		clearResults(results, resultTitle);
		var start = 1;
		var allItems;
		$.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAc3jXrxJwGy4pVLbpRgtdnVfzOs-dtT4s&cx=003425889444781158708:knjrexrxxlo&q=${query.value}`, function(data) {
			resultTitle.text(`Results for ${query.value}...`);
			console.log(data);
			allItems = data.items;
			printItems(results, allItems, start, allItems);
			loadMoreResults.addEventListener("click", function() {
				getMoreResults(results, query.value, start += 10, allItems);
			});
			displayButtons(allItems);
		});
	}
}

function getMoreResults(results, query, start, allItems) {
	$.get(`https://www.googleapis.com/customsearch/v1?key=AIzaSyAc3jXrxJwGy4pVLbpRgtdnVfzOs-dtT4s&cx=003425889444781158708:knjrexrxxlo&q=${query}&start=${start}`, function(newData) {
		try{
			allItems.push(...newData.items);
			console.log(allItems);
			printItems(results, newData.items, start, allItems);
		} catch(err) {
			alert("There are no more search results for your desired query.");
		}
	});
}


