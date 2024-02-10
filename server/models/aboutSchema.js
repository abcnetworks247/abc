const mongoose = require('mongoose');

const About = new mongoose.Schema({
  image: {
    type: "string",
    default: "/https://source.unsplash.com/random",
  },
  description: {
    type: "string",
    required: true,
    default: "About 1",
  },
  description2: {
    type: "string",
    required: true,
    default: "About 2",
  },
});

const aboutSchema = mongoose.model("About", About);

module.exports = aboutSchema;