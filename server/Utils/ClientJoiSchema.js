const joi = require('joi');

const subscriptionSchema = joi.object({
  subscriberName: joi.string().required(),
  email: joi.string().email().required(),
  age: joi.number().integer().min(1).required(),
  subscriptionAmount: joi.number().required(),
  subscriptionType: joi.string().valid('monthly', 'yearly').required(),
  membershipPackage: joi.string().required(),
  startDate: joi.date().iso().required(),
  renewalDate: joi.date().iso().required()
});

const Clientjoi = joi.object({
  fullname: joi.string().required(),
  email: joi.string().email().required(),
  userdp: joi.string(),
  userbio: joi.string(),
  password: joi.string().required(),
  package: joi.string(),
  cart: joi.array().items(joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  wishlist: joi.array().items(joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  productpurchasehistory: joi.array().items(joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  subscriptionHistory: joi.array().items(subscriptionSchema) // Use the subscriptionSchema here
});

module.exports = Clientjoi;
