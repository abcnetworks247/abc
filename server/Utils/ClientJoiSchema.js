const joi = require('joi');
const SubscriptionJoiSchema = require('./SubJoiSchema')

const Clientjoi = joi.object({
  fullname: joi.string().required(),
  email: joi.string().email().required(),
  userdp: joi.string(),
  userbio: joi.string(),
  phone: joi.string(),
  shippingaddress: joi.string(),
  password: joi.string().required(),
  userpackage: joi.string(),
  cart: joi.array().items(joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  wishlist: joi.array().items(joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  productpurchasehistory: joi.array().items(joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  subscriptionHistory: joi.array().items(SubscriptionJoiSchema) // Use the subscriptionSchema here
});

module.exports = Clientjoi;
