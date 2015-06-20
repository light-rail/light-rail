var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var apartmentSchema = new Schema({
  subscriber_id: {type: Schema.Types.ObjectId, ref:'Subscriber', required: true, index: true},
  apartment_name: {type:String, required: true},
  address: {
    street_address: {type:String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip_code: {type: String, required: true}
  },
  phone_number: {type:String, required: true},
  webpage: {type: String, required: true},
  cover_picture: {type: String},

  pictures_array: [
    {
      name: {type: String},
      src: {type: String},
      url: {type: String}
    }
  ],

  units: [
    {
      bedrooms: {type:String, required: true},
      bathrooms: {type:String, required: true},
      monthly_rent: {type:String, required: true},
      square_feet: {type:String, required: true}
    }
  ],
  price_range: {
    min: {type: String},
    max: {type: String}
  },
  amenities: {
    pet_friendly: {type:Boolean, required: true, default: false},
    garage: {type:Boolean, required: true, default: false},
    pool: {type:Boolean, required: true, default: false},
    gym: {type:Boolean, required: true, default: false},
    washer_dryer: {type:Boolean, required: true, default: false}
  },
  description: {type: String},
  additional_amenities: {type:String},
  nearest_stops: [{type: Schema.Types.ObjectId, ref:'TrainStation'}],
  lat: {type:String},
  long: {type:String},
  created_at: {type: Date, required: true, default: Date.now }
 
});

module.exports = mongoose.model('Apartment', apartmentSchema);