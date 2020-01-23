const mongoose = require("mongoose")
const valid = require("validator")

const schema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        min: 6
    },
    email: {
        type: String,
        trim: true,
        required: true,
        min: 6,
        validate: function (val) {
            return valid.isEmail(val)
        }
    },
    phnumber: {
        type: Number,
        trim: true,
        min: 10
    },
    password: {
        type: String,
        trim: true,
        required: true,
        min: 6
    }
})

module.exports = mongoose.model("User", schema)