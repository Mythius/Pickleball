// npm i mongodb
const { MongoClient } = require('mongodb');

const uri = require('./config.json')['db-uri'];
const client = new MongoClient(uri, {tls:false, serverSelectionTimeoutMS: 3000, autoSelectFamily: false, });

async function connect(callback) {
    try {
        await client.connect();
        console.log('Connected to MongoDB with credentials!');
        const database = client.db('pickleball');
        await callback(database);
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
    } finally {
        await client.close();
    }
}

exports.connect = connect;