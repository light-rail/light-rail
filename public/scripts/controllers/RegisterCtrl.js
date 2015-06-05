var app = angular.module('lightRail');

app.controller('RegisterCtrl', function($scope, $routeParams, $location, AuthService, toaster) {

  //** Differentiating Users by user_type when they register **//

  //General User Registration
  $scope.registerGeneralUser = function(user) {
    user['user_type'] = 'general_user';
    AuthService.registerUser(user).then(function(res) {
      toaster.pop('success', 'You have registered successfully.');
      $location.path('/');
    }, function(err) {
      console.log('controller', err)
      if(err.status ===  11000) toaster.pop('error', 'This email is already registered.');
      else toaster.pop('error', 'Sorry, something went wrong!');
    });
  };

  //Service Subscriber Registration (Apartment Subscriber)
  $scope.registerSubscriber = function(user) {
    //adds type
    user['user_type'] = 'subscriber';
    AuthService.registerUser(user).then(function(res) {
      toaster.pop('success', 'You have registered successfully.');
      $location.path('/');
    }, function(err) {
      console.log('controller', err)
      if(err.status ===  11000) toaster.pop('error', 'This email is already registered.');
      else toaster.pop('error', 'Sorry, something went wrong!');
    });
  };
});