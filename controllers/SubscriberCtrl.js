var Subscriber = require('../models/Subscriber');

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
    return res.json({loggedIn:true});
  },

  isLoggedIn: function(req, res) {
    console.log("LoggedIn", req)
    console.log('loggedIn req.user', req.user)
    if (req.isAuthenticated()) {
      return res.status(200).json(req.user);
    } else {
      return res.status(204).json('Not Authenticated')
    }
  }

};
