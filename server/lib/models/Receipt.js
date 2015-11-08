var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReceiptSchema = new Schema({
  lineItems: [{ type: Schema.Types.ObjectId, ref: 'LineItem' }],
  status: { type: String, default: 'pending' },
  phoneNumber: { type: String }
}, {collection: 'Receipt'});

mongoose.model('Receipt', ReceiptSchema);
