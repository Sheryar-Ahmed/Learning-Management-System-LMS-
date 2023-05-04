const expressAsyncHandler = require('express-async-handler');
const Students = require('../models/studentModel');
const jwt = require('jsonwebtoken');


const auth = expressAsyncHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.status(400);
        throw new Error("User is not Logged In");
    };
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Students.findById(decodedData.id);
    next();
});

module.exports = auth;