var app = angular.module('lightRail');

app.controller('NavCtrl', function($scope, $location, AuthService) {
	$scope.isLoggedIn = AuthService.isLoggedIn();

	$scope.logOut = function() {
		AuthService.logOut().then(function(res) {
			$scope.isLoggedIn = {
				subscriber: {
					loggedIn: false,
					id: undefined
				},
				user: {
					loggedIn: false,
					id: undefined
				},
				admin: {
					loggedIn: false,
					id: undefined
				}
			};
			$location.path('/');
		})
	}
})