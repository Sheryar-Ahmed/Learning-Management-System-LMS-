const express = require('express');
const { studentNewNotes, getNotes } = require('../controllers/NoteController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/students/notes/new').post(auth, studentNewNotes);
router.route('/students/notes').get(auth, getNotes);

module.exports = router;