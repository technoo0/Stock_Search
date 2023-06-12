import express from "express"
import bodyParser from "body-parser"
import dotenv from 'dotenv'
import cors from "cors"
dotenv.config()

import ElasticClient from "./config/elastic.js"

const app = express();
app.use(cors({ origin: process.env.FRONTEND, credentials: true }));
app.use(bodyParser.json());

// Express routes

app.get("/search", async (req, res) => {
    const result = await ElasticClient.search({
        index: "news",
        query: { fuzzy: { title: req.query.query } },
    });

    res.json(result);
});

app.listen(8080);















