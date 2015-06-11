var Admin = require('../models/Admin');

module.exports = {

  createAdmin: function(req, res) {
    var newAdmin = new Admin(req.body);
    newAdmin.save(function(err, result) {
      console.log('err: ', err);
      if (err) {
        if (err.code === 500) {
          return res.status(500).json(err);
            }
        if (err.code === 11000) {
            return res.status(11000).json(err);
            }
       }
      res.send(result);
    });
  },

  loginAdmin: function(req, res) {
    return res.json({
      loggedIn: true
    });
  },

  isLoggedIn: function(req, res) {
    if (req.isAuthenticated()) {
      return res.status(200).json(req.user);
    } else {
      return res.status(204).json('Not Authenticated')
    }
  }

};