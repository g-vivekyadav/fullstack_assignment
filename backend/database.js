const { MongoClient } = require('mongodb');

const url = process.env.DB_URL;
const dbName = process.env.DB_NAME;

const client = new MongoClient(url);

// Connect to MongoDB when the application starts
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the application on connection error
  }
}

connectToDatabase();

module.exports = client; // Export the MongoDB client
