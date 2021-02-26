var express = require('express');
var app = express();
var request = require('request');
const bodyparser = require('body-parser')

//Free API Key For Dictionary
var DIC_API_KEY = "701f2477-5eb3-4ea1-a7ba-f1d06b2512b9"


//Fetching and transforming data to object according to our needs

function fetchData(word, callback) {
  request.get(`https://www.dictionaryapi.com/api/v3/references/ithesaurus/json/${word}?key=${DIC_API_KEY}`, function (err, res, body) {
    if (err)
      console.log("err from fetching data", err)
    if (res.statusCode === 200) {
      console.log("APIDATA", JSON.parse(body))
      var bod = JSON.parse(body)
      if (bod.length === 0 || typeof bod[0] === "string") {
        callback("error", null)
        return;
      }
      else {
        var data = {
          word: word,
          type: bod[0].fl,
          definition: bod[0].shortdef[0],
          syns: "Not Found",
          ant: "Not Found"
        }
        if (bod[0].meta.syns.length) {
          if (bod[0].meta.syns[0].length) {
            var syns = ''
            for (var i = 0; i < bod[0].meta.syns[0].length; i++) {
              if (bod[0].meta.syns[0][i]) {
                syns += bod[0].meta.syns[0][i] + "  , ";
              }
            }
            data.syns = syns.slice(0, syns.length - 2);
          }
        }
        if (bod[0].meta.ants.length) {
          if (bod[0].meta.ants[0].length) {
            var ants = ''
            for (var i = 0; i < bod[0].meta.ants[0].length; i++) {
              ants += bod[0].meta.ants[0][i] + " , ";
            } if (bod[0].meta.ants[0][i]) {

            }
            data.ant = ants.slice(0, ants.length - 2);
          }
        }
        callback(null, data)
      }
    }
  });

}
module.exports.fetchData = fetchData
module.exports.fetchData = fetchData;