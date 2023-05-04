const express = require('express');
const { studentRegistration, studentLogin, studentLogout } = require('../controllers/studentController.js');
const router = express.Router();


router.route('/registration').post(studentRegistration);
router.route('/login').post(studentLogin);
router.route('/logout').get(studentLogout);


module.exports = router;