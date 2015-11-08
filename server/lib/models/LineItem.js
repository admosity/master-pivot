var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LineItemSchema = new Schema({
  value: {type: Number, required: true },
  paid: { type: Boolean, default: false },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
}, {collection: 'LineItem'});

mongoose.model('LineItem', LineItemSchema);
