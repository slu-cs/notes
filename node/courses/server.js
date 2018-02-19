// A REST API for a collection of courses

let db = null;
const mongodb = require('mongodb');
mongodb.MongoClient.connect('mongodb://localhost:27017', function(error, client) {
  if (error) throw error;
  db = client.db('notes');
  db.courses = db.collection('courses');
});

const express = require('express');
const server = express();

// Logging
server.use(function(request, response, next) {
  console.log(request.method, request.url, request.body);
  next();
});

// Return all courses
server.get('/', function(request, response, next) {
  db.courses.find().toArray(function(error, courses) {
    if (error) return next(error); // Skip to error-handling middleware
    response.json(courses);
  });
});

// Return one course
server.get('/:id', function(request, response, next) {
  const course = {_id: new mongodb.ObjectId(request.params.id)};
  db.courses.findOne(course, function(error, course) {
    if (error) return next(error);
    response.json(course);
  });
});

// Error handling
server.use(function(error, request, response, next) {
  console.log(error.stack);
  response.sendStatus(500);
});

server.listen(3000);
