import { Request, Response, Next } from "restify";
import {
  errorResponse,
  successResponse,
} from "../../server_responses/response";
import UserService from "../../services/auth/Userservice";

class Signup {
  async addUser(req: Request, res: Response) {
    try {
      const response = await UserService.createUser(req.body);
      successResponse(req, res, "success", response, 201);
    } catch (error: any) {
      return errorResponse(req, res, error);
    }
  }
}

export default new Signup();
