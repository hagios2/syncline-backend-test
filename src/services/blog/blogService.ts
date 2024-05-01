import { Blog, BlogDocument } from "../../models/blog"
import { Comment, CommentDocument } from "../../models/comment"
import { Category, CategoryDocument } from "../../models/category"
import { Likes, LikesDocument } from "../../models/Likes"

class BlogService {
  createBlog = async (blogData: BlogDocument) => {
    try {
      console.log(blogData)
       if (blogData.publicationDate === undefined ) {
          blogData.publicationDate = new Date()
       } 
      let category = await Category.findOne({_id: blogData?.category})
      let blog = await Blog.create(blogData)
      category?.blog.push(blog?._id)
      category?.save()
      return blog.populate(['category', 'user'])
    } catch (error: any) {
      throw new Error(error);
    }
  };

  fetchBlog = async () => {
    try {
      let blogs = await Blog.find({}).populate(['comments', 'category', 'user', 'likes']);
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

  addComment = async (id: String, commentDoc: CommentDocument) => {
    try {
      let blog = await Blog.findOne({_id: id})
      commentDoc.blog = blog?._id
      const comment =  await Comment.create(commentDoc)
      blog?.comments.push(comment._id)
      blog?.save()
      return comment.populate('user')
    } catch (error: any) {
      throw new Error(error);
    }
  }

  addBlogLikes = async (id: String, likesDoc: LikesDocument) => {
    try {
      let blog = await Blog.findOne({_id: id})
      likesDoc.blog = blog?._id
      const likes = await Likes.create(likesDoc)
      blog?.likes.push(likes?._id)
      await blog?.save()
      return blog?.populate('likes')
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
