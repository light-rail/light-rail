var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var q = require('q');

var UserSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String},
  phone_number: { type: Number },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  user_type: { type: String },
  city: { type: String },
  state: { type: String },
  zip_code: { type: Number },
  country: { type: String },
  createdAt: { type: Date, default: Date.now }
});


//Pre('save') runs before every user is created
UserSchema.pre('save', function(next) {
  var user = this;
  //passw encryption
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      //console.log(hash)
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.verifyPassword = function(password) {
  var deferred = q.defer();
  var user = this;
  bcrypt.compare(password, user.password, function(err, res) {
    if (err) {
      deferred.resolve(false);
    }
    deferred.resolve(true);
  });
  return deferred.promise;
}

module.exports = mongoose.model('User', UserSchema);
