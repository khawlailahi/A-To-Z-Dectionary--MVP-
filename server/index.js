var express = require('express');
var bodyParser = require('body-parser');
var DB = require('../database-mongo');
var API = require('./APIKey.js')
var app = express();
var word;

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Searching for the word with our external API  and storing data in our Database
app.post("/search", (req, res) => {
  word = req.body.word;
  API.fetchData(word, (err, data) => {
    if (err) {
      res.send("NOT Found")
    }
    else {
      console.log("dataa11", data)
      var APIData = data;
      DB.save(APIData, (err, data) => {
        if (data) {
          res.end();
        }
      });
    }
  })
})


//Searching for the word and responding to the client directly ( to have low latency)
app.get('/search', function (req, res) {
  API.fetchData(word, (err, data) => {
    if (err) {
      res.sendStatus(500)
    }
    else {
      var APIData = data;
      res.send(data)
      res.end();
    }
  });
})


// fetching our search History fron the Database
app.get('/history', function (req, res) {
  console.log("received")
  var dataArr = []
  DB.Word.find({}, (err, data) => {
    console.log("dataaa from db ", data)
    for (var i = 0; i < data.length; i++) {
      var data1 = { word: data[i]._doc.word }
      dataArr.push(data1)
    }
    console.log("dataaa from get ", dataArr)
    res.send(dataArr)
    res.end();

  })
});

app.listen(3000, function () {
  console.log('listening on port 3000!');
});

