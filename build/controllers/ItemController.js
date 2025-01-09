'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _Response = require('../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

var _statusCodes = require('../helpers/statusCodes');

var _statusCodes2 = _interopRequireDefault(_statusCodes);

var _Log = require('../database/mongodb/models/Log');

var _Log2 = _interopRequireDefault(_Log);

var _Items = require('../database/mongodb/models/Items');

var _Items2 = _interopRequireDefault(_Items);

var _Logger = require('../helpers/Logger');

var _ItemServices = require('../database/services/ItemServices');

var _ItemServices2 = _interopRequireDefault(_ItemServices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
// eslint-disable-next-line no-unused-vars
var ItemController = function () {
  function ItemController() {
    (0, _classCallCheck3.default)(this, ItemController);
  }

  (0, _createClass3.default)(ItemController, [{
    key: 'addItem',


    /**
    * This handles creating of an Item.
    * @param {express.Request} req Express request param
    * @param {express.Response} res Express response param
    */
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res) {
        var filePath, _req$body, name, price, quantity, category, data, itemServices, item, payload, logItem, result;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                filePath = req.body.image_url;
                _req$body = req.body, name = _req$body.name, price = _req$body.price, quantity = _req$body.quantity, category = _req$body.category;
                data = { name: name, price: price, quantity: quantity, category: category, image_url: filePath };

                console.log("daata ", data);

                _context.prev = 4;
                itemServices = new _ItemServices2.default();
                _context.next = 8;
                return itemServices.create(data);

              case 8:
                item = _context.sent;


                //update Log model
                payload = { inventory_id: item._id, status: 'added' };
                logItem = new _Log2.default(payload);
                _context.next = 13;
                return logItem.save();

              case 13:
                result = _context.sent;


                _Response2.default.send(res, _statusCodes2.default.success, {
                  data: item
                });
                _context.next = 20;
                break;

              case 17:
                _context.prev = 17;
                _context.t0 = _context['catch'](4);
                _Response2.default.handleError(res, _context.t0);
              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[4, 17]]);
      }));

      function addItem(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return addItem;
    }()

    /**
    * This handles updating of an Item.
    * @param {express.Request} req Express request param
    * @param {express.Response} res Express response param
    */

  }, {
    key: 'updateItem',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(req, res) {
        var quantity, id, data, updateitem, payload, logItem, result;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                quantity = req.body.quantity;
                id = req.params.id;

                if ((0, _Logger.validateMongoID)(id)) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt('return', _Response2.default.send(res, _statusCodes2.default.badRequest, {
                  error: 'Record not found.'
                }));

              case 4:
                data = { quantity: quantity };
                _context2.prev = 5;
                _context2.next = 8;
                return _Items2.default.findByIdAndUpdate({ _id: id }, data);

              case 8:
                updateitem = _context2.sent;

                if (updateitem) {
                  _context2.next = 11;
                  break;
                }

                return _context2.abrupt('return', _Response2.default.send(res, _statusCodes2.default.badRequest, {
                  error: 'Record not found.'
                }));

              case 11:
                //update Log model
                payload = { inventory_id: updateitem._id, status: 'updated' };
                logItem = new _Log2.default(payload);
                _context2.next = 15;
                return logItem.save();

              case 15:
                result = _context2.sent;


                _Response2.default.send(res, _statusCodes2.default.success, {
                  data: updateitem
                });
                _context2.next = 22;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2['catch'](5);
                _Response2.default.handleError(res, _context2.t0);
              case 22:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[5, 19]]);
      }));

      function updateItem(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return updateItem;
    }()

    /**
    * This handles selling of an Item.
    * @param {express.Request} req Express request param
    * @param {express.Response} res Express response param
    */

  }, {
    key: 'sellItem',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var quantity, id, item, currentQuantity, newQuantity, data, updateitem, payload, logItem, result;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                quantity = req.body.quantity;
                id = req.params.id;

                if ((0, _Logger.validateMongoID)(id)) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt('return', _Response2.default.send(res, _statusCodes2.default.badRequest, {
                  error: 'Record not found.'
                }));

              case 4:
                _context3.prev = 4;
                _context3.next = 7;
                return _Items2.default.findOne({ _id: id });

              case 7:
                item = _context3.sent;

                if (item) {
                  _context3.next = 10;
                  break;
                }

                return _context3.abrupt('return', _Response2.default.send(res, _statusCodes2.default.badRequest, {
                  error: 'Record not found.'
                }));

              case 10:

                //if item found decrenase by number
                currentQuantity = item.quantity;
                newQuantity = currentQuantity;

                if (currentQuantity > 0 && currentQuantity >= quantity) {
                  newQuantity = currentQuantity - quantity;
                }

                data = { quantity: newQuantity };
                _context3.next = 16;
                return _Items2.default.findByIdAndUpdate({ _id: id }, data);

              case 16:
                updateitem = _context3.sent;


                //update Log model
                payload = { inventory_id: item._id, status: 'sold', purchaser: 'system', quantity: quantity };
                logItem = new _Log2.default(payload);
                _context3.next = 21;
                return logItem.save();

              case 21:
                result = _context3.sent;


                _Response2.default.send(res, _statusCodes2.default.success, {
                  data: updateitem
                });
                _context3.next = 28;
                break;

              case 25:
                _context3.prev = 25;
                _context3.t0 = _context3['catch'](4);
                _Response2.default.handleError(res, _context3.t0);
              case 28:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[4, 25]]);
      }));

      function sellItem(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return sellItem;
    }()
  }]);
  return ItemController;
}();

exports.default = new ItemController();