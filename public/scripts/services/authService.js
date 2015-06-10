var app = angular.module('lightRail');


app.service('AuthService', function($http, $q, $location) {

//*** REGISTRATION & LOGIN ***//
  this.registerUser = function(user) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/register/user',
      data: {
        email: user.email,
        password: user.password,
        name: user.name
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



//** SUBSCRIBER REGISTER & LOGIN**//


    this.registerSubscriber = function(user) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/register/subscriber',
      data: {
          company_name: user.company_name,
          first_name: user.first_name,
          last_name: user.last_name,
          phone_number: user.phone_number,
          email: user.email,
          password: user.password,
          contact_address: user.contact_address
      }
    }).then(function(res) {
      $http({
        method: 'POST',
        url: '/api/login/subscriber',
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


  this.loginSubscriber = function(user) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/login/subscriber',
      data: {
        email: user.email,
        password: user.password
      }
    }).then(function(res) {
      console.log('loginSubscriber:', res)
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
      url: '/api/subscriber/isLoggedIn'
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



 this.registerAdmin = function(user) {
  console.log("userRegisterAdmin", user)
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/register/admin',
      data: {
          email: user.email,
          password: user.password
      }
    }).then(function(res) {
      $http({
        method: 'POST',
        url: '/api/login/admin',
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


  this.loginAdmin= function(user) {
    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: '/api/login/admin',
      data: {
        email: user.email,
        password: user.password
      }
    }).then(function(res) {
      console.log('loginAdmin:', res)
      deferred.resolve(res.data);
    }).catch(function(res) {
      deferred.reject(res.data);
    });
    return deferred.promise;
  };



    this.requireAdminAuth = function() {
    var deferred = $q.defer();
    $http({
      method: 'GET',
      url: '/api/admin/isLoggedIn'
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
