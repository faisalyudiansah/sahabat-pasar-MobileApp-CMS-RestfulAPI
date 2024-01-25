const { db } = require("../configs/mongodb");

db.createCollection("schedules", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Schedule Object Validation",
      required: ["storeId", "userId", "time"],
      properties: {
        storeId: {
          bsonType: "objectId",
          description: "'Store ID' must be a Object ID and is required",
        },
        userId: {
          bsonType: "objectId",
          description: "'User ID' must be a Object ID and is required",
        },
        time: {
          bsonType: "date",
          description: "Time' must be a date and is required",
        },
        isCompleted: {
          bsonType: "bool",
          description: "'isCompleted' must be a bool",
        },
        createdAt: {
          bsonType: "date",
          description: "'createdAt' must be a date",
        },
        updatedAt: {
          bsonType: "date",
          description: "'updatedAt' must be a date",
        },
      },
    },
  },
});

async function indexing() {
  await db.collection("schedules").createIndex({ location: "2dsphere" });
  console.log(`udah selese`);
}

indexing();
console.log(`Hello`);
