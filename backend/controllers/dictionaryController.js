const expressAsyncHandler = require("express-async-handler");
const axios = require('axios');

const dictonery = expressAsyncHandler(async (req, res) => {
    const { search } = req.body;
    if (!req.body) {
        res.status(400);
        throw new Error("Search cannot be empty");
    };
    
    const { data } = await axios.get(`${process.env.DICTONERY_API}/${search}`);

    if (!data) {
        res.status(400);
        throw new Error("Try again")
    };
    res.status(200).json({
        success: true,
        results: data,
    })
});

module.exports = {
    dictonery
};