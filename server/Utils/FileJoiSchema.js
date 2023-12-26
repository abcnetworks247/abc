const joi = require("joi");

const FilemanagerjoiSchema = joi.object({
  originalname: joi.string().required(),
  format: joi.string().required(),
  width: joi.number().required(),
  height: joi.number().required(),
  created_at: joi.string().required(),
  secure_url: joi.string().required(),
});

module.exports = FilemanagerjoiSchema;
