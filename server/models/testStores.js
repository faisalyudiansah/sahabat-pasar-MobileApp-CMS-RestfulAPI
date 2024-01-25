const { db } = require("../configs/mongodb");

const input = {
  name: "Toko Plastik Morodadi",
  location: {
    type: "Point",
    coordinates: [112.63070356923028, -7.986860420618447],
  },
  photo:
    "https://lh3.googleusercontent.com/p/AF1QipOE83L2OliXcZV7nczQvFhooFJc7qxtLGb7kYCT=s1360-w1360-h1020",
  joinDate: new Date(),
  address:
    "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
  ownerName: "Bambang",
  mobilePhone: "082222222222",
  status: "confirmed",
  createdAt: new Date(),
  updatedAt: new Date(),
};

async function createUser(input) {
  try {
    await db.collection("stores").insertOne(input);
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
