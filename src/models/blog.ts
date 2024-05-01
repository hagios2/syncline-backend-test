import mongoose, { Document, Schema } from 'mongoose'

interface BlogDocument extends Document {
  title: string;
  content: string;
  publicationDate: Date;
  user: Schema.Types.ObjectId;
  tags: string[];
  likes: Schema.Types.ObjectId[]
  comments: Schema.Types.ObjectId[]
  category: Schema.Types.ObjectId; 
  createdAt: Date;
  updatedAt: Date;
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
    required: true
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
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Likes',
    required: false
  }],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: false
  },
}, {
  timestamps: true
})

const Blog = mongoose.model< BlogDocument >('Blog', blogSchema)

export { Blog, BlogDocument }