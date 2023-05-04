const mongoose = require('mongoose');


const HomeWorkSchema = mongoose.Schema({
    homeWork: {
        type: String,
        minLength: [4, 'greater than 3 characters'],
        required: [true, 'Input cannot be empty']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'students',
        required: [true, 'Id never be empty']
    }
});

const HW = mongoose.models?.homeWork || mongoose.model("homeWork", HomeWorkSchema);

module.exports = HW;