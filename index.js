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
  res.render("admin/indexer");
});

app.get("/history-stats", function(req, res) {
  res.render("admin/history-stats");
});

app.post("/index-url",  function(req, res) {
  var url = req.body.url;
  var links = indexMainURL(url);  
});


function indexMainURL(url) {
  // this function gets all words and all links
  axios.get(url)
    .then(response => {
      var $ = cheerio.load(response.data);
      
      var words = getWords(response.data)
      getLinks(response.data); 
      // get urls info
      var linkInfo = {
        "title": $("title").text(),
        "url": url,
        "description": $('meta[name="description"]').attr('content'),
        "lastModified": $('meta[name="last-modifed"]').attr('content'), // get last modified (it in headers somewhere)
        "lastIndexed": null, // get the data of last time it was indexed
        "timeToIndex": null // record the amount of time it took to index
      }
      // save urls info and the words associated with it HERE
      // saveToDB(linkInfo, words)
      //save to DB linkINfo
      //The following is to ignore the apostrophes in words. For example "you're" will be interpreted correctly by sql
      // linkInfo.description = linkInfo.description.replace(/'/g,"''");
      // linkInfo.url = linkInfo.url.replace(/'/g,"''");
      // linkInfo.title = linkInfo.title.replace(/'/g,"''");
         //TODO fix the datetimes from NOW() to actual datetimes, also need to fix time to index,
      
      saveLink(linkInfo)
      saveWords(words, linkInfo);
      // saveWords(words, linkInfo);
      //   mysqlConnection.query("INSERT INTO page (title, url, description, lastModified, lastIndexed, timeToIndex) VALUES ('"+linkInfo.title+"', '"+linkInfo.url+"', '"
      // +linkInfo.description+"', NOW(), NOW(), 12)", 
      // function(err, result){
      //   if(err) console.log(err);
      //   console.log("1 link/page record added");
      // })
      
       console.log(linkInfo);
    })
    .catch(error => {
      console.log(error);
    });
}

function saveWords(wordArray, linkInfo){
  var pageId ={};
     mysqlConnection.query(
     "SELECT pageId FROM page WHERE url = '"+linkInfo.url+"';",
     function(err, rows, fields){
       if(err) console.log(err);
       var count = rows.length;
         if(count == 1){
       pageId= rows[0].pageId;
       console.log("got PAGEID"+ pageId);
         }
         else console.log(" CANT GET PAGE ID FOR SOME REASON");
        //  console.log(wordArray[1]);
        })
         for(i=0;i<wordArray.length;i++){
         
           wordId = {};
         mysqlConnection.query("SELECT wordId FROM word WHERE wordName=?" , wordArray[i],
         function(err, rows){

         if(err) console.log(err);
         
        //  if(rows){
        //  wordId = rows.wordId
        //  console.log("GOT WORD ID added" + wordId);
        //  }
        //  else {
           console.log("WORD IS NOT IN DB PLEASE ADD: " +wordArray[i])
           mysqlConnection.query(
             "INSERT INTO word (wordName) VALUES ('"+wordArray[i++]+"')", 
             function(err, result){
               if(err) {console.log(err);}
               else{
               console.log("1 word record added to word: "+wordArray[i]);
               }
             }
           );
        //  }

       });
         }
         
     
     

}
function saveLink(linkInfo){
  // linkInfo.description = linkInfo.description.replace(/\/g,"'");
  //     linkInfo.url = linkInfo.url.replace(/\/g,"'");
  //     linkInfo.title = linkInfo.title.replace(/\/g,"'");
         //TODO fix the datetimes from NOW() to actual datetimes, also need to fix time to index,
      mysqlConnection.query("INSERT INTO page (title, url, description, lastModified, lastIndexed, timeToIndex) VALUES (\""+linkInfo.title+"\", \""+linkInfo.url+"\", \""
      +linkInfo.description+"\", NOW(), NOW(), 12)", 
      function(err, result){
        if(err) console.log(err);
        console.log("1 link/page record added")
        
      })
}



