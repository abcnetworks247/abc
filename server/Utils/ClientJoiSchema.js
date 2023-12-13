const joi = require('joi');

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
});

module.exports = Clientjoi;
