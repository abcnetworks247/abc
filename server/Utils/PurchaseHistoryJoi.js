const Joi = require("joi");

const purchaseJoi = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  amount: Joi.number().required(),
  currency: Joi.string().required(),
  payment_Date: Joi.date().required(),
  payment_Time: Joi.string().required(),
  cart: Joi.array().items(Joi.object()),
  payment_status: Joi.string(),
  payment_method_types: Joi.string(),
  transaction_Id: Joi.string(),
  phone: Joi.string().required(),
  address: Joi.string(),
  city: Joi.string(),
  postal_code: Joi.string(),
  state: Joi.string(),
  country: Joi.string(),
});

module.exports = purchaseJoi;
