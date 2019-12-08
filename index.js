var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
const axios = require('axios');
const cheerio = require('cheerio');
var mysql = require('mysql');


var app = express();

var port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.set("view options", {
  layout: false
});
app.use(express.static('./'));


app.get('/', function (req, res) {
  res.render("index");
});

app.get('/about-me', function (req, res) {
  res.render("about/aboutMe");
});

app.get('/contact-us', function (req, res) {
  res.render("contact/contactUs");
});

app.get('/contact-success', function (req, res) {
  res.render("contact/contactSuccess");
});

app.get("/browser", function (req, res) {
  res.render("browser/browser");
});

app.get("/navigator", function (req, res) {
  res.render("browser/navigator");
});

app.get("/window", function (req, res) {
  res.render("browser/window");
});

app.get("/screen", function (req, res) {
  res.render("browser/screen");
});

app.get("/location", function (req, res) {
  res.render("browser/location");
});

app.get("/geolocation", function (req, res) {
  res.render("browser/geolocation");
});

app.get("/from-file", function (req, res) {
  res.render("search/fromFile");
});

app.get("/google-api", function (req, res) {
  res.render("search/googleApi");
});

app.get("/index-url", function (req, res) {
  res.render("admin/indexer");
});

app.get("/my-search-engine", function (req, res) {
  res.render("search/mySearchEngine");
});

app.post("/my-search-engine", function (req, res) {
  var searchTerm = req.body.searchTerm;
  var searchDate = new Date();
  var start = new Date().getTime();
  // function that searches the db for the searchTerm
  // searchDB(searchTerm)

  var end = new Date().getTime();
  var searchTime = ((end - start) / 1000).toFixed(2);

  // function that stores search term, number of search results, time that it tookto search, date searched
  // saveSearchTerm(searchTerm, numResults, timeToSearch, dateSearched)
});

app.get("/history-stats", function (req, res) {
  res.render("admin/history-stats");
});

app.post("/index-url", function (req, res) {
  var url = req.body.url;
  var links = indexMainURL(url);
});

function getUrlId(linkInfo, words, callback){
  mysqlConnection.query("SELECT pageId FROM page WHERE url = '" + linkInfo.url + "';", 
            function(err, result){
            if(err) console.log(err);
            if (result[0].pageId === undefined){
              console.log("PAGE ID IS UNDEFINED");  
            }
            else 
              callback(words, result[0].pageId);
            })
}

