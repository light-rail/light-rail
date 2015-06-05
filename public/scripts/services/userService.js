var app = angular.module('lightRail');


app.service('GeneralUserService', function() {
  this.getGeneralUser = function() {
    var url = '/api/generalUser/myfavorites'
  return http ({
    method: 'GET',
    url: url
 }).then(function(response){
    return response.data;
 })
 };



}); //end