const { db } = require("../configs/mongodb");

db.createCollection("stores", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Store Object Validation",
      required: ["name", "address", "ownerName", "mobilePhone"],
      properties: {
        name: {
          bsonType: "string",
          description: "'Name' must be a string and is required",
        },
        photo: {
          bsonType: "string",
          description: "'Photo' must be a uri",
        },
        joinDate: {
          bsonType: "date",
          description: "Join Date' must be a date and is required",
        },
        address: {
          bsonType: "string",
          description: "'Address' must be a string and is required",
        },
        ownerName: {
          bsonType: "string",
          description: "'Owner Name' must be a string and is required",
        },
        mobilePhone: {
          bsonType: "string",
          description: "'Mobile Phone' must be a string and is required",
        },
        status: {
          bsonType: "string",
          description: "'Status' must be a string",
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
  await db.collection("stores").createIndex({ location: "2dsphere" });
  console.log(`udah selese`);
}

indexing();
console.log(`Hello`);
