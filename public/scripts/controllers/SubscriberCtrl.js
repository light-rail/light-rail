var app = angular.module('lightRail');

app.controller('SubscriberCtrl', function($scope, $location, $routeParams, SubscriberService, GeneralUserService, toaster) {

  //** Address Verification
  $scope.verifyApartmentAddress = function() {
      var aptInfo = {
        apartment_name: $scope.apartment_name,
        address: $scope.address
      };
      var geocoder = new google.maps.Geocoder();
      var radius = 804.67200;
      console.log($scope.address);
      var addressString = $scope.address.street_address + " " + $scope.address.city + " " + $scope.address.state + " " + $scope.address.zip_code;
      geocoder.geocode({
          'address': addressString
        }, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var addressCoords = results[0].geometry.location;
            aptInfo.location = {
              lat: addressCoords.A,
              long: addressCoords.F
            } 
            aptInfo.nearest_stops = [];
            console.log("addressCoords", addressCoords);
            GeneralUserService.getStations().then(function(data) {
                for (var i = 0; i < data.length; i++) {
                  var stationCoords = new google.maps.LatLng(data[i].lat, data[i].lng);
                  var dist = google.maps.geometry.spherical.computeDistanceBetween(stationCoords, addressCoords);
                  if (dist < radius) {
                    console.log(data[i]);
                   aptInfo.nearest_stops.push(data[i]._id);
                   console.log(aptInfo.nearest_stops);
                  } // ends if (dist < radius)
                }; // ends for through stations

                if (aptInfo.nearest_stops.length > 0) {
                  console.log(aptInfo.nearest_stops);
                  SubscriberService.verifyApartmentAddress(aptInfo).then(function(res) {
                    console.log("result", res);
                    toaster.pop('success', 'Your address registration was successfull!');
                    $location.path('/subscriber/new-listing/' + res._id); 
                  }, function(err) {
                    console.log('verifyApartment err', err)
                      //Need to add an error.status for address not being within range of lightrail
                    if (err.status === 11000) toaster.pop('error', 'This listing is already registered');
                    else toaster.pop('error', 'Sorry, something went wrong!');
                  });
                } else {
                  toaster.pop('failure', 'Your address was not found within half a mile from a stop.');
                  $scope.apartment_name = "";
                  $scope.address.street_address = "";
                  $scope.address.city = "";
                  $scope.address.state = "";
                  $scope.address.zip_code = "";
                }
              }) // ends getting stations
          } else {
            alert("Geocode was not successful for the following reason: " + status);
          }
        }) // ends geocoder 
    } // ends function



});
