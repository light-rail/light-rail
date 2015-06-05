var app = angular.module('lightRail');


app.service('AuthService', function($http, $q, $location) {

//*** CONSULANT REGISTRATION & LOGIN ***//
  this.registerUser = function(user) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/register/user',
      data: {
        email: user.email,
        password: user.password,
        user_type: user.user_type
      }
    }).then(function(res) {
      $http({
        method: 'POST',
        url: '/api/login/user',
        data: {
          email: user.email,
          password: user.password
        }
      }).then(function(res) {
        deferred.resolve(res.data);
      }).catch(function(err) {
        deferred.reject(err);
      });
    }).catch(function(err) {
      console.log(err)
      deferred.reject(err);
    });
    return deferred.promise;
  };


  this.loginUser = function(user) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/login/user',
      data: {
        email: user.email,
        password: user.password
      }
    }).then(function(res) {
      console.log('loginUser:', res)
      deferred.resolve(res.data);
    }).catch(function(res) {
      deferred.reject(res.data);
    });
    return deferred.promise;
  };


  this.requireAuth = function() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/api/user/isLoggedIn'
    }).then(function(res) {
      console.log('requireAuth1:', res)
      if(res.status === 200) {
        console.log('requireAuth2:', res.data);
        return deferred.resolve(res.data)
      } else { 
        $location.path('/login');
      }
    }).catch(function(res) {
      $location.path('/login');
    });
    return deferred.promise;
  };


});
