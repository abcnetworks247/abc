const Joi = require('joi');

const FileJoiSchema = Joi.object({
  originalname: Joi.string.required(),
  format: Joi.string().required(),
  width: Joi.number().required(),
  height: Joi.number().required(),
  created_at: Joi.date().required(),
  secure_url: Joi.string().required(),
});

module.exports = FileJoiSchema;
