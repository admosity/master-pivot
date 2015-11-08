var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LineItemSchema = new Schema({
  text: {type: Number, required: true },
  paid: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  receipt: { type: Schema.Types.ObjectId, ref: 'Receipt' },
  description: { type: String },
}, {collection: 'LineItem'});

mongoose.model('LineItem', LineItemSchema);
