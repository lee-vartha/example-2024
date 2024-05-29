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