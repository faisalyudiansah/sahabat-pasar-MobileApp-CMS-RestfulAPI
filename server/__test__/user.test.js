const request = require("supertest");
const app = require("../app");
const { client } = require("../configs/mongodb");
const { hashPassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { ObjectId } = require("mongodb");
const path = require("path");
const fs = require("fs");

let filePath = path.resolve(__dirname, "./asset/TokoSehat.jpg");
let imageBuffer = fs.readFileSync(filePath);

let idUser1;
let idUser2;
let idUser3; // user to delete testing
let access_token_admin;
let access_token_sales;
let access_token_delete; // user to delete testing

let idStore1;
let idStore2;
let idProduct1;
let idProduct2;
let idOrder1;
let idOrder2;
let idOrder3;
let idOrder4;
beforeAll(async () => {
  await client.connect();
  const testDb = client.db("fp-rmt-43-test");
  let hashPwd = hashPassword("12345");
  let seedingAdmin = await testDb.collection("users").insertOne({
    name: `Admin`,
    photo:
      "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
    joinDate: "2024-01-17T13:27:58.398Z",
    email: `admin@gmail.com`,
    password: hashPwd,
    mobilePhone: `081927380033`,
    address: `Indonesia`,
    role: "admin",
    createdAt: "2024-01-17T13:27:58.398Z",
    updatedAt: "2024-01-17T13:27:58.398Z",
  });
  idUser1 = seedingAdmin.insertedId;
  let findUserAdmin = await testDb
    .collection("users")
    .findOne({ _id: new ObjectId(idUser1) }, { projection: { password: 0 } });
  access_token_admin = signToken(findUserAdmin);

  let seedingSales = await testDb.collection("users").insertOne({
    name: `Sales`,
    photo:
      "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
    joinDate: "2024-01-17T13:27:58.398Z",
    email: `sales@gmail.com`,
    password: hashPwd,
    mobilePhone: `082309330022`,
    address: `Indonesia`,
    role: "sales",
    createdAt: "2024-01-17T13:27:58.398Z",
    updatedAt: "2024-01-17T13:27:58.398Z",
  });
  idUser2 = seedingSales.insertedId;
  let findSales = await testDb
    .collection("users")
    .findOne({ _id: new ObjectId(idUser2) }, { projection: { password: 0 } });
  access_token_sales = signToken(findSales);

  let seedingUserToDelete = await testDb.collection("users").insertOne({
    name: `Account to delete`,
    photo:
      "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
    joinDate: "2024-01-17T13:27:58.398Z",
    email: `delete@gmail.com`,
    password: hashPwd,
    mobilePhone: `082122330022`,
    address: `Indonesia`,
    role: "admin",
    createdAt: "2024-01-17T13:27:58.398Z",
    updatedAt: "2024-01-17T13:27:58.398Z",
  });
  idUser3 = seedingUserToDelete.insertedId;
  let findAccountToDelete = await testDb
    .collection("users")
    .findOne({ _id: new ObjectId(idUser3) }, { projection: { password: 0 } });
  access_token_delete = signToken(findAccountToDelete);

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
    // await client.connect()
    const testDb = client.db("fp-rmt-43-test");
    await testDb.collection("users").deleteMany({});
  } finally {
    await client.close();
  }
});

describe("GET /", () => {
  test("TESTING HOME", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Server is running...");
  });
});

