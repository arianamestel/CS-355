var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/views'));

app.set("view options", {layout: false});
app.use(express.static('./'));

app.get('/', function(req, res) {
	res.render("index.html");
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});