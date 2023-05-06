const express = require('express');
const auth = require('../middleware/authMiddleware');
const { videoLecture, getVideoLecture } = require('../controllers/videoLecController');

const router = express.Router();

router.route('/videoLec/new').post(videoLecture);
router.route('/videoLec').get(auth, getVideoLecture);



module.exports = router;