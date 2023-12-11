const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO;
console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});


// Export the client object as a module
module.exports = client;
