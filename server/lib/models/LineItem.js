var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LineItemSchema = new Schema({
  lineItems: { type: Schema.Types.ObjectId, ref: 'LineItem' },
}, {collection: 'LineItem'});

mongoose.model('LineItem', LineItemSchema);
