const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  usercomment: {
    type: String,
    required: true,
  },
  userid: {
    type: mongoose.Types.ObjectId,
    ref: 'Clients',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  shortdescription: {
    type: String,
    required: true,
  },
  
  category: {
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
    ref: 'Admin',
    required: true,
  }
}, {timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
