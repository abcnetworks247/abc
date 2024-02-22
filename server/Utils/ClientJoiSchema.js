const joi = require("joi");

const Clientjoi = joi.object({
  fullname: joi.string().required(),
  email: joi.string().email().required(),
  userdp: joi.string(),
  userbio: joi.string(),
  phone: joi.number(),
  shippingaddress: joi.string(),
  password: joi.string().required(),
  userpackage: joi.string(),
  cart: joi
    .array()
    .items(joi.string().pattern(/^[0-9a-fA-F]{24}$/), joi.number()),
  wishlist: joi.array().items(joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  productpurchasehistory: joi
    .array()
    .items(joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  donationhistory: joi.array().items(joi.string().pattern(/^[0-9a-fA-F]{24}$/)), // Use the subscriptionSchema here
  subscriptionHistory: joi
    .array()
    .items(joi.string().pattern(/^[0-9a-fA-F]{24}$/)), // Use the subscriptionSchema here
});

module.exports = Clientjoi;
