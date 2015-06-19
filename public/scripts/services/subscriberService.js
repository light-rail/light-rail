var app = angular.module('lightRail');


app.service('SubscriberService', function($http, $q) { 



  this.addApartmentListing = function(apartment) {
    var deferred = q.defer();
    $http({
      method: 'POST',
      url: '/api/subscriber/addApartmentListing',
      data: {
        name: apartment.name,
        street_address: apartment.street_address,
        city: apartment.city,
        state: apartment.state,
        zip_code: apartment.zip_code,
        phone_number: apartment.phone_number,
        webpage: apartment.webpage,
        description: apartment.description,
        photos: apartment.photos,
        units: apartment.units,
        amenities: apartment.amenities,
        amenities_additional: apartment.amenities_additional
      }
    }).then(function(response) {
      deferred.resolve(response.data);
    }, function(error) {
      deferred.reject(error);
    });
    return deferred.promise;
  };


});
