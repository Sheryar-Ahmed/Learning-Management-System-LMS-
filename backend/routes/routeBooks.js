const express = require('express');
const { setBook, getAllBooks } = require('../controllers/booksController.js')
const router = express.Router();


router.route('/books/new').post(setBook);
router.route('/books').get(getAllBooks);


module.exports = router;