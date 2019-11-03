function printItems(results, newItems, startIndex, allItems) {
	for (var i = 0; i < newItems.length; i++) {
		var u = newItems[i].link || newItems[i].url;
		// debugger
		var d = newItems[i].snippet || newItems[i].description;
		var div = $("<div></div>");
		div.addClass("form-check bg-light");
		results.append(div);
		var container = $("<div></div>");
		container.addClass("container mb-3 pt-3 text-break");
		div.append(container);
		container.append(`<input type="checkbox" class='myCheckbox form-check-input' value=${startIndex++} id='input${startIndex}' />`);
		container.append(`<label class='title form-check-label' for='input${startIndex}'><strong>${newItems[i].title}</strong></label>`);
		container.append(`<p><a class='link' href=${u}>${u}</a></p>`);
		container.append(`<p class='snippet'>${d}</p>`);
		container.append("<br>");
	}
}


function displayButtons(allItems) {
	var loadMoreResults = document.getElementById("loadMore");
	var checkAll = document.getElementById("checkAll");
	var unCheckAll = document.getElementById("unCheckAll");
	var saveChecked = document.getElementById("saveModalButton");
	checkAll.style.display = '';
	uncheckAll.style.display = '';
	saveChecked.style.display = '';
	if (loadMoreResults != null) loadMoreResults.style.display = '';
	checkAllListener(checkAll);
	uncheckAllListener(unCheckAll);
	saveCheckedListener(saveChecked, allItems);
}

function saveCheckedListener(saveChecked, allItems) {
	saveChecked.addEventListener("click", function() {
		var checked = [];
		$(".myCheckbox").each(function() {
			if ($(this).is(":checked")) {
				var item = allItems[$(this).val() - 1];
				if (checked.filter((e) => (e.title == item.title)).length <= 0)
					checked.push(item);
			}
		});
		$("#downloadResults").empty();
		printResultsInModal(checked);
		var downloadCSV = document.getElementById("downloadCSV");
		var downloadJSON = document.getElementById("downloadJSON");
		var downloadXML = document.getElementById("downloadXML");
		downloadJSONListener(downloadJSON, checked);
		downloadXMLListener(downloadXML, checked);
		downloadCSVListener(downloadCSV, checked);
	});
}

function downloadCSVListener(downloadCSV, checked) {
	downloadCSV.addEventListener("click", function() {
		var fileTitle = document.getElementById("exportFileName");
		fileNameListener();
		if (fileTitle.value && checked) {
			var checkedFormatted = [];
			checked.forEach((item) => {
				var u  = item.link || item.url;
				var d = item.snippet || item.description;
	    		checkedFormatted.push({
	        		title: item.title,
	        		url: u,
	        		description: d		
	        	});
			});
			exportCSVFile(checkedFormatted);
		} else {
			if (!checked)
				alert("You must select results to save before downloading.");
			else
				fileInputError();
		}
		
	});
}

function downloadJSONListener(downloadJSON, checked) {
	downloadJSON.addEventListener("click", function() {
		var fileTitle = document.getElementById("exportFileName");
		fileNameListener();
		if (fileTitle.value && checked) {
			var checkedFormatted = [];
			checked.forEach((item) => {
				var u  = item.link || item.url;
				var d = item.snippet || item.description;
	    		checkedFormatted.push({
	        		title: item.title,
	        		url: u,
	        		description: d	
	        	});
			});
			var fileTitle = document.getElementById("exportFileName").value;
	    	var exportedFilenmae = fileTitle + '.json' || 'export.json';
		    var blob = new Blob([JSON.stringify({ "Results": checkedFormatted })], { type: 'application/json' });
		    if (navigator.msSaveBlob) { // IE 10+
		        navigator.msSaveBlob(blob, exportedFilenmae);
		    } else {
		        var link = document.createElement("a");
		        if (link.download !== undefined) { // feature detection
		            // Browsers that support HTML5 download attribute
		            var url = URL.createObjectURL(blob);
		            link.setAttribute("href", url);
		            link.setAttribute("download", exportedFilenmae);
		            link.style.visibility = 'hidden';
		            document.body.appendChild(link);
		            link.click();
		            document.body.removeChild(link);
		        }
	    	}
		} else {
			if (!checked.length)
				alert("You must select results to save before downloading.");
			else
				fileInputError();
		}
	});
}