function saveWords(wordArray, id) {
  var pageId = {};
  // mysqlConnection.query(
  //   "SELECT pageId FROM page WHERE url = '" + linkInfo.url + "';",
  //   function (err, rows, fields) {
  //     if (err) console.log(err);
  //     var count = rows.length;
  //     if (count == 1) {
  //       pageId = rows[0].pageId;
  //       console.log("got PAGEID" + pageId);
  //     } else console.log(" CANT GET PAGE ID FOR SOME REASON");
  //     //  console.log(wordArray[1]);
  //   })
  for (let i = 0; i < wordArray.length; i++) {

    wordId = {};
   
        
        //  console.log(wordArray[1]);
      
/*
HOW TO CONSTRUCT IF STATEMENTS (pseudo code):

if word exists in words
  if words exists in page_word
    update pageword to freq = freq +1
  else 
    insert into page_word  wordID pageId freq =1
else 
  insert into word, worf
  insert into page_word pageID wordId freq = 1

*/
// mysqlConnection.query(
//   "SELECT wordId FROM word WHERE wordName = '" + wordArray[i] + "';",
//   function (err, rows, fields) {
//     if (err) console.log(err);
//     wordId = rows[0].wordId;
//   });
        mysqlConnection.query("CALL putWordIn('"+wordArray[i]+"', "+id+")"
  
          // "BEGIN "+
          // "DECLARE @countWord INT; "+
          // "SET @countWord = (SELECT COUNT(*) FROM word WHERE wordName = \""+wordArray[i]+"\"); "+
          // "IF (@countWord>0) THEN "+
          // "BEGIN "+
          //   "DECLARE @wordId INT; "+
          //   "DECLARE @count_page_word INT; "+
          //   "SET @wordId = (SELECT wordId FROM word WHERE wordName = \""+wordArray[i]+"\"); "+
            
          //   "SET @count_page_word = (SELECT (*) FROM page_word WHERE pageId = "+pageId+" AND wordId = @wordId); "+
          //   "IF (@count_page_word >0) THEN "+
          //   "BEGIN "+
          //     "UPDATE page_word SET freq = freq + 1 WHERE pageId =  "+pageId+" AND wordId = @wordId; "+
          //   "END "+
          //   "ELSE "+
          //   "BEGIN "+
          //     "INSERT INTO page_word (pageId, wordId, freq) VALUES ("+pageId+", @wordId, 1); "+
          //   "END "+
          // "END "+
          // "ELSE "+
          // "BEGIN "+
          // "INSERT INTO word (wordName) VALUES (\""+wordArray[i]+"\") "+
          // "DECLARE @newWordId INT; "+
          // "SET @newWordId = (SELECT wordId FROM word WHERE wordName = \""+wordArray[i]+"\"); "+
          // "INSERT INTO page_word (pageId, wordId, freq) VALUES ("+pageId+", @newWordId, 1); "+
          // "END "+
          // "END"



          // "CASE "+
          //   "WHEN ((SELECT count(pageId) FROM page_word WHERE pageId = \""+pageId+"\" AND wordId = ?) > 0) "+
          //       "THEN UPDATE page_word SET freq = freq+1 WHERE pageId =\""+pageId+"\" AND wordId = ? "+
          //   "WHEN ((SELECT count(wordName) FROM word WHERE wordName = \""+wordArray[i]+"\") >0)"+
          //     "THEN INSERT INTO page_word (pageId, wordId,  freq) VALUES (\""+pageId+"\" , ? , 1)"+ 
          //     "ELSE "+
          // "BEGIN "+
          //   "INSERT INTO word (wordName) VALUES (\""+wordArray[i]+"\") "+
          //   "INSERT INTO page_word (pageId, wordId freq) VALUES (\""+pageId+"\", ? , 1)"+
          // " END"


          // "IF (SELECT count(wordName) FROM word WHERE wordName = \""+wordArray[i]+"\" >0)"+
          // "THEN BEGIN"+
          //   "IF (SELECT count(pageId) FROM page_word WHERE pageId = \""+pageId+"\" AND wordId = ? > 0)"+//wordId+//figure out later how to get that
          //   "THEN BEGIN"+
          //     "UPDATE page_word SET freq = freq+1 WHERE pageId =\""+pageId+"\" AND wordId = ?"+//wordId+//figure out later how to get that
          //   "END"+
          //   "ELSE"+
          //   "BEGIN"+
          //     "INSERT INTO page_word (pageId, wordId, freq) VALUES (\""+pageId+"\", ? , 1)"+
          //   "END END IF"+
          // "END"+
          // "ELSE"+
          // "BEGIN"+
          //   "INSERT INTO word (wordName) VALUES (\""+wordArray[i]+"\")"+
          //   "INSERT INTO page_word (pageId, wordId, freq) VALUES (\""+pageId+"\", ? , 1)"+
          // "END END IF"
          // ,[getWordId(wordArray[i]), getWordId(wordArray[i]), getWordId(wordArray[i]), getWordId(wordArray[i])],
          ,function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log("1 word record added to word: " + wordArray[i]);
            }
          }
        );
        //  }

      // });
  }

// mysqlConnection.query("SELECT wordId FROM word WHERE wordName = \""+wordArray[i]+"\"", 
//             function(err, result){
//             if(err) console.log(err);
//             })[0].wordId


}


