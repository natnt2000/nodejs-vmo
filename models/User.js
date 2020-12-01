const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcrypt')

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

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) next()

    try {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        console.log(error)
    }
})

UserSchema.methods.verifyPassword = function (data) {
    return bcrypt.compare(data, this.password)
}

module.exports = mongoose.model('Users', UserSchema)