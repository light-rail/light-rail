var app = angular.module('lightRail');

app.controller('SubscriberCtrl', function($scope, $location, SubscriberService) {


  //** Add Unit Modal Content **/
  $scope.addUnit = function(unit) {
    var newUnit= '';
   
    $scope.newUnit = unit;
    console.log('scope newUnit', $scope.newUnit)
  }


  //** Submits Listing to Service **/
  $scope.addApartmentListing = function(apartment) {

    SubscriberService.addApartmentListing(apartment);
    consol.log('exiting apartment', apartment)
  }

});