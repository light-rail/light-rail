var app = angular.module('lightRail');

app.controller('MainPageCtrl', function($scope, $routeParams, GeneralUserService, trainStations) {

  var allApartmentsData = GeneralUserService.apartmentData;
  var selectedApartmentData = GeneralUserService.apartmentData[$routeParams.apartmentId];


  $scope.todayDate = new Date();
  $scope.apartments = allApartmentsData;


  //** Modal Initiation**//
  $scope.getApartment = function(apartment) {
    var modal_apartment = '';

    $scope.modal_apartment = apartment;

  }

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
  $scope.circles = [];
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
        coords: {
          latitude: points.lat,
          longitude: points.long
        },
        message: points.name,
      })


    }
  }
  $scope.createPolyline();

  $scope.polylines = [{
    path: $scope.pathArray,
    geodesic: true,
    stroke: {
      color: '#FF0000',
      weight: 3,
      opacity: 1.0
    }
  }]

  var locationClicked = true;
  $scope.clickStation = function(marker) {
    id = marker.id;
    if (locationClicked === true) {
      var circle = {
        id: marker.id,
        center: {
          latitude: marker.coords.latitude,
          longitude: marker.coords.longitude
        },
        radius: 804.67200,
        stroke: {
          weight: 0
        },
        fill: {
          color: '#FF0000',
          opacity: 0.1
        },
        clickable: false,
        visible: true
      }
      $scope.$apply(function() {
        $scope.circles.push(circle);
      })
      locationClicked = false;
      console.log(locationClicked);
    } else {
      locationClicked = true;
      $scope.circles = [];
    }
  }


















});
