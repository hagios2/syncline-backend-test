import mongoose, { Document, Schema } from 'mongoose'
import { Blog } from './blog'

interface CategoryDocument extends Document {
  name: String
  blog: Schema.Types.ObjectId[]
  createdAt: Date,
  updatedAt: Date
}

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  blog: [{
    type: Schema.Types.ObjectId,
    ref: 'Blog',
    required: false
  }]
}, {
  timestamps: true
})

const Category = mongoose.model< CategoryDocument >('Category', categorySchema)

export { Category, CategoryDocument }