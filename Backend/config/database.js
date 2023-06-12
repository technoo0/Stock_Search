
import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()


// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const client = new MongoClient(process.env.MANGODB, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (e) {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

export default client