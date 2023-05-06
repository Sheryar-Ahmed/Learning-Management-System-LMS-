const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


const auth = expressAsyncHandler(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        res.status(400);
        throw new Error("User is not Logged In");
    };
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
    next();
});
// it is not async hanlder function
const roles = (...roles) => {  //convert to array
    //we know that we set req.user to the current user, so we can see its role and can decide what he can do and can't
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            res.status(403);
            throw new Error(`You are not allowed to do perform this operation with this role: ${req.user.role}`)
        }
        next();
    };
};

module.exports = { auth, roles };