const express = require('express');
const {auth, roles} = require('../middleware/authMiddleware');
const { videoLecture, getVideoLecture } = require('../controllers/videoLecController');

const router = express.Router();

router.route('/videoLec/new').post(auth, roles('teacher'),videoLecture);
router.route('/videoLec').get(auth, roles('student','teacher'), getVideoLecture);



module.exports = router;