const mongoose = require('mongoose');

const Productcat = new mongoose.Schema({
    name: {
    type: 'string',
    }
})

const ProductCategory = mongoose.model('ProductCategory', Productcat);

module.exports = ProductCategory;