const mongoose = require('mongoose');

const Terms = new mongoose.Schema({
  description: {
    type: "string",
    required: true,
    default: "Terms and Conditions",
  },
});

const termsSchema = mongoose.model("Terms", Terms);

module.exports = termsSchema;