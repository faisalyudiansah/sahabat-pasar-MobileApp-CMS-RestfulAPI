const { db } = require("../configs/mongodb");

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Users Object Validation",
      required: [
        "address",
        "photo",
        "name",
        "joinDate",
        "email",
        "password",
        "mobilePhone",
        "role",
      ],
      properties: {
        name: {
          bsonType: "string",
          description: "'Name' must be a string and is required",
        },
        photo: {
          bsonType: "string",
          description: "'Photo' must be a uri and is required",
        },
        joinDate: {
          bsonType: "date",
          description: "'Join Date' must be a date and is required",
        },
        email: {
          bsonType: "string",
          description: "'Email' must be a string and is required",
        },
        password: {
          bsonType: "string",
          description: "'Password' must be a string and is required",
        },
        mobilePhone: {
          bsonType: "string",
          description: "'Mobile Phone' must be a string and is required",
        },
        address: {
          bsonType: "string",
          description: "'Address' must be a string and is required",
        },
        role: {
          bsonType: "string",
          description: "'Role' must be a string and is required",
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

console.log(`Hello`);
