const mongoose = require('mongoose');
require('dotenv').config(); // load .env

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
        console.log('ab kaam karsakte hai');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    }
};

module.exports = connectDB;
