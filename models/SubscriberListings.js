var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var subscriberListingSchema = new Schema({
  apartment: [{type:Schema.Types.ObjectId, ref:'Apartment' }]
  // hotel: [{type:Schema.Types.ObjectId, ref:'Stop' }],
  // real_estate: [{type:Schema.Types.ObjectId, ref:'Stop' }]
});

module.exports = mongoose.model('SubscriberListing', subscriberListingSchema);