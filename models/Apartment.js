var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var apartmentSchema = new Schema({
  subscriber_id: {type: Schema.Types.ObjectId, ref:'Subscriber', index: true},
  apartment_name: {type:String, required: true},
  address: {
    street_address: {type:String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    zip_code: {type: String, required: true}
  },
  phone_number: {type:String},
  webpage: {type: String},
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
      bedrooms: {type:String},
      bathrooms: {type:String},
      monthly_rent: {type:String},
      square_feet: {type:String}
    }
  ],
  price_range: {
    min: {type: String},
    max: {type: String}
  },
  amenities: {
    pet_friendly: {type:Boolean, default: false},
    garage: {type:Boolean,  default: false},
    pool: {type:Boolean,  default: false},
    gym: {type:Boolean,  default: false},
    washer_dryer: {type:Boolean,  default: false}
  },
  description: {type: String},
  additional_amenities: {type:String},
  nearest_stops: [{type: Schema.Types.ObjectId, ref:'TrainStation'}],
  location: {
    lat: {type:String},
    long: {type:String}
  },
  created_at: {type: Date, default: Date.now }
 
});

module.exports = mongoose.model('Apartment', apartmentSchema);