describe("POST /users/register", () => {
  test("SUCCESS : REGISTER", async () => {
    let dataBody = {
      name: "neymar",
      email: "neymar@gmail.com",
      password: "12345",
      mobilePhone: "081937380022",
      address: "Brazil",
    };
    const response = await request(app).post("/users/register").send(dataBody);
    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("address");
    expect(response.body).toHaveProperty("role", "sales");
    expect(response.body).toHaveProperty("message", "Register Successfully");
    expect(response.body).toHaveProperty("mobilePhone");
  });

  test("FAILED : REGISTER - Email already exists", async () => {
    let dataBody = {
      name: "neymar",
      email: "neymar@gmail.com",
      password: "12345",
      mobilePhone: "081937380022",
      address: "Brazil",
    };
    const response = await request(app).post("/users/register").send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "This email has already been registered"
    );
  });

  test("FAILED : REGISTER - empty name", async () => {
    let dataBody = {
      name: "",
      email: "neymar2@gmail.com",
      password: "12345",
      mobilePhone: "081937380022",
      address: "Brazil",
    };
    const response = await request(app).post("/users/register").send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name is required");
  });

  test("FAILED : REGISTER - empty email", async () => {
    let dataBody = {
      name: "neymar",
      email: "",
      password: "12345",
      mobilePhone: "081937380022",
      address: "Brazil",
    };
    const response = await request(app).post("/users/register").send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("FAILED : REGISTER - empty password", async () => {
    let dataBody = {
      name: "neymar",
      email: "neymar2@gmail.com",
      password: "",
      mobilePhone: "081937380022",
      address: "Brazil",
    };
    const response = await request(app).post("/users/register").send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  test("FAILED : REGISTER - empty mobilePhone", async () => {
    let dataBody = {
      name: "neymar",
      email: "neymar2@gmail.com",
      password: "12345",
      mobilePhone: "",
      address: "Brazil",
    };
    const response = await request(app).post("/users/register").send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Mobile Phone is required");
  });

  test("FAILED : REGISTER - empty address", async () => {
    let dataBody = {
      name: "neymar",
      email: "neymar2@gmail.com",
      password: "12345",
      mobilePhone: "081920333334",
      address: "",
    };
    const response = await request(app).post("/users/register").send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Address is required");
  });

  test("FAILED : REGISTER - invalid Email", async () => {
    let dataBody = {
      name: "neymar",
      email: "neymar2gmail.com",
      password: "12345",
      mobilePhone: "082309449090",
      address: "brazil",
    };
    const response = await request(app).post("/users/register").send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is invalid");
  });

  test("FAILED : REGISTER - name less than 3 characters", async () => {
    let dataBody = {
      name: "ner",
      email: "neymar2@gmail.com",
      password: "12345",
      mobilePhone: "082309449090",
      address: "Brazil",
    };
    const response = await request(app).post("/users/register").send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Name must be at least 4 characters"
    );
  });

  test("FAILED : REGISTER - mobile phone invalid", async () => {
    let dataBody = {
      name: "nemaar",
      email: "neymar2@gmail.com",
      password: "12345",
      mobilePhone: "111118134",
      address: "Brazil",
    };
    const response = await request(app).post("/users/register").send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Mobile Phone is invalid");
  });

  test("FAILED : REGISTER - without send name", async () => {
    let dataBody = {
      email: "neymar2@gmail.com",
      password: "12345",
      mobilePhone: "111118134",
      address: "Brazil",
    };
    const response = await request(app).post("/users/register").send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Missing required fields");
  });
});

describe("GET /users/login", () => {
  test("SUCCESS : LOGIN", async () => {
    let dataBody = {
      email: "admin@gmail.com",
      password: "12345",
    };
    const response = await request(app).post("/users/login").send(dataBody);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("access_token", expect.any(String));
  });

  test("FAILED : LOGIN - without email", async () => {
    let dataBody = {
      email: "",
      password: "12345",
    };
    const response = await request(app).post("/users/login").send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("FAILED : LOGIN - without password", async () => {
    let dataBody = {
      email: "neymar@gmail.com",
      password: "",
    };
    const response = await request(app).post("/users/login").send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Password is required");
  });

  test("FAILED : LOGIN - wrong email", async () => {
    let dataBody = {
      email: "neymar111@gmail.com",
      password: "12345",
    };
    const response = await request(app).post("/users/login").send(dataBody);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });

  test("FAILED : LOGIN - wrong password", async () => {
    let dataBody = {
      email: "neymar@gmail.com",
      password: "1234522222",
    };
    const response = await request(app).post("/users/login").send(dataBody);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid email/password");
  });
});

describe("GET /users/finduser-email", () => {
  test("SUCCESS : FIND USER BY EMAIL", async () => {
    let dataBody = {
      email: "neymar@gmail.com",
    };
    const response = await request(app)
      .get("/users/finduser-email")
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(dataBody);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      name: "neymar",
      photo: expect.any(String),
      joinDate: expect.any(String),
      email: "neymar@gmail.com",
      mobilePhone: "081937380022",
      address: "Brazil",
      role: "sales",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("FAILED : FIND USER BY EMAIL - cannot find that email", async () => {
    let dataBody = {
      email: "neymar3@gmail.com",
    };
    const response = await request(app)
      .get("/users/finduser-email")
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(dataBody);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "No user found with this email"
    );
  });

  test("FAILED : FIND USER BY EMAIL - email invalid", async () => {
    let dataBody = {
      email: "neymargmail.com",
    };
    const response = await request(app)
      .get("/users/finduser-email")
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is invalid");
  });

  test("FAILED : FIND USER BY EMAIL - email is empty", async () => {
    let dataBody = {
      email: "",
    };
    const response = await request(app)
      .get("/users/finduser-email")
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(dataBody);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("FAILED : FIND USER BY EMAIL - without send email", async () => {
    const response = await request(app)
      .get("/users/finduser-email")
      .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });
});

describe("GET /users/dashboard", () => {
  test("SUCCESS : FIND USER for web dashboard", async () => {
    const response = await request(app)
      .get("/users/dashboard")
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("countData", expect.any(Number));
    expect(response.body).toHaveProperty("totalBill", expect.any(Number));
    expect(response.body).toHaveProperty("data", expect.any(Array));
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data[0]).toHaveProperty(
      "billPerUser",
      expect.any(Number)
    );
    expect(response.body.data[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body.data[0]).toHaveProperty("name", expect.any(String));
    expect(response.body.data[0]).toHaveProperty("photo", expect.any(String));
    expect(response.body.data[0]).toHaveProperty(
      "joinDate",
      expect.any(String)
    );
    expect(response.body.data[0]).toHaveProperty("role", expect.any(String));
    expect(response.body.data[0]).toHaveProperty("orders", expect.any(Array));
    expect(response.body.data[0].orders).toBeInstanceOf(Array);
    expect(response.body.data[0].orders[0]).toHaveProperty(
      "billPerOrder",
      expect.any(Number)
    );
    expect(response.body.data[0].orders[0]).toHaveProperty(
      "_id",
      expect.any(String)
    );
    expect(response.body.data[0].orders[0]).toHaveProperty(
      "storeId",
      expect.any(String)
    );
    expect(response.body.data[0].orders[0]).toHaveProperty(
      "status",
      expect.any(String)
    );
    expect(response.body.data[0].orders[0]).toHaveProperty(
      "productOrder",
      expect.any(Array)
    );
    expect(response.body.data[0].orders[0].productOrder).toBeInstanceOf(Array);
    expect(response.body.data[0].orders[0].productOrder[0]).toHaveProperty(
      "billPerProduct",
      expect.any(Number)
    );
    expect(response.body.data[0].orders[0].productOrder[0]).toHaveProperty(
      "productId",
      expect.any(String)
    );
    expect(response.body.data[0].orders[0].productOrder[0]).toHaveProperty(
      "qtySold",
      expect.any(Number)
    );
    expect(response.body.data[0].orders[0].productOrder[0]).toHaveProperty(
      "price",
      expect.any(Number)
    );
  });

  test("FAILED : without token", async () => {
    const response = await request(app).get("/users/dashboard");
    // .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
  test("FAILED : without admin token", async () => {
    const response = await request(app)
      .get("/users/dashboard")
      .set("Authorization", `Bearer ${access_token_sales}`);
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Forbidden Access. Admin only"
    );
  });
});

describe("GET /users/select", () => {
  test("SUCCESS : FIND USER sales for web selection", async () => {
    const response = await request(app)
      .get("/users/select?role=sales")
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("role", expect.any(String));
  });
  test("SUCCESS : FIND USER admin for web selection", async () => {
    const response = await request(app)
      .get("/users/select?role=admin")
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("name", expect.any(String));
    expect(response.body[0]).toHaveProperty("role", expect.any(String));
  });

  test("FAILED : without token", async () => {
    const response = await request(app).get("/users/select?role=sales");
    // .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });
  test("FAILED : without admin token", async () => {
    const response = await request(app)
      .get("/users/select?role=sales")
      .set("Authorization", `Bearer ${access_token_sales}`);
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Forbidden Access. Admin only"
    );
  });
  test("FAILED : without admin or sales roles token", async () => {
    const response = await request(app)
      .get("/users/select?role=blabla")
      .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Role is invalid");
  });
});

describe("GET /users/:idUser", () => {
  test("SUCCESS : FIND USER BY ID PARAMS ", async () => {
    const response = await request(app)
      .get(`/users/finduser/${idUser1}`)
      .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      name: "Admin",
      photo:
        "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
      joinDate: expect.any(String),
      email: `admin@gmail.com`,
      mobilePhone: `081927380033`,
      address: `Indonesia`,
      role: "admin",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("FAILED : FIND USER BY ID PARAMS - not found", async () => {
    const response = await request(app)
      .get(`/users/finduser/65a7818f64e52af4a8c7027b`)
      .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "No user found with this ID"
    );
  });

  test("FAILED : FIND USER BY ID PARAMS - invalid token", async () => {
    const response = await request(app)
      .get(`/users/finduser/65a7818f64e52af4a8c7027b`)
      .set("Authorization", ``);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("FAILED : FIND USER BY ID PARAMS - invalid token 2", async () => {
    const response = await request(app)
      .get(`/users/finduser/65a7818f64e52af4a8c7027b`)
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE3ZDVkZWU5MzVjZjc3MzAwODg2OGEiLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNTUwNDE5Molp-IRYmlD6kwJ8BvZEg-8XBs2UXwV2I4-87gzb4Q`
      );
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("FAILED : FIND USER BY ID PARAMS - invalid token 3", async () => {
    const response = await request(app)
      .get(`/users/finduser/65a7818f64e52af4a8c7027b`)
      .set("Authorization", `notBearer ${access_token_admin}`);
    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Invalid Token");
  });

  test("FAILED : FIND USER BY ID PARAMS - forbidden access", async () => {
    const response = await request(app)
      .get(`/users/finduser/65a7818f64e52af4a8c7027b`)
      .set("Authorization", `Bearer ${access_token_sales}`);
    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Forbidden Access. Admin only"
    );
  });
});

describe("GET /users", () => {
  test("SUCCESS : FIND ALL USERS", async () => {
    const response = await request(app)
      .get(`/users`)
      .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("SUCCESS : FIND ALL ADMIN", async () => {
    const response = await request(app)
      .get(`/users?role=admin`)
      .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("SUCCESS : FIND ALL SALES", async () => {
    const response = await request(app)
      .get(`/users?role=sales`)
      .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("SUCCESS : FIND USER WITH QUERY NAME", async () => {
    const response = await request(app)
      .get(`/users?name=neymar`)
      .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  test("FAILED : FIND ALL SALES/ADMIN - wrong query role", async () => {
    const response = await request(app)
      .get(`/users?role=user`)
      .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Role is invalid");
  });
});

describe("GET /userprofile", () => {
  test("SUCCESS : GET PROFILE USERS", async () => {
    const response = await request(app)
      .get(`/users/userprofile`)
      .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toMatchObject({
      _id: expect.any(String),
      name: "Admin",
      photo: expect.any(String),
      joinDate: expect.any(String),
      email: `admin@gmail.com`,
      mobilePhone: `081927380033`,
      address: `Indonesia`,
      role: "admin",
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });
  });

  test("FAILED : GET PROFILE USERS - not found", async () => {
    const response = await request(app)
      .get(`/users/userprofile`)
      .set(
        "Authorization",
        `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE3YTAzODc5NDhjNGJiMzE1M2E4YjAiLCJlbWFpbCI6InJvbmFsZG9AZ21haWwuY29tIiwicm9sZSI6InNhbGVzIiwiaWF0IjoxNzA1NjU5NDc1fQ.MZ-PYbuwvXeeGO-m5XpFz0ykp6V2DdrsgOEuJuJswzk`
      );
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "No user found");
  });
});

describe("PUT /:idUser", () => {
  test("SUCCESS : UPDATE PROFILE USERS", async () => {
    let data = {
      name: `Admin`,
      email: `admin@gmail.com`,
      mobilePhone: `081927380099`,
      address: `Indonesia`,
    };
    const response = await request(app)
      .put(`/users/${idUser1}`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(data);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toMatchObject({
      message: "Update Successfully",
      _id: expect.any(String),
      name: expect.any(String),
      photo: expect.any(String),
      email: expect.any(String),
      mobilePhone: "081927380099", // update
      address: expect.any(String),
    });
  });

  test("SUCCESS : UPDATE PROFILE USERS - update photo", async () => {
    const response = await request(app)
      .put(`/users/${idUser1}`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .field("name", "Admin")
      .field("email", "admin@gmail.com")
      .field("mobilePhone", "081927381111")
      .field("address", "Indonesia")
      .attach("photo", imageBuffer, "TokoSehat.jpg");
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toMatchObject({
      message: "Update Successfully",
      _id: expect.any(String),
      name: expect.any(String),
      photo: expect.any(String), // update
      email: expect.any(String),
      mobilePhone: "081927381111", // update
      address: expect.any(String),
    });
  });

  test("FAILED : UPDATE PROFILE USERS - without name", async () => {
    let data = {
      name: ``,
      email: `admin@gmail.com`,
      mobilePhone: `081927380099`,
      address: `Indonesia`,
    };
    const response = await request(app)
      .put(`/users/${idUser1}`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(data);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Name is required");
  });

  test("FAILED : UPDATE PROFILE USERS - without email", async () => {
    let data = {
      name: `Admin`,
      email: ``,
      mobilePhone: `081927380099`,
      address: `Indonesia`,
    };
    const response = await request(app)
      .put(`/users/${idUser1}`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(data);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is required");
  });

  test("FAILED : UPDATE PROFILE USERS - without mobilePhone", async () => {
    let data = {
      name: `Admin`,
      email: `admin@gmail.com`,
      mobilePhone: ``,
      address: `Indonesia`,
    };
    const response = await request(app)
      .put(`/users/${idUser1}`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(data);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Mobile Phone is required");
  });

  test("FAILED : UPDATE PROFILE USERS - without address", async () => {
    let data = {
      name: `Admin`,
      email: `admin@gmail.com`,
      mobilePhone: `081927380099`,
      address: ``,
    };
    const response = await request(app)
      .put(`/users/${idUser1}`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(data);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Address is required");
  });

  test("FAILED : UPDATE PROFILE USERS - name min 4 characters", async () => {
    let data = {
      name: `Adn`,
      email: `admin@gmail.com`,
      mobilePhone: `081927380099`,
      address: `Indonesia`,
    };
    const response = await request(app)
      .put(`/users/${idUser1}`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(data);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Name must be at least 4 characters"
    );
  });

  test("FAILED : UPDATE PROFILE USERS - Email is invalid", async () => {
    let data = {
      name: `Admin`,
      email: `admigmail.com`,
      mobilePhone: `081927380099`,
      address: `Indonesia`,
    };
    const response = await request(app)
      .put(`/users/${idUser1}`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(data);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Email is invalid");
  });

  test("FAILED : UPDATE PROFILE USERS - Mobile Phone is invalid", async () => {
    let data = {
      name: `Admin`,
      email: `admin@gmail.com`,
      mobilePhone: `0281927380099`,
      address: `Indonesia`,
    };
    const response = await request(app)
      .put(`/users/${idUser1}`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(data);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Mobile Phone is invalid");
  });

  test("FAILED : UPDATE PROFILE USERS - wrong ID BSONError", async () => {
    let data = {
      name: `Admin`,
      email: `admin@gmail.com`,
      mobilePhone: `081927380099`,
      address: `Indonesia`,
    };
    const response = await request(app)
      .put(`/users/0281927380099`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(data);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "input must be a 24 character hex string, 12 byte Uint8Array, or an integer"
    );
  });

  test("FAILED : UPDATE PROFILE USERS - user not found", async () => {
    let data = {
      name: `Admin`,
      email: `admin@gmail.com`,
      mobilePhone: `081927380099`,
      address: `Indonesia`,
    };
    const response = await request(app)
      .put(`/users/65a7b2713901c57dc7d6e148`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(data);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "No user found with this ID"
    );
  });

  test("FAILED : UPDATE PROFILE USERS - Missing required fields", async () => {
    let data = {
      email: `admin@gmail.com`,
      mobilePhone: `081927380099`,
      address: `Indonesia`,
    };
    const response = await request(app)
      .put(`/users/${idUser1}`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(data);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", "Missing required fields");
  });

  test("FAILED : UPDATE PROFILE USERS - Missing required fields", async () => {
    let data = {
      name: `Admin`,
      email: `neymar@gmail.com`,
      mobilePhone: `081927380099`,
      address: `Indonesia`,
    };
    const response = await request(app)
      .put(`/users/${idUser1}`)
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send(data);
    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "This email has already been registered"
    );
  });
});

describe("DELETE /:idUser", () => {
  test("SUCCESS : DELETE USERS", async () => {
    const response = await request(app)
      .delete(`/users/${idUser3}`)
      .set("Authorization", `Bearer ${access_token_delete}`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "Account to delete has been deleted"
    );
  });

  test("FAILED : DELETE USERS - user not found", async () => {
    const response = await request(app)
      .delete(`/users/65a7b2713901c57dc7d6e148`)
      .set("Authorization", `Bearer ${access_token_admin}`);
    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      "No user found with this ID"
    );
  });
});
