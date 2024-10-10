import express from "express";

const router = express.Router()

import { Book } from "../models/bookModel.js";

// ! Route for Save a new Book

router.post("/", async (request, response) => {
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

router.get('/', async (request, response) => {
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
router.put('/:_id', async (request, response) => {
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

router.get('/:id', async (request, response) => {

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
router.delete('/:_id', async (request, response) => {
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

export default router;