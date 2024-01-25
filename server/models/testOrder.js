const { ObjectId } = require("mongodb");
const { db } = require("../configs/mongodb");

const input = {
  storeId: new ObjectId(`65a6661db4fe8ae80cec2a19`),
  userId: new ObjectId(`65a665d80d9bf3239adde346`),
  productOrder: [
    {
      productId: new ObjectId(`65a665f572a4ab2c12b8d151`),
      qtySold: 20,
      price: 117000,
    },
  ],
  status: "pending",
  createdAt: new Date(),
  updatedAt: new Date(),
};

async function createUser(input) {
  try {
    await db.collection("orders").insertOne(input);
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
