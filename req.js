const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

app.use(bodyParser.json());

// MongoDB connection URL
const mongoUrl = 'mongodb://localhost:27017';
// Database and collection names
const dbName = 'your-database-name';
const collectionName = 'your-collection-name';

// Create a new document in the collection with the provided address
app.post('/api/whitelist', async (req, res) => {
  try {
    const address = req.body.address;

    // Connect to MongoDB
    const client = new MongoClient(mongoUrl);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Insert the address into the collection
    await collection.insertOne({ address });

    // Close the MongoDB connection
    await client.close();

    res.sendStatus(200);
  } catch (error) {
    console.error('Error storing address:', error);
    res.sendStatus(500);
  }
});

// Start the server
app.listen(8000, () => {
  console.log('Server is running on port 8000');
});
