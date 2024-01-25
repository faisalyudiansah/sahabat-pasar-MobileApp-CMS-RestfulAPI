const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const db = client.db(process.env.NODE_ENV === 'test' ? "fp-rmt-43-test" : "fp-rmt-43");

module.exports = {
  db,
  client
};
