const Joi = require('joi');

const ProductJoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  discountPercentage: Joi.number().default(0),
  rating: Joi.number().default(0),
  stock: Joi.number().required(),
  brand: Joi.string(),
  category: Joi.string().required(),
  thumbnail: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
  color: Joi.string().default('none'),
  warranty: Joi.number().default(0),
  weight: Joi.number().default(0),
});

module.exports = ProductJoiSchema;