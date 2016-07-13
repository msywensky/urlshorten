var mongoose = require ("mongoose");
var express = require('express');
var app = express();
var path = require('path');
var URL = require('url');
var urlSchema = require('./urlSchema');

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

app.get("/new/*", function(req,res) {
  var cur = req.originalUrl;
  var i = cur.indexOf("/new/");
  var u = cur.substring(i+5);

  if (!validateUrl(u)) {
    res.send({err:"invalid URL"});
    return;
  }

 urlSchema.saveUrl(u, function(o) {
   var newurl = "https://quiet-tor-75099.herokuapp.com/";
   var result = {original_url:o.url, short_url:newurl + o.idNum};
    res.send(result);
  })
});

app.get('/:id', function(req, res) {
  var id = req.params.id;

  if (!isNumeric(id)) {
    res.send({err:"Invalid id"});
    return;
  }

  urlSchema.getUrl(id, function(result) {
    if (result.err) {
      res.send(result);
    } else {
      res.redirect(result.url);
    }

  });


});




app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var validateUrl = function(textval) {
    //console.log("testing " + textval);
    var urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

var isNumeric = function(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
