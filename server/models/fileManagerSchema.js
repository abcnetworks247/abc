const mongoose = require("mongoose");

const FileManagerSchema = new mongoose.Schema({
    originalname: { type: String, required: true },
    format: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    created_at: { type: String, required: true },
    secure_url: { type: String, required: true },
}, {
    timestamps: true,
});

const FileManager = mongoose.model("FileManager", FileManagerSchema);

module.exports = FileManager;
