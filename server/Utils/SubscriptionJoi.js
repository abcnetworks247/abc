const Joi = require("joi");

const donationJoi = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required(),
  amount: Joi.number().required(),
  currency: Joi.string().required(),
  country: Joi.string().required(),
  subscription_period_start: Joi.date().required(),
  subscription_period_end: Joi.date().required(),
  subscription_id: Joi.string().required(),
  plan_id: Joi.string().required(),
  plan_type: Joi.string().required(),
  quantity: Joi.number().required(),
  subscription_status: Joi.string().required(),
  hosted_invoice_url: Joi.string().required(),
  subscription_name: Joi.string().required(),
});

module.exports = donationJoi;
