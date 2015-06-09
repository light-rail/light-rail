//*** DEPENDENCIES ***//
var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

//*** CONTROLLERS ***//
var UserCtrl = require('./controllers/UserCtrl.js');
var SubscriberCtrl = require('./controllers/SubscriberCtrl.js');

//*** MODELS ***//
var User = require('./models/User.js');
var Subscriber = require('./models/Subscriber.js');


//*** EXPRESS ***//
var app = express();

//*** MIDDLEWARE ***//
app.use(session({
  secret: 'lightRail devs are awesome',
  saveUninitialized: true,
  resave: true
}))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());


//Passport Strategy
passport.use(new LocalStrategy({
  usernameField: 'email'
}, function(email, password, done) {
  //define how to match user credentials to db values
  User.findOne({ email: email }, function(err, user) {
    if (err) {
      return done(new Error('This user does not exist'));
    }
    if(user) {
     if(!user.verifyPassword(password)) {
        return done(null, false, {
          message: 'Incorrect password.'
        });
      }
      console.log("user found", user);
      return done(null, user);
    } else {
        Subscriber.findOne({email: email}, function(err, subscriber) {
          if(err) {
            return done(err);
          }
          if(!subscriber) {
            return done(null, false, {
              message: 'Incorrect email.'
            });
          }
          if(!subscriber.verifyPassword(password)) {
            return done(null, false, {
              message: 'Incorrect password.'
            });
          }
          console.log("subscriber found", subscriber);
          return done(null, subscriber);
        });
      }
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});



//*** ENDPOINTS ****//

//** User **//
app.post('/api/register/user', UserCtrl.createUser);
app.post('/api/login/user', passport.authenticate('local', { failureRedirect: '/login'}), UserCtrl.loginUser);
app.get('/api/user/isLoggedIn', UserCtrl.isLoggedIn);

//** Subscriber ** // 

app.post('/api/register/subscriber', SubscriberCtrl.createSubscriber);
app.post('/api/login/subscriber', passport.authenticate('local', { failureRedirect: '/login/subscriber'}), SubscriberCtrl.loginSubscriber);
app.get('/api/subscriber/isLoggedIn', SubscriberCtrl.isLoggedIn);





// Connections
var port = 9001;
var mongoUri = 'mongodb://localhost:27017/lightRail';

mongoose.connect(mongoUri);
mongoose.connection.once('open', function() {
  console.log('Connected to MongoDB at ', mongoUri);
});

app.listen(port, function() {
  console.log('Listening on port ', port);
});





