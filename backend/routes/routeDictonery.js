const express = require('express');
const { dictonery } = require('../controllers/dictionaryController.js');
const { auth, roles } = require('../middleware/authMiddleware.js');
const router = express.Router();

//dictonery can use both student and teacher and even the admin himself
router.route('/dictonery').get(auth, roles('student','teacher','admin'), dictonery);

module.exports = router;