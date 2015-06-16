var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;
var q = require('q');

var SubscriberSchema = new Schema({
  company_name: {type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true},
  phone_number: { type: String, required: true },
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
  contact_address: {
     street_address: { type: String},
     city: { type: String },
     state: { type: String },
     zip_code: { type: Number }
  },
  createdAt: { type: Date, default: Date.now }
});


//Pre('save') runs before every user is created
SubscriberSchema.pre('save', function(next) {
  var user = this;
  //passw encryption
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      //console.log(hash)
      user.password = hash;
      next();
    });
  });
});

SubscriberSchema.methods.verifyPassword = function(password) {
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

module.exports = mongoose.model('Subscriber', SubscriberSchema);