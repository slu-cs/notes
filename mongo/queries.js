// --------------------------------- To retrieve data, use find() and findOne()

// All courses
db.courses.find()

// See all courses with subject = CS
db.courses.find({subject: 'CS'})

// See all courses with number < 200
db.courses.find({number: {$lt: 200}})

// See aSee all courses with subject = CS and number > 200
db.courses.find({subject: 'CS', number: {$gt: 200}})

// See all books with authors including A1
db.books.find({authors: 'A1'})

// See all books with titles beginning with G
db.books.find({title: /^G/})

// See all authors with the last name Bond
db.authors.find({'name.last': 'Bond'})

// See all authors with middle names
db.authors.find({'name.middle': {$exists: true}})

// See the only author with _id = A1
db.authors.findOne({_id: 'A1'})

// --------------------------- To remove data, use deleteMany() and deleteOne()

// Remove all courses with subject = CS
db.courses.deleteMany({subject: 'CS'})

// Remove the one author with _id = A1
db.authors.deleteOne({_id: 'A1'})

// ---------------------------- To alter data, use updateMany() and updateOne()

// In all books with authors including A1
// Pull A1 out of their authors array
db.books.updateMany({authors: 'A1'}, {$pull: {authors: 'A1'}})

// In all books
// Set a new field called copies to 1
db.books.updateMany({}, {$set: {copies: 1}})

// In the one book with _id = B1
// Increment copies by 1
db.books.updateOne({_id: 'B1'}, {$inc: {copies: 1}})
