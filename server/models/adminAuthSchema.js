const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const AdminSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true, // Removes whitespace
    },
    userdp: {
      type: String,
      default:
        "https://i.pinimg.com/originals/a6/f3/c5/a6f3c55ace829310723adcb7a468869b.png",
    },
    userbio: {
      type: String,
      default: "Tell us about yourself",
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true, // Ensures email is stored in lowercase
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "editor"],
      default: "editor",
    },
    mypost: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
  },
  { timestamps: true }
);

// Middleware to hash password before saving
AdminSchema.pre("save", async function (next) {
  try {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Passes error to the next middleware
  }
});

// Method to verify password
AdminSchema.methods.checkPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Error comparing passwords");
  }
};

// Utility to hash a new password
AdminSchema.methods.newHashPassword = async function (password) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error hashing new password:", error);
    throw new Error("Error hashing new password");
  }
};

module.exports = mongoose.model("Admin", AdminSchema);
