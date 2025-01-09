'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _trimInputs = require('../middlewares/trimInputs');

var _trimInputs2 = _interopRequireDefault(_trimInputs);

var _validateInputs = require('../middlewares/validateInputs');

var _validateInputs2 = _interopRequireDefault(_validateInputs);

var _validationRules = require('../middlewares/validationRules');

var _ItemController = require('../controllers/ItemController');

var _ItemController2 = _interopRequireDefault(_ItemController);

var _multerUpload = require('../middlewares/multerUpload');

var _multerUpload2 = _interopRequireDefault(_multerUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Routes of '/item'
 */
var itemRouter = _express2.default.Router();

itemRouter.route('/create').post((0, _multerUpload2.default)('image_url'), _trimInputs2.default, (0, _validateInputs2.default)(_validationRules.itemRules), _ItemController2.default.addItem);
itemRouter.route('/update/:id').patch(_trimInputs2.default, _ItemController2.default.updateItem);
itemRouter.route('/sell/:id').patch(_ItemController2.default.sellItem);

exports.default = itemRouter;