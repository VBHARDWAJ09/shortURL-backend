const mongoose = require("mongoose");

const urlSchema = mongoose.Schema({
    shortUrlId: {
        type: String,
        required: true,
        unique: true
    },
    fullUrl: {
        unique: true,
        type: String,
        required: true
    },
    clicks: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('shorturl', urlSchema)