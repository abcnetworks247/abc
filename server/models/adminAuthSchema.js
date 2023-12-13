const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const AdminSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    userdp: {
      type: String,
    },
    userbio: {
      type: String,
      default: "Tell us about yourself",
    },
    email: {
      type: String,
      unique: true,
      required: true,
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
  },
  { timestamps: true }
);

AdminSchema.pre('save', async function (next) {
  const gensalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, gensalt);
  next();
});

AdminSchema.methods.checkPassword = async function (password) {
  const checkPassword = await bcrypt.compare(password, this.password);
  return checkPassword;
};

AdminSchema.methods.newHashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = mongoose.model('Admin', AdminSchema);
