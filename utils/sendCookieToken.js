const expressAsyncHandler = require('express-async-handler');

const sendCookieToken = expressAsyncHandler(async(user, status, res) => {
    const token = await user.getJWTToken();
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 3600 * 1000,
        ),
        httpOnly: true,
    };

    res.status(status).cookie("token", token, options).json({
        success: true,
        user,
        token
    });
});


module.exports = sendCookieToken;