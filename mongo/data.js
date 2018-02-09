// This script sets up a database called notes

// Connect to mongo and use the db
const db = new Mongo().getDB('notes');

// Clear out anything in there
db.dropDatabase();

// Create a collection of four courses
db.courses.insertOne({subject: 'CS', number: 140});
db.courses.insertOne({subject: 'CS', number: 219});
db.courses.insertOne({subject: 'Math', number: 280});
db.courses.insertOne({subject: 'Stat', number: 113});

// Create a collection of two books
db.books.insertMany([
  {_id: 'B1', title: 'Big Red Barn', authors: ['A2', 'A3']},
  {_id: 'B2', title: 'Goodnight Moon', authors: ['A1', 'A3']},
]);

// Create a collection of three authors
db.authors.insertMany([
  {_id: 'A1', name: {first: 'Clement', last: 'Hurd'}},
  {_id: 'A2', name: {first: 'Felicia', last: 'Bond'}},
  {_id: 'A3', name: {first: 'Margaret', middle: 'Wise', last: 'Brown'}},
]);
