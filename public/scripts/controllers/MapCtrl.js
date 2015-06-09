var app = angular.module('lightRail');

app.controller('MapCtrl', function($scope, trainStations) {

  // var boundryOptions = {
  //   strokeColor: '#FF0000',
  //   strokeOpacity: 0.8,
  //   strokeWeight: 2,
  //   fillColor: '#FF0000',
  //   fillOpacity: 0.35,
  //   map: map,
  //   center: marker.position,
  //   radius: 804.67200
  // };


  // CREATES MAKER POINTS
  $scope.createMarker = function(map) {
    for (var i = 0; i < trainStations.length; i++) {
      var stop = trainStations[i]
      new google.maps.Marker({
        position: new google.maps.LatLng(stop.lat, stop.long),
        map: map,
        title: stop.name,
        animation: google.maps.Animation.DROP
      });
    }
  }



  // CREATES LINE POINTS
  $scope.createLine = function(arr) {
    for (var i = 0; i < trainStations.length; i++) {
      var points = trainStations[i]
      arr.push(new google.maps.LatLng(points.lat, points.long));
    };
  }




  // CREATES MAP 
  $scope.initialize = function() {
    var mapOptions = {
      zoom: 12,
      scrollwheel: true,
      center: new google.maps.LatLng(33.439231, -111.992788)
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    $scope.createMarker(map);


    //  google.maps.event.addListener(marker, 'click', function() {
    //   map.setZoom(8);
    //   map.setCenter(marker.getPosition());
    // });

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
  }


  // INITIALIZE MAP ON PAGE LOAD
  google.maps.event.addDomListener(window, 'load', $scope.initialize());
}); //ends controller
