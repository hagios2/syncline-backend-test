import { Request, Response, Next } from "restify";
import {
  errorResponse,
  successResponse,
} from "../../server_responses/response";
import AuthService from "../../services/auth/authService"
import { omit } from 'lodash'


class AuthController {
  async addUser(req: Request, res: Response) {
    try {
      const user = await AuthService.createUser(req.body);
      successResponse(req, res, "success", { user: omit(user.toJSON(), 'password')}, 201);
    } catch (error: any) {
      errorResponse(req, res, error.message, 400);
    }
  }

  async login (req: Request, res: Response) {
    try {
      const data = await AuthService.login(req.body)

      return successResponse(req, res, 'success', data)
    } catch (error: any) {

      errorResponse(req, res, error.message, 401)
    }
  }

  async logout (req: Request, res: Response) {
    try {
      await AuthService.logout(req.body)

      return successResponse(req, res, 'success')
    } catch (error: any) {
      return errorResponse(req, res, error.message, 401)
    }
  }

  // async refreshToken (req: Request, res: Response) {
  //   try {
  //     const data = await AuthService.refreshToken(req.body)

  //     return successResponse(req, res, 'success', data)
  //   } catch (error: any) {
  //     return errorResponse(req, res, error.message, 401)
  //   }
  // }

}

export default new AuthController();
