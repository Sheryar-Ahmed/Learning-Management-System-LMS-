const mongoose = require('mongoose');

const dbConn = async () => {
    try {
        console.log(process.env.MONGODB_URI);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected suceesfully.")
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = dbConn;