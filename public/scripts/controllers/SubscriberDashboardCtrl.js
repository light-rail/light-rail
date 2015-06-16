var app = angular.module('lightRail');

app.controller('SubscriberDashboardCtrl', function($scope, subData, GeneralUserService) {

	$scope.subscriber = subData;
	$scope.listing = GeneralUserService.apartmentData[0];
	console.log('Listing:', GeneralUserService.apartmentData[0])

	$scope.selectListing = function(apartment) {
		console.log('Changing:', apartment);

		return $scope.listing = apartment;
	}

	//seed data for development only
	$scope.apartments = GeneralUserService.apartmentData;

});