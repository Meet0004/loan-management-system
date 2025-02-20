const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

// Define Schema
const userSchema = new mongoose.Schema({
    // Customer-related information
    Customer: { type: String, required: true },
    Password: { type: String, required: true },
    Time_Of_Loan_Taken: { type: String, required: false },

    // Loan-related information
    Loans_Taken: { type: Number, required: false },
    Loans_Taken_Value: { type: Decimal128, required: false },

    // Payment-related information
    Total_Daily_Payments: { type: Number, required: false },
    Daily_Payment_Value: { type: Decimal128, required: false },
    Late_Payment_Fees: { type: Decimal128, required: false },

    // Debt and Balance-related information
    Total_Debt: { type: Decimal128, required: false },
    Balance: { type: Decimal128, required: false },
});
const User = mongoose.model("User", userSchema);
module.exports = { User };

