const mongoose = require('mongoose');

const dbConn = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB connected.")

    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = dbConn;