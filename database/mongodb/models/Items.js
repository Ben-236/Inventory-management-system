/**
* Terminal Model
* Stores Terminal details
*/
import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  name:String,
  price:String,
  quantity:String,
  category:Schema.ObjectId,
  image_url:String,
  

}, {
  timestamps: true,
  strict: false,
});

const Item = mongoose.model('Items', schema);

export default Item;
