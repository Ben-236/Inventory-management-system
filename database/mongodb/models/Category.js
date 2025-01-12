/* eslint-disable */
/**
Stores Category details
*/
import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  title: String
}, {
  timestamps: true,
  strict: false,
});

const Category = mongoose.model('Category', schema);

export default Category;
