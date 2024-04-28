import mongoose, { Document } from 'mongoose'

const { Schema } = mongoose

interface RefreshTokenDocument extends Document
{
    refreshToken: string,
    provider: string,
    createdAt: Date,
    updatedAt: Date
}

const refreshTokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  provider: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

const RefreshToken = mongoose.model< RefreshTokenDocument >('RefreshToken', refreshTokenSchema)

export { RefreshToken, RefreshTokenDocument }