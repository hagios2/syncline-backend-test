import mongoose, { Document, Schema } from 'mongoose'
import { Comment as comment} from './comment'
import { User } from './user'
import { Category, CategoryDocument } from './category'

interface BlogDocument extends Document {
  title: string,
  content: string,
  publicationDate: Date,
  user: String,
  tag: [String],
  comments: [typeof comment],
  category: typeof Category
  createdAt: Date,
  updatedAt: Date
}

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  publicationDate: {
    type: Date,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  tags: [{
    type: String,
    required: false
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    required: false
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
}, {
  timestamps: true
})

const Blog = mongoose.model< BlogDocument >('Blog', blogSchema)

export { Blog, BlogDocument }