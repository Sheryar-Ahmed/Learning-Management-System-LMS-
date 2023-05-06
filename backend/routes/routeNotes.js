const express = require('express');
const { studentNewNotes, getNotes } = require('../controllers/NoteController');
const { auth, roles } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/students/notes/new').post(auth, roles('student'), studentNewNotes);
router.route('/students/notes').get(auth, roles('student'), getNotes);

module.exports = router;