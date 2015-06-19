var TrainStation = require('../models/TrainStation');

module.exports = {
  createLocation: function(req, res) {
    var newStation = new TrainStation(req.body);
    newStation.save(function(err, station) {
      console.log("saved", station);
      if (err) {
        return res.status(500).send(err);
      }
      return res.json(station);
    })
  },

   getStations: function(req, res) {
    TrainStation.find({}, function(error, data) {
       return res.json(data);
    })
  }

};
