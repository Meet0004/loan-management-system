const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
    Customer: { type: String, required: true },
    Password: { type: String, required: true }
}, { collection: "RegisterUsers" }); // Explicit collection name

const RegisterUser = mongoose.model("RegisterUser", registerSchema);

module.exports = { RegisterUser };