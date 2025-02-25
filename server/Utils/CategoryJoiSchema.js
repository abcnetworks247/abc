const joi = require("joi");

const CategoryJoi = joi.object({
  name: joi.string().trim().min(2).max(50).required(),
  slug: joi.string().trim().optional(),
  position: joi.number().integer().min(1).optional(),
});

module.exports = CategoryJoi;
