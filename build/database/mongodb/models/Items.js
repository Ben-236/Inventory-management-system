'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema; /**
                                        * Terminal Model
                                        * Stores Terminal details
                                        */

var schema = new Schema({
  name: String,
  price: String,
  quantity: String,
  category: Schema.ObjectId,
  image_url: String

}, {
  timestamps: true,
  strict: false
});

var Item = _mongoose2.default.model('Items', schema);

exports.default = Item;