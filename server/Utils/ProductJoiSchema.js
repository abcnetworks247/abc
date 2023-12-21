const Joi = require('joi');

const ProductJoiSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  discountPercentage: Joi.number().required(),
  rating: Joi.number().required(),
  stock: Joi.number().required(),
  brand: Joi.string().required(),
  category: Joi.string().required(),
  thumbnail: Joi.string().required(),
  images: Joi.array().items(Joi.string()).required(),
  color: Joi.string().required(),
  warranty: Joi.string().required(),
  weight: Joi.number().required(),
});

module.exports = ProductJoiSchema;