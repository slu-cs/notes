// A REST API for a collection of courses
let db = null;
const mongodb = require('mongodb');
mongodb.MongoClient.connect('mongodb://localhost:27017', function(error, client) {
  if (error) throw error;
  db = client.db('courses');
  db.courses = db.collection('courses');
});

// Create the server
const express = require('express');
const server = express();

// Allow us to access the request.body
server.use(express.urlencoded({extended: true}));

// Deal with favicon requests
server.get('/favicon.ico', function(request, response) {
  response.sendStatus(204); // No icon, no problems
});

// Logging
server.use(function(request, response, next) {
  console.log(request.method, request.url, request.body);
  next();
});

// Return all courses (of a certain subject?)
server.get('/', function(request, response, next) {
  let course = {};
  if (request.query.subject) {
    course.subject = request.query.subject;
  }

  db.courses.find(course).toArray(function(error, courses) {
    if (error) return next(error);
    response.json(courses);
  });
});

// Add a new course
server.post('/', function(request, response, next) {
  const course = {
    subject: request.body.subject,
    number: parseInt(request.body.number),
  };

  db.courses.insertOne(course, function(error) {
    if (error) return next(error);
    response.json(course);
  });
});

// Return one course
server.get('/:id', function(request, response, next) {
  const course = {_id: new mongodb.ObjectId(request.params.id)};

  db.courses.findOne(course, function(error, course) {
    if (error) return next(error);
    if (!course) return next(new Error('Not found'));
    response.json(course);
  });
});

// Change either the subject or the number of one course
server.patch('/:id', function(request, response, next) {
  const course = {_id: new mongodb.ObjectId(request.params.id)};

  let update = {};
  if (request.body.command === 'set' && request.body.field === 'subject') {
    update = {$set: {subject: request.body.value}};
  } else if (request.body.command === 'set' && request.body.field === 'number') {
    update = {$set: {number: parseInt(request.body.value)}};
  } else {
    return next(new Error('Bad request'));
  }

  db.courses.updateOne(course, update, function(error, report) {
    if (error) return next(error);
    if (!report.matchedCount) return next(new Error('Not found'));
    response.end();
  });
});

// Delete one course
server.delete('/:id', function(request, response, next) {
  const course = {_id: new mongodb.ObjectId(request.params.id)};

  db.courses.deleteOne(course, function(error) {
    if (error) return next(error);
    response.end();
  });
});

// Error handling
server.use(function(error, request, response, next) {
  console.log(error.stack);

  switch(error.message) {
    case 'Bad request':
    case 'Document failed validation':
      response.sendStatus(400); // Bad request
      break;
    case 'Not found':
    case 'Argument passed in must be a single String of 12 bytes or a string of 24 hex characters':
      response.sendStatus(404); // Not found
      break;
    default:
      response.sendStatus(500); // Internal server error
  }
});

// Start the server on port 3000
server.listen(3000);
