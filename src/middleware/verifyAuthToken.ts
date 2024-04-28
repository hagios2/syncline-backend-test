import { Next, Request, Response } from 'restify'
import jwt from 'jsonwebtoken'
// import { log } from '../Logger/logger'
import { errorResponse } from '../server_responses/response'

const SECRET = process.env.SECRET as string

const verifyToken = async (req: Request, res: Response, next: Next) => {
  try {
    const bearerHeader = req.headers.authorization

    if (typeof bearerHeader !== 'undefined') {
      const token = bearerHeader.split(' ')[1]

      jwt.verify(token, SECRET, (error, user) => {
        if (error) {
          return errorResponse(req, res, error, 403)
        }
        req.user = user
        next()
      })
    } else {
      return errorResponse(req, res, 'User must be authenticated', 403)
    }
  } catch (error) {
    return errorResponse(req, res, error, 401)
  }
}

export { verifyToken }