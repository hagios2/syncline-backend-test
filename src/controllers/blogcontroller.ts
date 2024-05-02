import { Request, Response } from "restify";
import { errorResponse, successResponse } from "../server_responses/response";
import BlogService from "../services/blog/blogService";
import { CustomRequest } from "../middleware/verifyAuthToken";

class BlogController {
  async index(req: Request, res: Response) {
    try {
      const response = await BlogService.fetchBlog();
      successResponse(req, res, "success", response, 200);
    } catch (error: any) {
      errorResponse(req, res, error.message);
    }
  }

  async create(req: CustomRequest, res: Response) {
    try {
      let blogDetails = req.body
      blogDetails.user = req.user?.user?._id
      const response = await BlogService.createBlog(blogDetails);
      successResponse(req, res, "success", response, 201);
    } catch (error: any) {
      errorResponse(req, res, error.message);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const response = await BlogService.updateBlog(req.params.id, req.body)
      successResponse(req, res, "success", { response }, 200);
    } catch (error: any) {
      errorResponse(req, res, error.message);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const response = await BlogService.deleteBlog(req.params.id);
      successResponse(req, res, "success", response, 204);
    } catch (error: any) {
      errorResponse(req, res, error.message);
    }
  }

  async getBlogComment(req: Request, res: Response) {
    try {
      let response = await BlogService.getBlockLikes(req.params.id);
      successResponse(req, res, "success", response, 200);
    } catch (error: any) {
      errorResponse(req, res, error.message, 400);
    }
  }

  async addComment(req: CustomRequest, res: Response) {
    try {
      let data = req.body
      data.user = req.user?.user?._id
      const response = await BlogService.addComment(req.params.id, req.body);
      successResponse(req, res, "success", response, 201);
    } catch (error: any) {
      errorResponse(req, res, error.message, 400);
    }
  }

  async addBlogLike(req: CustomRequest, res: Response) {
    try {
      // console.log(req.user.user)
      let data = req.body
      data.user = req.user?.user?._id
      const response = await BlogService.addBlogLikes(req.params.id, data);
      successResponse(req, res, "success", response, 201);
    } catch (error: any) {
      errorResponse(req, res, error.message, 500);
    }
  }
}

export default new BlogController();
