var app = angular.module('lightRail');

app.controller('MainPageCtrl', function($scope, $routeParams, GeneralUserService) {

  var allApartmentsData = GeneralUserService.apartmentData;

  $scope.apartments = allApartmentsData;


  //** Modal Initiation **//
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
  $scope.stationMarkers = [];
  $scope.selectedStation = [];
  $scope.trainStations;
  var points;




  $scope.createPolyline = function() {
    GeneralUserService.getStations().then(function(data) {
      $scope.trainStations = data;
      for (var i = 0; i < $scope.trainStations.length; i++) {
        points = $scope.trainStations[i]
        $scope.pathArray.push({
          id: i,
          latitude: points.lat,
          longitude: points.lng

        })

        $scope.stationMarkers.push({
          id: i,
          latitude: points.lat,
          longitude: points.lng,
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
    })
  }

  $scope.createPolyline();

  $scope.polylines = [{
    path: $scope.pathArray,
    geodesic: true,
    stroke: {
      color: '#e68f03',
      weight: 3,
      opacity: 1.0
    }
  }]

  $scope.circles = [];
  $scope.clickStation = function(marker) {
    console.log(marker);
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
          color: '#e68f03',
          opacity: 0.1
        },
        clickable: false,
        visible: true
      }
      $scope.$apply(function() {
        $scope.circles.push(circle);
        $scope.map.zoom = 15;
        $scope.map.center = circle.center;
      })
      marker.model.clicked = true;
    } else {
      marker.model.clicked = false;
      $scope.$apply(function() {
        for (var i = 0; i < $scope.circles.length; i++) {
          if ($scope.circles[i].id === id) {
            $scope.circles.splice(i, 1);
          }
        };
        $scope.map.zoom = 13;
      })
    }
  }




  // $scope.aptMarkers = [];
  // $scope.aptMarkers = function() {
  //   GeneralUserService.getAptData().then(function(data) {
  //     console.log(data);
  //     $scope.aptMarkers.push({
  //       id: 
  //       latitude: 
  //       longitude: 
  //       title:
  //        events: {
  //         mouseover: function(marker, mouseover, aptMarkers) {
  //           aptMarkers.show = true;
  //         },
  //         mouseout: function(marker, mouseout, aptMarkers) {
  //           aptMarkers.show = false;
  //         }
  //       }

  //     })
  //   })
  // }


// GeneralUserService.getNearestStops().then(function(data) {


// });











});
