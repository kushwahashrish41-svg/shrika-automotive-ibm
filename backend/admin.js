const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({
      email: "admin@shrika.com",
    });

    if (existingAdmin) {
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log("Existing user is now ADMIN");
    } else {
      await User.create({
        name: "SHRIKA Admin",
        email: "admin@shrika.com",
        password: "admin123",
        role: "admin",
      });

      console.log("Admin created successfully");
    }

    process.exit();
  } catch (error) {
    console.error("Admin creation error:", error.message);
    process.exit(1);
  }
};

createAdmin();