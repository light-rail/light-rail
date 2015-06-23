var Subscriber = require('../models/Subscriber');
var Apartment = require('../models/Apartment');
var aws = require('aws-sdk');

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
    console.log('addListing server', req.body)
    apartment.subscriber_id = req.user._id;
    apartment.save(function(err, apartment) {
      if(err) {
        if(err.code === 500) return res.status(500).json(err);
        if(err.code === 11000) return res.status(11000).json(err);
      }
      console.log("saved Apartment", apartment);
      res.status(200).json(apartment);
    });
  },


  //adjust for pic's, pictures have to be submitted as a standalone file
  addPictures: function(req, res) {
    var file = req.files.photo;

    var s3_filename = req.user._id+'.'+file.extension;
    var s3_bucket_name = 'lightrail-apartment';//identifies the bucket name
    var s3bucket = new aws.S3();

    fs.readFile(filepath, function(err, file_buffer) {
      var params = {
        Bucket: s3_bucket_name, //folder name in amazon
        Key: s3_filename, //filename in amazon
        Body: file_buffer,
        ACL: 'public-read', //review this in amazon settings
        ContentType: file.mimetype
      };
      s3bucket.putObject(params, function(s3_err, response) {
        console.log(response);
        //update this to name of pictures
        User.findOneAndUpdate({_id: req.user.id}, {profile_picture: s3_bucket_name+'/'+s3_filename}, function() {
          return res.status(200).end();
        })
      })
    });
  },
  
  //adjust for listing pictures
  getPictures: function(req, res) {
    Apartment
    .findOne({_id: req.subscriber.id})
    .populate('light-rail-connect')
    exec().then(function(subscriber) {
      return res.json(subscriber)
    })

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
  },

  editListing: function(req, res) {
    console.log(req.body);
    var update = req.body.listing;
    var options = {
      new: true
    };

    Apartment.findByIdAndUpdate(req.body._id, update, options, function(err, listing) {
      if(err) res.status(500).json(err);

      res.status(200).json(listing);
    })

  }

};
