var User = require('../models/User');

module.exports = {

  createUser: function(req, res) {
    var newUser = new User(req.body);
    console.log("req.body server", req.body);
      newUser.save(function (err, result) {
        console.log('err: ', err);
        if (err) {
          if (err.code === 500)
            return res.status(500).json(err);
          if (err.code === 11000)
            return res.status(11000).json(err);
        }
        console.log('results create User: ', result);
        res.send(result);
      });
  },

  loginUser: function(req, res) {
    return res.status(200).json(req.user);
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
  },

  getFavorites: function(req, res) {
    User
    .find({_id: req.user._id})
    .populate('favorites') 
    .exec(function(err, data) {
      if (err) return res.status(500).send(err);
      res.json(data);    
    })
  },

  addToFavorites: function(req, res) {
    User.findByIdAndUpdate(req.user._id, {$push:{favorites: req.body.aptId}},
      function(err, data) {
        if (err) console.log(err);
         res.json(data); 
    }
    )
  }



};