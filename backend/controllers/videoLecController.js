const expressAsyncHandler = require("express-async-handler");
const videoLec = require('../models/videoLec');
const ApiFeatures = require('../../utils/apiFeatures');

const videoLecture = expressAsyncHandler(async (req, res) => {
    if (!req.body) {
        res.status(400);
        throw new Error("Body can't be invlid");
    };
    const { title, videoLink } = req.body;
    if (!title || !videoLink) {
        res.status(400);
        throw new Error("keys are missing");
    };
    //check if already exists with the same link, we will not focus on title because videos can have same title, but not same url
    const isExist = await videoLec.findOne({ videoLink: videoLink });
    if (isExist) {
        res.status(409);
        throw new Error("VideoLecture is already available with the same title and link, try with different");
    };
    //creating a new video in DB
    const newVideoLec = await videoLec.create(req.body);
    if (!newVideoLec) {
        res.status(400);
        throw new Error("Try again Later");
    };

    res.status(201).json({
        success: true,
        videoLecture: newVideoLec
    });
});

const getVideoLecture = expressAsyncHandler(async (req, res) => {
    const resultsPerPage = 5;  // pagination
    const apiFeatures = new ApiFeatures(videoLec.find(), req.query)
        .search('title')
        .pagination(resultsPerPage)
        ;
    const videoLectures = await apiFeatures.query;
    if (!videoLectures) {
        res.status(400);
        throw new Error("Not got video Lecture");
    };
    res.status(200).json({
        success: true,
        searchedLec: videoLectures
    })

});


module.exports = { videoLecture, getVideoLecture };