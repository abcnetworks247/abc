const joi = require("joi");

const PolicyJoi = joi.object({
  description: joi.string().required(),
});

module.exports = PolicyJoi;