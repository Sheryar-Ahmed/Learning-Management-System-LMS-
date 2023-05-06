const mongoose = require('mongoose');

const dbConn = async () => {
    try {
        console.log(process.env.MONGODB_URI);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = dbConn;