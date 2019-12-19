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
		var loader = document.getElementById("loader");
		loader.classList.remove("invisible");
		$.post('/index-url', 
		{
			"url": indexInput.value
		}, function(data) {
			console.log("Done");
			$("#indexerSuccess").removeClass("invisible");
			$("#loader").addClass("invisible");
			$("#indexerInvalid").addClass("invisible");
		});
	}
	else {
		$("#indexerSuccess").addClass("invisible");
		$("#loader").addClass("invisible");
		$("#indexerInvalid").removeClass("invisible");
	}
}

function validURL(str) {
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return !!pattern.test(str);
}