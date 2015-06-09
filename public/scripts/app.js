var app = angular.module('lightRail', ['ngRoute', 'toaster', 'angularMoment']);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
    })
    .when('/register/general_user', {
      templateUrl: 'views/register/registerGeneralUserTmpl.html',
      controller: 'RegisterCtrl'
    })
    .when('/register/subscriber', {
      templateUrl: 'views/register/registerSubscriberTmpl.html',
      controller: 'RegisterCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login/loginUserTmpl.html',
      controller: 'LoginCtrl'
    })
    .when('/login/subscriber', {
      templateUrl: 'views/login/loginSubscriberTmpl.html',
      controller: 'LoginCtrl'
    })
    .when('/myfavorites', {
      templateUrl: 'views/myfavorites.html',
      controller: 'myfavoritesCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        userData: function(GeneralUserService){
          debugger
          return GeneralUserService.getSubscriberInfo();
        }
      }
    })
     .otherwise({
      redirectTo: '/'
    });
});



