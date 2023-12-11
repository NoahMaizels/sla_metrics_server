require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
const fetchData = require('./fetchData.js')
const router = require('./router.js'); // Import the router
app.use(express.json());

// Use the router for all routes
app.use('/', router);

// Periodically fetch data
fetchData()
setInterval(fetchData, 10 * 1000);

// Example route for GET request
// Example route for GET request
app.get('/api/v1/chunk_retrieval_duration', async (req, res) => {
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
        const value = mostRecentEntry[0].value;
        res.json({ value: parseFloat(value) });
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
  

// Example route for POST request
app.post('/data', (req, res) => {
    console.log(req.body); // Log data from the POST request
    res.send('Data received!');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
