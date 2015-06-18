var app = angular.module('lightRail');

app.controller('MainPageCtrl', function($scope, $routeParams, GeneralUserService) {

  var allApartmentsData = GeneralUserService.apartmentData;

  $scope.apartments = allApartmentsData;


  //** Modal Initiation **//
  $scope.getApartment = function(apartment) {
    var modal_apartment = '';

    $scope.modal_apartment = apartment;

  }


});







