const expressAsyncHandler = require('express-async-handler');
const HW = require('../models/hwModel');

//creating a homework
const setHomeWork = expressAsyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error("Body is empty");
    };
    const { homeWork } = req.body;
    if (!homeWork) {
        res.status(400);
        throw new Error("homeWork can't be invalid");
    };
    req.body.user = req.user.id; //getting from auth
    const setHW = await HW.create(req.body);

    res.status(201).json({
        success: true,
        homeWokr: setHW
    });

});
//getting homework of each student
const getAllHomeWork = expressAsyncHandler(async (req, res) => {
    const id = req.user.id; //getting from auth
    const allHW = await HW.find({ 'user': id });
    if (!allHW) {
        res.status(400);
        throw new Error("homeWork not found");
    };

    res.status(201).json({
        success: true,
        homeWork: allHW
    });

});



module.exports = { setHomeWork, getAllHomeWork };