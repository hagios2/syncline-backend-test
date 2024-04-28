import mongoose, { Document, Schema } from 'mongoose'

interface BlogDocument extends Document {
  title: string,
  content: string,
  publicationDate: Date,
  comments: String
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
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  tags: {
    type: Array,
    required: false
  },
  comments: {
    type: Array,
    required: false
  }
}, {
  timestamps: true
})

const Blog = mongoose.model< BlogDocument >('Blog', blogSchema)

export { Blog, BlogDocument }