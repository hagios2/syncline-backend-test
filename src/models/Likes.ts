import mongoose, { Document, Schema } from 'mongoose'

interface LikesDocument extends Document {
  user: Schema.Types.ObjectId;
  blog: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const likeSchema = new Schema({
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: false
      },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
}, {
  timestamps: true
})

const Likes = mongoose.model< LikesDocument >('Likes', likeSchema)

export { Likes, LikesDocument }