// importing mongoDB client class
import {MongoClient} from "mongodb";

// connection setup function
const connectionString = process.env.ATLAS_URI || "";


// creating mongo client connection
const client = new MongoClient(connectionString) // this particular line is helping me connect to the mongodb server


// connecting to mongoDB
let connection;
try {
    connection = await client.connect(); // from the mongo client instance (this is an async operation)
} catch(err) {
    console.error(err);
}


let db = connection.db("sample_db"); // this is the database that I want to connect to
// will need to return the reference specified for this database

export default db; // exporting the database connection
