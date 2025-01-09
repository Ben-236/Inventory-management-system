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
  inventory_id: Schema.ObjectId,
  status: String,
  purchaser: String,
  quantity: String
}, {
  timestamps: true,
  strict: false
});

var Log = _mongoose2.default.model('log', schema);

exports.default = Log;