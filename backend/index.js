import express from "express";
import { PORT } from "./config.js";

const app = express();

app.get('/', (req, res) => {
    res.status(234).send('Welcome');
})
app.listen(PORT, () => {
    console.log(`App is listening on Port ${PORT}`)
})