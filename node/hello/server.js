// A tiny web server

const express = require('express');
const server = express();

server.get('/', function(request, response) {
  response.send("Hello Lisa");
});

server.listen(3000);
