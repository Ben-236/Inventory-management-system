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

class ItemController {

  /**
  * This handles creating of an Item.
  * @param {express.Request} req Express request param
  * @param {express.Response} res Express response param
  */
  async addItem(req, res) {
    const filePath = req.body.image_url;
    const {
      name, price, quantity, category,
    } = req.body;

    const data = { name, price, quantity, category, image_url: filePath };    
    console.log("daata ", data);
    
    try {
      const itemServices = new ItemService();
      const item = await itemServices.create(data);

      //update Log model
      const payload = {inventory_id:item._id, status:'added'}
      const logItem = new Log(payload);
      const result = await logItem.save();

      Response.send(res, codes.success, {
        data: item,
      });
    } catch (error) { Response.handleError(res, error); }
  }


  /**
  * This handles updating of an Item.
  * @param {express.Request} req Express request param
  * @param {express.Response} res Express response param
  */
  async updateItem(req, res) {
    
    const { quantity} = req.body;
    const id = req.params.id;
    if (!validateMongoID(id)) {
      return Response.send(res, codes.badRequest, {
        error: 'Record not found.',
      });
    }
  
    const data = { quantity};

    try {
      const updateitem = await Item.findByIdAndUpdate({ _id: id },data);
      if (!updateitem) {
        return Response.send(res, codes.badRequest, {
          error: 'Record not found.',
        });
      }
      //update Log model
      const payload = {inventory_id:updateitem._id, status:'updated'}
      const logItem = new Log(payload);
      const result = await logItem.save();

      Response.send(res, codes.success, {
        data: updateitem,
      });
    } catch (error) { Response.handleError(res, error); }
  }


   /**
  * This handles selling of an Item.
  * @param {express.Request} req Express request param
  * @param {express.Response} res Express response param
  */
   async sellItem(req, res) {
    
    const { quantity} = req.body;
    const id = req.params.id;
    if (!validateMongoID(id)) {
      return Response.send(res, codes.badRequest, {
        error: 'Record not found.',
      });
    }
  

    try {
      const item = await Item.findOne({ _id: id });
      if (!item) {
        return Response.send(res, codes.badRequest, {
          error: 'Record not found.',
        });
      }

      //if item found decrease by number
      const currentQuantity = item.quantity;
      let newQuantity = currentQuantity;
      if(currentQuantity > 0 && currentQuantity >= quantity){
        newQuantity  = currentQuantity - quantity; 
      }

      const data = { quantity: newQuantity}
      const updateitem = await Item.findByIdAndUpdate({ _id: id },data);

      //update Log model
      const payload = {inventory_id:item._id, status:'sold', purchaser: 'system', quantity: quantity,}
      const logItem = new Log(payload);
      const result = await logItem.save();

      Response.send(res, codes.success, {
        data: updateitem,
      });
    } catch (error) { Response.handleError(res, error); }
  }



}


export default new ItemController();
