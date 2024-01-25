const { ObjectId } = require("mongodb");
const { db } = require("../configs/mongodb");

const input = {
  storeId: new ObjectId(`65a6661db4fe8ae80cec2a19`),
  userId: new ObjectId(`65a665d80d9bf3239adde346`),
  location: {
    type: "Point",
    coordinates: [112.63070356923028, -7.986860420618447],
  },
  time: new Date(),
  isCompleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

async function createUser(input) {
  try {
    await db.collection("schedules").insertOne(input);
    return `Hello`;
  } catch (error) {
    console.log(`Hello`);
    console.log(
      error.errInfo.details.schemaRulesNotSatisfied[0].propertiesNotSatisfied[0]
        .description
    );
  }
}

createUser(input);
console.log(`Hello`);
