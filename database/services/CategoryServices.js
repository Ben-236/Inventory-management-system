/* eslint-disable */
import Category from "../mongodb/models/Category";


class CategoryService {
  constructor() {
    this.$match = {};
    this.$limit = 50;
    this.$skip = 0;
  }

  async createCategory(data){
    const cat = new Category(data);
    await cat.save();
    return cat;
  }

  /**
   * This gets all category
   * @param {Number} page
   * @param {Number} limit
   * @param {String} search
   * @returns {Array} category
   */
  async allCategory(page = 1, limit = 30) {
    const offset = (page - 1) * limit;

    const filter = { ...this.match };
    let categories = await Category.aggregate([
      { $match: filter },
      { $skip: offset },
      { $limit: limit },
    ]);
    
    return categories;
  }


}

export default CategoryService;
