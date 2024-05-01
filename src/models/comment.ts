import mongoose, { Document, Schema } from 'mongoose'
import { Blog } from './blog'
interface CommentDocument extends Document {
  comment: String
  blog: Schema.Types.ObjectId
  user: Schema.Types.ObjectId
  createdAt: Date,
  updatedAt: Date
}

const commentSchema = new Schema({
  comment: {
    type: String,
    required: true,
    trim: true
  },
  blog: {
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: false
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }

}, {
  timestamps: true
})

const Comment = mongoose.model< CommentDocument >('Comment', commentSchema)

export { Comment, CommentDocument }