const { db } = require("../configs/mongodb");

const input = {
  address: "JL Bandung 17a, Malang, Jawa Timur",
  photo:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTftxleDHI-if-j8cesklsJRqCzjpWOnbDZEw&usqp=CAU",
  name: "Andi Alpha",
  joinDate: new Date(),
  email: "andi@mail.com",
  password: "123123",
  mobilePhone: "082111111111",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
};

async function createUser(input) {
  try {
    await db.collection("users").insertOne(input);
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
