const mongoose = require("mongoose");
const slugify = require("slugify");

const NewsUpdate = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      default: "Uncategorized",
    },
    link: {
      type: String,
    },
    position: {
      type: Number, // Store order position
      unique: true,
    },
  },
  { timestamps: true }
);

// Middleware to generate slug and auto-set position
NewsUpdate.pre("save", async function (next) {
  // Set position automatically for new items
  if (this.isNew) {
    const lastNewsUpdate = await mongoose
      .model("NewsUpdate")
      .findOne()
      .sort("-position");
    this.position = lastNewsUpdate ? lastNewsUpdate.position + 1 : 1;
  }

  next();
});

const NewsType = mongoose.model("NewsUpdate", NewsUpdate);

module.exports = NewsType;
