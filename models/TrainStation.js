var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var trainStationSchema = new Schema ({
  name: {type:String, required: true},
  lat: {type:String, required: true},
  lng: {type:String, required: true}
});

module.exports = mongoose.model('TrainStation', trainStationSchema);