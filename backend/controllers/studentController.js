const Student = require('../models/studentModel');
const expressAsyncHandler = require('express-async-handler');
const sendCookieToken = require('../../utils/sendCookieToken');

// student Registration
const studentRegistration = expressAsyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error("Nothing is in body");
    };
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Something is missing");
    };
    //check if usr already exists
    const isExist = await Student.findOne({ 'email': email });
    if (isExist) {
        res.status(400);
        throw new Error("User already exists with this email");
    };
    const registerStudent = await Student.create({
        name, email, password
    });
    //send cookie
    sendCookieToken(registerStudent, 201, res);
});

//student Login
const studentLogin = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Someting is missing");
    };
    const student = await Student.findOne({ 'email': email }).select('+password'); //order to get password 
    if (!student) {
        res.status(400);
        throw new Error("Invalid Credentials");
    };
    const isPasswordMatched = await student.comparePassword(password); //created in studentModel
    if (!isPasswordMatched) {
        res.status(400);
        throw new Error("user not Found");
    };

    sendCookieToken(student, 201, res);


});
// logout
const studentLogout = expressAsyncHandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    })
});

module.exports = { studentRegistration, studentLogin, studentLogout }