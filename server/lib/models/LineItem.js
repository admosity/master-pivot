var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LineItemSchema = new Schema({
  text: {type: String },
  value: { type: Number, required: true},
  paid: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  receipt: { type: Schema.Types.ObjectId, ref: 'Receipt' },
  description: { type: String },
  phoneNumber: [{ type: String }],
}, {collection: 'LineItem'});

mongoose.model('LineItem', LineItemSchema);
