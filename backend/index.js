import express from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/', (req, res) => {
    res.status(234).send('Welcome');
})


mongoose
    .connect(mongodbURL)
    .then(() =>{
        app.listen(PORT, () => {
            console.log(`App is listening on Port ${PORT}`)
        })
    })
    .catch((err) => {
        console.log('Database Have not Loaded :(')
    })