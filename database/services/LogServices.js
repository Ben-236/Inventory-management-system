/* eslint-disable */
import Log from "../mongodb/models/Log";


class LogService {
  constructor() {
    this.$match = {};
    this.$limit = 50;
    this.$skip = 0;
  }


  /**
   * This gets all logs
   * @param {Number} page
   * @param {Number} limit
   * @param {String} search
   * @returns {Array} logs
   */
  async allLogs(page = 1, limit = 30, search= '') {
    const offset = (page - 1) * limit;
      console.log('search', search)
    const filter = { ...this.match };
    if (search != '') {
      filter['status'] = search
    } 
    console.log('logs ', filter);
    
    let logs = await Log.aggregate([
      { $match: filter },
      { $skip: offset },
      { $limit: limit },
    ]);
    
    return logs;
  }


}

export default LogService;
