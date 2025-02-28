const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require('dotenv').config();

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(client => {
        console.log('Connected to MongoDB');
        _db = client.db();  // Select the default database
        callback();
    })
    .catch(err => {
        console.error('MongoDB Connection Failed:', err);
        callback(err);  // Pass error to callback
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw new Error('No database found');
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
