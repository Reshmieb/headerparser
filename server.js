// server.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var requestIp = require('request-ip');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

function getOSInfoFromHeaders(headers){
  var userAgent = headers["user-agent"];
  var os = userAgent.slice(userAgent.indexOf("(")+1, userAgent.indexOf(")"));
  return os;
}

app.get("/api/whoami", function(request, response){
  var ip = request.connection.remoteAddress; // on localhost > 127.0.0.1
  var language = request.acceptsLanguages()[0];
  var software = getOSInfoFromHeaders(request.headers);
  var responseObject = {
      ipaddress: ip,
      language: language,
      software: software
  };
  response.send(responseObject);
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
