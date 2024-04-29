import { Request, Response } from "restify";
import { errorResponse, successResponse } from "../server_responses/response";
import BlogService from "../services/blog/blogService";

class BlogController {
  async index(req: Request, res: Response) {
    try {
      const response = await BlogService.fetchBlog();
      successResponse(req, res, "success", response, 200);
    } catch (error: any) {
      return errorResponse(req, res, error);
    }
  }

  async create(req: Request, res: Response) {
    try {
      // console.log(req.username, req.userAgent)
      // let blogDeatils = req.body
      // blogDeatils.user = req.user 
      const response = await BlogService.createBlog(req.body);
      successResponse(req, res, "success", response, 201);
    } catch (error: any) {
      return errorResponse(req, res, error);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const response = await BlogService.updateBlog(req.params.id, req.body)
      successResponse(req, res, "success", { response }, 200);
    } catch (error: any) {
      return errorResponse(req, res, error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const response = await BlogService.deleteBlog(req.params.id);
      successResponse(req, res, "success", response, 204);
    } catch (error: any) {
      return errorResponse(req, res, error);
    }
  }

  async addComment(req: Request, res: Response) {
    try {
      const response = await BlogService.addComment(req.params.id, req.body);
      successResponse(req, res, "success", response, 201);
    } catch (error: any) {
      return errorResponse(req, res, error);
    }
  }
}

export default new BlogController();
