Node.js runtime environemt - event-driven js runtime.
Express is a minimal and flexible Node.js web application framework. provides a robust set of features to develop web and mobile applications.
  - allow sto set up middlewares to respond to HTTP request
  - Defines a routing table which is used to perform different action based on HTTP method and URL
  - Allow to dynamically render HTML pages based on passing arguments to templates.

  body-parser = this is a node.js middleware for handling JSON, Raw, Text and URL encoded from data.
  cookie-parser = parse Cookie header and populate req.cookies with an object keyed by the cookie names.
  multer = This is a node.js middleware for handling multipart/form-data.

  express.static = to serve static files, such as images css, js, etc
    //--> example app.use(express.static('public'))
      //--> here you'll keep images in public/images sub-direcotry


// example ---------------------
  var express = require('express');
  var app = express();

  // This responds with "Hello World" on the homepage
  app.get('/', function (req, res) {
     console.log("Got a GET request for the homepage");
     res.send('Hello GET');
  })

  // This responds a POST request for the homepage
  app.post('/', function (req, res) {
     console.log("Got a POST request for the homepage");
     res.send('Hello POST');
  })

  // This responds a DELETE request for the /del_user page.
  app.delete('/del_user', function (req, res) {
     console.log("Got a DELETE request for /del_user");
     res.send('Hello DELETE');
  })

  // This responds a GET request for the /list_user page.
  app.get('/list_user', function (req, res) {
     console.log("Got a GET request for /list_user");
     res.send('Page Listing');
  })

  // This responds a GET request for abcd, abxcd, ab123cd, and so on
  app.get('/ab*cd', function(req, res) {
     console.log("Got a GET request for /ab*cd");
     res.send('Page Pattern Match');
  })

  var server = app.listen(8081, function () {
     var host = server.address().address
     var port = server.address().port

     console.log("Example app listening at http://%s:%s", host, port)
  })
