var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.set("view options", {layout: false});
app.use(express.static('./'));


app.get('/', function(req, res) {
	res.render("index");
});

app.get('/about-me', function(req, res) {
	res.render("about/aboutMe");
});

app.get('/contact-us', function(req, res) {
	res.render("contact/contactUs");
});

app.get('/contact-success', function(req, res) {
  res.render("contact/contactSuccess");
});

app.get("/browser", function(req, res) {
  res.render("browser/browser");
});

app.get("/navigator", function(req, res) {
	res.render("browser/navigator");
});

app.get("/window", function(req, res) {
  res.render("browser/window");
});

app.get("/screen", function(req, res) {
  res.render("browser/screen");
});

app.get("/location", function(req, res) {
  res.render("browser/location");
});

app.get("/geolocation", function(req, res) {
  res.render("browser/geolocation");
});

app.get("/from-file", function(req, res) {
  res.render("search/fromFile");
});

app.get("/google-api", function(req, res) {
  res.render("search/googleApi");
});

app.get("/my-search-engine", function(req, res) {
  res.render("search/mySearchEngine");
});

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});