const { db } = require("../configs/mongodb");

db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Orders Object Validation",
      required: ["storeId", "userId", "productOrder"],
      properties: {
        storeId: {
          bsonType: "objectId",
          description: "'Store ID' must be a Object ID and is required",
        },
        userId: {
          bsonType: "objectId",
          description: "'User ID' must be a Object ID and is required",
        },
        productOrder: {
          bsonType: "array",
          description: "Time' must be a array and is required",
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
