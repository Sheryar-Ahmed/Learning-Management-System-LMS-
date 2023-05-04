const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        requred: [true, 'Enter your name']
    },
    email: {
        type: String,
        required: [true, "Email must be valid"],
        unique: true,
        validate: [validator.isEmail, 'Email must be valid']
    },
    password: {
        type: String,
        required: [true, "passowrd is required"],
        minLength: [8, 'password must be greater than 7 characters'],
        select: false // never get password when calling user again
    }
});

// hash password before uploading to the collection
studentSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next(); //will check if password is not modified, do not hash it.
    user.password = await bcrypt.hash(user.password, 10);
    next();
});

studentSchema.methods.getJWTToken = function () {
    const user = this;
    const id = user.id;
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

studentSchema.methods.comparePassword = async function (enteredPassword) {
    const user = this;
    const pass = await user.password;
    return await bcrypt.compare(enteredPassword, pass);
};

const Student = mongoose.models?.student || mongoose.model('student', studentSchema);

module.exports = Student;