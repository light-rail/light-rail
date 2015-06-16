var app = angular.module('lightRail');

app.controller('adminUserCtrl', function($scope, GeneralUserService){
  var allUsersData = GeneralUserService.userData;
  var selectedUserData = GeneralUserService.userData;

$scope.users = allUsersData;
$scope.user = selectedUserData;

});


