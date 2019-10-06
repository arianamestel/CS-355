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
			$(window).on("resize", function() {
				$("#innerHeight").text("Inner Height: " + window.innerHeight);
				$("#innerWidth").text("Inner Width: " + window.innerWidth);
			});
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
			var is_safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);			
			if (is_safari) {
				$("#spinner1").remove();
				$("#spinner2").remove();
				$("#latitude").append("Safari has blocked geolocation services. Try another browser.");
				$("#longitude").append("Safari has blocked geolocation services. Try another browser.");
			}
			else {
				var lat = navigator.geolocation.getCurrentPosition(function(position) {
					$("#spinner1").remove();
					$("#latitude").append(" " + position.coords.latitude);
				});
				var lng = navigator.geolocation.getCurrentPosition(function(position) {
					$("#spinner2").remove();
					$("#longitude").append(" " + position.coords.longitude);
				});	
			}
		});
	}
	else {
		return;
	}
});

