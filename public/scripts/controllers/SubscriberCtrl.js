var app = angular.module('lightRail');

app.controller('SubscriberCtrl', function($scope, $location, SubscriberService) {
 $scope.apartment = {
  units:[]
 };

 $scope.unit = {};

  //** Add Unit Modal Content **/
  $scope.addUnit = function(unit) {
    $scope.apartment.units.push(unit);
    $scope.unit = {};
  };


  //** Submits Listing to Service **/
  $scope.addApartmentListing = function(apartment) {

    SubscriberService.addApartmentListing(apartment);
  }

});