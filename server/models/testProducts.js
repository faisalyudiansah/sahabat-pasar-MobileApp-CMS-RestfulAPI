const { db } = require("../configs/mongodb");

const input = {
  name: "Indomie Goreng Rendang",
  image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY6K14kytL1CImvzh2gGyZnoXz4ZPFnuIzQg&usqp=CAU",
  category: "Makanan",
  stock: 999,
  price: 117000,
  discQty: 30,
  discPercent: 1,
  isAvailable: true,
  createdAt: new Date(),
  updatedAt: new Date(),
};

async function createUser(input) {
  try {
    await db.collection("products").insertOne(input);
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
