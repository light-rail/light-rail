var app = angular.module('lightRail');

app.controller('SubscriberDashboardCtrl', function($scope, subProfile, subListings, isLoggedIn, GeneralUserService, SubscriberDashboardService) {

	$scope.isLoggedIn = isLoggedIn;
	//Subscriber
	$scope.subscriber = subProfile;
	console.log($scope.subscriber);

	$scope.editSubscriber = {
		companyName: $scope.subscriber.company_name,
		streetAddress: $scope.subscriber.contact_address.street_address,
		city: $scope.subscriber.contact_address.city,
		state: $scope.subscriber.contact_address.state,
		zip: $scope.subscriber.contact_address.zip_code
	};

	//listings
	if(subListings.length > 0) {
		$scope.showListings = true;
		$scope.listing = subListings[0];
		console.log($scope.listing);
		$scope.listings = subListings;
		$scope.editListing = {
			_id: $scope.listing._id,
			apartment_name: $scope.listing.apartment_name,
			address: {
				street_address: $scope.listing.address.street_address,
				city: $scope.listing.address.city,
				state: $scope.listing.address.state,
				zip_code: $scope.listing.address.zip_code
			},
			phone_number: $scope.listing.phone_number,
			webpage: $scope.listing.webpage,
			units: $scope.listing.units,
			coverPicture: $scope.listing.cover_picture,
			picturesArray: $scope.listing.pictures_array,
			description: $scope.listing.description,
			amenities: $scope.listing.amenities,
			price_range: {
				min: $scope.listing.price_range.min,
				max: $scope.listing.price_range.max
			}
		};
		console.log($scope.editListing)
	} else {
		$scope.showListings = false;
		$scope.listing;
		$scope.listings;
	}


	$scope.states = ['AZ','UT','NM','CO'];
	$scope.numbers = ['1', '2', '3' , '4', '5'];

	$scope.selectListing = function(apartment) {
		$scope.listing = apartment;
		$scope.editListing = $scope.listing;

	// 	$scope.editListing = {
	// 	listingName: $scope.listing.apartment_name,
	// 	location: {
	// 		street: $scope.listing.location.street_address,
	// 		city: $scope.listing.location.city,
	// 		state: $scope.listing.location.state,
	// 		zip: $scope.listing.location.zip_code
	// 	},
	// 	phone: $scope.listing.phone,
	// 	webpage: $scope.listing.webpage,
	// 	rentRange: {
	// 		max: $scope.listing.rent_range.max,
	// 		min: $scope.listing.rent_range.min
	// 	},
	// 	coverPicture: $scope.listing.cover_picture,
	// 	picturesArray: $scope.listing.picturesArray,
	// 	description: $scope.listing.description
	// };

		return $scope.listing
	};

	$scope.saveProfile = function(companyName, streetAddress, city, state, zip) {
		var updateProfile = {
			company_name: companyName,
			contact_address: {
				street_address: streetAddress,
				city: city,
				state: state,
				zip_code: zip
			}
		};

		SubscriberDashboardService.saveProfile(updateProfile)
			.then(function(res) {
				return $scope.subscriber = res.data;
			})

		};

	$scope.saveListing = function(listing) {
		// var updateListing = {
		// 	apartment_name: listingName,
		// 	address: address,
		// 	phone_number: phone,
		// 	website: website,
		// 	price_range: priceRange,
		// 	pictures_array: picturesArray,
		// 	description: description
		// }
		// var listingId = listingId;

		SubscriberDashboardService.saveListing(listing)
			.then(function(res) {
				return $scope.listing = res.data;
			})
	};

	console.log($scope);

});