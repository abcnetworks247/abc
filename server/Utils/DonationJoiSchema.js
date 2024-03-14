const Joi = require("joi");

const donationJoi = Joi.object({
  email: Joi.string().required(),
  name: Joi.string().required(),
  amount: Joi.number().required(),
  currency: Joi.string().required(),
  donation_Date: Joi.string().required(),
  donation_Time: Joi.string().required(),
  payment_status: Joi.string().required(),
  payment_method_types: Joi.string().required(),
  transaction_Id: Joi.string().required(),
  
});

module.exports = donationJoi;
