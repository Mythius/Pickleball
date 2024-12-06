// npm i mongodb
const { MongoClient } = require("mongodb");

const uri = require("./config.json")["db-uri"];
const client = new MongoClient(uri, {
  tls: false,
  serverSelectionTimeoutMS: 3000,
  autoSelectFamily: false,
});

const p = client.connect();

async function connect() {
  try {
    await p;
    const database = client.db("pickleball");
    return database;
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

exports.connect = connect;
