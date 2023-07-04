db.practice.find({ age: { $eq: 17 } }); // equal check
db.practice.find({ favoutiteColor: { $eq: "Red" } }, { favoutiteColor: 1 }); // only a single row field filtering

// Not Equal
db.practice.find({ gender: { $ne: "Female" } }).project({ gender: 1, name: 1 }); // Field Filtering with project

// Greater than
db.practice.find({ age: { $gt: 30 } }).project({ name: 1, age: 1 });

// Greater than equal
db.practice.find({ age: { $gte: 70 } }).project({ name: 1, age: 1 });

// Less than
db.practice.find({ age: { $lt: 30 } }).project({ name: 1, age: 1 });

// Less than equal
db.practice.find({ age: { $lte: 30 } }).project({ name: 1, age: 1 });
// Sorting
db.practice
  .find({ age: { $lte: 30 } })
  .project({ name: 1, age: 1 })
  .sort({ age: -1 }); // desc
db.practice
  .find({ age: { $lte: 30 } })
  .project({ name: 1, age: 1 })
  .sort({ age: 1 }); // Asc

// Multiple condition
db.practice
  .find({ age: { $gte: 18, $lt: 30 } })
  .project({ name: 1, age: 1 })
  .sort({ age: -1 });

// In (Grab specific value)
db.practice
  .find({
    gender: "Female",
    age: { $in: [18, 20] },
  })
  .project({ name: 1, age: 1 })
  .sort({ _id: -1 });

//  nin (Remove specific value)
db.practice
  .find({ age: { $nin: [18, 20] } })
  .project({ name: 1, age: 1 })
  .sort({ _id: -1 });

db.practice
  .find({
    gender: "Female",
    age: { $nin: [18, 20, 30, 35] },
    interests: { $in: ["Gaming", "Cooking"] },
  })
  .project({ name: 1, age: 1, gender: 1, interests: 1 });

// and
db.practice
  .find({
    $and: [
      {
        gender: "Female",
      },
      {
        age: { $lt: 30 },
      },
      {
        "skills.name": "JAVASCRIPT",
      },
    ],
  })
  .project({ name: 1, age: 1, gender: 1 })
  .sort({ age: 1 });

// or
db.practice
  .find({
    $or: [
      {
        gender: "Female",
      },
      {
        age: { $lt: 30 },
      },
      {
        "skills.name": "JAVASCRIPT",
      },
    ],
  })
  .project({ name: 1, age: 1, gender: 1 })
  .sort({ age: 1 });

// When you have same field condition use explicit and
db.practice
  .find({
    $and: [
      {
        age: { $gt: 15 },
      },
      { age: { $nt: 18 } },
    ],
  })
  .project({ age: 1 })
  .sort({ age: 1 });

//  Exist
db.practice.find({
  occupation: { $exists: false },
  // phone: { $exists: false }
});

// -------- Array -----
//  Type -> check data type
db.practice
  .find({
    skills: { $type: "string" },
  })
  .project({ skills: 1 });

//size -> array with the number of elements specified by the argument.
db.practice
  .find({
    skills: { $size: 1 },
  })
  .project({ skills: 1 });

// find a value with any position of an array
db.practice.find({ interests: "Travelling" }).project({ interests: 1 });

// find a value with specific position of an array
db.practice.find({ "interests.0": "Travelling" }).project({ interests: 1 });

// find a value with specific position and exact position match
db.practice
  .find({ interests: ["Travelling", "Writing", "Reading"] })
  .project({ interests: 1 });

// Find document with a array of value without exact match of the position -> $all
db.practice
  .find({ interests: { $all: ["Travelling", "Writing", "Reading"] } })
  .project({ interests: 1 });

//  ------- Object -------

// get value without exact match from array of object
db.practice.find({
  skills: { $elemMatch: { name: "JAVASCRIPT", level: "Expert" } },
});

// --------- Update ---------

// $set -> not recommanded for array or non premitive value
db.practice.updateOne(
  // which element you want to update
  { _id: ObjectId("6406ad65fc13ae5a400000c7") },
  //  what you want to update
  { $set: { country: "bangladesh" } }, // this way it will add a new field country and it's value
  // options
  {}
);

//
// update existing value
db.practice.updateOne(
  // which element you want to update
  { _id: ObjectId("6406ad65fc13ae5a400000c7") },
  //  what you want to update
  { $set: { interests: ["bangladesh"] } }, // this way it will add a new field country and it's value
  // options
  {}
);

//  $addToSet -> best for new entry to array
db.practice.updateOne(
  { _id: ObjectId("6406ad65fc13ae5a400000c7") },
  {
    $addToSet: {
      interests: {
        $each: ["Cooking", "Reading", "Writing"],
      },
    },
  }
);

//  push -> same as js array push
db.practice.updateOne(
  { _id: ObjectId("6406ad65fc13ae5a400000c7") },
  {
    $push: {
      interests: {
        $each: ["Cooking", "Reading", "Writing"],
      },
    },
  }
);

// unset
db.practice.updateOne(
  { _id: ObjectId("6406ad65fc13ae5a400000c7") },
  { $unset: { occupation: "" } }
);

// pop -> remove from first -1 , remove from last 1
db.practice.updateOne(
  { _id: ObjectId("6406ad65fc13ae5a400000c7") },
  { $pop: { interests: -1 } }
);

// pull. -- remove a specific value from a field
db.practice.updateOne(
  { _id: ObjectId("6406ad65fc13ae5a400000c7") },
  { $pull: { friends: "Mizanur Rahman" } }
);
// pullAll -- remove an array of value
db.practice.updateOne(
  { _id: ObjectId("6406ad65fc13ae5a400000c7") },
  { $pullAll: { friends: ["Najmus Sakib", "Rasel Ahmed"] } }
);

// updateMany same as update don't need to pass any specific value so that it will update every element in a document
db.practice.updateMany(
  {},
  { $pullAll: { friends: ["Najmus Sakib", "Rasel Ahmed"] } }
);

// Delete
// deleteOne
db.practice.deleteOne({ _id: ObjectId("6406ad65fc13ae5a400000c7") });
// Delete Many but with only has specific value
db.practice.deleteMany({ _id: ObjectId("6406ad65fc13ae5a400000c7") });

// Create Collection
db.createCollection("test");

// insert one
db.practice.test.insertOne({ name: "meow" });

// find one
db.practice.test.findOne({ name: "meow" });

// drop collection
db.test.drop();

// rename

db.practice.updateMany({}, { $rename: { favoutiteColor: "favoriteColor" } });
