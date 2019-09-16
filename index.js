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

app.post('/contact-us', function(req, res) {
	var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'amtester101@gmail.com', // generated ethereal user
            pass: 'Window123' // generated ethereal password
        }
    });
	var mailOpts = {
	    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
	    to: 'amtester101@gmail.com',
	    subject: 'New comment',
	    text: `${req.body.name} (${req.body.email}) says: ${req.body.comment}`
  	};
  	transporter.sendMail(mailOpts, function (error, response) {
    	if (error) {
    		console.log(error);
    		res.render('contact/contactFailure');
    	}
    	else {
      		res.render('contact/contactSuccess');
    	}
  	});
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

app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});