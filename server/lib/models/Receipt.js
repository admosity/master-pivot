var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ReceiptSchema = new Schema({

}, {collection: 'Receipt'});

mongoose.model('Receipt', ReceiptSchema);
