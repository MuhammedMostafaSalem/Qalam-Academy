const mongoose = require('mongoose');
const env = require('../config/env');
const dns = require("dns")

const connectDB = async () => {
    dns.setServers(["1.1.1.1", "8.8.8.8"])
    try {
        const database = await mongoose.connect(env.mongoUrl);

        console.log(`MongoDB connected with server: ${database.connection.host}`.cyan.underline);
        
    } catch (error) {
        // Log any connection errors
        console.error(`Error connecting to MongoDB: ${error.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDB;