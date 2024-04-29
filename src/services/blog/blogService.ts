import { Blog, BlogDocument } from "../../models/blog"
import { Comment, CommentDocument } from "../../models/comment"
import { Category, CategoryDocument } from "../../models/category"


class BlogService {
  createBlog = async (blogData: BlogDocument) => {
    try {
      let category = await Category.findOne({_id: blogData?.category})
      let blog = await Blog.create(blogData)
      category?.blog.push(blog?._id)
      category?.save()
      return blog.populate(['category'])
    } catch (error: any) {
      throw new Error(error);
    }
  };

  fetchBlog = async () => {
    try {
      let blogs = await Blog.find({}).populate(['comments', 'category']);
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

  addComment = async (id: String, CommentDoc: CommentDocument) => {
    try {
      let blog = await Blog.findOne({_id: id})
      CommentDoc.blog = blog?._id
      const comment =  await Comment.create(CommentDoc)
      blog?.comments.push(comment._id)
      blog?.save()
      return comment
    } catch (error: any) {
      throw new Error(error);
    }
  }

  createCategory = async (catData: CategoryDocument) => {
    try {
      let category = await Category.create(catData);
      return category;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default new BlogService();
