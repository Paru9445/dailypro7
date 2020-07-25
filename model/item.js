var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name            : { type: String },
  image           : { type: String },
  price           : { type: String },
  description     : { type: String },
  type            : { type: String },
  primary         : { type: String },
  material        : { type: String },
  length          : { type: String },
  breadth         : { type: String },
  height          : { type: String },
  creatd_at       : { type: Date, default : new Date() }
});

var User = mongoose.model('items', UserSchema);

module.exports = User;

// /Name , Category , price, description image , top speed , power , range, weight