const express = require('express');
const router = express.Router();
const client = require('./db.js'); // Import the MongoDB client

// Chunk Retrieval Duration
router.get('/api/v1/chunk_retrieval_duration', async (req, res) => {
  try {
    // Connect the client to the MongoDB server
    await client.connect();
    const db = client.db('sla_metrics');

    // Find the most recent entry in the collection
    const collection = db.collection('chunk_retrieval_duration');
    const mostRecentEntry = await collection
      .find()
      .sort({ timestamp: -1 }) // Sort by timestamp in descending order to get the most recent entry first
      .limit(1) // Limit the result to 1 document
      .toArray();

    if (mostRecentEntry.length > 0) {
      const nanoseconds = mostRecentEntry[0].value;
      // Convert nanoseconds to milliseconds
      const milliseconds = parseFloat(nanoseconds) / 1000000;
      res.json({ value: milliseconds });
    } else {
      res.status(404).json({ message: 'No data found' });
    }
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    // Close the MongoDB client connection
    await client.close();
  }
});


module.exports = router;
