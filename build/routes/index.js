'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _statusCodes = require('../helpers/statusCodes');

var _statusCodes2 = _interopRequireDefault(_statusCodes);

var _Response = require('../helpers/Response');

var _Response2 = _interopRequireDefault(_Response);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Router
 */
var route = function route(app) {
  app.use('/api/v1/item', _item2.default);
  app.use('/api/v1/categories', _category2.default);

  app.get('/', function (req, res) {
    return _Response2.default.send(res, _statusCodes2.default.success, {
      message: 'This app is running!!!'
    });
  });
  app.get('/api', function (req, res) {
    return _Response2.default.send(res, _statusCodes2.default.success, {
      message: 'This app is running!!!'
    });
  });
  app.get('/api/v1', function (req, res) {
    return _Response2.default.send(res, _statusCodes2.default.success, {
      message: 'This is version 1.0.1!'
    });
  });

  app.get('*', function (req, res) {
    return _Response2.default.send(res, _statusCodes2.default.notFound, {
      error: 'Endpoint not found.'
    });
  });
};

exports.default = route;