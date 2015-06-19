var app = angular.module('lightRail');

app.controller('SubscriberCtrl', function($scope, $location, GeneralUserService) {



  //** Add Unit Modal Content **/
  $scope.addUnit = function(unit) {
    var newUnit = '';

    newUnit = {
      bedrooms: unit.bedrooms,
      bathrooms: unit.bathrooms,
      square_feet: unit.square_feet,
      monthly_rent: unit.monthly_rent
    }
    console.log('newUnit2', newUnit)

    $scope.newUnit
  }


  $scope.addApartmentListing = function(apartment) {

  }

});