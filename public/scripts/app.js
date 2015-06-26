var app = angular.module('lightRail', ['ngRoute', 'toaster', 'angularMoment', 'uiGmapgoogle-maps', 'flow', 'chart.js']);
// app.run(function($rootScope) {
//   $rootScope.isLoggedIn = {
//     subscriber: false,
//     user: false,
//     admin: false
//   }
// });

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/mainTmpl.html',
      controller: 'MainPageCtrl',
      resolve: {
        isLoggedIn: function(AuthService) {
          return AuthService.isLoggedIn();
        }
      }
    })
    //General User Routes
    .when('/register/general_user', {
      templateUrl: 'views/register/registerGeneralUserTmpl.html',
      controller: 'RegisterCtrl'
    })
    .when('/login', {
      templateUrl: 'views/login/loginUserTmpl.html',
      controller: 'LoginCtrl'
    })
    .when('/myfavorites', {
      templateUrl: 'views/generalUser/generalUserFavoritesTmpl.html',
      controller: 'GeneralUserFavoritesCtrl'
    })
    //Subscriber Routes
    .when('/register/subscriber', {
      templateUrl: 'views/register/registerSubscriberTmpl.html',
      controller: 'RegisterCtrl'
    })
    .when('/login/subscriber', {
      templateUrl: 'views/login/loginSubscriberTmpl.html',
      controller: 'LoginCtrl'
    })
    .when('/subscriber/verify-address', {
      templateUrl: 'views/subscriber/newApartmentAddressVerificationTmpl.html',
      controller: 'SubscriberCtrl'
    })
    .when('/subscriber/new-listing/:id', {
      templateUrl: 'views/subscriber/newApartmentListingTmpl.html',
      controller: 'SubAddCtrl',
      resolve: {
        getAddedApt: function(GeneralUserService, $route) {
          return GeneralUserService.getAddedApt($route.current.params.id);
        },
        isLoggedIn: function(AuthService) {
          return AuthService.isLoggedIn();
        }
      }
    })
    .when('/subscriber/dashboard/:id', {
      templateUrl: 'views/subscriber/apartmentListingDashboard.html',
      controller: 'SubscriberDashboardCtrl',
      resolve: {
        subProfile: function(SubscriberDashboardService) {
          return SubscriberDashboardService.getSubscriberInfo();
        },
        subListings: function(SubscriberDashboardService, $route) {
          return SubscriberDashboardService.getListings($route.current.params.id);
        },
        isLoggedIn: function(AuthService) {
          return AuthService.isLoggedIn();
        }
      }
    })
    //Admin Routes
    .when('/register/admin', {
      templateUrl: 'views/register/registerAdminTmpl.html',
      controller: 'RegisterCtrl'
    })
    .when('/login/admin', {
      templateUrl: 'views/login/loginAdminTmpl.html',
      controller: 'LoginCtrl'
    })
    .when('/adminUser/:apartmentId', {
      templateUrl: 'views/admin/adminGenUser.html',
      controller: 'adminUserCtrl'
    })
    .when('/adminSubPage', {
      templateUrl: 'views/admin/adminSubPage.html',
      controller: 'adminSubPageCtrl'
    })
    .when('/adminUser', {
      templateUrl: 'views/admin/adminGenUser.html',
      controller: 'adminUserCtrl'
    })
    .when('/adminStats',{
      templateUrl: 'views/admin/adminStats.html',
      controller: 'adminStatsCtrl'
    })
     .otherwise({
      redirectTo: '/'
    });


});



