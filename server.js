//*** DEPENDENCIES ***//
var env = require('dotenv').load();
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var FACEBOOK_ID = process.env.FACEBOOK_ID;
var FACEBOOK_SECRET = process.env.FACEBOOK_SECRET;
var AWS = require('aws-sdk');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

var port = 9001;
//*** CONTROLLERS ***//
var UserCtrl = require('./controllers/UserCtrl.js');
var SubscriberCtrl = require('./controllers/SubscriberCtrl.js');
var AdminCtrl = require('./controllers/AdminCtrl.js');
var TrainStationCtrl = require('./controllers/TrainStationCtrl.js');
var stripeCtrl = require('./controllers/StripeCtrl.js');
var ApartmentCtrl = require('./controllers/ApartmentCtrl.js');

//*** MODELS ***//
var User = require('./models/User.js');
var Subscriber = require('./models/Subscriber.js');
var Admin = require('./models/Admin.js');
var TrainStation = require('./models/TrainStation.js');


//*** EXPRESS ***//
var app = express();

//*** MIDDLEWARE ***//
app.use(session({
  secret: 'lightRail devs are awesome',
  saveUninitialized: true,
  resave: true
}));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

//AWS Config
// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_KEY,
//   region: 'us-west-1'
// })

//Passport Strategy
passport.use('user-local', new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
  //define how to match user credentials to db values
  User.findOne({
    email: email
  }, function(err, user) {
    console.log("test 1");
    if (err) {
      return done(new Error('This user does not exist'));
    }
    if (user) {
      if (!user.verifyPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      console.log("user found", user);
      return done(null, user);
    }
  })
}));

passport.use('subscriber-local', new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
  Subscriber.findOne({
    email: email
  }, function(err, subscriber) {
    console.log('test 2');
    if (err) {
      return done(err);
    }
    if (!subscriber) {
      return done(null, false, {
        message: 'Incorrect email.'
      });
    }
    if (!subscriber.verifyPassword(password)) {
      return done(null, false, {
        message: 'Incorrect password.'
      });
    }
    console.log("subscriber found", subscriber);
    return done(null, subscriber);
  });
}));

passport.use('admin-local', new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
  Admin.findOne({
    email: email
  }, function(err, admin) {
    if (err) {
      return done(err);
    }
    if (!admin) {
      return done(null, false, {
        message: 'Incorrect email.'
      });
    }
    if (!admin.verifyPassword(password)) {
      return done(null, false, {
        message: 'Incorrect password.'
      });
    }
    console.log("adminfound", admin);
    return done(null, admin);
  });
}));


passport.use(new FacebookStrategy({
  clientID: FACEBOOK_ID,
  clientSecret: FACEBOOK_SECRET,
  callbackURL: 'http://localhost:9001/auth/facebook/callback'
}, function(accessToken, refreshToken, profile, done) {
  var update = profile._json;
  var options = {
    new: true,
    upsert: true
  };
  User.findOneAndUpdate({
    facebook_id: profile.id
  }, update, options, function(err, user) {
    if (err) {
      return done(err);
    }
    return done(null, user);
  });
}));




passport.serializeUser(function(user, done) {
  done(null, user._id)
});


passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if (err) done(err);
    if (user) {
      done(null, user);
    } else if (!user) {
      Subscriber.findById(id, function(err, user) {
        if (err) done(err);
        done(null, user);
      })
    } else {
      Admin.findById(id, function(err, user) {
        if (err) done(err);
        done(null, user);
      })
    }
  })
});

var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(403).end();
  }
  return next();
}


//*** ENDPOINTS ****//

//** General User **//
app.post('/api/register/user', UserCtrl.createUser);
app.post('/api/login/user', passport.authenticate('user-local', {
  failureRedirect: '/login/user'
}), UserCtrl.loginUser);
app.get('/api/user/isLoggedIn', UserCtrl.isLoggedIn);
app.get('/api/user/getFavorites', UserCtrl.getFavorites);

app.post('/api/user/addToFavorites', UserCtrl.addToFavorites);



//** Subscriber ** //
app.post('/api/register/subscriber', SubscriberCtrl.createSubscriber);
app.post('/api/login/subscriber', passport.authenticate('subscriber-local', {
  failureRedirect: '/login/subscriber'
}), SubscriberCtrl.loginSubscriber);
app.get('/api/subscriber/isLoggedIn', SubscriberCtrl.isLoggedIn);
app.get('/api/subscriber/listings', SubscriberCtrl.getListings);
app.post('/api/subscriber/addApartmentListing', SubscriberCtrl.addListing);
app.post('/api/subscriber/verifyApartmentAddress', SubscriberCtrl.verifyApartmentAddress);

//*Photo upload to AWS endpoint
app.post('/api/subscriber/addApartmentPictures/:id', multipartMiddleware, SubscriberCtrl.addPicturesPost);
app.get('/api/subscriber/addApartmentPictures/:id', SubscriberCtrl.addPicturesGet);
//*Photo get request from app
app.get('/api/subscriber/apartmentPictures', SubscriberCtrl.getPictures);

app.put('/api/subscriber/edit_profile', SubscriberCtrl.editProfile);
app.put('/api/subscriber/edit_listing', SubscriberCtrl.editListing);



//** Admin ** //
app.post('/api/register/admin', AdminCtrl.createAdmin);
app.post('/api/login/admin', passport.authenticate('admin-local', {
  failureRedirect: '/login/admin'
}), AdminCtrl.loginAdmin);
app.get('/api/admin/isLoggedIn', AdminCtrl.isLoggedIn);

//** Train Stations **//
app.post('/api/trainStation', TrainStationCtrl.createLocation);
app.get('/api/stations/getStations', TrainStationCtrl.getStations);

//** Logout **//
app.get('/api/user/logout', function(req, res) {
  req.logOut();
  res.redirect('/#/');
});

/* facebook endpoints*/

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/#/login'
  }),
  function(req, res) {
    // Successful authentication, redirect home.
    console.log('got to success')
    res.redirect('#/');
  });

// LOGOUT
app.get('/logout', function(req, res) {
  req.logout();
  res.status(200).send('Logged Out')
  console.log("You've logged out");
});


//** Apartments **//
app.get('/api/apartment/getAptData', ApartmentCtrl.getAptData);
app.get('/api/apartment/getNearestStops', ApartmentCtrl.getNearestStops);
app.get('/api/apartment/:aptId', ApartmentCtrl.getAddedApt);

app.get('/api/users/userId', isAuthed, function(req, res) {
  User.findOne({
    facebookId: req.user.id
  }, function(err, user) {
    if (err) {
      res.send("There was an error");
    } else {
      res.json(user);
    }
  })
});

//* Stripe*//
app.post('/api/stripe/createCustomer', stripeCtrl.createCustomer);
app.put('/api/stripe/updateSubscription', stripeCtrl.updateSubscription);
app.put('/api/stripe/cancelSubscription', stripeCtrl.cancelSubscription);
app.get('/api/stripe/getSubcriptions', stripeCtrl.listSubscriptions);
app.get('/api/stripe/getCustomer', stripeCtrl.getCustomer);
app.get('/api/stripe/getAllCustomers', stripeCtrl.listAllCustomers)

// Connections

var mongoUri = 'mongodb://localhost:27017/lightRail';

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at ', mongoUri);
});

app.listen(port, function() {
  console.log('Listening on port ', port);
});
