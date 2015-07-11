var app = angular.module('lightRail');

app.controller('SubAddCtrl', function($scope,$location, $routeParams, SubscriberService, GeneralUserService, toaster, getAddedApt) {

  console.log('getAddedApt', getAddedApt);
  $scope.apartment = getAddedApt[0];
  console.log('getAddedApt apartment', $scope.apartment);
  
  $scope.unit = {};
  $scope.picture = {};


  // $scope.processFiles = function(files) {
  //   angular.forEach(files, function(flowFile, i) {
  //     var fileReader = new FileRead();
  //     fileReader.onLoad = function(event) {
  //       var uri = event.target.result;
  //       console.log(uri);
  //     }
  //   })
  // }


  //** Add Unit Modal Content **/
  $scope.addUnit = function(unit) {
    $scope.apartment.units.push(unit);
    $scope.unit = {};
    console.log('addUnit apartment', $scope.apartment)
    console.log('unit', $scope.unit)
  };

  //** Add Pictures Container Content **/
  // $scope.addPicture = function(picture) {
  //   $scope.apartment.pictures_array.push(picture);

  //   $scope.picture = {};
  //   console.log('picture', $scope.picture)
  //   console.log('apartment', $scope.apartment)
  // };

  //** Submits Listing to Service **/
  $scope.addApartmentListing = function(apartment, files) {
    files.upload();//sends pics to server and AWS - problem w/ redirect before upload complete (FIX)
    console.log("addApartmentListing-apartment", apartment)
    SubscriberService.addApartmentListing(apartment).then(function(res) {
      toaster.pop('success', 'You successfully added the Listing!');
      $location.path('/subscriber/dashboard/' + res.subscriber_id);//Change to :subscriberId?
    }, function(err) {
      console.log('AddApartment err', err)
      //Need to add an error.status for address not being within range of lightrail
      if(err.status === 11000) toaster.pop('error', 'This listing is already registered');
      else toaster.pop('error', 'Sorry, something went wrong!');
    });
  };
})
