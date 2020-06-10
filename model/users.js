var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/daily1', {
    useUnifiedTopology: true
});

var UserSchema = new Schema({
  name            : { type: String },
  email           : { type: String, default: "", unique: true },
  password        : { type: String, default: "" },
  mobile          : { type: String, default: "", unique: true },
  address         : { type: String, default: "" },
  creatd_at       : { type: Date, default : new Date() }
});

var User = mongoose.model('users', UserSchema);

module.exports = User;