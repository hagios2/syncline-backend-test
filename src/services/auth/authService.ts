import { User, UserDocument } from '../../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RefreshToken, RefreshTokenDocument } from '../../models/refreshToken'
import dotenv from 'dotenv'
import { omit } from 'lodash'

dotenv.config()

class AuthService {
    private SECRET = process.env.SECRET as string
    private REFRESH_SECRET = process.env.REFRESH_SECRET as string

    createUser = async (newUser: UserDocument) => {
      try {
        newUser.password = await bcrypt.hash(newUser.password, 10)
        let user = await User.create(newUser)
        return user
      } catch (error: any) {
        throw new Error(error)
      }
    }

    login = async (userCredentials: UserDocument) => {
      try {
        let user = await User.findOne({ email: userCredentials.email }).select('+password')
  
        if (!user) {
          throw new Error('Invalid Credentials')
        }
  
        if (user && await bcrypt.compare(userCredentials.password, user.password)) {
          const token = jwt.sign({ user }, this.SECRET, { expiresIn: '30mins' })
          const refreshToken = jwt.sign({ user }, this.REFRESH_SECRET, { expiresIn: '1d' })
  
          if (token && refreshToken) {
            await RefreshToken.create({ refreshToken, provider: 'user' })

            let authUser = user._doc

            authUser =  omit(authUser, 'password')
  
            return { token, refreshToken, authUser }
          }

          throw new Error('something went wrong')
        }
        throw new Error('Invalid Credentials')
      } catch (error: any) {
        throw new Error(error)
      }
    }
  
    logout = async (auth: RefreshTokenDocument ) => {
      try {
        const refreshToken = auth.refreshToken
  
        const existingToken = await RefreshToken.findOne({ refreshToken, provider: 'user' })
  
        if (!existingToken) {
          throw new Error('Invalid token')
        }
  
        await RefreshToken.deleteOne({ refreshToken, provider: 'user' })
      } catch (error: any) {
        throw new Error(error)
      }
    }
}

export default new AuthService()