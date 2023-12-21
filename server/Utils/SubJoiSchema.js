// subscriptionPlan.validation.js
const Joi = require('joi');

const subscriptionJoi = Joi.object({
    user: Joi.string().required(), // Assuming user is a string (user ID)
    price: Joi.number().required(),
    subscriptionType: Joi.string().valid('monthly', 'yearly').required(),
    package: Joi.string().required(),
    paymentType: Joi.string().required(),
    startDate: Joi.date().required(),
    status: Joi.string().required(),
    renewalDate: Joi.date().required(),
});

module.exports = subscriptionJoi;
