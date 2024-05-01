import restify, { Next, Request, Response } from 'restify'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { errorResponse } from '../server_responses/response'

interface CustomRequest extends restify.Request {
  user?: any
}

const SECRET = process.env.SECRET as string

const verifyToken = async (req: CustomRequest, res: Response) => {
  try {
    const bearerHeader = req.headers.authorization

    if (typeof bearerHeader !== 'undefined') {
      const token = bearerHeader.split(' ')[1]

      jwt.verify(token, SECRET, (error, user) => {
        if (error) {
          return errorResponse(req, res, error, 403)
        }
        req.user = user
        return
      })

    } else {
      return errorResponse(req, res, 'User must be authenticated', 403)
    }
  } catch (error) {
    return errorResponse(req, res, error, 401)
  }
}

export { verifyToken, CustomRequest }