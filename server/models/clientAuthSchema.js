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
  if (!this.isModified("password")) {
    // If password is not modified, proceed to the next middleware
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

AuthSchema.methods.checkPassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  console.log(isMatch)
  return isMatch;
};


AuthSchema.methods.newHashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw error; // Re-throw the error to be handled by the caller
  }
};

module.exports = mongoose.model("Client", AuthSchema);
