const mongoose = require('mongoose');
const { hashSync } = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: ''
    }
})

userSchema.set('password', hashSync);

module.exports = mongoose.model('users', userSchema);