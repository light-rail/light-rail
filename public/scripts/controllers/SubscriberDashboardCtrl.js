var app = angular.module('lightRail');

app.controller('SubscriberDashboardCtrl', function($scope, subData, GeneralUserService) {

	//Subscriber
	$scope.subscriber = subData;
	console.log($scope.subscriber);

	$scope.editSubscriber = {
		companyName: $scope.subscriber.company_name,
		streetAddress: $scope.subscriber.contact_address.street_address,
		city: $scope.subscriber.contact_address.city,
		state: {
			name: $scope.subscriber.contact_address.state
		},
		zip: $scope.subscriber.contact_address.zip_code
	};

	//listings
	$scope.listing = GeneralUserService.apartmentData[0];
	console.log($scope.listing);

	$scope.editListing = {
		listingName: $scope.listing.apartment_name,
		location: {
			street: $scope.listing.location.street_address,
			city: $scope.listing.location.city,
			state: {
				name: $scope.listing.location.state
			},
			zip: $scope.listing.location.zip_code
		},
		phone: $scope.listing.phone,
		webpage: $scope.listing.webpage,
		rentRange: {
			max: $scope.listing.rent_range.max,
			min: $scope.listing.rent_range.min
		},
		coverPicture: $scope.listing.cover_picture,
		picturesArray: $scope.listing.picturesArray,
		description: $scope.listing.description
	};

	$scope.states = [
		{name: 'AZ'},
		{name: 'UT'},
		{name: 'NM'},
		{name: 'CO'}
	];

	$scope.selectListing = function(apartment) {
		$scope.listing = apartment;

		$scope.editListing = {
		listingName: $scope.listing.apartment_name,
		location: {
			street: $scope.listing.location.street_address,
			city: $scope.listing.location.city,
			state: {
				name: $scope.listing.location.state
			},
			zip: $scope.listing.location.zip_code
		},
		phone: $scope.listing.phone,
		webpage: $scope.listing.webpage,
		rentRange: {
			max: $scope.listing.rent_range.max,
			min: $scope.listing.rent_range.min
		},
		coverPicture: $scope.listing.cover_picture,
		picturesArray: $scope.listing.picturesArray,
		description: $scope.listing.description
	};

		return $scope.listing
	};

	$scope.saveProfile = function(companyName, streetAddress, city, state, zip) {
		console.log(state);
		$scope.subscriber.company_name = companyName;
		$scope.subscriber.contact_address.street_address = streetAddress;
		$scope.subscriber.contact_address.city = city;
		$scope.subscriber.contact_address.state = state.name;
		$scope.subscriber.contact_address.zip_code = zip;

		return $scope.subscriber;
	};

	$scope.saveListing = function(listingName, location, phone, webpage, rentRange, picturesArray, description) {
		$scope.listing.apartment_name = listingName;
		$scope.listing.location = {
			street_address: location.street,
			city: location.city,
			state: location.state,
			zip_code: location.zip
		};
		$scope.listing.phone = phone;
		$scope.listing.webpage = webpage;
		$scope.listing.rent_range = {
			max: rentRange.max,
			min: rentRange.min
		};
		$scope.listing.picturesArray = picturesArray;
		$scope.listing.description = description;

		$scope.editListing = {
			listingName: $scope.listing.apartment_name,
			location: {
				street: $scope.listing.location.street_address,
				city: $scope.listing.location.city,
				state: {
					name: $scope.listing.location.state
				},
				zip: $scope.listing.location.zip_code
			},
			phone: $scope.listing.phone,
			webpage: $scope.listing.webpage,
			rentRange: {
				max: $scope.listing.rent_range.max,
				min: $scope.listing.rent_range.min
			},
			coverPicture: $scope.listing.cover_picture,
			picturesArray: $scope.listing.picturesArray,
			description: $scope.listing.description
		};

		console.log($scope.editListing);

		return $scope.listing;
	};

	//seed data for development only
	$scope.apartments = GeneralUserService.apartmentData;

});