const joi = require("joi");

const TermsJoi = joi.object({
  description: joi.string().required(),
});

module.exports = TermsJoi;