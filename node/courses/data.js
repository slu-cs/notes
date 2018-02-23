// Set up a course collection
const db = new Mongo().getDB('courses');
db.dropDatabase();

// Validator
db.createCollection('courses', {validator: {$and: [
  {subject: {$type: 'string', $ne: ''}},
  {number: {$type: 'int', $gt: 0}}
]}});

// Initial data
db.courses.insertOne({subject: 'CS', number: NumberInt(140)});
db.courses.insertOne({subject: 'CS', number: NumberInt(219)});
db.courses.insertOne({subject: 'Math', number: NumberInt(280)});
db.courses.insertOne({subject: 'Stat', number: NumberInt(113)});

// Make query-by-subject fast
db.courses.createIndex({subject: 1});
