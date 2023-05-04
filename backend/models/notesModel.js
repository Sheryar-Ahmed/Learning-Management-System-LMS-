const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    studentNote: {
        type: String,
        minLength: [5, 'greater than 4 characters'],
        required: [true, 'must be required to add']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'students',
        required: [true, 'Id cannot be empty']
    }
});

const Notes = mongoose.models?.studentNotes || mongoose.model('studentNotes', notesSchema);

module.exports = Notes;