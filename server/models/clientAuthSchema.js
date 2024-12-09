const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const AuthSchema = new mongoose.Schema(
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
    phone: {
      type: String,
      default: "user phone number",
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    shippingaddress: {
      type: String,
      default: "user shipping address",
    },
    password: {
      type: String,
      required: true,
    },
    userpackage: {
      type: String,
      enum: ["basic", "coper", "silver", "gold", "diamond", "titanium"],
      default: "basic",
    },
    
    cart: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: {
          type: Number,
          default: 1, // Assuming default quantity is 1
        },
      },
    ],
    orderhistory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "OrderHistory",
      },
    ],
    subscriptionhistory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "SubscriptionHistory",
      },
    ],
    donationhistory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "donation",
      },
    ],
    wishlist: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
    productpurchasehistory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "PurchaseHistory",
      },
    ],
  },
  { timestamps: true }
);

AuthSchema.pre("save", async function (next) {
  const gensalt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, gensalt);
  next();
});


AuthSchema.methods.checkPassword = async function (password) {
  try {
    const checkPassword = await bcrypt.compare(password, this.password);

    console.log("Password comparison result:", checkPassword);

    return checkPassword;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Error comparing passwords");
  }
};


AuthSchema.methods.newHashPassword = async function (password) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {}
};

module.exports = mongoose.model("Client", AuthSchema);
