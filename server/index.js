//import statements

import express from "express";

// importing the package to handle any errors during async operations
import "express-async-errors";

// importing the package to handle the path of the files
import posts from "./routes/posts.js";

import './loadEnv.js'

// defining the port where the local host will run the server through
const PORT = process.env.PORT || 3000; // there is an OR statement so that if the 'process.env.PORT' doesnt work, it will run the 3000 port.


// creating an instance of the express module
const app = express(); 


// middleware setup
app.use(express.json()); // this will allow the server to accept JSON data (to parse any requests)


// route handling
app.use("/posts", posts); // this will allow the server to use the posts.js file to handle any requests that are made to the '/posts' endpoint

// error handling
app.use((err, _req, res, next) => {
    res.status(500).send("An unexpected error occured.");
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


