// ! import modules, and ...
import express, { request, response } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './Routes/booksRoute.js'

// ! create an express app
const app = express();

// ! use a middlewear for parsing json
app.use(express.json())

app.use('/books', booksRoute)

mongoose
    .connect(mongodbURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening on Port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log('Database Have not Loaded :(')
    })