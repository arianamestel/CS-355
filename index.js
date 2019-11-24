var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
const axios = require('axios');
const cheerio = require('cheerio');
var mysql = require('mysql');


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

app.get("/index-url", function(req, res) {
  res.render("admin/adminIndexer");
});

app.post("/index-url",  function(req, res) {
  var url = req.body.url;
  axios.get(url)
    .then(response => {
      var words = getData(response.data);
      var links = getLinks(response.data);
      
      // save words associated with url HERE
      console.log(words);

      // take each link and index it HERE
      console.log(links);

    })
    .catch(error => {
      console.log(error);
    });
  // res.redirect("/index-url");
});

function getData(html) {
  data = [];
  var $ = cheerio.load(html);
  var words = $('body').text().split(/\s+/);
  return words;
}

function getLinks(html) {
  data = [];
  var $ = cheerio.load(html);
  var a = $("a");
  var links = [];
  $(a).each(function(i, link) {
    links.push($(link).attr('href'));
  });
  return links;
}


var mysqlConnection = mysql.createConnection({
  host: "149.4.211.180",
  user: "sajo6699",
  password: "23556699",
  database: "sajo6699",
  multipleStatements: true
});

mysqlConnection.connect((err)=>{
  if(!err){
    console.log("Connected to the database!");
  }
  else{
    console.log("connection to database Failed :(");
  }
});


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});