const express = require('express');
const { setHomeWork, getAllHomeWork } = require('../controllers/hwController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();


router.route('/students/homeWork/new').post(auth, setHomeWork);
router.route('/students/homeWork/').get(auth, getAllHomeWork);

module.exports = router;