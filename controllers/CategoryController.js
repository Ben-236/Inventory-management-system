/* eslint-disable */
/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
// eslint-disable-next-line no-unused-vars
import express from 'express';
import Response from '../helpers/Response';
import codes from '../helpers/statusCodes';
import CategoryService from '../database/services/CategoryServices';
import Category from '../database/mongodb/models/Category';
import { validateMongoID } from '../helpers/Logger';

class CategoryController {

  /**
* This handles getting category.
* @param {express.Request} req Express request param
* @param {express.Response} res Express response param
*/
  async createCategory(req, res) {
    const { title } = req.body;
    const data = {
      title
    };

    const category = new CategoryService();
    try {
      const createCategory = await category.createCategory(data);

      Response.send(res, codes.success, {
        data: createCategory,
      });
    } catch (error) { Response.handleError(res, error); }
  }


  /**
* This handles Updating category .
* @param {express.Request} req Express request param
* @param {express.Response} res Express response param
*/
  async updateCategory(req, res) {
    const { title } = req.body;

    if (!validateMongoID(req.params.id)) {
      return Response.send(res, codes.badRequest, {
        error: 'Record not found.',
      });
    }

    try {
      const updateCategory = await Category.findByIdAndUpdate({ _id:  req.params.id}, {title: title});
      if (!updateCategory) {
        return Response.send(res, codes.badRequest, {
          error: 'Record not found.',
        });
      }
      Response.send(res, codes.success, {
        data: updateCategory,
      });
    } catch (error) { Response.handleError(res, error); }
  }

  /**
  * This handles getting Category history.
  * @param {express.Request} req Express request param
  * @param {express.Response} res Express response param
  */
  async allCategory(req, res) {

    let {
      page, limit,
    } = req.query;

    limit = Number.isNaN(parseInt(limit, 10)) ? 30 : parseInt(limit, 10);
    page = Number.isNaN(parseInt(page, 10)) ? 1 : parseInt(page, 10);

    try {
      const categories = new CategoryService();
      const result = await categories.allCategory(page, limit);

      Response.send(res, codes.success, {
        data: result,
      });
    } catch (error) { Response.handleError(res, error); }
  }
}

export default new CategoryController();
