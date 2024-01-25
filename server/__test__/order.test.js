const request = require("supertest");
const app = require("../app");
const { client } = require("../configs/mongodb");
const { ObjectId } = require("mongodb");
const { hashPassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");

let idStore1;
let idStore2;
let idProduct1;
let idProduct2;
let idUser1;
let idUser2;
let idUser3;
let idOrder1;
let idOrder2;
let idOrder3;
let idOrder4;
let access_token_admin;
let access_token_sales;
let access_token_chika;

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
  const inputU3 = {
    name: `Chika`,
    photo:
      "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
    joinDate: new Date(),
    email: `chika@gmail.com`,
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
  let seedUsers3 = await testDb.collection("users").insertOne(inputU3);
  idUser3 = seedUsers3.insertedId;

  let findUserAdmin = await testDb
    .collection("users")
    .findOne({ _id: new ObjectId(idUser1) }, { projection: { password: 0 } });
  access_token_admin = signToken(findUserAdmin);

  let findUserSales = await testDb
    .collection("users")
    .findOne({ _id: new ObjectId(idUser2) }, { projection: { password: 0 } });
  access_token_sales = signToken(findUserSales);

  let findUserChika = await testDb
    .collection("users")
    .findOne({ _id: new ObjectId(idUser3) }, { projection: { password: 0 } });
  access_token_chika = signToken(findUserChika);

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
  const inputO3 = {
    storeId: new ObjectId(idStore1),
    userId: new ObjectId(idUser2),
    productOrder: [
      {
        productId: new ObjectId(idProduct1),
        qtySold: 200,
        price: 117000,
      },
    ],
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const inputO4 = {
    storeId: new ObjectId(idStore1),
    userId: new ObjectId(idUser2),
    productOrder: [
      {
        productId: new ObjectId(idProduct1),
        qtySold: 200,
        price: 117000,
      },
    ],
    status: "pending",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let seedOrders1 = await testDb.collection("orders").insertOne(inputO1);
  idOrder1 = seedOrders1.insertedId;
  let seedOrders2 = await testDb.collection("orders").insertOne(inputO2);
  idOrder2 = seedOrders2.insertedId;
  let seedOrders3 = await testDb.collection("orders").insertOne(inputO3);
  idOrder3 = seedOrders3.insertedId;
  let seedOrders4 = await testDb.collection("orders").insertOne(inputO4);
  idOrder4 = seedOrders4.insertedId;
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

describe("GET /orders", () => {
  test("Success should return list of orders with totalBill", async () => {
    const response = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("status", expect.any(String));
    expect(response.body[0]).toHaveProperty("createdAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body[0]).toHaveProperty("store", expect.any(Object));
    expect(response.body[0].store).toBeInstanceOf(Object);
    expect(response.body[0].store).toHaveProperty("_id", expect.any(String));
    expect(response.body[0].store).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("user", expect.any(Object));
    expect(response.body[0].user).toBeInstanceOf(Object);
    expect(response.body[0].user).toHaveProperty("_id", expect.any(String));
    expect(response.body[0].user).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("productOrder", expect.any(Array));
    expect(response.body[0].productOrder[0]).toBeInstanceOf(Object);
    expect(response.body[0].productOrder[0]).toHaveProperty(
      "productId",
      expect.any(String)
    );
    expect(response.body[0].productOrder[0]).toHaveProperty(
      "qtySold",
      expect.any(Number)
    );
    expect(response.body[0].productOrder[0]).toHaveProperty(
      "price",
      expect.any(Number)
    );
    expect(response.body[0].productOrder[0]).toHaveProperty(
      "name",
      expect.any(String)
    );
    expect(response.body[0].productOrder[0]).toHaveProperty(
      "image",
      expect.any(String)
    );
    expect(response.body[0].productOrder[0]).toHaveProperty(
      "category",
      expect.any(String)
    );
    expect(response.body[0].productOrder[0]).toHaveProperty(
      "billPerItem",
      expect.any(Number)
    );
    expect(response.body[0]).toHaveProperty("totalBill", expect.any(Number));
  });
  test("Failed without  Token", async () => {
    const response = await request(app).get("/orders");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without  Admin Token", async () => {
    const response = await request(app)
      .get("/orders")
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("GET /orders/:id", () => {
  test("Success using admin token should return data orders with totalBill", async () => {
    const response = await request(app)
      .get(`/orders/${idOrder1}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id", expect.any(String));
    expect(response.body).toHaveProperty("status", expect.any(String));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body).toHaveProperty("store", expect.any(Object));
    expect(response.body.store).toBeInstanceOf(Object);
    expect(response.body.store).toHaveProperty("_id", expect.any(String));
    expect(response.body.store).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("user", expect.any(Object));
    expect(response.body.user).toBeInstanceOf(Object);
    expect(response.body.user).toHaveProperty("_id", expect.any(String));
    expect(response.body.user).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("productOrder", expect.any(Array));
    expect(response.body.productOrder[0]).toBeInstanceOf(Object);
    expect(response.body.productOrder[0]).toHaveProperty(
      "productId",
      expect.any(String)
    );
    expect(response.body.productOrder[0]).toHaveProperty(
      "qtySold",
      expect.any(Number)
    );
    expect(response.body.productOrder[0]).toHaveProperty(
      "price",
      expect.any(Number)
    );
    expect(response.body.productOrder[0]).toHaveProperty(
      "name",
      expect.any(String)
    );
    expect(response.body.productOrder[0]).toHaveProperty(
      "image",
      expect.any(String)
    );
    expect(response.body.productOrder[0]).toHaveProperty(
      "category",
      expect.any(String)
    );
    expect(response.body.productOrder[0]).toHaveProperty(
      "billPerItem",
      expect.any(Number)
    );
    expect(response.body).toHaveProperty("totalBill", expect.any(Number));
  });
  test("Success should author token return data orders with totalBill", async () => {
    const response = await request(app)
      .get(`/orders/${idOrder1}`)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id", expect.any(String));
    expect(response.body).toHaveProperty("status", expect.any(String));
    expect(response.body).toHaveProperty("createdAt", expect.any(String));
    expect(response.body).toHaveProperty("updatedAt", expect.any(String));
    expect(response.body).toHaveProperty("store", expect.any(Object));
    expect(response.body.store).toBeInstanceOf(Object);
    expect(response.body.store).toHaveProperty("_id", expect.any(String));
    expect(response.body.store).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("user", expect.any(Object));
    expect(response.body.user).toBeInstanceOf(Object);
    expect(response.body.user).toHaveProperty("_id", expect.any(String));
    expect(response.body.user).toHaveProperty("name", expect.any(String));
    expect(response.body).toHaveProperty("productOrder", expect.any(Array));
    expect(response.body.productOrder[0]).toBeInstanceOf(Object);
    expect(response.body.productOrder[0]).toHaveProperty(
      "productId",
      expect.any(String)
    );
    expect(response.body.productOrder[0]).toHaveProperty(
      "qtySold",
      expect.any(Number)
    );
    expect(response.body.productOrder[0]).toHaveProperty(
      "price",
      expect.any(Number)
    );
    expect(response.body.productOrder[0]).toHaveProperty(
      "name",
      expect.any(String)
    );
    expect(response.body.productOrder[0]).toHaveProperty(
      "image",
      expect.any(String)
    );
    expect(response.body.productOrder[0]).toHaveProperty(
      "category",
      expect.any(String)
    );
    expect(response.body.productOrder[0]).toHaveProperty(
      "billPerItem",
      expect.any(Number)
    );
    expect(response.body).toHaveProperty("totalBill", expect.any(Number));
  });
  test("Failed without  Token", async () => {
    const response = await request(app).get(`/orders/${idOrder1}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without Author / Admin Token", async () => {
    const response = await request(app)
      .get(`/orders/${idOrder1}`)
      .set("Authorization", `Bearer ${access_token_chika}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed with wrong order Id", async () => {
    const wrongId = "65ab5e24d0ccb45b1e2f3f85";
    const response = await request(app)
      .get(`/orders/${wrongId}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("POST /orders", () => {
  test("Success should return message", async () => {
    const newInput = {
      storeId: idStore1,
      productOrder: [
        {
          productId: idProduct1,
          qtySold: 7,
          price: 117000,
        },
        {
          productId: idProduct1,
          qtySold: 5,
          price: 32000,
        },
      ],
    };
    const response = await request(app)
      .post(`/orders`)
      .send(newInput)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without storeId should return message", async () => {
    const newInput = {
      productOrder: [
        {
          productId: idProduct1,
          qtySold: 7,
          price: 117000,
        },
        {
          productId: idProduct1,
          qtySold: 5,
          price: 32000,
        },
      ],
    };
    const response = await request(app)
      .post(`/orders`)
      .send(newInput)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without productOrder should return message", async () => {
    const newInput = {
      storeId: idStore1,
      productOrder: [],
    };
    const response = await request(app)
      .post(`/orders`)
      .send(newInput)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed if productOrder is not Array should return message", async () => {
    const newInput = {
      storeId: idStore1,
      productOrder: {
        productId: idProduct1,
        qtySold: 5,
        price: 32000,
      },
    };
    const response = await request(app)
      .post(`/orders`)
      .send(newInput)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed if store not registered should return message", async () => {
    const newInput = {
      storeId: "65a6661db4fe8ae80cec2a19",
      productOrder: {
        productId: idProduct1,
        qtySold: 5,
        price: 32000,
      },
    };
    const response = await request(app)
      .post(`/orders`)
      .send(newInput)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without Token", async () => {
    const response = await request(app).post(`/orders`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("POST /orders", () => {
  test("Success without update status should return message", async () => {
    const newInput = {
      productOrder: [
        {
          productId: idProduct1,
          qtySold: 70,
          price: 117000,
        },
        {
          productId: idProduct1,
          qtySold: 50,
          price: 32000,
        },
      ],
    };
    const response = await request(app)
      .put(`/orders/${idOrder1}`)
      .send(newInput)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("Failed without productOrder should return message", async () => {
    const newInput = {
      productOrder: [],
    };
    const response = await request(app)
      .put(`/orders/${idOrder1}`)
      .send(newInput)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed if productOrder is not Array should return message", async () => {
    const newInput = {
      productOrder: {
        productId: idProduct1,
        qtySold: 5,
        price: 32000,
      },
    };
    const response = await request(app)
      .put(`/orders/${idOrder1}`)
      .send(newInput)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed if order not registered should return message", async () => {
    const newInput = {
      productOrder: [
        {
          productId: idProduct1,
          qtySold: 70,
          price: 117000,
        },
        {
          productId: idProduct1,
          qtySold: 50,
          price: 32000,
        },
      ],
    };
    const response = await request(app)
      .put(`/orders/65a666b4ef33f639c273f75f`)
      .send(newInput)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without Token", async () => {
    const response = await request(app).post(`/orders/${idOrder1}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without Admin || Related Sales Token", async () => {
    const response = await request(app)
      .put(`/orders/${idOrder1}`)
      .set("Authorization", `Bearer ${access_token_chika}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed if order status has been confirmed", async () => {
    const response = await request(app)
      .put(`/orders/${idOrder2}`)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("Success with update status should return message", async () => {
    const newInput = {
      status: "confirmed",
      productOrder: [
        {
          productId: idProduct1,
          qtySold: 70,
          price: 117000,
        },
        {
          productId: idProduct1,
          qtySold: 50,
          price: 32000,
        },
      ],
    };
    const response = await request(app)
      .put(`/orders/${idOrder1}`)
      .send(newInput)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("DELETE /orders", () => {
  test("Success without update status should return message", async () => {
    const response = await request(app)
      .delete(`/orders/${idOrder3}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });

  test("Failed if order not registered should return message", async () => {
    const response = await request(app)
      .delete(`/orders/65acccf2d069db871ebdfbda`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without Token", async () => {
    const response = await request(app).delete(`/orders/${idOrder4}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without Admin Token", async () => {
    const response = await request(app)
      .delete(`/orders/${idOrder4}`)
      .set("Authorization", `Bearer ${access_token_chika}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed if order status has been confirmed", async () => {
    const response = await request(app)
      .delete(`/orders/${idOrder1}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("GET /orders/user", () => {
  test("Success should return list of orders of a User with count and confirmedValue", async () => {
    const response = await request(app)
      .get("/orders/user")
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("count", expect.any(Number));
    expect(response.body).toHaveProperty("confirmedValue", expect.any(Number));
    expect(response.body).toHaveProperty("data", expect.any(Array));
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body.data[0]).toHaveProperty("status", expect.any(String));
    expect(response.body.data[0]).toHaveProperty(
      "createdAt",
      expect.any(String)
    );
    expect(response.body.data[0]).toHaveProperty(
      "updatedAt",
      expect.any(String)
    );
    expect(response.body.data[0]).toHaveProperty("store", expect.any(Object));
    expect(response.body.data[0].store).toBeInstanceOf(Object);
    expect(response.body.data[0].store).toHaveProperty(
      "_id",
      expect.any(String)
    );
    expect(response.body.data[0].store).toHaveProperty(
      "name",
      expect.any(String)
    );
    expect(response.body.data[0]).toHaveProperty("user", expect.any(Object));
    expect(response.body.data[0].user).toBeInstanceOf(Object);
    expect(response.body.data[0].user).toHaveProperty(
      "_id",
      expect.any(String)
    );
    expect(response.body.data[0].user).toHaveProperty(
      "name",
      expect.any(String)
    );
    expect(response.body.data[0]).toHaveProperty(
      "productOrder",
      expect.any(Array)
    );
    expect(response.body.data[0].productOrder[0]).toBeInstanceOf(Object);
    expect(response.body.data[0].productOrder[0]).toHaveProperty(
      "productId",
      expect.any(String)
    );
    expect(response.body.data[0].productOrder[0]).toHaveProperty(
      "qtySold",
      expect.any(Number)
    );
    expect(response.body.data[0].productOrder[0]).toHaveProperty(
      "price",
      expect.any(Number)
    );
    expect(response.body.data[0].productOrder[0]).toHaveProperty(
      "finalPrice",
      expect.any(Number)
    );
    expect(response.body.data[0].productOrder[0]).toHaveProperty(
      "name",
      expect.any(String)
    );
    expect(response.body.data[0].productOrder[0]).toHaveProperty(
      "image",
      expect.any(String)
    );
    expect(response.body.data[0].productOrder[0]).toHaveProperty(
      "category",
      expect.any(String)
    );
    expect(response.body.data[0].productOrder[0]).toHaveProperty(
      "billPerItem",
      expect.any(Number)
    );
    expect(response.body.data[0].productOrder[0]).toHaveProperty(
      "discPerItem",
      expect.any(Number)
    );
    expect(response.body.data[0]).toHaveProperty(
      "totalBill",
      expect.any(Number)
    );
  });

  test("Failed without  Token", async () => {
    const response = await request(app).get("/orders/user");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("GET /orders/monthly/user", () => {
  test("Success should return list of orders of a User with count and confirmedValue", async () => {
    const response = await request(app)
      .get("/orders/monthly/user")
      .set("Authorization", `Bearer ${access_token_sales}`);

    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("2024", expect.any(Object));
    expect(response.body[2024]).toBeInstanceOf(Object);
    expect(response.body[2024]).toHaveProperty("1", expect.any(Object));
    expect(response.body[2024][1]).toBeInstanceOf(Object);
    expect(response.body[2024][1]).toHaveProperty("count", expect.any(Number));
    expect(response.body[2024][1]).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
    expect(response.body[2024][2]).toBeInstanceOf(Object);
    expect(response.body[2024][2]).toHaveProperty("count", expect.any(Number));
    expect(response.body[2024][2]).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
    expect(response.body[2024][3]).toBeInstanceOf(Object);
    expect(response.body[2024][3]).toHaveProperty("count", expect.any(Number));
    expect(response.body[2024][3]).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
    expect(response.body[2024][4]).toBeInstanceOf(Object);
    expect(response.body[2024][4]).toHaveProperty("count", expect.any(Number));
    expect(response.body[2024][4]).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
    expect(response.body[2024][5]).toBeInstanceOf(Object);
    expect(response.body[2024][5]).toHaveProperty("count", expect.any(Number));
    expect(response.body[2024][5]).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
    expect(response.body[2024][6]).toBeInstanceOf(Object);
    expect(response.body[2024][6]).toHaveProperty("count", expect.any(Number));
    expect(response.body[2024][6]).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
    expect(response.body[2024][7]).toBeInstanceOf(Object);
    expect(response.body[2024][7]).toHaveProperty("count", expect.any(Number));
    expect(response.body[2024][7]).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
    expect(response.body[2024][8]).toBeInstanceOf(Object);
    expect(response.body[2024][8]).toHaveProperty("count", expect.any(Number));
    expect(response.body[2024][8]).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
    expect(response.body[2024][9]).toBeInstanceOf(Object);
    expect(response.body[2024][9]).toHaveProperty("count", expect.any(Number));
    expect(response.body[2024][9]).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
    expect(response.body[2024][10]).toBeInstanceOf(Object);
    expect(response.body[2024][10]).toHaveProperty("count", expect.any(Number));
    expect(response.body[2024][10]).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
    expect(response.body[2024][11]).toBeInstanceOf(Object);
    expect(response.body[2024][11]).toHaveProperty("count", expect.any(Number));
    expect(response.body[2024][11]).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
    expect(response.body[2024][12]).toBeInstanceOf(Object);
    expect(response.body[2024][12]).toHaveProperty("count", expect.any(Number));
    expect(response.body[2024][12]).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
  });

  test("Failed without  Token", async () => {
    const response = await request(app).get("/orders/user");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});

describe("GET /orders/dashboard", () => {
  test("Success should return this month count and confirmedValue", async () => {
    const response = await request(app)
      .get("/orders/dashboard")
      .set("Authorization", `Bearer ${access_token_sales}`);

    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id", expect.any(Object));
    expect(response.body._id).toBeInstanceOf(Object);
    expect(response.body._id).toHaveProperty("year", expect.any(Number));
    expect(response.body._id).toHaveProperty("month", expect.any(Number));
    expect(response.body).toHaveProperty("count", expect.any(Number));
    expect(response.body).toHaveProperty(
      "totalConfirmedValue",
      expect.any(Number)
    );
  });

  test("Failed without  Token", async () => {
    const response = await request(app).get("/orders/user");

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
});
