var app = angular.module('lightRail');

app.controller('MapCtrl', function($scope, trainStations, GeneralUserService, $timeout) {

  $scope.localMarkersArray = [];
  var addressString;
  var addressLatLng;
  var locationMarker;


  $scope.createLocalMarker = function(map, markerPosition, radius) {
    console.log("creating Location");
    var geocoder = new google.maps.Geocoder();
    var locations = GeneralUserService.apartmentData;

    for (var i = 0; i < locations.length; i++) {
      var location = locations[i].location;
      var locationName = locations[i].apartment_name;
      addressString = location.street_address + " " + location.city + " " + location.state + " " + location.country + " " + location.zip_code;

      geocoder.geocode({
        'address': addressString
      }, function(results, status) {

        if (status == google.maps.GeocoderStatus.OK) {
          addressLatLng = (results[0].geometry.location);
          locationMarker = new google.maps.Marker({
            position: addressLatLng,
            map: map,
            title: locationName,
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
          })
        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
        $scope.localMarkersArray.push(locationMarker);
      })
    }
    $timeout(function() {
      for (var i = 0; i < $scope.localMarkersArray.length; i++) {
        var theMarker = $scope.localMarkersArray[i];
        var localLatLng = theMarker.getPosition();
        var dist = google.maps.geometry.spherical.computeDistanceBetween(markerPosition, localLatLng);
        if (dist < radius) {
          console.log(theMarker);
        }
      }
    }, 1000);
  }


  var infowindow;
  $scope.placesArray = [];
  $scope.places = function(map, markerPosition) {
    var request = {
      location: markerPosition,
      radius: 804.67200,
      types: ['amusement_park', 'aquarium', 'art_gallery', 'bowling_alley', 'cafe', 'zoo', 'stadium', 'restaurant', 'movie_theater', 'library']
    };
    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          placeMarker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
            title: place.name,
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
          })

          google.maps.event.addListener(placeMarker, 'mouseover', (function(placeMarker, i) {
            return function() {
              infowindow = new google.maps.InfoWindow({
                content: placeMarker.title,
              });
              infowindow.open(map, placeMarker);
            }
          })(placeMarker, i));

           google.maps.event.addListener(placeMarker, 'mouseout', (function(placeMarker, i) {
            return function() {
              infowindow.close();
            }
          })(placeMarker, i));

           $scope.placesArray.push(placeMarker);
        }
      }
    });
  };

var clearMarkers = function(array) {
  for (var i = 0; i < array.length; i++) {
    array[i].setMap(null);
  };
}



  $scope.markerArray = [];

  // CREATES MAKER POINTS
  $scope.createMarker = function(map) {

    for (var i = 0; i < trainStations.length; i++) {
      var stop = trainStations[i];

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(stop.lat, stop.long),
        map: map,
        title: stop.name,
        animation: google.maps.Animation.DROP
      });




      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        var showLocations = false;
        var circleBounds;
        var radius = 804.67200;
        var markerPosition = marker.getPosition();
        var boundryOptions = {
          strokeWeight: 0,
          fillColor: '#FF0000',
          fillOpacity: 0.1,
          map: map,
          center: markerPosition,
          radius: radius
        };

        return function() {
          if (showLocations === false) {
            map.setZoom(15);
            map.setCenter(marker.getPosition());
            circleBounds = new google.maps.Circle(boundryOptions);
            $scope.places(map, markerPosition);
            // $scope.createLocalMarker(map, markerPosition, radius);
            showLocations = true;
            console.log(showLocations);

          } else {
            map.setZoom(13)
            circleBounds.setMap(null);
            clearMarkers($scope.placesArray);
            showLocations = false;
            console.log(showLocations);
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








  var map;
  // CREATES MAP 
  $scope.initialize = function() {
    console.log("Hit function");
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

    var mapOptions = {
      zoom: 12,
      scrollwheel: true,
      center: new google.maps.LatLng(33.439266, -111.971015)
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var styledMapOptions = {
      name: 'Search Map'
    };

    var styledSearchMap = new google.maps.StyledMapType(mapStyles, styledMapOptions);

    map.mapTypes.set('searchmap', styledSearchMap);
    map.setMapTypeId('searchmap');



    $scope.createMarker(map);





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
$scope.initialize();
  // google.maps.event.addDomListener(window, 'load', $scope.initialize());
 



}); //ends controller
