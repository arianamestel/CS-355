$(document).ready(function() {
	if (window.location.pathname == "/from-file") {
		setTimeout(function() {
			var inputFile = document.getElementById("inputFile");
			var submitInputFile = document.getElementById("submitInputFile");
			var inputFileName = document.getElementById("inputFileName");
			inputFile.addEventListener("change", function() {
				inputFileName.innerHTML = inputFile.value.replace('C:\\fakepath\\', "");
			});

			submitInputFile.addEventListener("click", function() {
				if (inputFile.value) {
					console.log(inputFile.files[0]);
					var extension = inputFile.files[0].name.split('.');
					if (extension[extension.length -1] != "json" && extension[extension.length -1] != "xml" && extension[extension.length -1] != "csv")
						alert("Invalid file extension. Please upload either a CSV, JSON, or XML file.");
					var reader = new FileReader();
					if (inputFile.files[0].type == "application/json") reader.onload = handleJSONFile;
					if (inputFile.files[0].type == "text/csv") reader.onload = handleCSVFile;
					if (inputFile.files[0].type == "text/xml") reader.onload = handleXMLFile;
					reader.readAsText(inputFile.files[0]);
				}
				else {
					alert("Error: You must add a file before uploading.");
				}
			})
		});
	}
});

function handleJSONFile(event){
	getResultsFromFile(JSON.parse(event.target.result));
}

function handleXMLFile(event){
	getResultsFromFile(xmlToJSON(event.target.result));
}

function handleCSVFile(event){
	getResultsFromFile(csvJSON(event.target.result));  	
}

function getResultsFromFile(obj) {
	var results = $("#results");
	var resultTitle = $("#resultsTitle");
	clearResults(results, resultTitle);
	var start = 1;
	var allItems;
	resultTitle.text(`Results from ${inputFile.value.replace('C:\\fakepath\\', "")}...`);
	allItems = obj["Results"];
	printItems(results, allItems, start, allItems);
	displayButtons(allItems);
}

function csvJSON(csv) {
    let lines = csv.split('\n');
    let result = [];
    let headers = lines[0].split(",");
    if (headers.length == 3) headers[2] = headers[2].slice(0, headers[2].length - 1);
    let i;
    if (JSON.stringify(headers) != JSON.stringify(['title', 'url', 'description'])) {
    	headers = ['title', 'url', 'description'];
    	i = 0;
    } else {
    	i = 1;
    }
    for (i; i < lines.length; i++) {        
        const obj = {};
        var currentline = lines[i].split('",');
        if (currentline.length == 1) currentline = lines[i].split(',');
        for (var k = 0; k < currentline.length; k++) {
        	currentline[k] = currentline[k].replace('"', '');
        }
        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }
        if (currentline[0])
        	result.push(obj);
    }
    return { "Results": result };
}

function xmlToJSON(xml) {
	 $xml = $(xml);
	 var json = [];
	 for (var i = 0; i < $xml.find('result').length; i++) {
	 	json.push({ 
	 		"title": $xml.find("result").find("title")[i].textContent,
	 		"url": $xml.find("result").find("url")[i].textContent,
	 		"description": $xml.find("result").find("description")[i].textContent,
	 	});
	 }
	 return { "Results": json };
};