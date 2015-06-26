var Subscriber = require('../models/Subscriber');
var Apartment = require('../models/Apartment');
var aws = require('aws-sdk');
var flow = require('.././flow-node.js')('tmp')
var fs = require('fs');

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: 'us-east-1'
});

var ACCESS_CONTROLL_ALLOW_ORIGIN = false;

var findRentRange = function(arr, cb) {
  var stringArr = [];
  for(var i = 0; i < arr.length; i++) {
    stringArr.push(arr[i].monthly_rent);
  } 
  var numbersArr = stringArr.map(function(a) {
    return parseInt(a);
  });
  priceRange = {
    min: Math.min.apply(null, numbersArr),
    max: Math.max.apply(null, numbersArr)
  };
  console.log('From findRentRange', arr, numbersArr, priceRange);
  return cb(priceRange);
};

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

  verifyApartmentAddress: function(req, res) {
    var apartment = new Apartment(req.body);
    apartment.subscriber_id = req.user._id;
    apartment.save(function(err, apartment) {
      if(err) {
        if(err.code === 500) return res.status(500).json(err);
        if(err.code === 500) return res.status(11000).json(err);
      }
      console.log('Saved Apartment', apartment);
      res.status(200).json(apartment);
    })
  },
  addListing: function(req, res) {
    findRentRange(req.body.units, function(priceRange) {
      var update = {
        phone_number: req.body.phone_number,
        webpage: req.body.webpage,
        units: req.body.units,
        price_range: priceRange,
        amenities: req.body.amenities,
        description: req.body.description,
        additional_amenities: req.body.additional_amenities
      };
      var options = {new: true};

      Apartment.findByIdAndUpdate(req.body._id, update, options, function(err, apartment) {
        if(err) return res.status(500).json(err);
        console.log(apartment);
        res.status(200).json(apartment);
      })
    })
  },

  addPicturesPost: function(req, res) {
    console.log(req.files)
    var file = req.files.file
      if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
        res.header("Access-Control-Allow-Origin", "*");
      }

      var s3_filename = file.name;
      var s3_bucket_name = 'lightrail-apartments';
      var s3bucket = new aws.S3();

      fs.readFile(file.ws.path, function(err, file_buffer) {
        if(err) return console.log(err)
        console.log(file_buffer);
        console.log(s3_filename);

        var params = {
          Bucket: s3_bucket_name,
          Key: s3_filename,
          Body: file_buffer,
          ACL: 'public-read',
          ContentType: file.type
        }

        s3bucket.putObject(params, function(s3_err, response) {
          if(s3_err) return console.log(s3_err);
          console.log('S3 Response:',response);
          var update = {
            $push: {'pictures_array': {
              name: s3_filename,
              src: 'https://s3.amazonaws.com/'+ s3_bucket_name +'/'+ s3_filename
            }}
          };
          var options = {
            new: true
          };
          
          Apartment.findByIdAndUpdate(req.params.id, update, options, function(err, apartment) {
            if(err) res.status(500).json(err);
            return res.status(200).send();
          })
          
        })

        
      })
  },

  addPicturesGet: function(req, res) {
    flow.get(req, function(status, filename, original_filename, identifier) {
      console.log('GET', status);
      if (ACCESS_CONTROLL_ALLOW_ORIGIN) {
        res.header("Access-Control-Allow-Origin", "*");
      }

      if (status == 'found') {
        status = 200;
      } else {
        status = 204;
      }

      res.status(status).send();
    });
  },


  //adjust for pic's, pictures have to be submitted as a standalone file
  // addPictures: function(req, res) {
  //   var file = req.files.photo;

  //   var s3_filename = req.user._id+'.'+file.extension;
  //   var s3_bucket_name = 'lightrail-apartment';//identifies the bucket name
  //   var s3bucket = new aws.S3();

  //   fs.readFile(filepath, function(err, file_buffer) {
  //     var params = {
  //       Bucket: s3_bucket_name, //folder name in amazon
  //       Key: s3_filename, //filename in amazon
  //       Body: file_buffer,
  //       ACL: 'public-read', //review this in amazon settings
  //       ContentType: file.mimetype
  //     };
  //     s3bucket.putObject(params, function(s3_err, response) {
  //       console.log(response);
  //       //update this to name of pictures
  //       User.findOneAndUpdate({_id: req.user.id}, {profile_picture: s3_bucket_name+'/'+s3_filename}, function() {
  //         return res.status(200).end();
  //       })
  //     })
  //   });
  // },
  
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
    console.log(req.body._id);
    findRentRange(req.body.units, function(rentRange) {
      req.body.price_range = rentRange;
      var update = req.body;
      var options = {
        new: true
      };

      Apartment.findByIdAndUpdate(req.body._id, update, options, function(err, listing) {
        if(err) res.status(500).json(err);
        console.log(listing);
        res.status(200).json(listing);
      })
    })
  }

};
