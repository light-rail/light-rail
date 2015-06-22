var app = angular.module('lightRail');


app.service('SubscriberService', function($http, $q) { 

  this.verifyApartmentaddress = function(address) {
    var deferred = $q.defer();
    console.log('subscriberServiceAddress', address)
    $http({
      method: 'POST',
      url: '/api/subscriber/verifyApartmentAddress',
      data: address
    }).then(function(response) {
      deferred.resolve(response.data);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };



  this.addApartmentListing = function(apartment) {
    var deferred = $q.defer();
    console.log('subscriberService', apartment)
    $http({
      method: 'POST',
      url: '/api/subscriber/addApartmentListing',
      data: apartment
    }).then(function(response) {
      deferred.resolve(response.data);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };

  // this.addApartmentPicture = function()


});