function indexMainURL(url) {
  // this function gets all words and all links


  var start = new Date().getTime();
  
  axios.get(url)
    .then(response => {
      var $ = cheerio.load(response.data);
      var words = getWords(response.data);
      getLinks(response.data);
      var end = new Date().getTime();
      var seconds = ((end - start) / 1000).toFixed(2);
      
      var date;
      date = new Date()
      date = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2) + ' ' + 
      ('00' + date.getUTCHours()).slice(-2) + ':' + 
      ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
      ('00' + date.getUTCSeconds()).slice(-2);
      // get urls info
      var linkInfo = {
        "title": $("title").text(),
        "url": url,
        "description": $('meta[name="description"]').attr('content'),
        "lastModified": $('meta[name="last-modifed"]').attr('content'), // get last modified (it in headers somewhere)
        "lastIndexed": date,
       // get the data of last time it was indexed
        "timeToIndex": seconds // record the amount of time it took to index
      }

      //TODO fix the datetimes from NOW() to actual datetimes, also need to fix time to index,

      saveLink(linkInfo);
      getUrlId(linkInfo, words, saveWords)
      // saveWords(words, id)
      
      
      console.log(linkInfo);
    })
    .catch(error => {
      console.log(error);
    });
}





function saveLink(linkInfo) {
  // linkInfo.description = linkInfo.description.replace(/\/g,"'");
  //     linkInfo.url = linkInfo.url.replace(/\/g,"'");
  //     linkInfo.title = linkInfo.title.replace(/\/g,"'");
  //TODO fix the datetimes from NOW() to actual datetimes, also need to fix time to index,
  if(linkInfo.description.length > 255)
    linkInfo.description = linkInfo.description.substr(0,254);
  mysqlConnection.query( 
   "INSERT INTO page (title, url, description, lastModified, lastIndexed, timeToIndex) VALUES (\"" + linkInfo.title + "\", \"" + linkInfo.url + "\", \"" +
    linkInfo.description + "\", NOW(), \""+linkInfo.lastIndexed+"\", \""+linkInfo.timeToIndex+"\") " ,
    function (err, result) {
      if (err) console.log(err);
      console.log("1 link/page record added")

    })
}
// \""+linkInfo.lastModified+"\",


function getWords(html) {
  var $ = cheerio.load(html);
  var words = $('body').text().split(/\s+/);
  var filteredWords = words.filter(el => (el.length > 0));
  // console.log(filteredWords);
  return filteredWords;
}

function getLinks(html) {
  // this function gets links from the url
  var $ = cheerio.load(html);
  var a = $("a");
  var links = [];
  $(a).each(function (i, link) {
    // push the link into the link array and then index that link
    if (validURL($(link).attr('href'))) {
      links.push(indexLink($(link).attr('href')));
    }
  });
  return links;
}

function indexLink(link) {
  // this function only gets the words from a link
  var start = new Date().getTime();
  var date = new Date();
  axios.get(link)
    .then(response => {
      var date;
      date = new Date();
      date = date.getUTCFullYear() + '-' +
      ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
      ('00' + date.getUTCDate()).slice(-2) + ' ' + 
      ('00' + date.getUTCHours()).slice(-2) + ':' + 
      ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
      ('00' + date.getUTCSeconds()).slice(-2);

      var end = new Date().getTime();
      var seconds = ((end - start) / 1000).toFixed(2);
      var $ = cheerio.load(response.data);
      // get words from link
      var words = getWords(response.data)
      // get links info
      var linkInfo = {
        "title": $("title").text(),
        "url": link,
        "description": $('meta[name="description"]').attr('content'),
        "lastModified": $('meta[name="last-modifed"]').attr('content'), // get last modified
        "lastIndexed": date, // get the data of last time it was indexed
        "timeToIndex": seconds // record the amount of time it took to index
      }


      saveLink(linkInfo);
      getUrlId(linkInfo, words, saveWords)
      

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

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected to the database!");
  } else {
    console.log("connection to database Failed :(");
  }
});


app.listen(port, function () {
  console.log('Our app is running on http://localhost:' + port);
});



