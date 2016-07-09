var mongoose = require ("mongoose");
var express = require('express');
var app = express();
var path = require('path');
var urlSchema = require('urlSchema');

var uristring = 
  process.env.MONGODB_URI || 
  'mongodb://localhost/urlshorten';

mongoose.connect(uristring, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/new/:u", function(req,res) {
  var u = request.params.u;

  //valid url?

  Save to db
});

app.get('/:id', function(req, res) {
  var id = request.params.id;

  if (!isNumeric(id)) {
    //send page warning bad url
  }

  //lookup id     
  

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
