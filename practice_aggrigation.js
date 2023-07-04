db.practice.find({})
    .projection({})
    .sort({ _id: -1 })
    .limit(100)

// ----------aggregate -> data pass stage by stage
// Match
db.practice.aggregate([
    // stage match
    { $match: { gender: "Male", age: { $gt: 20 } } },
    // filter out the field --- it's better always use project at the end cause after project field will be narrow down so that next stage data may not available
    { $project: { gender: 1, age: 1 } }
])

// 
//  $addField
db.practice.aggregate([
    // add a field in every document
    { $addFields: { salary: 0 } },
    { $project: { gender: 1, age: 1, salary: 1 } }
])

//  random number gen & $out
db.practice.aggregate([
    // add a field in every document
    {
        $addFields: {
            salary: {
                $toInt: {
                    $floor: {
                        $multiply: [{
                            $rand: {}
                        }, 100]
                    }
                }
            }
        }
    },
    { $out: "output-collection" } // output with salary field in new collection , for same collection update use $merge
    // { $project: { gender: 1, age: 1, salary: 1 } }
])

//  random number gen & $merge add field in same collection
db.practice.aggregate([
    // add a field in every document
    {
        $addFields: {
            salary: {
                $toInt: {
                    $floor: {
                        $multiply: [{
                            $rand: {}
                        }, 100]
                    }
                }
            }
        }
    },
    { $merge: "practice" }
    // { $project: { gender: 1, age: 1, salary: 1 } }
])

// $group => responsible for grouping and summary must have an _id 


db.practice.aggregate([
    // add a field in every document
    {
        // group stage
        $group: {
            _id: "$salary",// make a reference using $

            count: { $sum: 1 } // get total number of grouped values
        },
    },
    { $sort: { _id: 1 } },
    { $limit: 3 },
    // project stage
    {
        $project: {
            _id: 0,
            salary: "$_id"
        }
    },
])

// $unwind
db.practice.aggregate([
    // unwind stage 
    {
        $unwind: "$education"
    },
    // group stage
    {
        $group: { _id: "$education", count: { $sum: 1 } }
    }
])



//  Multi Stage Pipeline
db.practice.aggregate([
    { $match: { _id: ObjectId("6406ad65fc13ae5a400000c6") } },
    {
        $facet: {
            // Sub Pipe line
            friendsCount: [
                {
                    $project: {
                        friendsCount: { $size: "$friends" }
                    }
                }
            ],
            // Sub Pipe Line
            interestsCount: [
                {
                    $project: {
                        interestsCount: { $size: "$interests" }
                    }
                }
            ],
            // Sub Pipe Line
            skillCount: [
                {
                    $project: {
                        skillCount: { $size: "$skills" }
                    }
                }
            ]
        }
    },
])

db.practice.aggregate([
    // match stage
    { $match: { email: "cthame2q@tumblr.com" } },
    { $lookup: {
        from: "TestLookUp",
        localField: "email",
        foreignField: "userEmail",
        as: "additionalInfo"
    } }
])



