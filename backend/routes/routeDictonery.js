const express = require('express');
const { dictonery } = require('../controllers/dictionaryController.js');

const router = express.Router();


router.route('/dictonery').get(dictonery);

module.exports = router;