var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var UserSchema = new Schema({
  user_id        : { type: ObjectId },
  product_id     : { type: ObjectId },
  size           : { type: String },
  price          : { type: String },
  creatd_at      : { type: Date, default : new Date() }
});

var User = mongoose.model('book', UserSchema);

module.exports = User;