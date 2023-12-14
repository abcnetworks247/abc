const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const AuthSchema = new mongoose.Schema(
  {
    fullname: {
      type: 'string',
      required: true,
    },
    userdp: {
      type: 'string',
      default: "https://i.pinimg.com/originals/a6/f3/c5/a6f3c55ace829310723adcb7a468869b.png"
    },
    userbio: {
      type: 'string',
      default: "Tell us about yourself"
    },
    email: {
      type: 'string',
      unique: true,
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
    package: {
      type: 'string',
      enum: ["basic", "advanced", "pro"],
      default: "basic"
    },
    cart: [{
      type: mongoose.Types.ObjectId,
      ref: 'Product',
    }],
    wishlist: [{
      type: mongoose.Types.ObjectId,
      ref: 'Product',
    }],
    productpurchasehistory: [{
      type: mongoose.Types.ObjectId,
      ref: 'ProductPurchase',
    }],
  },
  { timestamps: true }
);

AuthSchema.pre('save', async function (next) {
  const gensalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, gensalt);
  next();
});

AuthSchema.methods.checkPassword = async function (password) {
  const checkPassword = await bcrypt.compare(password, this.password);
  return checkPassword;
};

AuthSchema.methods.newHashPassword = async function (password) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

module.exports = mongoose.model('Client', AuthSchema);
