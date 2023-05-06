const express = require('express');
const { setHomeWork, getAllHomeWork } = require('../controllers/hwController');
const { auth, roles } = require('../middleware/authMiddleware');
const router = express.Router();

// homework both student and teacher can create
router.route('/students/homeWork/new').post(auth, roles('student','teacher'), setHomeWork);
router.route('/students/homeWork/').get(auth, roles('student','teacher'), getAllHomeWork);

module.exports = router;