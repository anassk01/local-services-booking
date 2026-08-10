const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connection successfully established");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

module.exports = connectDb;
