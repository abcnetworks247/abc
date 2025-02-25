


const mongoose = require("mongoose");
const slugify = require("slugify");

const commentSchema = new mongoose.Schema({
  usercomment: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    shortdescription: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    longdescription: {
      type: String,
      required: true,
    },
    blogimage: {
      type: String,
    },
    comment: [commentSchema],
    author: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware to generate slug before saving
blogSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
