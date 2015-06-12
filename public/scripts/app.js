var app = angular.module('lightRail', ['ngRoute', 'toaster', 'angularMoment']);

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/mainTmpl.html',
      controller: 'MainPageCtrl'
    })
    .when('/apartments/:apartmentId', {
      templateUrl: 'views/mainTmpl.html',
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
    .when('/register/admin', {
      templateUrl: 'views/register/registerAdminTmpl.html',
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
    .when('/login/admin', {
      templateUrl: 'views/login/loginAdminTmpl.html',
      controller: 'LoginCtrl'
    })
    .when('/myfavorites', {
      templateUrl: 'views/generalUser/generalUserFavoritesTmpl.html',
      controller: 'GeneralUserFavoritesCtrl'
    })
    .when('/general_user/profile', {
      templateUrl: 'views/generalUser/generalUserProfileTmpl.html',
      controller: 'ProfileCtrl',
      resolve: {
        userData: function(GeneralUserService){
          GeneralUserService.getSubscriberInfo().then(function(response){
            console.log(response);
          });
        }
      }
    })
     .otherwise({
      redirectTo: '/'
    });
});



