$(document).ready(function() {

	if (window.location.pathname == "/index-url") {
		var submitIndexer = document.getElementById("submitIndexer");
		var indexInput = document.getElementById("indexerInput");

		submitIndexer.addEventListener("click", function() {
			indexUrl(indexInput);
		});

		indexInput.addEventListener("keypress", function(e) {
			if (e.which === 13 || e.keyCode === 13)  {
				indexUrl(indexInput);
			}
		});
	}

});

function indexUrl(indexInput) {
	if (validURL(indexInput.value)) {
		$("#indexerResults").text("Successfully indexed.");
	}
	else {
		$("#indexerResults").text("Not a valid URL. Try again.");
	}
}

function validURL(str) {
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return !!pattern.test(str);
}