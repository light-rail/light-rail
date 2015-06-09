var app = angular.module('lightRail');

app.controller('MainPageCtrl', function($scope, $routeParams, GeneralUserService) {


  // var allApartmentsData = GeneralUserService.apartmentData;
  // console.log('All apartments Data:', allApartmentsData);


  // var selectedApartmentData = GeneralUserService.apartmentData[$routeParams.apartmentId];
  // console.log("routeParams.apartmentId:", GeneralUserService.apartmentData[$routeParams.apartmentId]);

  // $scope.allApartmentsData;

  // $scope.selectedApartmentData;
  // // $scope.listMode = true;

  // // $scope.todayDate = new Date();
  // // $scope.apartments = allApartmentsData;
  // // // console.log('apartments', $scope.apartments)
  // // $scope.apartment = selectedApartmentData;
  // // // console.log('apartment', $scope.apartment)

  // // if ($routeParams.apartmentId) {
  // //   $scope.listMode = false;
  // // }
  
  
  var allProjectsData = GeneralUserService.projectData;
  // console.log('All Projects Data:', $scope.projects);

  var selectedProjectData = GeneralUserService.projectData[$routeParams.projectId];
  // console.log("routeParams.projectId:", $routeParams.projectId);

  $scope.listMode = true;

  $scope.todayDate = new Date();
  $scope.projects = allProjectsData;
  $scope.project = selectedProjectData;

  if ($routeParams.projectId) {
    $scope.listMode = false;
    $scope.experience = GeneralUserService.displayAll(selectedProjectData.desired_candidate.experience);
    $scope.rotationDays = GeneralUserService.rotationalDays(selectedProjectData.rotational_days_on); 
  }

});