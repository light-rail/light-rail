var Subscriber = require('../models/Subscriber');
var Apartment = require('../models/Apartment');

module.exports = {

  createSubscriber: function(req, res) {
    var newSubscriber = new Subscriber(req.body);
    newSubscriber.save(function(err, result) {
      console.log('err: ', err);
      if (err) {
        if (err.code === 500) return res.status(500).json(err);
        if (err.code === 11000) return res.status(11000).json(err);
      }
      res.send(result);
    });
  },

  loginSubscriber: function(req, res) {
    return res.json(req.user);
  },

  isLoggedIn: function(req, res) {
    if (req.isAuthenticated()) {
      return res.status(200).json(req.user);
    } else {
      return res.status(204).json('Not Authenticated')
    }
  },

  getListings: function(req, res) {
    Apartment.find({subscriber_id: req.query.id})
      .exec(function(err, apartments) {
        if(!err) {
          return res.status(200).json(apartments);
        }

        return res.status(500).json(err);
      })
  },

  addListing: function(req, res) {
    var apartment = new Apartment(req.body);
    // apartment.subscriber_id = req.user._id
    apartment.save(function(err, apartment) {
      if(err) {
        if(err.code === 500) return res.status(500).json(err);
        if(err.code === 11000) return res.status(11000).json(err);
      }

      res.status(200).json(apartment);
    });
  },

  editProfile: function(req, res) {
    var update = req.body;
    var options = {
      new: true
    };

    Subscriber.findByIdAndUpdate(req.user._id, update, options, function(err, subscriber) {
      if(err) res.status(500).json(err);

      res.status(200).json(subscriber);
    })
  }

};
