const joi = require("joi");

const CategoryJoi = joi.object({
    name: joi.string().required()
})

module.exports = CategoryJoi;