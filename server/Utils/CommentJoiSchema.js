const joi = require("joi");

const CommentJoiSchema = joi.object({
  usercomment: joi.string().required(),
  userid: joi.string().pattern(/^[0-9a-fA-F]{24}$/).required(),
});

module.exports = CommentJoiSchema;
