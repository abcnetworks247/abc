const joi = require('joi');

const Adminjoi = joi.object({
  fullname: joi.string().required(),
  email: joi.string().email().required(),
  userdp: joi.string(),
  userbio: joi.string(),
  password: joi.string().required(),
  role: joi.string().required(),
  mypost: joi.array().items(joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
});

module.exports = Adminjoi;
