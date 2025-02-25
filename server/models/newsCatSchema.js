const mongoose = require("mongoose");
const slugify = require("slugify");

const Newscat = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      default: "Uncategorized",
    },
    slug: {
      type: String,
      unique: true,
    },
    position: {
      type: Number, // Store order position
      unique: true,
    },
  },
  { timestamps: true }
);

// Middleware to generate slug and auto-set position
Newscat.pre("save", async function (next) {
  if (!this.slug || this.isModified("name")) {
    let slug = slugify(this.name, { lower: true, strict: true });

    // Ensure unique slug
    let uniqueSlug = slug;
    let count = 1;
    while (await mongoose.model("NewsCategory").findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${count}`;
      count++;
    }
    this.slug = uniqueSlug;
  }

  // Set position automatically for new items
  if (this.isNew) {
    const lastCategory = await mongoose
      .model("NewsCategory")
      .findOne()
      .sort("-position");
    this.position = lastCategory ? lastCategory.position + 1 : 1;
  }

  next();
});

const NewsCategory = mongoose.model("NewsCategory", Newscat);

module.exports = NewsCategory;
