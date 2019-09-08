var express = require('express');
var app = express();

var port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.set("view options", {layout: false});
app.use(express.static('./'));

app.get('/', function(req, res) {
	res.render("index");
});

app.get('/about-me', function(req, res) {
	res.render("aboutMe");
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});