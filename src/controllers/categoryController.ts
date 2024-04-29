import { Request, Response } from "restify";
import { errorResponse, successResponse } from "../server_responses/response";
import CategoryService from "../services/blog/categoryService";

class CategoryController {
  async index(req: Request, res: Response) {
    try {
      const response = await CategoryService.fetchCategory();
      successResponse(req, res, "success", response, 200);
    } catch (error: any) {
      return errorResponse(req, res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      const response = await CategoryService.createCategory(req.body);
      successResponse(req, res, "success", response, 201);
    } catch (error: any) {
      return errorResponse(req, res, error);
    }
  }
}

export default new CategoryController();