function downloadXMLListener(downloadXML, checked) {
	downloadXML.addEventListener("click", function() {
		var fileTitle = document.getElementById("exportFileName");
		fileNameListener();
		if (fileTitle.value && checked) {
			var checkedFormatted = [];
			checked.forEach((item) => {
				var u  = item.link || item.url;
				var d = item.snippet || item.description;
	    		checkedFormatted.push({
	        		title: item.title,
	        		url: u,
	        		description: d	
	        	});
			});
	    	var exportedFilenmae = fileTitle.value + '.xml' || 'export.xml';
		    var blob = new Blob([convertObjtoXML(checkedFormatted)], { type: "text/xml" });
		    if (navigator.msSaveBlob) { // IE 10+
		        navigator.msSaveBlob(blob, exportedFilenmae);
		    } else {
		        var link = document.createElement("a");
		        if (link.download !== undefined) { // feature detection
		            // Browsers that support HTML5 download attribute
		            var url = URL.createObjectURL(blob);
		            link.setAttribute("href", url);
		            link.setAttribute("download", exportedFilenmae);
		            link.style.visibility = 'hidden';
		            document.body.appendChild(link);
		            link.click();
		            document.body.removeChild(link);
		        }
	    	}
		} else {
			if (!checked.length)
				alert("You must select results to save before downloading.");
			else
				fileInputError();
		}
	});
}

function printResultsInModal(checked) {
	var downloadResults = $("#downloadResults");
	for (var i = 0; i < checked.length; i++) {
		var div = $('<div></div>');
		div.addClass("bg-light");
		downloadResults.append(div);
		var container = $("<div></div>");
		container.addClass("container mb-3 pt-3 text-break");
		div.append(container);
		container.append(`<p><strong>${checked[i].title}</strong></p>`);
		container.append(`<a href=$checked[i].link}>${checked[i].link || checked[i].url}</a>`);
		container.append(`<p>${checked[i].snippet || checked[i].description}</p>`);
		container.append("<br>");
	}
}

function fileNameListener() {
	$("#exportFileName").on("propertychange input", function() {
		$(this).removeClass("input-error");
	});
}

function fileInputError() {
	$("#shake").effect("shake", {times: 2}, 400);
	$("#exportFileName").addClass("input-error");
}

function checkAllListener(checkAll) {
	checkAll.addEventListener("click", function() {
		$(".myCheckbox").each(function() {
			$(this).prop('checked', true);
		});
	});
}

function uncheckAllListener(unCheckAll) {
	uncheckAll.addEventListener("click", function() {
		$(".myCheckbox").each(function() {
			$(this).prop('checked', false);
		});
	});
}

function clearResults(results, resultTitle) {
	var loadMoreResults = document.getElementById("loadMore");
	var checkAll = document.getElementById("checkAll");
	var unCheckAll = document.getElementById("unCheckAll");
	var saveChecked = document.getElementById("saveModalButton");
	var showSaved = document.getElementById("showSaved");
	var fileTitle = document.getElementById("exportFileName").value = '';
	checkAll.style.display = 'none';
	uncheckAll.style.display = 'none';
	saveChecked.style.display = 'none';
	if (loadMoreResults != null) loadMoreResults.style.display = 'none';
	results.empty();
	resultTitle.empty();
	saveChecked = saveChecked.cloneNode(true);
}


function convertToCSV(objArray) {
	var fields = Object.keys(objArray[0]);
	var replacer = function(key, value) { return value === null ? '' : value }
	var csv = objArray.map(function(row){
	  return fields.map(function(fieldName){
	    return JSON.stringify(row[fieldName], replacer);
	  }).join(',');
	});
	csv.unshift(fields.join(',')); // add header column

	return csv.join('\r\n');
}

function exportCSVFile(items) {
    var csv = convertToCSV(items);
    var fileTitle = document.getElementById("exportFileName").value;
    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
    }
}

function convertObjtoXML(obj) {
	var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<results>\n'; 
	for (var i = 0; i < obj.length; i++) {
		xml += `<result id=${i}>\n`;
	  	xml += '<title>' + obj[i].title + '</title>\n';
	  	xml += '<url>' + obj[i].url + '</url>\n';
	  	xml += '<description>' + obj[i].description + '</description>\n';
	  	xml += '</result>\n';

	}
	xml += '</results>';
	return xml;
}
