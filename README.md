# NoSQLBooster

### 1. Show Database

```typescript
    show databases
```

### 2. Change Collection

```typescript
    use collectionName
```

### 3. get data in collection

```typescript
db.getCollection("practice").find();
// get limited data
db.getCollection("practice").find().limit(1);
```

### 4. Equal

```typescript
db.practice.find({ age: { $eq: 17 } }); // equal check
```

### 5. only a single row field filtering with equal

```typescript
db.practice.find({ favoutiteColor: { $eq: "Red" } }, { favoutiteColor: 1 }); //
```

### 6. field Filtering with project and not equal

```typescript
db.practice.find({ gender: { $ne: "Female" } }).project({ gender: 1, name: 1 });
```

### 7. greater than

```typescript
db.practice.find({ age: { $gt: 30 } }).project({ name: 1, age: 1 });
```

### 8. Greater than equal

```typescript
db.practice.find({ age: { $gte: 70 } }).project({ name: 1, age: 1 });
```

### 9. // Less than

```typescript
db.practice.find({ age: { $lt: 30 } }).project({ name: 1, age: 1 });
```

### 10. Less than equal

```typescript
db.practice.find({ age: { $lte: 30 } }).project({ name: 1, age: 1 });
```

### 11. Greater than equal

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

### 12. Multiple Conditions

```javascript
db.practice
  .find({ age: { $gte: 18, $lt: 30 } })
  .project({ name: 1, age: 1 })
  .sort({ age: -1 });
```

### 13. In (Grab specific value)

```javascript
db.practice
    .find({
        gender: "Female",
        age: { $in: [18, 20] },
    })
    .project({ name: 1, age: 1 })
    .sort({ \_id: -1 });
```

### 14. nin (Remove specific value)

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

### 15. and

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

### 16 or

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

### 17. When you have same field condition use explicit and

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

// rename

db.practice.updateMany({},{$rename:{"favoutiteColor" : "favouriteColor"}})

```

```
