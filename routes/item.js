import express from 'express';
import trimInputs from '../middlewares/trimInputs';
import validateInputs from '../middlewares/validateInputs';
import {itemRules} from '../middlewares/validationRules';
import ItemController from '../controllers/ItemController';
import multerUpload from '../middlewares/multerUpload';

/**
 * Routes of '/item'
 */
const itemRouter = express.Router();

itemRouter.route('/create').post(multerUpload('image_url'), trimInputs, validateInputs(itemRules), ItemController.addItem);
itemRouter.route('/update/:id').patch(trimInputs, ItemController.updateItem);
itemRouter.route('/sell/:id').patch(ItemController.sellItem);

export default itemRouter;
