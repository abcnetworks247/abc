const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const AuthSchema = new mongoose.Schema(
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
    phone: {
      type: String,
      default: "user phone number",
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true, // Ensures email is stored in lowercase
      trim: true,
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
          default: 1,
          min: 1, // Prevents invalid quantity values
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
        ref: "Donation", // Updated capitalization for consistency
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

// Middleware to hash password before saving
AuthSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next(); // Skip if password is not modified
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to verify password
AuthSchema.methods.checkPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};

// Method to hash a new password (utility)
AuthSchema.methods.newHashPassword = async function (password) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error("Error hashing the password");
  }
};

module.exports = mongoose.model("Client", AuthSchema);
