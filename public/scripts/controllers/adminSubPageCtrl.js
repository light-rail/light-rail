var app = angular.module('lightRail');

app.controller('adminSubPageCtrl', function($scope, $routeParams, GeneralUserService){

  var allApartmentsData = GeneralUserService.apartmentData;
  var selectedApartmentData = GeneralUserService.apartmentData[$routeParams.apartmentId];

  // $scope.listMode = true;

  //$scope.todayDate = new Date();
  $scope.apartments = allApartmentsData;
  $scope.apartment = selectedApartmentData;

  //if ($routeParams.apartmentId) {
   //$scope.listMode = false;
  //}


});




