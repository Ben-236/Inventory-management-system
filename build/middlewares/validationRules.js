'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var itemRules = [{
  field: 'name',
  rules: 'required',
  messages: {
    required: 'Name is required.'
  }
}, {
  field: 'price',
  rules: 'required'
}, {
  field: 'quantity',
  rules: 'required'
}, {
  field: 'category',
  rules: 'required'
}, {
  field: 'image_url',
  rules: 'required'
}];

var categoryRules = [{
  field: 'title',
  rules: 'required',
  messages: {
    required: 'Category is required.'
  }
}];

exports.itemRules = itemRules;
exports.categoryRules = categoryRules;