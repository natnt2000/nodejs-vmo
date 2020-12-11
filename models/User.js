import mongoose from 'mongoose'
const { Schema } = mongoose
import bcrypt from 'bcrypt'

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

// Methods: user.verifyPassword
UserSchema.methods.verifyPassword = function (candidatePassword, targetPassword) {
    return bcrypt.compare(candidatePassword, targetPassword)
}

/*
// Statics method: User.verifyPassword
UserSchema.statics.verifyPassword = function (candidatePassword, targetPassword) {
    return bcrypt.compare(candidatePassword, targetPassword)
}
*/

export default mongoose.model('Users', UserSchema)