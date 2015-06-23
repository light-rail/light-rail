var app = angular.module('lightRail');

app.controller('LoginCtrl', function($scope, $routeParams, $location, AuthService, toaster) {


  $scope.loginUser = function(user) {

    AuthService.loginUser(user).then(function() {
      toaster.pop('success', 'You have logged in successfully.');
      $location.path('/');
    }, function(err) {
      console.log('loginController', err)
      toaster.pop('error', 'Sorry, something went wrong!');
      //console.log("Error...");
    });
  };

  $scope.loginSubscriber = function(user) {
    AuthService.loginSubscriber(user).then(function(res) {
      toaster.pop('success', 'You have logged in successfully.');
      console.log('Changing path to sub dash')
      $location.path('/subscriber/verify-address');
    }, function(err) {
      console.log('loginController', err)
      toaster.pop('error', 'Sorry, something went wrong!');
      //console.log("Error...");
    });
  };

  $scope.loginAdmin = function(user) {
    AuthService.loginAdmin(user).then(function() {
      toaster.pop('success', 'You have logged in successfully.');
      $location.path('/profile');
    }, function(err) {
      console.log('loginController', err)
      toaster.pop('error', 'Sorry, something went wrong!');
      //console.log("Error...");
    });
  };

  // //** Submits Listing to Service **/
  // $scope.addApartmentListing = function(apartment) {
  //   SubscriberService.addApartmentListing(apartment).then(function(res) {
  //     toaster.pop('success', 'You successfully added the Listing!');
  //     $location.path('/subscriber/dashboard/:id'); //Change to :subscriberId?
  //   }, function(err) {
  //     console.log('AddApartment err', err)
  //       //Need to add an error.status for address not being within range of lightrail
  //     if (err.status === 11000) toaster.pop('error', 'This listing is already registered');
  //     else toaster.pop('error', 'Sorry, something went wrong!');
  //   });
  // };



});
