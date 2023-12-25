const mongoose = require('mongoose');

const Newscat = new mongoose.Schema({
    name: {
    type: 'string',
    }
})

const NewsCategory = mongoose.model('NewsCategory', Newscat);

module.exports = NewsCategory;