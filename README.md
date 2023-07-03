# NoSQLBooster

## 1. Show Database

```typescript
    show databases
```

## 2. Change Collection

```typescript
    use collectionName
```

## 3. get data in collection

```typescript
db.getCollection("practice").find();
// get limited data
db.getCollection("practice").find().limit(1);
```

## 4. Equal

```typescript
db.practice.find({ age: { $eq: 17 } }); // equal check
```

## 5. only a single row field filtering with equal

```typescript
db.practice.find({ favoutiteColor: { $eq: "Red" } }, { favoutiteColor: 1 }); //
```

## 6. field Filtering with project and not equal

```typescript
db.practice.find({ gender: { $ne: "Female" } }).project({ gender: 1, name: 1 });
```

## 7. greater than

```typescript
db.practice.find({ age: { $gt: 30 } }).project({ name: 1, age: 1 });
```

## 8. Greater than equal

```typescript
db.practice.find({ age: { $gte: 70 } }).project({ name: 1, age: 1 });
```

## 9. // Less than

```typescript
db.practice.find({ age: { $lt: 30 } }).project({ name: 1, age: 1 });
```

## 10. Less than equal

```typescript
db.practice.find({ age: { $lte: 30 } }).project({ name: 1, age: 1 });
```

## 11. Greater than equal

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

## 12. Multiple Conditions

```javascript
db.practice
  .find({ age: { $gte: 18, $lt: 30 } })
  .project({ name: 1, age: 1 })
  .sort({ age: -1 });
```

## 13. In (Grab specific value)

```javascript
db.practice
    .find({
        gender: "Female",
        age: { $in: [18, 20] },
    })
    .project({ name: 1, age: 1 })
    .sort({ \_id: -1 });
```

## 14. nin (Remove specific value)

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

## 15. and

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

## 16 or

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

## 17. When you have same field condition use explicit and

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
