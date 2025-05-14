import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const createAdmin = async () => {
  const adminExists = await User.findOne({ role: "Admin" });
  if (!adminExists) {
    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      contact: "9234567891",
      password: "Admin@123",
      role: "Admin",
    });

    const refreshToken = jwt.sign(
      { _id: admin._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    await admin.save();
    console.log("Default Admin user created.");
  }
};

export { createAdmin };