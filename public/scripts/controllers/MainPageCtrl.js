var app = angular.module('lightRail');

app.controller('MainPageCtrl', function($scope, $routeParams, GeneralUserService) {


  var allApartmentsData = GeneralUserService.apartmentData;
  // console.log('All apartments Data:', $scope.apartments);


  var selectedApartmentData = GeneralUserService.apartmentData[$routeParams.apartmentId];
  // console.log("routeParams.apartmentId:", $routeParams.apartmentId);

  $scope.listMode = true;

  $scope.todayDate = new Date();
  $scope.apartments = allApartmentsData;
  $scope.apartment = selectedApartmentData;

  if ($routeParams.apartmentId) {
    $scope.listMode = false;
  }
  

});