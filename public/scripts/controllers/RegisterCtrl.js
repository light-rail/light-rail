var app = angular.module('lightRail');

app.controller('RegisterCtrl', function($scope, $routeParams, $location, AuthService, toaster) {

  //** Differentiating Users by user_type when they register **//

  //General User Registration
  $scope.registerGeneralUser = function(user) {

    AuthService.registerUser(user).then(function(res) {
      toaster.pop('success', 'You have registered successfully.');
      $location.path('/');
    }, function(err) {
      console.log('controller', err)
      if(err.status ===  11000) toaster.pop('error', 'This email is already registered.');
      else toaster.pop('error', 'Sorry, something went wrong!');
    });

  }; // ends registerGeneralUser

  //Service Subscriber Registration (Apartment Subscriber)
  $scope.registerSubscriber = function(user) {

    AuthService.registerSubscriber(user).then(function(res) {
      toaster.pop('success', 'You have registered successfully.');
      $location.path('/');
    }, function(err) {
      console.log('controller', err)
      if(err.status ===  11000) toaster.pop('error', 'This email is already registered.');
      else toaster.pop('error', 'Sorry, something went wrong!');
    });

  }; // ends registerSubscriber

    $scope.registerAdmin= function(user) {

    AuthService.registerAdmin(user).then(function(res) {
      toaster.pop('success', 'You have registered successfully.');
      $location.path('/');
    }, function(err) {
      console.log('controller', err)
      if(err.status ===  11000) toaster.pop('error', 'This email is already registered.');
      else toaster.pop('error', 'Sorry, something went wrong!');
    });

  }; // ends registerSubscriber



}); //end controller 

