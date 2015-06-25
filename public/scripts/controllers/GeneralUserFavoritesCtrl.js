var app = angular.module('lightRail');

app.controller('GeneralUserFavoritesCtrl', function($scope, $routeParams, GeneralUserService, $timeout, trainStations) {


  // var allApartmentsData = GeneralUserService.apartmentData;
  // var selectedApartmentData = GeneralUserService.apartmentData[$routeParams.apartmentId];
  // I need to add this into the click station function after the favorites array button is connected 
  // $scope.todayDate = new Date();
  // $scope.apartments = allApartmentsData;

  $scope.favoriteMarkers = [];
  $scope.favoriteArr = [];
  $scope.getFavorites = function() {
    GeneralUserService.getFavorites().then(function(data) {
      console.log(data[0]);
      $scope.favoriteArr = data[0].favorites;
      $scope.apartments = $scope.favoriteArr;
      for (var i = 0; i < $scope.favoriteArr.length; i++) {
        var apt = $scope.favoriteArr[i];
        console.log(apt);
        $scope.favoriteMarkers.push({
          id: i,
          mongoId: apt._id,
          latitude: apt.location.lat,
          longitude: apt.location.long,
          apartment_name: apt.apartment_name,
          address: {
            street_address: apt.address.street_address,
            city: apt.address.city,
            state: apt.address.state,
            zip_code: apt.address.zip_code
          },
          // phone: apt.phone,
          // website: apt.website,
          // photos:
          // units:
          rent_range: {
            min: 900,
            max: 1800
          },
          // station: marker.model.title,
          clicked: false,
          events: {
            mouseover: function(marker, mouseover, favoriteMarkers) {
              favoriteMarkers.show = true;
            },
            mouseout: function(marker, mouseout, favoriteMarkers) {
              favoriteMarkers.show = false;
            }
          }
        })
      };
    })
  }

  $scope.getFavorites();


  $scope.todayDate = new Date();
  // $scope.apartments = $scope.favoriteArr ;


  //** Modal Initiation**//
  $scope.getApartment = function(apartment) {
    var modal_apartment = '';

    $scope.modal_apartment = apartment;

  }

  // ** Angular Google Maps ** //

  var mapStyles = [{
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{
      "color": "#CCE4FC"
    }, {
      "lightness": 17
    }]
  }, {
    "featureType": "landscape",
    "elementType": "geometry",
    "stylers": [{
      "color": "#f5f5f5"
    }, {
      "lightness": 20
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.fill",
    "stylers": [{
      "color": "#ffffff"
    }, {
      "lightness": 17
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#ffffff"
    }, {
      "lightness": 29
    }, {
      "weight": 0.2
    }]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [{
      "color": "#ffffff"
    }, {
      "lightness": 18
    }]
  }, {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [{
      "color": "#ffffff"
    }, {
      "lightness": 18
    }]
  }, {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [{
      "color": "#f5f5f5"
    }, {
      "lightness": 21
    }]
  }, {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [{
      "color": "#AFDEAF"
    }, {
      "lightness": 21
    }]
  }, {
    "elementType": "labels.text.stroke",
    "stylers": [{
      "visibility": "on"
    }, {
      "color": "#ffffff"
    }, {
      "lightness": 16
    }]
  }, {
    "elementType": "labels.text.fill",
    "stylers": [{
      "saturation": 36
    }, {
      "color": "#333333"
    }, {
      "lightness": 40
    }]
  }, {
    "elementType": "labels.icon",
    "stylers": [{
      "visibility": "on"
    }]
  }, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{
      "color": "#f2f2f2"
    }, {
      "lightness": 19
    }]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.fill",
    "stylers": [{
      "color": "#BFE3BF"
    }, {
      "lightness": 20
    }]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
      "color": "#fefefe"
    }, {
      "lightness": 17
    }, {
      "weight": 1.2
    }]
  }];


  $scope.map = {
    center: {
      latitude: 33.439266,
      longitude: -111.971015
    },
    zoom: 12
  };

  $scope.options = {
    styles: mapStyles
  };

  $scope.pathArray = [];
  $scope.stationMarkers = [];
  $scope.selectedStation = [];
  var points;

  $scope.createPolyline = function() {
    for (var i = 0; i < trainStations.length; i++) {
      points = trainStations[i]
      $scope.pathArray.push({
        id: i,
        latitude: points.lat,
        longitude: points.long

      })

      $scope.stationMarkers.push({
        id: i,
        latitude: points.lat,
        longitude: points.long,
        title: points.name,
        clicked: false,
        events: {
          mouseover: function(marker, mouseover, stationMarkers) {
            stationMarkers.show = true;
          },
          mouseout: function(marker, mouseout, stationMarkers) {
            stationMarkers.show = false;
          }
        }
      })
    }
  }

  $scope.createPolyline();

  $scope.polylines = [{
    path: $scope.pathArray,
    geodesic: true,
    stroke: {
      color: '#4059FF',
      weight: 3,
      opacity: 1.0
    }
  }]


  $scope.circles = [];
  $scope.clickStation = function(marker) {
    var id = marker.model.id;
    if (marker.model.clicked === false) {

      var circle = {
        id: id,
        center: {
          latitude: marker.model.latitude,
          longitude: marker.model.longitude
        },
        radius: 804.67200,
        stroke: {
          weight: 0
        },
        fill: {
          color: '#4059FF',
          opacity: 0.1
        },
        clickable: false,
        visible: true
      }
      $scope.$apply(function() {
        $scope.circles.push(circle);
        $scope.map.zoom = 15;
        $scope.map.center = {
          latitude: marker.model.latitude,
          longitude: marker.model.longitude
        };
      })
      marker.model.clicked = true;
    } else {
      marker.model.clicked = false;
      $scope.$apply(function() {
        for (var i = 0; i < $scope.circles.length; i++) {
          if ($scope.circles[i].id === id) {
            $scope.circles.splice(i, 1);
            i--;
          }
        };
        $scope.map.zoom = 13;
      })
    }
  }









});
