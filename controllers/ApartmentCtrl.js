var Apartment = require('../models/Apartment');


module.exports = {

  getAptData: function(req, res) {
    Apartment.find({}, function(error, apartments) {
      return res.json(apartments);
    })
  },

  getNearestStops: function(req, res) {
    Apartment.find({}, 'nearest_stops', function(error, data) {
      console.log(data);
      return res.json(data);
    })
  },
  
  getAddedApt: function(req, res) {
    Apartment.find({_id: req.params.aptId}, function(err, data) {
      if (err) return res.status(500).send(err);
      return res.json(data);
    })
  }

};