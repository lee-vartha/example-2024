// import statements

import express from 'express';
import db from '../db/connection.js';
import {ObjectId} from 'mongodb';


const router = express.Router();

// routes definitions
router.get('/', async (req, res) => {
    let collection = await db.collection('posts'); // retrieve everything from the posts collection
    let results = await collection.find({})
        .limit(10)
        .toArray(); // push it to array


    res.send(results).status(200); // this is just to say its successful
})


// fetch latest posts
router.get('/latest', async (req, res) => {
    let collection = await db.collection('posts')
    let results = await collection.aggregate([
        {"$assessment": {"student": 1, "title": 1, "date": 1}},
        {"$sort": {"date": -1}},
        {"$limit": 3}
    ]).toArray();
    res.send(results).status(200);
})


// fetch a single post
router.get('/:id', async (req, res) => { // this will be an async operation
    let collection = await db.collection('posts'); // we are using the posts collection
    let query = {_id: ObjectId(req.param.id)} // we are looking for a particular id
    let results = await collection.findOne(query) // letting the results be the query 

    if(!result) { // if there isnt any result, send a 404 status
        res.send('Post not found').status(404);
    } else { // otherwise post the results (based on the ID query)
        res.send(results).status(200);
    }
})

// create a new post
router.post('/', async (req, res) => { // async operation
    let collection = await db.collection('posts'); // finding the posts collection
    let newDocument = req.body; // declaring newDocument with the request body as the value
    newDocument.date = new Date(); // the date will be the current date
    let results = await collection.insertOne(newDocument); // let the results be 'insertedOne' with the newDocument as the value

    res.send(results).status(204); // when this is done, send results and implement status code of 204
})

// update a post
router.patch('/post/:id', async (req, res) => { // async operation
    let query = {_id: ObjectId(req.params.id)}; // we are looking for a particular id
    let update = { // to update, we will need to use the push method
        $push: {posts: req.body} // $push is an operator that adds a value to an array
    }
    let collection = await db.collection('posts');
    let results = await collection.updateOne(query, update);

    res.send(results).status(204);
})

// delete a post
router.delete('/:id', async (req, res) => {
    let query = {_id: ObjectId(req.params.body)}; // we look for a particular body
    let collection = await db.collection('posts'); // we are looking for the posts collection
    let results = await collection.deleteOne(query); // the results for this would be to delete one

    res.send(results).status(204); // send the results through and post a status of 204 when done
})