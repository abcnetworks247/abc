const joi = require('joi');

const Adminjoi = joi.object({
  fullname: joi.string().required(),
  email: joi.string().email().required(),
  userdp: joi.string(),
  userbio: joi.string(),
  password: joi.string().required(),
  role: joi.string(),
});

module.exports = Adminjoi;
