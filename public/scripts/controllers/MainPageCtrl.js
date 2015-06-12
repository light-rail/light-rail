var app = angular.module('lightRail');

app.controller('MainPageCtrl', function($scope, $routeParams, GeneralUserService) {
  
  var allApartmentsData = GeneralUserService.apartmentData;
  var selectedApartmentData = GeneralUserService.apartmentData[$routeParams.apartmentId];



  $scope.listMode = true;

  $scope.todayDate = new Date();
  $scope.apartments = allApartmentsData;
  // $scope.selectedApartment = selectedApartmentData;

  //** Modal Initiation**//
  $scope.getApartment = function(apartment) {
    var modal_apartment = '';

    return $scope.modal_apartment = apartment;
  }



  if ($routeParams.apartmentId) {
    $scope.listMode = false;
  } 


});