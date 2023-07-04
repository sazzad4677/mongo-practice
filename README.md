<h1 align="center">---Practice Notes---</h1>

### Show Database

```typescript
    show databases
```

### Change Collection

```typescript
    use collectionName
```

### get data in collection

```typescript
db.getCollection("practice").find();
// get limited data
db.getCollection("practice").find().limit(1);
```

### Equal

```typescript
db.practice.find({ age: { $eq: 17 } }); // equal check
```

### only a single row field filtering with equal

```typescript
db.practice.find({ favoutiteColor: { $eq: "Red" } }, { favoutiteColor: 1 }); //
```

### field Filtering with project and not equal

```typescript
db.practice.find({ gender: { $ne: "Female" } }).project({ gender: 1, name: 1 });
```

### greater than

```typescript
db.practice.find({ age: { $gt: 30 } }).project({ name: 1, age: 1 });
```

### Greater than equal

```typescript
db.practice.find({ age: { $gte: 70 } }).project({ name: 1, age: 1 });
```

### Less than

```typescript
db.practice.find({ age: { $lt: 30 } }).project({ name: 1, age: 1 });
```

### Less than equal

```typescript
db.practice.find({ age: { $lte: 30 } }).project({ name: 1, age: 1 });
```

### Greater than equal

```typescript
// Sorting
// desc
db.practice
  .find({ age: { $lte: 30 } })
  .project({ name: 1, age: 1 })
  .sort({ age: -1 });
// Asc
db.practice
  .find({ age: { $lte: 30 } })
  .project({ name: 1, age: 1 })
  .sort({ age: 1 });
```

### Multiple Conditions

```javascript
db.practice
  .find({ age: { $gte: 18, $lt: 30 } })
  .project({ name: 1, age: 1 })
  .sort({ age: -1 });
```

### In (Grab specific value)

```javascript
db.practice
    .find({
        gender: "Female",
        age: { $in: [18, 20] },
    })
    .project({ name: 1, age: 1 })
    .sort({ \_id: -1 });
```

### nin (Remove specific value)

```javaScript

db.practice
    .find({ age: { $nin: [18, 20] } })
    .project({ name: 1, age: 1 })
    .sort({ \_id: -1 });

db.practice
    .find({
        gender: "Female",
        age: { $nin: [18, 20, 30, 35] },
        interests: { $in: ["Gaming", "Cooking"] },
})
    .project({ name: 1, age: 1, gender: 1, interests: 1 });
```

### and

```typescript
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
```

### or

```javascript
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
```

### When you have same field condition use explicit and

```typescript
db.practice
  .find({
    $and: [
      {
        age: { $gt: 15 },
      },
      { age: { $lt: 30 } },
    ],
  })
  .project({ age: 1 })
  .sort({ age: 1 });
```

### Exist

```typescript
db.practice.find({
  occupation: { $exists: false },
  // phone: { $exists: false }
});
```

## -------- Array -----

### Type -> check data type

```typescript
db.practice
  .find({
    skills: { $type: "string" },
  })
  .project({ skills: 1 });
```

### size -> array with the number of elements specified by the argument.

```typescript
db.practice
  .find({
    skills: { $size: 1 },
  })
  .project({ skills: 1 });
```

### find a value with any position of an array

```typescript
db.practice.find({ interests: "Travelling" }).project({ interests: 1 });
```

### find a value with specific position of an array

```typescript
db.practice.find({ "interests.0": "Travelling" }).project({ interests: 1 });
```

### find a value with specific position and exact position match

```typescript
db.practice
  .find({ interests: ["Travelling", "Writing", "Reading"] })
  .project({ interests: 1 });
```

### Find document with a array of value without exact match of the position -> $all

```typescript
db.practice
  .find({ interests: { $all: ["Travelling", "Writing", "Reading"] } })
  .project({ interests: 1 });
```

## ------- Object -------

### get value without exact match from array of object

```typescript
db.practice.find({
  skills: { $elemMatch: { name: "JAVASCRIPT", level: "Expert" } },
});
```

### --------- Update ---------

```typescript
// $set -> not recommanded for array or non premitive value
db.practice.updateOne(
// which element you want to update
{ \_id: ObjectId("6406ad65fc13ae5a400000c7") },
// what you want to update
{ $set: { country: "bangladesh" } }, // this way it will add a new field country and it's value
// options
{}
)
```

### update existing value

```typescript
db.practice.updateOne(
  // which element you want to update
  { \_id: ObjectId("6406ad65fc13ae5a400000c7") },
  // what you want to update
  { $set: { interests: ["bangladesh"] } }, // this way it will add a new field country and it's value
  // options
  {}
)
```

### $addToSet -> best for new entry to array

```typescript
db.practice.updateOne({ \_id: ObjectId("6406ad65fc13ae5a400000c7") }, {
  $addToSet: {
  interests: {
  $each: ["Cooking", "Reading", "Writing"]
   }
  }
})
```

### push -> same as js array push

```typescript
db.practice.updateOne({ \_id: ObjectId("6406ad65fc13ae5a400000c7") }, {
  $push: {
  interests: {
  $each: ["Cooking", "Reading", "Writing"]
      }
    }
  })
```

### unset

```typescript
db.practice.updateOne({\_id: ObjectId("6406ad65fc13ae5a400000c7")},{$unset:{occupation: ""}})
```

### pop -> remove from first -1 , remove from last 1

```typescript
db.practice.updateOne({\_id: ObjectId("6406ad65fc13ae5a400000c7")},
  {$pop:{interests: -1}},
)
```

