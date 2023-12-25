const mongoose = require('mongoose');

const Newstypes = new mongoose.Schema({
    name: {
    type: 'string',
    unique: true,
    }
})

const NewsType = mongoose.model('NewsType', Newstypes);

module.exports = NewsType;