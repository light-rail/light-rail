var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var apartmentSchema = new Schema({
  subscriber_id: {type: Schema.Types.ObjectId, ref:'Subscriber', required: true, index: true},
  apartment_name: {type:String, required: true},
  address: {
    street: {type:String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip_code: {type: String, required: true}
  },
  phone_number: {type:String, required: true},
  email: {type: String, lowercase: true, required: true},
  website: {type: String, required: true},
  cover_picture: {type: String},

  pictures_array: [
    {
      name: {type: String},
      src: {type: String},
      url: {type: String}
    }
  ],

  apt_options: [
    {
      bedrooms: {type:String, required: true},
      bathrooms: {type:String, required: true},
      price: {type:String, required: true},
      square_feet: {type:String, required: true}
    }
  ],
  price_range: {
    min: {type: String},
    max: {type: String}
  },
  description: {type: String},
  pet_friendly: {type:Boolean, required: true},
  garage: {type:Boolean, required: true},
  pool: {type:Boolean, required: true},
  gym: {type:Boolean, required: true},
  washer_dryer: {type:Boolean, required: true},
  property_details: {type:String},
  nearest_stop: [{type: Schema.Types.ObjectId, ref:'TrainStation'}],
  lat: {type:String},
  long: {type:String},
  created_at: {type: Date, required: true, default: Date.now }
 
});

module.exports = mongoose.model('Apartment', apartmentSchema);