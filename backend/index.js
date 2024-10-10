// ! import modules, and ...
import express, { request, response } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

// ! create an express app
const app = express();

// ! use a middlewear for parsing json
app.use(express.json())



// ! Route for Save a new Book

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

// ! Route for access all Books

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

// ! Route for Update a Book
app.put('/books/:_id', async (request, response) => {
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
        const id = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body)

        if (!result) {
            return response.status(404).json({ message: 'Book not found' })
            return response.status(404).json({ message: 'Book not found' })
        }

        return response.status(200).json({ message: 'Book Update Successfully :)' })

    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// ! Route for access a Book

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


// ! Route for Delete a Book
app.delete('/books/:_id', async (request, response) => {
    try {
        const id = request.params;

        const Result = await Book.findByIdAndDelete(id);

        if (!Result) response.status(500).send({ message: error.message });

        response.status(200).json({ message: "Book is Deleted!" })

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