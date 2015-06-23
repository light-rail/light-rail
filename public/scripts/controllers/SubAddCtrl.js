var app = angular.module('lightRail');

app.controller('SubAddCtrl', function($scope, $location, $routeParams, SubscriberService, GeneralUserService, toaster, getAddedApt) {

  $scope.apt = getAddedApt[0];
  console.log($scope.apt);
  console.log($scope.apt.apartment_name);
  
  $scope.apartment = {
    units: [],
    pictures_array: []
  };

  $scope.unit = {};
  $scope.picture = {};


  //** Add Unit Modal Content **/
  $scope.addUnit = function(unit) {
    $scope.apartment.units.push(unit);
    $scope.unit = {};
    console.log('apartment', $scope.apartment)
    console.log('unit', $scope.unit)
  };

  //** Add Pictures Container Content **/
  $scope.addPicture = function(picture) {
    $scope.apartment.pictures_array.push(picture);
    $scope.picture = {};
    console.log('picture', $scope.picture)
    console.log('apartment', $scope.apartment)
  };
})
