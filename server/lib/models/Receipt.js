var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReceiptSchema = new Schema({
  lineItems: [{ type: Schema.Types.ObjectId, ref: 'LineItem' }],
  status: { type: String, default: 'pending' },
}, {collection: 'Receipt'});

mongoose.model('Receipt', ReceiptSchema);
