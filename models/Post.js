import mongoose from 'mongoose'
const { Schema } = mongoose

const PostSchema = new Schema({
    title: String,
    description: String
}, {
    timestamps: true
})

// PostSchema.index({'$**': 'text'})

export default mongoose.model('posts', PostSchema)