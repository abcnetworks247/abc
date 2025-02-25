const NewsType = require("../models/newsTypeSchema");
const NewsCategory = require("../models/newsCatSchema");
const mongoose = require("mongoose");
const slugify = require("slugify");
const Blog = require("../models/blogSchema");
require("dotenv").config();


const port = process.env.PORT || 5000;

const ConnectDb = (server) => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log("Connected to the database");

      server.listen(port, console.log(`Server listening to ${port} 🔥🔥`));

      // Migrate NewsType
    
    })
    .catch((err) => {
      console.error("Database connection failed:", err);
    });
};

module.exports = ConnectDb;
