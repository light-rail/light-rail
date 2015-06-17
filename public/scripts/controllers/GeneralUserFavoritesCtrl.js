var app = angular.module('lightRail');

app.controller('GeneralUserFavoritesCtrl', function($scope, $routeParams, GeneralUserService, $timeout, trainStations) {
  
  var allApartmentsData = GeneralUserService.apartmentData;
  var selectedApartmentData = GeneralUserService.apartmentData[$routeParams.apartmentId];


  $scope.todayDate = new Date();
  $scope.apartments = allApartmentsData;


  //** Modal Initiation**//
  $scope.getApartment = function(apartment) {
    var modal_apartment = '';

    $scope.modal_apartment = apartment;

  }


//** Map **//

  $scope.favAptArray = [];
  var favAptMarker;


  $scope.createFavAptMarker = function(map) {
    console.log("creating FavApt");
    var favorites = GeneralUserService.apartmentData;

    for (var i = 0; i < favorites.length; i++) {
      var favorite = favorites[i].location;
        favAptMarker = new google.maps.Marker({
            position: new google.maps.LatLng(favorite.lat, favorite.long),
            map: map,
            title: favorite.apartment_name,
            animation: google.maps.Animation.DROP,
            icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
          })

      google.maps.event.addListener(favAptMarker, 'mouseover', (function(favAptMarker, i) {
        return function() {
          infowindow = new google.maps.InfoWindow({
            content: {
              title: favAptMarker.title,
              website: favorite.website
            }
          });
          infowindow.open(map, favAptMarker);
        }
      })(favAptMarker, i));



      google.maps.event.addListener(favAptMarker, 'mouseout', (function(favAptMarker, i) {
        return function() {
          infowindow.close();
        }
      })(favAptMarker, i));

        $scope.favAptArray.push(favAptMarker);
    }
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
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 6,
          strokeWeight: 4, 
          strokeColor: 'blue'
        },
        animation: google.maps.Animation.DROP
      });


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
    $scope.createFavAptMarker(map);

    var lightRailCoordinates = [];

    $scope.createLine(lightRailCoordinates);

    var lightRailPath = new google.maps.Polyline({
      path: lightRailCoordinates,
      geodesic: true,
      strokeColor: '#4760FF',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    lightRailPath.setMap(map);

    

    google.maps.event.addListener(map, 'click', function() {
      console.log("Map Click");
    });

  }



// if($('#map-canvas').length && !$('#map-canvas div').length){$scope.initialize();}
  // INITIALIZE MAP ON PAGE LOAD
  $scope.initialize();
  // google.maps.event.addDomListener(window, 'load', $scope.initialize());


});






























