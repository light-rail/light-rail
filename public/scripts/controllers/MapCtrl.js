var app = angular.module('lightRail');

app.controller('MapCtrl', function($scope) {

  var Montebello_19Ave = {
    lat: 33.520059,
    long: -112.099641
  }

  var Camel_19Ave = {
    lat: 33.509599,
    long: -112.099788
  }

  var Camel_7Ave = {
    lat: 33.509337,
    long: -112.082329
  }

  var Camel_Central = {
    lat: 33.509275,
    long: -112.073636
  }

  var Campbell_Central = {
    lat: 33.500964,
    long: -112.073789
  }

  var Indian_Central = {
    lat: 33.494741,
    long: -112.073817
  }

  var Osborn_Central = {
    lat: 33.486263,
    long: -112.073783
  }

  var Thomas_Central = {
    lat: 33.480214,
    long: -112.073687
  }

  var Encento_Central = {
    lat: 33.473055,
    long: -112.073783
  }

  var McDowell_Central = {
    lat: 33.465716,
    long: -112.073869
  }

  var Roosevelt_Central = {
    lat: 33.458699,
    long: -112.073869
  }

  var VanBuren_1Ave = {
    lat: 33.451359,
    long: -112.075156
  }

  var Jefferson_1Ave = {
    lat: 33.448208,
    long: -112.075156
  }

  var Jefferson_3St = {
    lat: 33.446489,
    long: -112.069964
  }

  var Jefferson_12St = {
    lat: 33.447116,
    long: -112.056424
  }

  var Jefferson_24St = {
    lat: 33.447223,
    long: -112.030224
  }

  var Washington_38th = {
    lat: 33.448136,
    long: -112.002844
  }

  var Washington_44th = {
    lat: 33.448118,
    long: -111.987094
  }

  var Washington_Priest = {
    lat: 33.442586,
    long: -111.956581
  }

  var Washington_Center = {
    lat: 33.437375,
    long: -111.945144
  }

  var Mill_3St = {
    lat: 33.427365,
    long: -111.941346
  }

  var Veterans_College = {
    lat: 33.425471,
    long: -111.934941
  }

  var University_Rural = {
    lat: 33.420313,
    long: -111.926283
  }

  var Dorsey_Apache = {
    lat: 33.414735,
    long: -111.917097
  }

  var McClintock_Apache = {
    lat: 33.414789,
    long: -111.909093
  }

  var Smith_Martin_Apache = {
    lat: 33.414771,
    long: -111.900531
  }

  var Price101_Apache = {
    lat: 33.414843,
    long: -111.890747
  }

  var Sycamore_Main = {
    lat: 33.414879,
    long: -111.870018
  }





  var marker;

  $scope.createMarker = function() {
    for (var i = 0; i < stopsArray.length; i++) {
      var stop = stopsArray[i]
      maker = {
        position: new google.maps.LatLng(stop.lat, stop.long),
        map: map
          // title: 'Osborn_Central'
      }
    }
    return marker;
  }




  $scope.initialize = function() {
    var mapOptions = {
      zoom: 12,
      minZoom: 8,
      scrollwheel: true,
      center: new google.maps.LatLng(33.439231, -111.992788)
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

    $scope.createMarker();

    // var marker = new google.maps.Marker({
    //   position: new google.maps.LatLng(Osborn_Central.lat, Osborn_Central.long),
    //   map: map,
    //   title: 'Osborn_Central'
    // });

    // var marker = new google.maps.Marker({
    //   position: new google.maps.LatLng(Montebello_19Ave.lat, Montebello_19Ave.long),
    //   map: map,
    //   title: 'Montebello_19Ave'
    // });



    var transitLayer = new google.maps.TransitLayer();
    transitLayer.setMap(map);



    var lightRailCoordinates = [
      new google.maps.LatLng(Montebello_19Ave.lat, Montebello_19Ave.long),
      new google.maps.LatLng(Camel_19Ave.lat, Camel_19Ave.long),
      new google.maps.LatLng(Camel_7Ave.lat, Camel_7Ave.long),
      new google.maps.LatLng(Camel_Central.lat, Camel_Central.long),
      new google.maps.LatLng(Indian_Central.lat, Indian_Central.long),
      new google.maps.LatLng(Osborn_Central.lat, Osborn_Central.long)

    ];
    var lightRailPath = new google.maps.Polyline({
      path: lightRailCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    lightRailPath.setMap(map);
  }



  google.maps.event.addDomListener(window, 'load', $scope.initialize());
  // google.maps.event.addListener(map)































}); //ends controller
