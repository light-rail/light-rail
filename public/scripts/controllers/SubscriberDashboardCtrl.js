var app = angular.module('lightRail');

app.controller('SubscriberDashboardCtrl', function($scope, subData, GeneralUserService) {

	$scope.subscriber = subData;
	console.log($scope.subscriber);

	$scope.editSubscriber = {
		companyName: $scope.subscriber.company_name,
		streetAddress: $scope.subscriber.contact_address.street_address,
		city: $scope.subscriber.contact_address.city,
		state: $scope.subscriber.contact_address.state,
		zip: $scope.subscriber.contact_address.zip_code
	};

	$scope.listing = GeneralUserService.apartmentData[0];
	console.log('Listing:', GeneralUserService.apartmentData[0])

	$scope.states = [
		{name: 'AZ'},
		{name: 'UT'},
		{name: 'NM'},
		{name: 'CO'}
	];

	$scope.selectListing = function(apartment) {
		return $scope.listing = apartment;
	};

	$scope.saveProfile = function(companyName, streetAddress, city, state, zip) {
		console.log('saving');
		$scope.subscriber.company_name = companyName;
		$scope.subscriber.contact_address.street_address = streetAddress;
		$scope.subscriber.contact_address.city = city;
		$scope.subscriber.contact_address.state = state;
		$scope.subscriber.contact_address.zip_code = zip;

		return $scope.subscriber;
	};

	//seed data for development only
	$scope.apartments = GeneralUserService.apartmentData;

});