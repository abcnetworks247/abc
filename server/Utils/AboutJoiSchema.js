const joi = require("joi");

const AboutJoi = joi.object({
  image: joi.string().required(),
  description: joi.string().required(),
});

module.exports = AboutJoi;