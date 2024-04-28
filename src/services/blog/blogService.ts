import { Blog, BlogDocument } from "../../models/blog"

class BlogService {
  createBlog = async (blogData: BlogDocument) => {
    try {
      let blog = await Blog.create(blogData);
      return blog;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  fetchBlog = async () => {
    try {
      let blogs = await Blog.find({});
      return blogs;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  updateBlog = async (id: String, blogDoc: BlogDocument) => {
    try {
      let blog = await Blog.findOneAndUpdate({ _id: id }, blogDoc);
      return blog;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  deleteBlog = async (id: String) => {
    try {
      await Blog.findOneAndDelete({ _id: id });
      return {};
    } catch (error: any) {
      throw new Error(error);
    }
  };

  addComment = async (id: String, blogDoc: BlogDocument) => {
    try {
      await Blog.findOneAndUpdate({ _id: id }, blogDoc);
      return {};
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default new BlogService();
