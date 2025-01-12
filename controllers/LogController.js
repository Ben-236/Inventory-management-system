/* eslint-disable */
/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
// eslint-disable-next-line no-unused-vars
import Response from '../helpers/Response';
import codes from '../helpers/statusCodes';
import Log from '../database/mongodb/models/Log';
import Item from '../database/mongodb/models/Items';
import { validateMongoID } from '../helpers/Logger';
import ItemService from '../database/services/ItemServices';
import LogService from '../database/services/LogServices';

class LogController {

  /**
  * This handles all Logs.
  * @param {express.Request} req Express request param
  * @param {express.Response} res Express response param
  */

  async allLogs(req, res) {

    let {
      page, limit, search
    } = req.query;

    limit = Number.isNaN(parseInt(limit, 10)) ? 30 : parseInt(limit, 10);
    page = Number.isNaN(parseInt(page, 10)) ? 1 : parseInt(page, 10);

    try {
      const logs = new LogService();
      const result = await logs.allLogs(page, limit, search);

      Response.send(res, codes.success, {
        data: result,
      });
    } catch (error) { Response.handleError(res, error); }
  }



}


export default new LogController();
