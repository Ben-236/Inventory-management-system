/* eslint-disable */
import Item from "../mongodb/models/Items";


class ItemService {
  constructor() {
    this.$match = {};
    this.$limit = 50;
    this.$skip = 0;
  }

  async create(data) {
    const item = new Item(data);
    await item.save();
    return item;
  }

  /**
     * This gets all items for given filter
     * @param {Number} page
     * @param {Number} limit
     * @returns {Array} items
     */
  async getAll(page = 1, limit = 30) {
    const offset = (page - 1) * limit;
    const filter = { ...this.match };

    let items = await items.aggregate([
      { $match: filter },
      { $skip: offset },
      { $limit: limit },
    ]);
  
    return items;
  }

}

export default ItemService;
