$(document).ready(() => {
	if (window.location.pathname == "/navigator") {
		setTimeout(function() {
			$("#appName").append(" " + navigator.appName);
			$("#product").append(" " + navigator.product);
			$("#appVersion").append(" " + navigator.appVersion);
			$("#userAgent").append(" " + navigator.userAgent);
			$("#platform").append(" " + navigator.platform);
			$("#language").append(" " + navigator.language);
		});
	}
	else if (window.location.pathname == "/screen") {
		setTimeout(function() {
			$("#width").append(" " + screen.width);
			$("#height").append(" " + screen.height);
			$("#availWidth").append(" " + screen.availWidth);
			$("#availHeight").append(" " + screen.availHeight);
			$("#colorDepth").append(" " + screen.colorDepth);
			$("#pixelDepth").append(" " + screen.pixelDepth);
		});
	}
	else if (window.location.pathname == "/window") {
		setTimeout(function() {
			$("#innerHeight").append(" " + window.innerHeight);
			$("#innerWidth").append(" " + window.innerWidth);
		});
	}
	else if (window.location.pathname == "/location") {
		setTimeout(function() {
			$("#href").append(" " + window.location.href);
			$("#hostname").append(" " + window.location.hostname);
			$("#pathname").append(" " + window.location.pathname);
			$("#protocol").append(" " + window.location.protocol);
		});
	}
	else if (window.location.pathname == "/geolocation") {
		setTimeout(function() {
			$("#latitude").append(" " + navigator.geolocation.getCurrentPosition(showPosition));	
			$("#longitude").append(" " + navigator.geolocation.getCurrentPosition(showPosition));			
		});
	}
	else {
		return;
	}
});

function showPosition(position) {
  return { latitude: position.coords.latitude, longitude:position.coords.longitude };  
}