const joi = require("joi");

const CategoryNewsUpdateJoi = joi.object({
  title: joi.string().required(),
  link: joi.string().trim().optional(),
  position: joi.number().integer().min(1).optional(),
});

module.exports = CategoryNewsUpdateJoi;
