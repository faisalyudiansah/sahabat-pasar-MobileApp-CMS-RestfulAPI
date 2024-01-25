const { db } = require("../configs/mongodb");

db.createCollection("products", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      title: "Products Object Validation",
      required: [
        "name",
        "image",
        "category",
        "stock",
        "price",
        "discQty",
        "discPercent",
      ],
      properties: {
        name: {
          bsonType: "string",
          description: "'Name' must be a string and is required",
        },
        image: {
          bsonType: "string",
          description: "'Image' must be a uri and is required",
        },
        category: {
          bsonType: "string",
          description: "Category' must be a string and is required",
        },
        stock: {
          bsonType: "number",
          description: "'Stock' must be a number and is required",
        },
        price: {
          bsonType: "number",
          description: "'password' must be a number and is required",
        },
        discQty: {
          bsonType: "number",
          description: "'Mobile Phone' must be a number and is required",
        },
        discPercent: {
          bsonType: "number",
          description: "'address' must be a number and is required",
        },
        isAvailable: {
          bsonType: "bool",
          description: "'isAvailable' must be a boolean",
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
