const Joi = require('joi');

const ProductJoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  discountPercentage: Joi.number(),
  rating: Joi.number(),
  stock: Joi.number().required(),
  brand: Joi.string(),
  category: Joi.string().required(),
  thumbnail: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
  color: Joi.string(),
  warranty: Joi.string(),
  weight: Joi.number(),
});

module.exports = ProductJoiSchema;