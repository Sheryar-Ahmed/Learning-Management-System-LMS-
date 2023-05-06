const mongoose = require('mongoose');

const dbConn = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log("mongodb connected suceesfully.")
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = dbConn;