const mongoose = require('mongoose');


const videoLectureSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    videoLink: {
        type: String,
        required: [true, "Lecture Link can't be invalid"],
        minLength: [12, "must be greater than 11 char"],
        uniqure: [true, 'Linke must be uniqure']
    }
});

const videoLec = mongoose.models?.videoLectures || mongoose.model("videoLectures", videoLectureSchema);

module.exports = videoLec;