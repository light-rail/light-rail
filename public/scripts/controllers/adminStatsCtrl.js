var app = angular.module('lightRail');

app.controller('adminStatsCtrl', function($scope) {
  $scope.labels = ["Label A", "Label B", "Label C"];
  $scope.data = [300, 500, 100];
});