function getWords(html) {
  var $ = cheerio.load(html);
  var words = $('body').text().split(/\s+/);
  var filteredWords = words.filter(el => (el.length > 0));
  console.log(filteredWords);
  // saveWords(filteredWords);
  return filteredWords;
}

function getLinks(html) {
  // this function gets links from the url
  var $ = cheerio.load(html);
  var a = $("a");
  var links = [];
  $(a).each(function(i, link) {
    // push the link into the link array and then index that link
    if (validURL($(link).attr('href'))) {
      links.push(indexLink($(link).attr('href')));
    }
  });
  return links;
}

function indexLink(link) {
  // this function only gets the words from a link
  axios.get(link)
    .then(response => {
      var $ = cheerio.load(response.data);
      // get words from link
      
      // get links info
      var linkInfo = {
        "title": $("title").text(),
        "url": link,
        "description": $('meta[name="description"]').attr('content'),
        "lastModified": null, // get last modified
        "lastIndexed": null, // get the data of last time it was indexed
        "timeToIndex": null // record the amount of time it took to index
      }
    
    
      saveLink(linkInfo)
      var words = getWords(response.data).then(saveWords(words,linkInfo));
      // saveWords(words, linkInfo);
      // saveWords(words);
      //The following is to ignore the apostrophes in words. For example "you're" will be interpreted correctly by sql
      // linkInfo.description = linkInfo.description.replace(/'/g,"''");
      // linkInfo.url = linkInfo.url.replace(/'/g,"''");
      // linkInfo.title = linkInfo.title.replace(/'/g,"''");
    
      // save the links words and its info HERE
      // saveToDB(linkInfo, words)
      //THIS IS SAVING TO DB H
      //TODO fix the datetimes from NOW() to actual datetimes, also need to fix time to index,
      // mysqlConnection.query("INSERT INTO page (title, url, description, lastModified, lastIndexed, timeToIndex) VALUES ('"+linkInfo.title+"', '"+linkInfo.url+"', '"
      // +linkInfo.description+"', NOW(), NOW(), 12)", 
      // function(err, result){
      //   if(err) console.log(err);
      //   console.log("1 link/page record added");
      // })

      //save words to db
      //UNCOMMENT TILL FOR LOOP 
      //CHECK SINGLE APOSTROPHES 
      //for(var i=0;i<words.length;i++){
        //get wordid
        // var wordId = mysqlConnection.query("SELECT wordId FROM word WHERE wordName='"+words[i]+"');" , 
        // function(err, result){
        //   if(err) console.log(err);
        //   console.log("GOT WORD ID added");
        // });
        // mysqlConnection.query("IF EXISTS (SELECT * FROM word WHERE wordName='"+words[i]+"')"
        // +"BEGIN "+
        // "IF EXISTS (SELECT * FROM page_word WHERE wordId = '"+wordId+"'"+
        //   "BEGIN "+
        //     "UPDATE page_word SET freq = freq+1 WHERE wordId = (SELECT wordId FROM word WHERE wordName='"+words[i]+"')"+
        //       " AND pageId = '"+pageId+"'"+
        //   "END "+
        //   "ELSE INSERT INTO page_word (pageId, wordId, freq) VALUES ('"+pageId+"', '"+
        //     "(SELECT wordId FROM word WHERE wordName= '"+words[i]+"')"
        // +"END "+
        // "ELSE "+
        //   "INSERT INTO word (wordName) VALUES('"+words[i]+"')"
        //   +" INSERT INTO page_word (pageId, wordId, freq) VALUES ('"+pageId+"', "+
        //   " (SELECT wordId FROM word WHERE wordName= '"+words[i]+"')", function(err, result){
        //     if(err) console.log(err);
        //     console.log("1 link/page record added");
        //   })
       // mysqlConnection.query("INSERT INTO word (wordName) VALUES ("+words+")");
      //}
      console.log(linkInfo);
      return linkInfo;

    })
    
    .catch(error => {
      console.log(error);
    });
}

function validURL(str) {
  var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return !!pattern.test(str);
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