var app = angular.module('lightRail');


app.service('GeneralUserService', function($http, $q) {

  //I recommend being more descriptive w/ this funct name, example: "getGeneralUserFavorites"
  this.getGeneralUser = function() {
    var url = '/api/generalUser/myfavorites'
    return $http({
      method: 'GET',
      url: url
    }).then(function(response){
      return response.data;
    })
  };

  this.getSubscriberInfo = function(){
    var url = '/api/subscriber/isLoggedIn';
    return $http({
      method: 'GET',
      url: url
    }).then(function(data){
      return data;
    });
  };


  //*** SEED DATA FOR MAIN PAGE ***//


  this.apartmentData = [
    {
      apartmentId: 0,
      apartment_name: 'Glenwood Apartments',
      picture: "apartment1.jpg",
      description: 'Glenwood Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '324 East Jefferson Ave',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '900',
        max: '1,800'
      },
      date_created: '2015-04-01T16:06:58.970Z'
    },
    {
      apartmentId: 1,
      apartment_name: 'Bellaggio Apartments',
      picture: "apartment2.jpg",
      description: 'Glenwood Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '3320 North Central Ave',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '900',
        max: '1,400'
      },
      date_created: '2015-02-01T16:06:58.970Z'
    },
      {
      apartmentId: 2,
      apartment_name: 'Camelback Apartments',
      picture: "apartment3.jpg",
      description: 'Glenwood Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '732 East Camelback',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '600',
        max: '1,100'
      },
      date_created: '2015-04-01T16:06:58.970Z'
    },
      {
      apartmentId: 3,
      apartment_name: 'Sienna Luxury Apartments',
      picture: "apartment4.jpg",
      description: 'Glenwood Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '732 East Apache Ave',
        city: 'Tempe',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '900',
        max: '1,800'
      },
      date_created: '2015-03-01T16:06:58.970Z'
    },
      {
      apartmentId: 4,
      apartment_name: 'RiverWalk Apartments',
      picture: "apartment5.jpg",
      description: 'Glenwood Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '7332 East Camelback Ave',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '700',
        max: '1,200'
      },
      date_created: '2015-02-01T16:06:58.970Z'
    },
    {
      apartmentId: 5,
      apartment_name: 'Valley View Apartments',
      picture: "apartment6.jpg",
      description: 'Glenwood Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '2145 W Glendale Ave',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '500',
        max: '1,000'
      },
      date_created: '2015-04-01T16:06:58.970Z'
    },
      {
      apartmentId: 6,
      apartment_name: 'Mesa Vista Apartments',
      picture: "apartment1.jpg",
      description: 'Glenwood Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '7432 East Main Ave',
        city: 'Mesa',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '600',
        max: '1,000'
      },
      date_created: '2015-02-01T16:06:58.970Z'
    },
    {
      apartmentId: 7,
      apartment_name: 'Desert Club Apartments',
      picture: "apartment2.jpg",
      description: 'Glenwood Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        city: 'Tempe',
        street_address: '732 North Central Ave',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '900',
        max: '1,400'
      },
      date_created: '2015-05-01T16:06:58.970Z'
    }
  ];

}); //end