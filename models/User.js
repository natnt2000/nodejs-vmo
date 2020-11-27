const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    role: String,
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: Date
})

module.exports = mongoose.model('Users', UserSchema)