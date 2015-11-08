var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true, select: false}
}, {collection: 'User'});

mongoose.model('User', UserSchema);
