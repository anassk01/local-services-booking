require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

async function makeAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.updateOne(
      { email: "admin@test.com" },
      { role: "admin" },
    );
    if (user.matchedCount === 0) {
      console.log("user not found");
    } else if (user.matchedCount === 0) {
      console.log("user already admin");
    } else {
      console.log("utilisateur devenu admin");
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    await mongoose.disconnect();
  }
}

makeAdmin();
