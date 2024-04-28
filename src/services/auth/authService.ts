import { User, UserDocument } from '../../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RefreshToken, RefreshTokenDocument } from '../../models/refreshToken'
import dotenv from 'dotenv'

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
        const user = await User.findOne({ email: userCredentials.email }).select({password: true}).exec()
  
        if (!user) {
          throw new Error('Invalid Credentials')
        }
  
        if (await bcrypt.compare(userCredentials.password, user.password)) {
          const token = jwt.sign({ user }, this.SECRET, { expiresIn: '1day' })
          const refreshToken = jwt.sign({ user }, this.REFRESH_SECRET, { expiresIn: '1y' })
  
          if (token && refreshToken) {
            await RefreshToken.create({ refreshToken, provider: 'user' })
  
            return { token, refreshToken }
          }

          throw new Error('something went wrong')
        }
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