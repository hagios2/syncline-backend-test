import mongoose, { Document, Schema } from 'mongoose'

interface UserDocument extends Document {
  username: string,
  email: string,
  password: string,
  createdAt: Date,
  updatedAt: Date,
  _doc: object
}

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, {
  timestamps: true
})


const User = mongoose.model< UserDocument >('User', userSchema)

export { User, UserDocument }