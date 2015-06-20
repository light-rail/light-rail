var app = angular.module('lightRail');


app.service('SubscriberService', function($http, $q) { 



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


});
