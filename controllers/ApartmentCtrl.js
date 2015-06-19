var Apartment = require('../models/Apartment');


module.exports = {

  getAptData: function(req, res) {
    Apartment.find({}, function(error, data) {
      console.log(data);
      return res.json(data);
    })
  },

  getNearestStops: function(req, res) {
    Apartment.find({}, 'nearest_stops', function(error, data) {
      console.log(data);
      return res.json(data);
    })
  }


};