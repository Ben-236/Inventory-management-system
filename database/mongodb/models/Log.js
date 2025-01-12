/* eslint-disable */
/*
* Stores Log details
*/
import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  inventory_id: Schema.ObjectId,
  status: String,
  purchaser: String,
  quantity: String
}, {
  timestamps: true,
  strict: false,
});

const Log = mongoose.model('log', schema);

export default Log;
