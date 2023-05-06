const expressAsyncHandler = require('express-async-handler');
const Book = require('../models/bookModel');
const ApiFeatures = require('../../utils/apiFeatures');

const setBook = expressAsyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error("Body cannot be invalid");
    };
    const { volumeInfo, title, publishedDate, description, rating, selfLinks } = req.body;
    if (!volumeInfo || !publishedDate || !title || !description || !selfLinks) {
        res.status(400);
        throw new Error("Incomplete information");
    };
    //check if book already exists;
    const isFound = await Book.findOne({ title: title });
    if (isFound) {
        res.status(400);
        throw new Error("already exists, Try with another data");
    };
    //set user for authentication if you want that only that type of users can add books, create roles
    const newBook = await Book.create(req.body);
    if (!newBook) {
        res.status(400);
        throw new Error("Try again Later");
    };

    res.status(201).json({
        success: true,
        books: newBook
    });
});

const getAllBooks = expressAsyncHandler(async (req, res) => {

    const resultsPerPage = 4;

    const apiFeatures = new ApiFeatures(Book.find(), req.query)
        .search('title')
        .filterByRating()
        .pagination(resultsPerPage)
        ;

    const books = await apiFeatures.query;

    if (!books) {
        res.status(400);
        throw new Error("Not found with this query data");
    };

    res.status(200).json({
        success: true,
        reqBooks: books
    });

});


module.exports = { setBook, getAllBooks };