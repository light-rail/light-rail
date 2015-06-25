var app = angular.module('lightRail');

app.controller('MainPageCtrl', function($scope, $routeParams, GeneralUserService, toaster) {

  // this is for the seeded data --- change the ng-repeat if you want to use it! 
  var allApartmentsData = GeneralUserService.apartmentData;
  $scope.apartments = allApartmentsData;


  $scope.aptArray;
  $scope.getAptArr = function() {
    GeneralUserService.getAptData().then(function(data) {
      $scope.aptArray = data;
      console.log('aptArray', $scope.aptArray);
    })
  }

  $scope.getAptArr();

  //** Modal Initiation **//
  $scope.getApartment = function(apartment) {
    console.log('getApartment apartment', apartment);
    var modal_apartment = '';

    $scope.modal_apartment = apartment;

  }


  $scope.clickApt = function(marker) {
    var clickedApt = marker.model;
    console.log('clickedApt', clickedApt);
    $scope.getApartment(clickedApt)
  }



  $scope.aptMarkers = [];
  $scope.createAptMarkers = function(marker) {
    console.log(marker);
    console.log($scope.aptArray);
    for (var i = 0; i < $scope.aptArray.length; i++) {
      var apt = $scope.aptArray[i];
      var nearest_stops = apt.nearest_stops;
      for (var k = 0; k < nearest_stops.length; k++) {
        console.log("nearest_stops[k]", nearest_stops[k]);
        console.log(marker.model.mongoId);
        if (nearest_stops[k] === marker.model.mongoId) {
          console.log(marker.model);
          $scope.aptMarkers.push({
              id: k,
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
              rent_range: {
                min: 900,
                max: 1800
              },
              station: marker.model.title,
              events: {
                mouseover: function(marker, mouseover, aptMarkers) {
                  aptMarkers.show = true;
                },
                mouseout: function(marker, mouseout, aptMarkers) {
                  aptMarkers.show = false;
                }
              } // ends events
            }) // ends push
        } // if 
      } // for nearest
    } // for apt Array
    console.log($scope.aptMarkers);

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
          mongoId: points._id,
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
        visible: true,
        draggable: false
      }
      $scope.$apply(function() {
        $scope.circles.push(circle);
        console.log($scope.circles);
        $scope.map.zoom = 15;
        $scope.map.center = {
          latitude: marker.model.latitude,
          longitude: marker.model.longitude
        };
        $scope.createAptMarkers(marker);
        // $scope.aptArray = $scope.aptMarkers;
      })
      marker.model.clicked = true;
    } else {
      marker.model.clicked = false;
      $scope.map.zoom = 14;
      $scope.$apply(function() {
        // $scope.getAptArr();
        for (var i = 0; i < $scope.circles.length; i++) {
          if ($scope.circles[i].id === id) {
            $scope.circles.splice(i, 1);
          }
        };
        for (var i = 0; i < $scope.aptMarkers.length; i++) {
          console.log($scope.aptMarkers);
          if ($scope.aptMarkers[i].station === marker.model.title) {
            console.log($scope.aptMarkers[i].station);
            $scope.aptMarkers.splice(i, 1);
            i--;
          }
        };
      })
    }
  }







  // We need to send to login - if havent loggedin! 

  $scope.addToFavorites = function(apt) {
    console.log(apt._id);
    GeneralUserService.addToFavorites(apt._id).then(function(data) {
      console.log("Made it!", data);
      toaster.pop('success', 'Added to your favorites');
    })
  }








});