### pull. -- remove a specific value from a field

```typescript
db.practice.updateOne({\_id: ObjectId("6406ad65fc13ae5a400000c7")},
{$pull:{friends: "Mizanur Rahman"}},
)
```

### pullAll -- remove an array of value

```typescript
db.practice.updateOne({\_id: ObjectId("6406ad65fc13ae5a400000c7")},
{$pullAll:{friends: ["Najmus Sakib", "Rasel Ahmed"]}},
)
```

### updateMany same as update don't need to pass any specific value so that it will update every element in a document

```typescript
db.practice.updateMany(
  {},
  { $pullAll: { friends: ["Najmus Sakib", "Rasel Ahmed"] } }
);
```

## Delete

### deleteOne

```typescript
db.practice.deleteOne({ _id: ObjectId("6406ad65fc13ae5a400000c7") });
```

### Delete Many but with only has specific value

```typescript
db.practice.deleteMany({\_id: ObjectId("6406ad65fc13ae5a400000c7")})
```

### Create Collection

```typescript
db.createCollection("test");
```

### insert one

```typescript
db.practice.test.insertOne({ name: "meow" });
```

### find one

```typescript
db.practice.test.findOne({ name: "meow" });
```

### drop collection

```typescript
db.test.drop();
```

### rename

```typescript
db.practice.updateMany({}, { $rename: { favoutiteColor: "favouriteColor" } });
```

<h1 align="center">---Practice Tasks---</h1>

### Task 1: Find all users who are located in New York.

```typescript
db.problem_solving.find({ "address.city": "New York" });
```

### Task 2: Find the user(s) with the email "johndoe@example.com" and retrieve their favorite movie.

```typescript
db.problem_solving.find({ email: "johndoe@example.com" });
```

### Task 3: Find all users with "pizza" as their favorite food and sort them according to age.

```typescript
db.problem_solving.find({ "favorites.food": "pizza" }).sort({ age: 1 });
```

### Task 4: Find all users over 30 whose favorite color is "green".

```typescript
db.problem_solving.find({
    age: {$gt: 30}
    "favorites.color": "green"
})
```

### Task 5: Count the number of users whose favorite movie is "The Shawshank Redemption."

```typescript
db.problem_solving
  .find({ "favorites.movie": "The Shawshank Redemption" })
  .count();
```

### Task 6: Update the zipcode of the user with the email "johndoe@example.com" to "10002".

```typescript
db.problem_solving.updateOne(
  { email: "johndoe@example.com" },
  {
    $set: { "address.zipcode": "10002" },
  }
);
```

### Task 7: Delete the user with the email "alicewilliams@example.com" from the user data.

```typescript
db.problem_solving.deleteOne({ email: "alicewilliams@example.com" });
```

### Task 8: Group users by their favorite movie and retrieve the average age in each movie group.

```typescript
db.problem_solving.aggregate([
  {
    $group: { _id: "favorites.movie", avgAge: { $avg: "$age" } },
  },
]);
```

### Task 9: Calculate the average age of users with a favorite " pizza " food.

```typescript
db.problem_solving.aggregate([
  {
    $match: {
      "favorites.food": "pizza",
    },
  },
  {
    $group: { _id: null, avgAge: { $avg: "$age" } },
  },
]);
```

### Task 10: Perform a lookup aggregation to retrieve the orders data along with the customer details for each order.

```typescript
db.createCollection("Resturant"); // creating collection cause I don't have any
db.problem_solving.aggregate([
  {
    $lookup: {
      from: "Resturant",
      localField: "_id",
      foreignField: "_id",
      as: "details",
    },
  },
]);
```

<h1 align="center">---More Practice Task---</h1>

### Task 1: Group users by their favorite color and retrieve the count of users in each color group.

```typescript
db.problem_solving.aggregate([
  { $group: { _id: "favorites.color", count: { $sum: 1 } } },
]);
```

### Task 2: Find the user(s) with the highest age.

```typescript
// first way
db.problem_solving.aggregate([
  {
    $sort: { age: -1 },
  },
  {
    $limit: 1,
  },
]);
//  with grouping
db.problem_solving.aggregate([
  {
    $group: {
      _id: null,
      highestAge: { $max: "$age" },
      name: { $first: "$name" },
    },
  },
]);
```

### Task 3: Find the most common favorite food among all users.

```typescript
db.problem_solving.aggregate([
  {
    $group: { _id: "$favorites.food", count: { $sum: 1 } },
  },
  {
    $project: {
      _id: 0,
      commonFavFood: "$_id",
      count: 1,
    },
  },
]);
```

### Task 4: Calculate the total count of friends across all users.

```typescript
db.problem_solving.aggregate([
  {
    $group: { _id: null, friendsCount: { $sum: { $size: "$friends" } } },
  },
  { $project: { _id: 0, friendsCount: 1 } },
]);
```

### Task 5: Find the user(s) with the longest name.

```typescript
db.problem_solving.aggregate([
  {
    $project: {
      name: 1,
      longestName: { $strLenCP: "$name" },
    },
  },
]);
```

### Task 6: Calculate each state's total number of users in the address field.

```typescript
db.problem_solving.aggregate([
  {
    $group: { _id: "$address.state", count: { $sum: 1 } },
  },
]);
```

### Task 7: Find the user(s) with the highest number of friends.

```typescript
db.problem_solving.aggregate([
  {
    $project: { friendsCount: { $size: "$friends" }, name: 1 },
  },
  {
    $sort: { friendsCount: -1 },
  },
  {
    $limit: 1,
  },
]);
```
