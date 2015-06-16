var app = angular.module('lightRail');

app.controller('SubscriberDashboardCtrl', function($scope, subData, GeneralUserService) {
	var subscriber = subData;
	var editSubscriber = subData;
	
	$scope.subscriber = subscriber;
	$scope.editSubscriber = editSubscriber;
	console.log($scope.subscriber);

	$scope.listing = GeneralUserService.apartmentData[0];
	console.log('Listing:', GeneralUserService.apartmentData[0])

	$scope.states = [
		{name: 'AZ'},
		{name: 'UT'},
		{name: 'NM'},
		{name: 'CO'}
	]

	$scope.selectListing = function(apartment) {
		return $scope.listing = apartment;
	}

	$scope.saveProfile = function() {
		console.log('saving');
		return $scope.subscriber = $scope.editSubscriber;
	}

	//seed data for development only
	$scope.apartments = GeneralUserService.apartmentData;

});