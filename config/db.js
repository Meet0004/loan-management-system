const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = "mongodb+srv://meetgssoni04:C3Qz7d2LesdFQJfW@lms.fqkiiiu.mongodb.net/loanDB?retryWrites=true&w=majority";
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("✅ Connected to MongoDB");

    // Optional: create collection if it doesn't exist
    const db = mongoose.connection.db;
    const collections = await db.listCollections({ name: "users" }).toArray();
    if (collections.length === 0) {
      await db.createCollection("users");
      console.log("Collection 'users' created!");
    }

  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
};

module.exports = connectDB;
