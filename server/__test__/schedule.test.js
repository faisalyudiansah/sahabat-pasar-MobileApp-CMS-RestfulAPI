const request = require("supertest");
const app = require("../app");
const { client } = require("../configs/mongodb");
const { hashPassword } = require("../helpers/bcryptjs");
const { signToken } = require("../helpers/jwt");
const { ObjectId } = require("mongodb");
const path = require("path");
const fs = require("fs");
const { time, timeStamp } = require("console");

let idUser1;
let idUser2;
let idSchedule1;
let idSchedule2;
let idSchedule3;
let access_token_admin;
let access_token_sales;

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
    mobilePhone: `081927380033`,
    address: `Indonesia`,
    role: "admin",
    createdAt: "2024-01-17T13:27:58.398Z",
    updatedAt: "2024-01-17T13:27:58.398Z",
  });
  let seedingSales = await testDb.collection("users").insertOne({
    name: `Sales`,
    photo:
      "https://static.vecteezy.com/system/resources/previews/026/434/409/non_2x/default-avatar-profile-icon-social-media-user-photo-vector.jpg",
    joinDate: "2024-01-17T13:27:58.398Z",
    email: `sales@gmail.com`,
    mobilePhone: `081927380033`,
    address: `Indonesia`,
    role: "sales",
    createdAt: "2024-01-17T13:27:58.398Z",
    updatedAt: "2024-01-17T13:27:58.398Z",
  });
  idUser1 = seedingAdmin.insertedId;
  let findUser = await testDb.collection("users").findOne({
    _id: new ObjectId(idUser1),
  });
  access_token_admin = signToken(findUser);
  idUser2 = seedingSales.insertedId;
  let findUser2 = await testDb.collection("users").findOne({
    _id: new ObjectId(idUser2),
  });
  access_token_sales = signToken(findUser2);

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
      coordinates: [106.82608477252883, -6.188789464341358],
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
  const inputS3 = {
    name: "Toko Sumber Rezekdd",
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
    mobilePhone: "0822333322",
    status: "unverified",
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let seedStores1 = await testDb.collection("stores").insertOne(inputS1);
  idStore1 = seedStores1.insertedId;
  let seedStores2 = await testDb.collection("stores").insertOne(inputS2);
  idStore2 = seedStores2.insertedId;
  let seedStores3 = await testDb.collection("stores").insertOne(inputS3);
  idStore3 = seedStores3.insertedId;

  const inputSC1 = {
    storeId: new ObjectId(idStore1),
    userId: new ObjectId(idUser1),
    time: new Date(),
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const inputSC2 = {
    storeId: new ObjectId(idStore2),
    userId: new ObjectId(idUser2),
    time: new Date(),
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const inputSC3 = {
    storeId: new ObjectId(idStore2),
    userId: new ObjectId(idUser2),
    time: new Date(),
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  let seedSchedule1 = await testDb.collection("schedules").insertOne(inputSC1);
  idSchedule1 = seedSchedule1.insertedId;
  let seedSchedule2 = await testDb.collection("schedules").insertOne(inputSC2);
  idSchedule2 = seedSchedule2.insertedId;
  let seedSchedule3 = await testDb.collection("schedules").insertOne(inputSC3);
  idSchedule3 = seedSchedule3.insertedId;
  schedule1 = await testDb.collection("schedules").findOne({
    storeId: new ObjectId(idStore1),
    userId: new ObjectId(idUser1),
  });
});

afterAll(async () => {
  try {
    // await client.connect();
    const testDb = client.db("fp-rmt-43-test");
    await testDb.collection("schedules").deleteMany({});
    await testDb.collection("stores").deleteMany({});
    await testDb.collection("users").deleteMany({});
  } finally {
    await client.close();
  }
});

describe("GET /schedules", () => {
  test("Success return list schedules", async () => {
    const response = await request(app)
      .get(`/schedules`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("time", expect.any(String));
    expect(response.body[0]).toHaveProperty("isCompleted", expect.any(Boolean));
    expect(response.body[0].storeInformations).toBeInstanceOf(Object);
    expect(response.body[0].storeInformations).toHaveProperty(
      "_id",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "name",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "photo",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "address",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "joinDate",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "ownerName",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "mobilePhone",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "status",
      expect.any(String)
    );
    expect(response.body[0].storeInformations.location).toBeInstanceOf(Object);
    expect(response.body[0].storeInformations.location).toHaveProperty(
      "type",
      expect.any(String)
    );
    expect(
      response.body[0].storeInformations.location.coordinates
    ).toBeInstanceOf(Array);
    expect(
      response.body[0].storeInformations.location.coordinates[0]
    ).toStrictEqual(expect.any(Number));
    expect(
      response.body[0].storeInformations.location.coordinates[1]
    ).toStrictEqual(expect.any(Number));
    expect(response.body[0].userInformations).toBeInstanceOf(Object);
    expect(response.body[0].userInformations).toHaveProperty(
      "_id",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "name",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "photo",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "joinDate",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "email",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "mobilePhone",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "address",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "role",
      expect.any(String)
    );
  });
});

describe("GET /schedules/:scheduleId", () => {
  test("Success return detail schedule", async () => {
    const response = await request(app)
      .get(`/schedules/${idSchedule1}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id", expect.any(String));
    expect(response.body).toHaveProperty("time", expect.any(String));
    expect(response.body).toHaveProperty("isCompleted", expect.any(Boolean));
    expect(response.body.storeInformations).toBeInstanceOf(Object);
    expect(response.body.storeInformations).toHaveProperty(
      "_id",
      expect.any(String)
    );
    expect(response.body.storeInformations).toHaveProperty(
      "name",
      expect.any(String)
    );
    expect(response.body.storeInformations).toHaveProperty(
      "photo",
      expect.any(String)
    );
    expect(response.body.storeInformations).toHaveProperty(
      "address",
      expect.any(String)
    );
    expect(response.body.storeInformations).toHaveProperty(
      "joinDate",
      expect.any(String)
    );
    expect(response.body.storeInformations).toHaveProperty(
      "ownerName",
      expect.any(String)
    );
    expect(response.body.storeInformations).toHaveProperty(
      "mobilePhone",
      expect.any(String)
    );
    expect(response.body.storeInformations).toHaveProperty(
      "status",
      expect.any(String)
    );
    expect(response.body.storeInformations.location).toBeInstanceOf(Object);
    expect(response.body.storeInformations.location).toHaveProperty(
      "type",
      expect.any(String)
    );
    expect(response.body.storeInformations.location.coordinates).toBeInstanceOf(
      Array
    );
    expect(
      response.body.storeInformations.location.coordinates[0]
    ).toStrictEqual(expect.any(Number));
    expect(
      response.body.storeInformations.location.coordinates[1]
    ).toStrictEqual(expect.any(Number));
    expect(response.body.userInformations).toBeInstanceOf(Object);
    expect(response.body.userInformations).toHaveProperty(
      "_id",
      expect.any(String)
    );
    expect(response.body.userInformations).toHaveProperty(
      "name",
      expect.any(String)
    );
    expect(response.body.userInformations).toHaveProperty(
      "photo",
      expect.any(String)
    );
    expect(response.body.userInformations).toHaveProperty(
      "joinDate",
      expect.any(String)
    );
    expect(response.body.userInformations).toHaveProperty(
      "email",
      expect.any(String)
    );
    expect(response.body.userInformations).toHaveProperty(
      "mobilePhone",
      expect.any(String)
    );
    expect(response.body.userInformations).toHaveProperty(
      "address",
      expect.any(String)
    );
    expect(response.body.userInformations).toHaveProperty(
      "role",
      expect.any(String)
    );
  });
  test("Schedule not found", async () => {
    const falseSchedulesId = `65acd0d5bb7229c13cb8bced`;
    const response = await request(app)
      .get(`/schedules/${falseSchedulesId}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `No schedule found with this ID`
    );
  });
});

describe("GET /schedules/myschedule", () => {
  test("Success return list schedules user login", async () => {
    const response = await request(app)
      .get(`/schedules/myschedule`)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body[0]).toBeInstanceOf(Object);
    expect(response.body[0]).toHaveProperty("_id", expect.any(String));
    expect(response.body[0]).toHaveProperty("time", expect.any(String));
    expect(response.body[0]).toHaveProperty("isCompleted", expect.any(Boolean));
    expect(response.body[0].storeInformations).toBeInstanceOf(Object);
    expect(response.body[0].storeInformations).toHaveProperty(
      "_id",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "name",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "photo",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "address",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "joinDate",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "ownerName",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "mobilePhone",
      expect.any(String)
    );
    expect(response.body[0].storeInformations).toHaveProperty(
      "status",
      expect.any(String)
    );
    expect(response.body[0].storeInformations.location).toBeInstanceOf(Object);
    expect(response.body[0].storeInformations.location).toHaveProperty(
      "type",
      expect.any(String)
    );
    expect(
      response.body[0].storeInformations.location.coordinates
    ).toBeInstanceOf(Array);
    expect(
      response.body[0].storeInformations.location.coordinates[0]
    ).toStrictEqual(expect.any(Number));
    expect(
      response.body[0].storeInformations.location.coordinates[1]
    ).toStrictEqual(expect.any(Number));
    expect(response.body[0].userInformations).toBeInstanceOf(Object);
    expect(response.body[0].userInformations).toHaveProperty(
      "_id",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "name",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "photo",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "joinDate",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "email",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "mobilePhone",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "address",
      expect.any(String)
    );
    expect(response.body[0].userInformations).toHaveProperty(
      "role",
      expect.any(String)
    );
  });
});

describe("POST /schedules", () => {
  test("Success create schedule should return new schedule", async () => {
    const newSchedule = {
      storeId: new ObjectId(idStore1),
      userId: new ObjectId(idUser2),
      time: new Date(),
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await request(app)
      .post("/schedules")
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("_id", expect.any(String));
    expect(response.body).toHaveProperty("time", expect.any(String));
    expect(response.body).toHaveProperty("isCompleted", expect.any(Boolean));
    expect(response.body).toHaveProperty("storeId", expect.any(String));
    expect(response.body).toHaveProperty("userId", expect.any(String));
  });
  test("storeId required", async () => {
    const newSchedule = {
      userId: new ObjectId(idUser2),
      time: new Date(),
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await request(app)
      .post("/schedules")
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Store ID is required`);
  });
  test("salesUser required", async () => {
    const newSchedule = {
      storeId: new ObjectId(idStore1),
      time: new Date(),
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await request(app)
      .post("/schedules")
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `User/Sales ID is required`
    );
  });
  test("Schedule time required", async () => {
    const newSchedule = {
      storeId: new ObjectId(idStore1),
      userId: new ObjectId(idUser2),
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await request(app)
      .post("/schedules")
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `Schedule time is required`
    );
  });
  test("Store Not Found", async () => {
    const fakeStoreId = `65aba1c8d9ef109cc4e04099`;
    const newSchedule = {
      storeId: new ObjectId(fakeStoreId),
      userId: new ObjectId(idUser2),
      time: new Date(),
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await request(app)
      .post("/schedules")
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `No store found with this ID`
    );
  });
  test("Store Not Verified", async () => {
    const newSchedule = {
      storeId: new ObjectId(idStore3),
      userId: new ObjectId(idUser2),
      time: new Date(),
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await request(app)
      .post("/schedules")
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `Store with that ID has not been verified`
    );
  });
  test("User not found", async () => {
    const fakeUserId = `65a7b2713901c57dc7d6e199`;
    const newSchedule = {
      storeId: new ObjectId(idStore1),
      userId: new ObjectId(fakeUserId),
      time: new Date(),
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await request(app)
      .post("/schedules")
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `No user found with this ID`
    );
  });
  test("Schedule already exists", async () => {
    const newSchedule = {
      storeId: new ObjectId(idStore1),
      userId: new ObjectId(idUser1),
      time: schedule1.time,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await request(app)
      .post("/schedules")
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Schedule already exists`);
  });
});

describe("DELETE /schedules/:scheduleId", () => {
  test("Success delete should return message", async () => {
    const response = await request(app)
      .delete(`/schedules/${idSchedule1}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without authentication should return message", async () => {
    const response = await request(app).delete(`/schedules/${idSchedule1}`);

    expect(response.status).toBe(401);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed without admin authorization should return message", async () => {
    const response = await request(app)
      .delete(`/schedules/${idSchedule1}`)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(403);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Failed if using wrong Schedule Id should return message", async () => {
    const invalidScheduleId = `65acd0d5bb7220c99cb8bced`;
    const response = await request(app)
      .delete(`/schedules/${invalidScheduleId}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `No schedule found with this ID`
    );
  });
});

describe("PUT /schedules/:scheduleId", () => {
  test("Success update schedule should return new schedule", async () => {
    const newSchedule = {
      storeId: new ObjectId(idStore3),
      userId: new ObjectId(idUser2),
      time: new Date(),
      isCompleted: true,
      updatedAt: new Date(),
    };
    const response = await request(app)
      .put(`/schedules/${idSchedule2}`)
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("time", expect.any(String));
    expect(response.body).toHaveProperty("isCompleted", expect.any(Boolean));
    expect(response.body).toHaveProperty("storeId", expect.any(String));
    expect(response.body).toHaveProperty("userId", expect.any(String));
  });
  test("Schedule not found", async () => {
    const invalidScheduleId = `65acd0d5bb7220c99cb8bced`;
    const response = await request(app)
      .put(`/schedules/${invalidScheduleId}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `No schedule found with this ID`
    );
  });
  test("storeId required", async () => {
    const newSchedule = {
      userId: new ObjectId(idUser1),
      time: new Date(),
      isCompleted: true,
      updatedAt: new Date(),
    };
    const response = await request(app)
      .put(`/schedules/${idSchedule2}`)
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Store ID is required`);
  });
  test("salesUser required", async () => {
    const newSchedule = {
      storeId: new ObjectId(idStore1),
      time: new Date(),
      isCompleted: true,
      updatedAt: new Date(),
    };
    const response = await request(app)
      .put(`/schedules/${idSchedule2}`)
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `User/Sales ID is required`
    );
  });
  test("Schedule time required", async () => {
    const newSchedule = {
      storeId: new ObjectId(idStore1),
      userId: new ObjectId(idUser1),
      isCompleted: false,
      updatedAt: new Date(),
    };
    const response = await request(app)
      .put(`/schedules/${idSchedule2}`)
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `Schedule time is required`
    );
  });
  test("isCompleted is required", async () => {
    const newSchedule = {
      storeId: new ObjectId(idStore1),
      userId: new ObjectId(idUser1),
      time: new Date(),
      updatedAt: new Date(),
    };
    const response = await request(app)
      .put(`/schedules/${idSchedule2}`)
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `isCompleted is required`);
  });
  test("isCompleted must be boolean (true/false)", async () => {
    const newSchedule = {
      storeId: new ObjectId(idStore1),
      userId: new ObjectId(idUser1),
      time: new Date(),
      isCompleted: `false`,
      updatedAt: new Date(),
    };
    const response = await request(app)
      .put(`/schedules/${idSchedule2}`)
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(400);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `isCompleted must be boolean (true/false)`
    );
  });
});

describe("PUT /schedules/status/:scheduleId", () => {
  test("Success update status schedule should return message", async () => {
    const newSchedule = {
      longitude: 106.82608477252883,
      latitude: -6.188789464341358,
    };
    const response = await request(app)
      .put(`/schedules/status/${idSchedule3}`)
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_admin}`);
    console.log(response);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", expect.any(String));
  });
  test("Schedule not found", async () => {
    const invalidScheduleId = `65acd0d5bb7220c99cb8bced`;
    const response = await request(app)
      .put(`/schedules/status/${invalidScheduleId}`)
      .set("Authorization", `Bearer ${access_token_admin}`);

    expect(response.status).toBe(404);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty(
      "message",
      `No schedule found with this ID`
    );
  });
  test("Store not found", async () => {
    const invalidStoreId = `65aba1c8d9ef109cc4e04099`;
    const newSchedule = {
      storeId: new ObjectId(invalidStoreId),
      isCompleted: false,
      updatedAt: new Date(),
    };
    const response = await request(app)
      .put(`/schedules/status/${idSchedule3}`)
      .send(newSchedule)
      .set("Authorization", `Bearer ${access_token_sales}`);

    expect(response.status).toBe(500);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty("message", `Internal Server Error`);
  });
});
