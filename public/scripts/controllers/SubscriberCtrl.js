var app = angular.module('lightRail');

app.controller('SubscriberCtrl', function($scope, $location, $routeParams, SubscriberService, GeneralUserService) {

  //Used to link seeded Data -- Erase when linked to Subscriber backend
  var selectedSubscriberData = GeneralUserService.apartmentData[$routeParams.subscriberId];
  
  $scope.seededApartment = selectedSubscriberData;
  //** End of Seeded Data Reference

  $scope.apartment = {
    units:[],
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

  //** Address Verification
  $scope.verifiyApartmentAddress = function(address) {
    SubscriberService.verifyApartmentAddress(address).then (function(res) {
      toaster.pop('success', 'Your address registration was successfull!');
      $location.path('/subscriber/new-listing/:subscriberId');//Needs a :subscriberId
    }, function(err) {
      console.log('verifyApartment err', err)
      //Need to add an error.status for address not being within range of lightrail
      if(err.status === 11000) toaster.pop('error', 'This listing is already registered');
      else toaster.pop('error', 'Sorry, something went wrong!');
    });
  };

  //** Submits Listing to Service **/
  $scope.addApartmentListing = function(apartment) {
    SubscriberService.addApartmentListing(apartment).then (function(res) {
      toaster.pop('success', 'You successfully added the Listing!');
      $location.path('/subscriber/dashboard/:id');//Change to :subscriberId?
    }, function(err) {
      console.log('AddApartment err', err)
      //Need to add an error.status for address not being within range of lightrail
      if(err.status === 11000) toaster.pop('error', 'This listing is already registered');
      else toaster.pop('error', 'Sorry, something went wrong!');
    });
  };

});