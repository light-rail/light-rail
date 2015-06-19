var app = angular.module('lightRail');

app.service('SubscriberDashboardService', function($http, $q) {

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

	this.saveProfile = function(profile) {
		var dfd = $q.defer();
		var url = '/api/subscriber/edit_profile';
		 $http({
			method: 'PUT',
			url: url,
			data: profile
		}).then(function(res) {
			console.log(res);
			return dfd.resolve(res.data);
		})
		return dfd.promise;
	};

})