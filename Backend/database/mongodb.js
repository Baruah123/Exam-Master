import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://avoyisgay2:gayisavoy2@cluster0.digeu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

let dbConnection;

// Function to establish a connection
async function connectToMongoDB(dbName) {
    if (dbConnection) {
        console.log("Already connected to the database.");
        return dbConnection;
    }

    try {
        await client.connect();
        dbConnection = client.db(dbName);
        console.log("Connected to MongoDB database:", dbName);
        return dbConnection;
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error);
        throw error;
    }
}

// Function to close the connection
async function closeConnection() {
    try {
        await client.close();
        dbConnection = null;
        console.log("Disconnected from MongoDB.");
    } catch (error) {
        console.error("Failed to disconnect from MongoDB:", error);
    }
}

export { connectToMongoDB, closeConnection };
