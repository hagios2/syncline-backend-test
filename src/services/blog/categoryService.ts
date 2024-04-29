
import { Category, CategoryDocument } from "../../models/category"


class CategoryService {
  fetchCategory = async () => {
    try {
      let categories = await Category.find({}).populate('blog');
      return categories;
    } catch (error: any) {
      throw new Error(error);
    }
  };

  createCategory = async (catData: CategoryDocument) => {
    try {
      let category = await Category.create(catData);
      return category;
    } catch (error: any) {
      throw new Error(error);
    }
  };
}

export default new CategoryService()
