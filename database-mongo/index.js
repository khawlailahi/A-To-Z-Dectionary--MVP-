var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dictionary',{
  useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var searchSchema = mongoose.Schema({
   word: String,
   type: String,
   definition: String,
   syns: String,
   ant: String
});

var Word = mongoose.model('Word', searchSchema);
var save = function(word) {
  var doc = new Word({
    word: word.word,
   type: word.type,
   definition: word.definition,
   syns: word.syns,
   ant: word.ant
  })
  doc.save((err,data)=>{
      if(err) {
        console.log("err in saving in db ", err);
      } else {
       console.log('saved in db ')
      }
    })
  };
// var selectAll = function(callback) {
//   Item.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

// module.exports.selectAll = selectAll;
module.exports.save = save;
module.exports.Word = Word;