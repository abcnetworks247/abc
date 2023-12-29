const mongoose = require('mongoose');

const Productcat = new mongoose.Schema({
    name: {
    type: 'string',
    unique: true,
    default: "Uncategorized"
    }
})

const ProductCategory = mongoose.model('ProductCategory', Productcat);

module.exports = ProductCategory;