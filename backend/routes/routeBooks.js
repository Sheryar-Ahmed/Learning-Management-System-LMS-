const express = require('express');
const { setBook, getAllBooks } = require('../controllers/booksController.js');
const { auth, roles } = require('../middleware/authMiddleware.js');
const router = express.Router();

router.route('/books/new').post(auth, roles('admin'), setBook);
router.route('/books').get(auth, roles('student', 'teacher', 'admin'), getAllBooks);


module.exports = router;