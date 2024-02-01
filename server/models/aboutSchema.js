const mongoose = require('mongoose');

const About = new mongoose.Schema({
  image: {
    type: "string",
    default: "/https://source.unsplash.com/random",
  },
  description: {
    type: "string",
    required: true,
    default: "Terms and Conditions",
  },
});

const aboutSchema = mongoose.model("About", About);

module.exports = aboutSchema;