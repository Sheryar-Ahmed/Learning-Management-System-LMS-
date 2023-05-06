const User = require('../models/userModel');
const expressAsyncHandler = require('express-async-handler');
const sendCookieToken = require('../../utils/sendCookieToken');

// student Registration
const userRegistration = expressAsyncHandler(async (req, res) => {
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
    const isExist = await User.findOne({ 'email': email });
    if (isExist) {
        res.status(400);
        throw new Error("User already exists with this email");
    };
    const registerUser = await User.create(req.body);
    //send cookie
    sendCookieToken(registerUser, 201, res);
});

//student Login
const userLogin = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Someting is missing");
    };
    const user = await User.findOne({ 'email': email }).select('+password'); //order to get password 
    if (!user) {
        res.status(400);
        throw new Error("Invalid Credentials");
    };
    const isPasswordMatched = await user.comparePassword(password); //created in studentModel
    if (!isPasswordMatched) {
        res.status(400);
        throw new Error("user not Found");
    };

    sendCookieToken(user, 201, res);


});
// logout
const userLogout = expressAsyncHandler(async (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: "Logout Successfully"
    })
});

module.exports = { userRegistration, userLogin, userLogout }