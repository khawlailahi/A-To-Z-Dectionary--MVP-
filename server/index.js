var express = require('express');
var bodyParser = require('body-parser');
var DB = require('../database-mongo');
var API = require('./APIKey.js')
var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var word;

app.post("/search", (req, res) => {
  word = req.body.word;

  API.fetchData(word, (data) => {
    if (data) {
      var APIData = data;
      DB.save(APIData, (err, data) => {
        if (data) {
          res.end();
        }
      });
    }
  })
})

app.get('/search', function(req, res) {
  API.fetchData(word, (data) => {
    if (data === "error") {
      res.end("NOT Found")
    }
    if (data) {
      var APIData = data;
      res.send(data)
      res.end();
    }

  });
})
app.get('/history', function(req, res) {
  console.log("received")
  var dataArr = []
  DB.Word.find({}, (err, data) => {
    console.log("dataaa from db ", data)
    for (var i = 0; i < data.length; i++) {
      var data1 = {
        word: data[i]._doc.word
      }
      dataArr.push(data1)
    }
    res.send(dataArr)
    res.end();

  })

});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
