// import { DocumentDefinition } from 'mongoose'
import { User, UserDocument } from '../../models/user'
import bcrypt from 'bcrypt'
import { omit } from 'lodash'

class UserService {
    createUser = async (newUser: UserDocument) => {
      try {
        newUser.password = await bcrypt.hash(newUser.password, 10)
        let user = await User.create(newUser)
        return user
      } catch (error: any) {
        throw new Error(error)
      }
    }
}

export default new UserService()