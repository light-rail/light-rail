var app = angular.module('lightRail');

app.controller('MainPageCtrl', function($scope, $routeParams, GeneralUserService, isLoggedIn, toaster) {
  console.log('isLoggedIn', isLoggedIn);
  $scope.isLoggedIn = isLoggedIn;
  // this is for the seeded data --- change the ng-repeat if you want to use it! 
  // var allApartmentsData = GeneralUserService.apartmentData;
  // $scope.apartments = allApartmentsData;


  $scope.aptArray;
  $scope.getAptArr = function() {
    GeneralUserService.getAptData().then(function(data) {
      $scope.aptArray = data;
      $scope.selectApt = data;
      console.log('aptArray', $scope.aptArray);
    })
  }

  $scope.getAptArr();

  //** Apartment Detail Modal Initiation **//
  $scope.getApartment = function(apartment, isLoggedIn) {
    console.log('getApartment apartment', apartment);
    var modal_apartment = '';
    var favoritesArr = isLoggedIn.user.favorites
    var inFavs = false;
    console.log('getApt isLoggedIn', isLoggedIn)
    console.log('getApt favorites', favoritesArr)
    console.log('getApt apartmentId', apartment._id)


    //Generate function to check if in favorite list
    if (favoritesArr) {
      for (var i = 0; i < favoritesArr.length; i++) {
        if (favoritesArr[i] === apartment._id) {
          inFavs = true;
          console.log("infavs1", inFavs)
        } else {
          inFavs = false;
          console.log('infavs2', inFavs)
        }
      }
    }

    $scope.modal_apartment = apartment;
    console.log('modal_apartment', $scope.modal_apartment)
  }


  //Adds to favorites
  $scope.addToFavorites = function(apt) {
    console.log(apt._id);
    GeneralUserService.addToFavorites(apt._id).then(function(data) {
      GeneralUserService.getFavorites();
      console.log("Made it!", data);
      toaster.pop('success', 'Added to your favorites');
    }, function(err) {
      console.log('Fav add fail', err);
      toaster.pop('error', 'This is already in your favorites!');
    });
  };

  //Sends Message to register or login to access favorite feature
  $scope.askToLogin = function() {
    toaster.pop('info', 'Register/login to add favorite.')
  };





  $scope.hello = function() {
    console.log("HELLO");
  }

  var clickedApt;
  $scope.clickApt = function(marker) {
    clickedApt = marker.model;
    console.log("IN FUNC", clickedApt);
    $scope.getApartment(clickedApt);
  }




  $scope.aptMarkers = [];
  $scope.selectedApt = [];
  $scope.createAptMarkers = function(marker) {
    console.log(marker);
    console.log($scope.aptArray);
    for (var i = 0; i < $scope.aptArray.length; i++) {
      var apt = $scope.aptArray[i];
      console.log(apt);
      var nearest_stops = apt.nearest_stops;
      for (var k = 0; k < nearest_stops.length; k++) {
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
              pictures_array: apt.pictures_array,
              phone: apt.phone_number,
              webpage: apt.webpage,
              description: apt.description,
              price_range: apt.price_range,
              station: marker.model.title,
              func: {
                func: function() {
                  console.log(hello);
                }
              },
              events: {
                click: function(marker, click, aptMarkers) {
                  aptMarkers.show = true;
                  $scope.clickApt(marker);

                }
              } // ends events
            }) // ends push
          $scope.selectedApt = $scope.aptMarkers.slice(0);
          console.log($scope.selectedApt);
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
        if ($scope.selectedApt.length > 0) {
          $scope.selectApt = $scope.selectedApt;
        }
      })
      marker.model.clicked = true;
    } else {
      GeneralUserService.getAptData().then(function(data) {
        $scope.selectApt = data;
      })
      marker.model.clicked = false;
      $scope.map.zoom = 14;
      $scope.$apply(function() {
        for (var i = 0; i < $scope.circles.length; i++) {
          if ($scope.circles[i].id === id) {
            $scope.circles.splice(i, 1);
          }
        };
        for (var i = 0; i < $scope.aptMarkers.length; i++) {
          if ($scope.aptMarkers[i].station === marker.model.title) {
            $scope.aptMarkers.splice(i, 1);
            i--;
          }
        };
        for (var i = 0; i < $scope.selectApt.length; i++) {
          if ($scope.selectApt[i].station === marker.model.title) {
            $scope.selectApt.splice(i, 1);
            i--;
          }
        };
      })
    }
  }





});
