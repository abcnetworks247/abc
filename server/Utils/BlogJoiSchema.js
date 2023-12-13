const joi = require("joi");
const commentSchema = require("./CommentJoiSchema");

const BlogJoiSchema = joi.object({
  title: joi.string().required(),
  shortdescription: joi.string().required(),
  longdescription: joi.string().required(),
  category: joi.string().required(),
  author: joi.object().required(),
  blogimage: joi.string().required(),
  view: joi.number(),
  like: joi.array().items(joi.string().pattern(/^[0-9a-fA-F]{24}$/)),
  comment: joi.array().items(commentSchema),
});

module.exports = BlogJoiSchema;
