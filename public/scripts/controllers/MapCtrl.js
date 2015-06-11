var app = angular.module('lightRail');

app.controller('MapCtrl', function($scope, trainStations) {



  $scope.markerArray = [];

  // CREATES MAKER POINTS
  $scope.createMarker = function(map) {
    for (var i = 0; i < trainStations.length; i++) {
      var stop = trainStations[i]

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(stop.lat, stop.long),
        map: map,
        title: stop.name,
        animation: google.maps.Animation.DROP
      });

      var infowindow;



      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        var showLocations = false;
        var circleBounds;

        return function() {
          if (showLocations === false) {
            map.setZoom(15);
            map.setCenter(marker.getPosition());
            var boundryOptions = {
              strokeWeight: 0,
              fillColor: '#FF0000',
              fillOpacity: 0.1,
              map: map,
              center: marker.getPosition(),
              radius: 804.67200
            };
            circleBounds = new google.maps.Circle(boundryOptions);
            showLocations = true
            console.log(showLocations);

          } else {
            console.log("MADE IT");
            map.setZoom(13)
            circleBounds.setMap(null);
            showLocations = false;
          }
        }
      })(marker, i));






      google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
        return function() {
          infowindow = new google.maps.InfoWindow({
            content: marker.title,
          });
          infowindow.open(map, marker);
        }
      })(marker, i));



      google.maps.event.addListener(marker, 'mouseout', (function(marker, i) {
        return function() {
          infowindow.close();
        }
      })(marker, i));



      $scope.markerArray.push(marker);
    }
  }



  // CREATES LINE POINTS
  $scope.createLine = function(arr) {
    for (var i = 0; i < trainStations.length; i++) {
      var points = trainStations[i]
      arr.push(new google.maps.LatLng(points.lat, points.long));
    };
  }


// CCFCCC - color for parks

  // CREATES MAP 
  $scope.initialize = function() {
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
          "color": "#dedede"
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
          "color": "#fefefe"
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
      }
    ];

    var mapOptions = {
      zoom: 12,
      scrollwheel: true,
      center: new google.maps.LatLng(33.439231, -111.992788)
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var styledMapOptions = {
      name: 'Search Map'
    };

    var styledSearchMap = new google.maps.StyledMapType(mapStyles, styledMapOptions);

    map.mapTypes.set('searchmap', styledSearchMap);
    map.setMapTypeId('searchmap');



    $scope.createMarker(map);
    console.log($scope.markerArray);


    var lightRailCoordinates = [];

    $scope.createLine(lightRailCoordinates);

    var lightRailPath = new google.maps.Polyline({
      path: lightRailCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    lightRailPath.setMap(map);

    google.maps.event.addListener(map, 'click', function() {
      console.log("Map Click");
    });
  }


  // INITIALIZE MAP ON PAGE LOAD
  google.maps.event.addDomListener(window, 'load', $scope.initialize());


}); //ends controller
