var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReceiptSchema = new Schema({
  lineItems: { type: Schema.Types.ObjectId, ref: 'LineItem' },
}, {collection: 'Receipt'});

mongoose.model('Receipt', ReceiptSchema);