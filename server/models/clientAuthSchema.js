const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const SALT_ROUNDS = 10; // Define salt rounds consistently

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
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderHistory",
      },
    ],
    subscriptionhistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubscriptionHistory",
      },
    ],
    donationhistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "donation",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    productpurchasehistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
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
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

AuthSchema.methods.checkPassword = async function (userPassword) {
  try {
    console.log("Comparing passwords in client schema method");
    console.log("Input password:", userPassword);
    console.log("Stored hash:", this.password);

    const isMatch = await bcrypt.compare(userPassword, this.password);
    console.log("Password comparison result:", isMatch);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    throw new Error("Error comparing passwords");
  }
};

// Static method to hash a password (for use in controllers)
AuthSchema.statics.hashPassword = async function (password) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
};

module.exports = mongoose.model("Client", AuthSchema);
