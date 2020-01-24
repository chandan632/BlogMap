const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        min: 6
    },
    category: {
        type: String,
        trim: true
    },
    visibility: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    tags: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    author: {
        type: String,
        trim: true
    }
})

module.exports = mongoose.model("Blog", schema)