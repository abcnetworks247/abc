const mongoose = require('mongoose');
const FileManagerJoi = require('../Utils/FileManagerJoi')

const fileManagerSchema = new mongoose.Schema({
  PhotoInformation: [FileManagerJoi]
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = fileManagerSchema;
