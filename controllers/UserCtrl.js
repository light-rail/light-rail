var User = require('../models/User');

module.exports = {

  createUser: function(req, res) {
    var newUser = new User(req.body);
    newUser.save(function(err, result) {
      console.log('err: ', err);
      if(err) {
        if(err.code === 500) return res.status(500).json(err);
        if(err.code === 11000) return res.status(11000).json(err);
      }
      res.send(result);
    });
  },

  loginUser: function(req, res) {
    return res.json({loggedIn:true});
  },

  isLoggedIn: function(req, res) {
    if(!req.isAuthenticated()) {
      return res.status(204).json('');
    } else {
      if (req.user.user_type === 'general_user') {
        //isGeneralUser:true/isSubscriber:true returns type that will be used in controllers to limit access to views
        return res.status(200).json({isGeneralUser: true});
      } else if (req.user.user_type === 'subscriber') {
        return res.status(200).json({isSubscriber: true});
      }
    }
  }

};