var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var apartmentSchema = new Schema({
  apartment_name: {type:String, required: true},
  address: {type:String, required: true},
  phone_number: {type:String, required: true},
  email: {type:String, unique: true, lowercase: true, required: true},
  website: {type:String, required: true},

  apt_options: [
    {
      bedrooms: {type:String, required: true},
      bathrooms: {type:String, required: true},
      price: {type:String, required: true},
      square_feet: {type:String, required: true},
      price: {type:String, required: true}
    }
  ],

  pet_friendly: {type:Boolean, required: true},
  garage: {type:Boolean, required: true},
  pool: {type:Boolean, required: true},
  gym: {type:Boolean, required: true},
  washer_dryer: {type:Boolean, required: true},
  property_details: {type:String},
  nearest_stop: [{type: Schema.Types.ObjectId, ref:'TrainStation'}],
  lat: {type:String},
  long: {type:String}
 
});

module.exports = mongoose.model('Apartment', apartmentSchema);