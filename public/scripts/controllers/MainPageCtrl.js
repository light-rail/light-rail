var app = angular.module('lightRail');

app.controller('MainPageCtrl', function($scope, $routeParams, GeneralUserService) {
  
  var allApartmentsData = GeneralUserService.apartmentData;
  var selectedApartmentData = GeneralUserService.apartmentData[$routeParams.apartmentId];


  $scope.todayDate = new Date();
  $scope.apartments = allApartmentsData;


  //** Modal Initiation**//
  $scope.getApartment = function(apartment) {
    var modal_apartment = '';

    $scope.modal_apartment = apartment;

  }


});