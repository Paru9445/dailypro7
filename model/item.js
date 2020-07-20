var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name            : { type: String },
  category        : { type: String },
  image           : { type: String },
  price           : { type: String },
  description     : { type: String },
  top_speed       : { type: String },
  power           : { type: String },
  range           : { type: String },
  weight          : { type: String },
  creatd_at       : { type: Date, default : new Date() }
});

var User = mongoose.model('items', UserSchema);

module.exports = User;

// /Name , Category , price, description image , top speed , power , range, weight