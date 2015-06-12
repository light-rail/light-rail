var app = angular.module('lightRail');

app.service('GeneralUserService', function($http) {

  this.getGeneralUser = function() {
    var url = '/api/generalUser/myfavorites'
    return http ({
      method: 'GET',
      url: url
    }).then(function(response){
      return response.data;
   });
  };

//Profile Page //

  this.getSubscriberInfo = function() {
    $http({
      method: 'GET',
      url:'/api/subscriber/isLoggedIn',
    }).then(function(data){
      debugger
      console.log('THIS DATAS', data)
    });
  }
}); //end