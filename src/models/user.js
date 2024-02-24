import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: { type: String },
    fullName: { type: String },
    email: { type: String },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    phoneNumber: { type: Number },
    address: { type: String },
    avatar: { type: String },
    city: { type: String },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema);
module.exports = User;
