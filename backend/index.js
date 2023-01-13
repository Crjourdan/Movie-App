import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import ReviewsDAO from "../dao/reviewsDAO.js"

//const dotenv = require('dotenv')
dotenv.config()

const MongoClient = mongodb.MongoClient
const mongo_username = process.env.ACCESS_USERNAME
const mongo_password = process.env.ACCESS_PASSWORD
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.wqxf950.mongodb.net/?retryWrites=true&w=majority`



const port = 5000

MongoClient.connect(
    uri, 
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await ReviewsDAO.injectDB(client)
        app.listen(port, () => {
            console.log(`listening on port ${port}`)
        })
    })