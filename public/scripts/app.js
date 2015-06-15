var app = angular.module('lightRail', ['ngRoute', 'toaster', 'angularMoment']);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainPageCtrl'
    })
    .when('/apartments/:apartmentId', {
      templateUrl: 'views/main.html',
      controller: 'MainPageCtrl'
    })
    .when('/map', {
      templateUrl: 'views/map.html',
      controller: 'MapCtrl'
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
      templateUrl: 'views/generalUserFavoritesTmpl.html',
      controller: 'GeneralUserFavoritesCtrl'
    })
    .when('/adminSubPage/:apartmentId', {
      templateUrl:'views/adminSubPage.html',
      controller: 'adminSubPageCtrl'
    })
    .when('/adminUser/:apartmentId', {
      templateUrl: 'views/adminGenUser.html',
      controller: 'adminUserCtrl'
    })
    .when('/profile', {
      templateUrl: 'views/profile.html',
      controller: 'ProfileCtrl',
      resolve: {
        userData: function(GeneralUserService){
          return GeneralUserService.getSubscriberInfo();
        }
      }
    })
    .when('/adminSubPage', {
      templateUrl: 'views/adminSubPage.html',
      controller: 'adminSubPageCtrl'
    })
    .when('/adminUser', {
      templateUrl: 'views/adminGenUser.html',
      controller: 'adminUserCtrl'
    })
    .when('/adminStats',{
      templateUrl: 'views/adminStats.html',
      controller: 'adminStatsCtrl'
    })
     .otherwise({
      redirectTo: '/'
    });
});



