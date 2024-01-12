const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const saltRounds = 10;

const AdminSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    userdp: {
      type: String,
      default:
        "https://i.pinimg.com/originals/a6/f3/c5/a6f3c55ace829310723adcb7a468869b.png",
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
    mypost: [{
      type: mongoose.Types.ObjectId,
      ref: 'Blog',
    }],
  },
  { timestamps: true }
);


AdminSchema.pre('save', async function (next) {
  
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

AdminSchema.methods.checkPassword = async function (password) {
  const checkPassword = await bcrypt.compare(password, this.password);
  return checkPassword;
};

AdminSchema.methods.newHashPassword = async function (password) {
  
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

module.exports = mongoose.model('Admin', AdminSchema);
