var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name            : { type: String },
  description     : { type: String },
  image           : { type: String },
  creatd_at       : { type: Date, default : new Date() }
});

var User = mongoose.model('items', UserSchema);

module.exports = User;