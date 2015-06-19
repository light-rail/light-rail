var app = angular.module('lightRail');

app.service('SubscriberDashboardService', function($http) {

	this.getSubscriberInfo = function() {
		var url = '/api/subscriber/isLoggedIn';
    return $http({
      method: 'GET',
      url: url
    }).then(function(data){
      return data.data;
    });
	};
	
	this.getListings = function(id) {
		var url = '/api/subscriber/listings';
		return $http({
			method: 'GET',
			url: url +'?id='+ id,
		}).then(function(listings) {
			return listings.data;
		});
	};

})