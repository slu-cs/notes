// A server with multiple routes

const express = require('express');
const server = express();

// Logging middleware
server.use(function(request, response, next) {
  console.log('Request:', request.url);
  next(); // Pass the response on to the next handler
});

// cs-linuxlab-XX.stlawu.local:3000/
server.get('/', function(request, response) {
  response.send('home page');
});

// cs-linuxlab-XX.stlawu.local:3000/settings
server.get('/settings', function(request, response) {
  response.send('settings page');
});

// cs-linuxlab-XX.stlawu.local:3000/greet/something
server.get('/greet/:name', function(request, response) {
  response.send(`hello ${request.params.name}`);
});

// cs-linuxlab-XX.stlawu.local:3000/concat?a=something&b=something
server.get('/concat', function(request, response) {
  const cat = request.query.a + request.query.b;
  response.send(`${request.query.a} + ${request.query.b} = ${cat}`);
});

// Error-handling middleware (goes at the end)
server.use(function(error, request, response, next) {
  console.log(error.stack);
  response.sendStatus(500);
});

server.listen(3000);
