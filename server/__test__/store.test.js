const request = require("supertest");
const app = require("../app");
const { client } = require("../configs/mongodb");
const { ObjectId } = require("mongodb");
const { hashPassword } = require("../helpers/bcryptjs");

const path = require("path");
const fs = require("fs");
const { signToken } = require("../helpers/jwt");
const filePath = path.resolve(__dirname, "./asset/TokoSehat.jpg");
const imageBuffer = fs.readFileSync(filePath); // Buffer
const filePath2 = path.resolve(__dirname, "./asset/patchtest.jpg");
const imageBuffer2 = fs.readFileSync(filePath2); // Buffer

let idStore1;
let idStore2;
let idProduct1;
let idProduct2;
let idUser1;
let idUser2;
let idOrder1;
let idOrder2;
let access_token_admin;
let access_token_sales;

beforeAll(async () => {
  await client.connect();
  const testDb = client.db("fp-rmt-43-test");
  //seeding stores
  const inputS1 = {
    name: "Toko Plastik Morodadi Test",
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
  const inputS2 = {
    name: "Toko Sumber Rezeki Test",
    location: {
      type: "Point",
      coordinates: [112.61503381426093, -7.9586223893455506],
    },
    photo:
      "https://lh3.googleusercontent.com/gps-proxy/AMy85WJQ23dHYBN-cubJj9_aNOMPJV9AkKG3Ogosc3zBmVrbXnHwWSGuBbmmwCh75KBxZP4TQLPRDTwZFhWcDsVaRrtrQ5k1iB3ZBnQyNUClOn5bURTvVdHy57hJX3rPX3COzvXKkOcgidqfQjvbEaNimp7cHQgq_tj91Y0mO-cGQcURw0_UsYjk7lu2oZt-_k2cy8yDNUs=w260-h175-n-k-no",
    joinDate: new Date(),
    address:
      "Jl. Bend. Sutami 1 No.442, Sumbersari, Kec. Lowokwaru, Kota Malang, Jawa Timur 65145",
    ownerName: "Rizky",
    mobilePhone: "082222222222",
    status: "confirmed",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let seedStores1 = await testDb.collection("stores").insertOne(inputS1);
  idStore1 = seedStores1.insertedId;
  let seedStores2 = await testDb.collection("stores").insertOne(inputS2);
  idStore2 = seedStores2.insertedId;

  //seeding products
  const inputP1 = {
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
  const inputP2 = {
    name: "Citra",
    image:
      "https://cdn.sanity.io/images/92ui5egz/production/34834f8b9eb575020b518d5c27e3f4164b762263-1080x1080.jpg?w=1400&h=1400&fit=crop&auto=format",
    category: "Beauty & Wellbeing",
    stock: 10000,
    price: 32000,
    discQty: 10,
    discPercent: 5,
    isAvailable: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let seedProducts1 = await testDb.collection("products").insertOne(inputP1);
  idProduct1 = seedProducts1.insertedId;
  let seedProducts2 = await testDb.collection("products").insertOne(inputP2);
  idProduct2 = seedProducts2.insertedId;

  //seeding users
  const inputU1 = {
    name: `Andi`,
    photo:
      "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
    joinDate: new Date(),
    email: `andi@gmail.com`,
    password: hashPassword(`12345`),
    mobilePhone: `081111111111`,
    address: `Indonesia`,
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const inputU2 = {
    name: `Budi`,
    photo:
      "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
    joinDate: new Date(),
    email: `budi@gmail.com`,
    password: hashPassword(`12345`),
    mobilePhone: `082222222222`,
    address: `Indonesia`,
    role: "sales",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let seedUsers1 = await testDb.collection("users").insertOne(inputU1);
  idUser1 = seedUsers1.insertedId;
  let seedUsers2 = await testDb.collection("users").insertOne(inputU2);
  idUser2 = seedUsers2.insertedId;

  let findUserAdmin = await testDb
    .collection("users")
    .findOne({ _id: new ObjectId(idUser1) }, { projection: { password: 0 } });
  access_token_admin = signToken(findUserAdmin);

  let findUserSales = await testDb
    .collection("users")
    .findOne({ _id: new ObjectId(idUser2) }, { projection: { password: 0 } });
  access_token_sales = signToken(findUserSales);

  //seeding orders
  const inputO1 = {
    storeId: new ObjectId(idStore1),
    userId: new ObjectId(idUser2),
    productOrder: [
      {
        productId: new ObjectId(idProduct1),
        qtySold: 20,
        price: 117000,
      },
      {
        productId: new ObjectId(idProduct2),
        qtySold: 4,
        price: 32000,
      },
    ],
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const inputO2 = {
    storeId: new ObjectId(idStore1),
    userId: new ObjectId(idUser2),
    productOrder: [
      {
        productId: new ObjectId(idProduct1),
        qtySold: 20,
        price: 117000,
      },
    ],
    status: "confirmed",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let seedOrders1 = await testDb.collection("orders").insertOne(inputO1);
  idOrder1 = seedOrders1.insertedId;
  let seedOrders2 = await testDb.collection("orders").insertOne(inputO2);
  idOrder2 = seedOrders2.insertedId;
});

afterAll(async () => {
  try {
    // await client.connect();
    const testDb = client.db("fp-rmt-43-test");
    await testDb.collection("stores").deleteMany({});
    await testDb.collection("products").deleteMany({});
    await testDb.collection("users").deleteMany({});
    await testDb.collection("orders").deleteMany({});
  } finally {
    await client.close();
  }
});

describe("GET /stores", () => {
  test("Success should return list of stores include orders", async () => {
    const response = await request(app).get("/stores");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("photo", expect.any(String));
    expect(response.body[0]).toHaveProperty("joinDate", expect.any(String));
    expect(response.body[0]).toHaveProperty(
      "confirmedOrderValue",
      expect.any(Number)
    );
  });
});

describe("GET /stores/simple", () => {
  test("Success should return simple data list of stores", async () => {
    const response = await request(app).get("/stores/simple");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("location", expect.any(Object));
    expect(response.body[0]).toHaveProperty("address", expect.any(String));
    expect(response.body[0].location).toBeInstanceOf(Object);
    expect(response.body[0].location).toHaveProperty(
      "type",
      expect.any(String)
    );
    expect(response.body[0].location).toHaveProperty(
      "coordinates",
      expect.any(Array)
    );
    expect(response.body[0].location.coordinates).toBeInstanceOf(Array);
    expect(response.body[0].location.coordinates[0]).toStrictEqual(
      expect.any(Number)
    );
    expect(response.body[0].location.coordinates[1]).toStrictEqual(
      expect.any(Number)
    );
  });
});

describe("GET /stores/mobile", () => {
  test("Success should return simple data list of stores without search params", async () => {
    const response = await request(app).get("/stores/mobile");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("photo", expect.any(String));
    expect(response.body[0]).toHaveProperty("address", expect.any(String));
    expect(response.body[0]).toHaveProperty("ownerName", expect.any(String));
    expect(response.body[0]).toHaveProperty("mobilePhone", expect.any(String));
    expect(response.body[0]).toHaveProperty("status", expect.any(String));
  });
  test("Success should return simple data list of stores with search params", async () => {
    const response = await request(app).get("/stores/mobile?search=to");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("photo", expect.any(String));
    expect(response.body[0]).toHaveProperty("address", expect.any(String));
    expect(response.body[0]).toHaveProperty("ownerName", expect.any(String));
    expect(response.body[0]).toHaveProperty("mobilePhone", expect.any(String));
    expect(response.body[0]).toHaveProperty("status", expect.any(String));
  });
  test("Success should return empty array if search doesn't match any store in DB", async () => {
    const response = await request(app).get("/stores/mobile?search=0");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body).toHaveLength(0);
  });
});

describe("GET /stores/count", () => {
  test("Success should return total stores in DB", async () => {
    const response = await request(app).get("/stores/count");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("count", expect.any(Number));
  });
});

describe("GET /stores/:id", () => {
  test("Success should return details of a stores", async () => {
    const response = await request(app).get(`/stores/${idStore1}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id", expect.any(String));
    expect(response.body).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("location", expect.any(Object));
    expect(response.body.location).toBeInstanceOf(Object);
    expect(response.body.location).toHaveProperty("type", expect.any(String));
    expect(response.body.location).toHaveProperty(
      "coordinates",
      expect.any(Array)
    );
    expect(response.body).toHaveProperty("photo", expect.any(String));
    expect(response.body).toHaveProperty("joinDate", expect.any(String));
    expect(response.body).toHaveProperty("address", expect.any(String));
    expect(response.body).toHaveProperty("ownerName", expect.any(String));
    expect(response.body).toHaveProperty("mobilePhone", expect.any(String));
    expect(response.body).toHaveProperty("status", expect.any(String));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
  });
  test("Failed with wrong ID should return message", async () => {
    const falseId = `65a6661db4fe8ae80cec2a19`;
    const response = await request(app).get(`/stores/${falseId}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed with wrong ID format should return message", async () => {
    const falseId = `65a6661db4fe8ae80cec2a1`;
    const response = await request(app).get(`/stores/${falseId}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("POST /stores", () => {
  test("Success create store should return message with id", async () => {
    const newStore = {
      name: "Toko Sehat Test",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
      joinDate: "2024-01-16T11:18:53.205+00:00",
      ownerName: "Sehat",
      mobilePhone: "083333333333",
      status: "verified",
    };
    const response = await request(app)
      .post("/stores")
      .field("name", newStore.name)
      .field("longitude", newStore.longitude)
      .field("latitude", newStore.latitude)
      .field("address", newStore.address)
      .field("joinDate", newStore.joinDate)
      .field("ownerName", newStore.ownerName)
      .field("mobilePhone", newStore.mobilePhone)
      .field("status", newStore.status)
      .attach("photo", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Success create store without status", async () => {
    const newStore = {
      name: "Toko Sehat Test 2",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
      joinDate: "2024-01-16T11:18:53.205+00:00",
      ownerName: "Sehat",
      mobilePhone: "083333333333",
      status: "verified",
    };
    const response = await request(app)
      .post("/stores")
      .field("name", newStore.name)
      .field("longitude", newStore.longitude)
      .field("latitude", newStore.latitude)
      .field("address", newStore.address)
      .field("joinDate", newStore.joinDate)
      .field("ownerName", newStore.ownerName)
      .field("mobilePhone", newStore.mobilePhone)
      .attach("photo", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Success create store without joinDate", async () => {
    const newStore = {
      name: "Toko Sehat Test 3",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
      joinDate: "2024-01-16T11:18:53.205+00:00",
      ownerName: "Sehat",
      mobilePhone: "083333333333",
      status: "verified",
    };
    const response = await request(app)
      .post("/stores")
      .field("name", newStore.name)
      .field("longitude", newStore.longitude)
      .field("latitude", newStore.latitude)
      .field("address", newStore.address)
      .field("ownerName", newStore.ownerName)
      .field("mobilePhone", newStore.mobilePhone)
      .field("status", newStore.status)
      .attach("photo", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed create store without name", async () => {
    const newStore = {
      name: "Toko Sehat Test",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
      joinDate: "2024-01-16T11:18:53.205+00:00",
      ownerName: "Sehat",
      mobilePhone: "083333333333",
      status: "verified",
    };
    const response = await request(app)
      .post("/stores")
      .field("longitude", newStore.longitude)
      .field("latitude", newStore.latitude)
      .field("address", newStore.address)
      .field("joinDate", newStore.joinDate)
      .field("ownerName", newStore.ownerName)
      .field("mobilePhone", newStore.mobilePhone)
      .field("status", newStore.status)
      .attach("photo", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed create store without unique name", async () => {
    const newStore = {
      name: "Toko Plastik Morodadi Test",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
      joinDate: "2024-01-16T11:18:53.205+00:00",
      ownerName: "Sehat",
      mobilePhone: "083333333333",
      status: "verified",
    };
    const response = await request(app)
      .post("/stores")
      .field("longitude", newStore.longitude)
      .field("latitude", newStore.latitude)
      .field("address", newStore.address)
      .field("joinDate", newStore.joinDate)
      .field("ownerName", newStore.ownerName)
      .field("mobilePhone", newStore.mobilePhone)
      .field("status", newStore.status)
      .attach("photo", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed create store without address", async () => {
    const newStore = {
      name: "Toko Plastik Test Failed",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
      joinDate: "2024-01-16T11:18:53.205+00:00",
      ownerName: "Sehat",
      mobilePhone: "083333333333",
      status: "verified",
    };
    const response = await request(app)
      .post("/stores")
      .field("name", newStore.name)
      .field("longitude", newStore.longitude)
      .field("latitude", newStore.latitude)
      .field("joinDate", newStore.joinDate)
      .field("ownerName", newStore.ownerName)
      .field("mobilePhone", newStore.mobilePhone)
      .field("status", newStore.status)
      .attach("photo", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed create store without longitude", async () => {
    const newStore = {
      name: "Toko Plastik Test Failed",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
      joinDate: "2024-01-16T11:18:53.205+00:00",
      ownerName: "Sehat",
      mobilePhone: "083333333333",
      status: "verified",
    };
    const response = await request(app)
      .post("/stores")
      .field("name", newStore.name)
      .field("latitude", newStore.latitude)
      .field("joinDate", newStore.joinDate)
      .field("address", newStore.address)
      .field("ownerName", newStore.ownerName)
      .field("mobilePhone", newStore.mobilePhone)
      .field("status", newStore.status)
      .attach("photo", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed create store without latitude", async () => {
    const newStore = {
      name: "Toko Plastik Test Failed",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
      joinDate: "2024-01-16T11:18:53.205+00:00",
      ownerName: "Sehat",
      mobilePhone: "083333333333",
      status: "verified",
    };
    const response = await request(app)
      .post("/stores")
      .field("name", newStore.name)
      .field("longitude", newStore.longitude)
      .field("joinDate", newStore.joinDate)
      .field("address", newStore.address)
      .field("ownerName", newStore.ownerName)
      .field("mobilePhone", newStore.mobilePhone)
      .field("status", newStore.status)
      .attach("photo", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed create store without ownerName", async () => {
    const newStore = {
      name: "Toko Plastik Test Failed",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
      joinDate: "2024-01-16T11:18:53.205+00:00",
      ownerName: "Sehat",
      mobilePhone: "083333333333",
      status: "verified",
    };
    const response = await request(app)
      .post("/stores")
      .field("name", newStore.name)
      .field("longitude", newStore.longitude)
      .field("latitude", newStore.latitude)
      .field("joinDate", newStore.joinDate)
      .field("address", newStore.address)
      .field("mobilePhone", newStore.mobilePhone)
      .field("status", newStore.status)
      .attach("photo", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed create store without mobilePhone", async () => {
    const newStore = {
      name: "Toko Plastik Test Failed",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
      joinDate: "2024-01-16T11:18:53.205+00:00",
      ownerName: "Sehat",
      mobilePhone: "083333333333",
      status: "verified",
    };
    const response = await request(app)
      .post("/stores")
      .field("name", newStore.name)
      .field("longitude", newStore.longitude)
      .field("latitude", newStore.latitude)
      .field("joinDate", newStore.joinDate)
      .field("address", newStore.address)
      .field("ownerName", newStore.ownerName)
      .field("status", newStore.status)
      .attach("photo", imageBuffer, "nama_baru.png");

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed create store without photo", async () => {
    const newStore = {
      name: "Toko Plastik Test Failed",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Pasar Besar No.153, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65118",
      joinDate: "2024-01-16T11:18:53.205+00:00",
      ownerName: "Sehat",
      mobilePhone: "083333333333",
      status: "verified",
    };
    const response = await request(app)
      .post("/stores")
      .field("name", newStore.name)
      .field("longitude", newStore.longitude)
      .field("latitude", newStore.latitude)
      .field("joinDate", newStore.joinDate)
      .field("address", newStore.address)
      .field("ownerName", newStore.ownerName)
      .field("mobilePhone", newStore.mobilePhone)
      .field("status", newStore.status);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("PUT /stores/:id", () => {
  test("Success edit store should return message with id", async () => {
    const newData = {
      name: "Toko Plastik Morodadi Test",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
      ownerName: "Bambang",
      mobilePhone: "082222222222",
      status: "verified",
    };
    const response = await request(app)
      .put(`/stores/${idStore1}`)
      .send(newData)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without header token should return message", async () => {
    const newData = {
      name: "Toko Plastik Morodadi Test",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
      ownerName: "Bambang",
      mobilePhone: "082222222222",
      status: "verified",
    };
    const response = await request(app)
      .put(`/stores/${idStore1}`)
      .send(newData);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without admin token should return message", async () => {
    const newData = {
      name: "Toko Plastik Morodadi Test",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
      ownerName: "Bambang",
      mobilePhone: "082222222222",
      status: "verified",
    };
    const response = await request(app)
      .put(`/stores/${idStore1}`)
      .send(newData)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed edit store without name", async () => {
    const newData = {
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
      ownerName: "Bambang",
      mobilePhone: "082222222222",
      status: "verified",
    };
    const response = await request(app)
      .put(`/stores/${idStore1}`)
      .send(newData)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed edit store without unique name", async () => {
    const newData = {
      name: "Toko Sumber Rezeki Test",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
      ownerName: "Bambang",
      mobilePhone: "082222222222",
      status: "verified",
    };
    const response = await request(app)
      .put(`/stores/${idStore1}`)
      .send(newData)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed edit store without address", async () => {
    const newData = {
      name: "Toko Plastik Morodadi Test",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      ownerName: "Bambang",
      mobilePhone: "082222222222",
      status: "verified",
    };
    const response = await request(app)
      .put(`/stores/${idStore1}`)
      .send(newData)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed edit store without longitude", async () => {
    const newData = {
      name: "Toko Plastik Morodadi Test",
      latitude: -7.986860420618447,
      address:
        "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
      ownerName: "Bambang",
      mobilePhone: "082222222222",
      status: "verified",
    };
    const response = await request(app)
      .put(`/stores/${idStore1}`)
      .send(newData)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed edit store without latitude", async () => {
    const newData = {
      name: "Toko Plastik Morodadi Test",
      longitude: 112.63070356923028,
      address:
        "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
      ownerName: "Bambang",
      mobilePhone: "082222222222",
      status: "verified",
    };
    const response = await request(app)
      .put(`/stores/${idStore1}`)
      .send(newData)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed edit store without ownerName", async () => {
    const newData = {
      name: "Toko Plastik Morodadi Test",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
      mobilePhone: "082222222222",
      status: "verified",
    };
    const response = await request(app)
      .put(`/stores/${idStore1}`)
      .send(newData)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed edit store without mobilePhone", async () => {
    const newData = {
      name: "Toko Plastik Morodadi Test",
      longitude: 112.63070356923028,
      latitude: -7.986860420618447,
      address:
        "Jl. Sutan Syahrir No.43, Sukoharjo, Kec. Klojen, Kota Malang, Jawa Timur 65117",
      ownerName: "Bambang",
      status: "verified",
    };
    const response = await request(app)
      .put(`/stores/${idStore1}`)
      .send(newData)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("PATCH /stores/:id", () => {
  test("Success edit store photo should return message with id", async () => {
    const response = await request(app)
      .patch(`/stores/${idStore1}`)
      .attach("photo", imageBuffer2, "nama_baru2.png")
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed with wrong store ID should return message", async () => {
    const wrongId = `65aba1c8d9ef109cc4e04015`;
    const response = await request(app)
      .patch(`/stores/${wrongId}`)
      .attach("photo", imageBuffer2, "nama_baru2.png")
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without header token should return message", async () => {
    const response = await request(app)
      .patch(`/stores/${idStore1}`)
      .attach("photo", imageBuffer2, "nama_baru2.png");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without admin token should return message", async () => {
    const response = await request(app)
      .patch(`/stores/${idStore1}`)
      .attach("photo", imageBuffer2, "nama_baru2.png")
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed edit store photo without photo upload", async () => {
    const response = await request(app)
      .patch(`/stores/${idStore1}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("DELETE /stores/:id", () => {
  test("Success should return message", async () => {
    const response = await request(app)
      .delete(`/stores/${idStore1}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("Failed without authorization should return message", async () => {
    const response = await request(app).delete(`/stores/${idStore1}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without admin authorization should return message", async () => {
    const response = await request(app)
      .delete(`/stores/${idStore1}`)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed if using wrong Store Id should return message", async () => {
    const wrongId = `65aba1c8d9ef109cc4e04015`;
    const response = await request(app)
      .delete(`/stores/${wrongId}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});
