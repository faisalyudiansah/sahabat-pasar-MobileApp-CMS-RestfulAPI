const { db } = require("../configs/mongodb");

// db.collection("peta").createIndex({ peta: "2d" });
async function indexing() {
  await db.collection("petas").createIndex({ location: "2dsphere" });
  console.log(`udah selese`);
}
// indexing();
// console.log(indexing());

async function insert() {
  await db.collection("petas").insertMany([
    {
      name: "Monas",
      location: { type: "Point", coordinates: [106.8272, -6.1754] },
      category: "Parks",
    },
    {
      name: "Liberty",
      location: { type: "Point", coordinates: [-74.0445, 40.6892] },
      category: "Parks",
    },
    {
      name: "Opera House",
      location: { type: "Point", coordinates: [151.2153, -33.8568] },
      category: "Stadiums",
    },
  ]);
  console.log(`uda`);
}

// insert();
// getCurrentLocationAsync({})
// returnnya dataDariExpo
// panggil EndPOINT yang control testLokasi(dataDariExpo)

const dataDariExpo = {
  coords: {
    latitude: -6.1725246557973525, // Example latitude value
    longitude: 106.82130324880654, // Example longitude value
    altitude: 0,
    accuracy: 42,
    altitudeAccuracy: 5,
    heading: 0,
    speed: 0,
  },
  timestamp: 1642329328822, // Example timestamp value
};
// const validate = this.testLokasi();

// if (!validate | (validate.length === 0)) {
//   throw Error;
// } else {
//   await db.collection("schedules").updateOne({ isCompleted: true });
// }

// const longlat = [dataDariExpo.coords.longitude, dataDariExpo.coords.latitude];

async function testLokasi(longlat) {
  try {
    const data = await db
      .collection("schedules")
      .find({
        // name: "Toko Plastik Morodadi",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [112.63070356923028, -7.986860420618447],
            },
            // $minDistance: 1000, //INI UNTUK MENCARI DILUAR JARAK KOORDINAT
            $maxDistance: 100, //INI UNTUK MENCARI YANG TERDEKAT DARI YANG KITA PUNYA DI DATABASE
          },
        },
      })
      .toArray();

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}
console.log(testLokasi());
