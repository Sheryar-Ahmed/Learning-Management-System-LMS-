const expressAsyncHandler = require('express-async-handler');
const Notes = require('../models/notesModel');
//for creation, you can add for updation, deletion, read.
const studentNewNotes = expressAsyncHandler(async (req, res) => {
    const { studentNote } = req.body;
    if (!studentNote) {
        res.status(400);
        throw new Error("Note can't be invalid")
    };
    req.body.user = req.user.id;
    const newNote = await Notes.create(req.body);
    if (!newNote) {
        res.status(400);
        throw new Error("Note can't be empty");
    }
    res.status(201).json({
        success: true,
        note: newNote,
    });

});

//getting note according to the user.

const getNotes = expressAsyncHandler(async (req, res) => {
    const id = req.user.id;
    const allNotes = await Notes.find({'user': id});
    if (!allNotes) {
        res.status(400)
        throw new Error("Notes not found");
    }
    res.status(200).json({
        success: true,
        allNotes,
    })
});

module.exports = { studentNewNotes, getNotes }