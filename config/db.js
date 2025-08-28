const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://meetgssoni04:C3Qz7d2LesdFQJfW@lms.fqkiiiu.mongodb.net/loanDB?retryWrites=true&w=majority');
        console.log('Connected to MongoDB');
        console.log('ab kaam karsakte hai');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
