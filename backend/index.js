import express, { request, response } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.status(234).send('Welcome');
})

// Route for save a new book

app.post("/", async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Send all required fields!",
            });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books
        });
    
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})


app.get('/books/:id', async (request, response) => {
    
    try {

        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json(book);
    
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

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