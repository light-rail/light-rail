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
    var url = '/api/subscriber/profile';
    return $http({
      method: 'GET',
      url: url
    }).then(function(data){
      console.log("getSubscriberInfo", data)
      return data;
    });
  };

  

  //*** SEED DATA FOR MAIN PAGE ***//


  this.apartmentData = [
    {
      apartmentId: 0,

      apartment_name: 'Monroe Street Abbey',
      picture: "apartment1.jpg",
      webpage: 'theabbeyapartments.com',
      description: 'Monroe Street Abbey, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '334 W Monroe St',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA',
        zip_code: '85003'
      },
      rent_range: {
        min: '900',
        max: '1,800'
      },
      date_created: '2015-04-01T16:06:58.970Z'
    },
    {
      apartmentId: 1,
      apartment_name: 'West 6th Tempe Apartments',
      picture: "apartment2.jpg",
      webpage: 'west6thtempe.com',
      description: 'West 6th Tempe Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '115 W 6th St',
        city: 'Tempe',
        state: 'Arizona',
        country: 'USA',
        zip_code: '85281'
      },
      rent_range: {
        min: '900',
        max: '1,400'
      },
      date_created: '2015-02-01T16:06:58.970Z'
    },
      {
      apartmentId: 2,
      apartment_name: 'Bella Solano Apartments',
      picture: "apartment3.jpg",
      webpage: 'bellasolanoapartments.com',
      description: 'Glenwood Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '5656 N 17th Ave',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA',
        zip_code: '85015'
      },
      rent_range: {
        min: '600',
        max: '1,100'
      },
      date_created: '2015-04-01T16:06:58.970Z'
    },
      {
      apartmentId: 3,
      apartment_name: 'Pavilions On Central',
      picture: "apartment4.jpg",
      webpage: 'liveatthepavilions.com',
      description: 'Pavilions Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '1 W Campbell Ave',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA',
        zip_code: '85013'
      },
      rent_range: {
        min: '900',
        max: '1,800'
      },
      date_created: '2015-03-01T16:06:58.970Z'
    },
      {
      apartmentId: 4,
      apartment_name: 'The Met Apartments',
      picture: "apartment5.jpg",
      webpage: 'themetapartmenthomes.com',
      description: 'The Met Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '200 E Fillmore St',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA',
        zip_code: '85004'
      },
      rent_range: {
        min: '700',
        max: '1,200'
      },
      date_created: '2015-02-01T16:06:58.970Z'
    },
    {
      apartmentId: 5,
      apartment_name: 'Midtown on Main Apartments',
      picture: "apartment6.jpg",
      webpage: 'midtownonmain.com',
      description: 'Midtown Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '2121 W Main St',
        city: 'Mesa',
        state: 'Arizona',
        country: 'USA',
        zip_code: '85201'
      },
      rent_range: {
        min: '500',
        max: '1,000'
      },
      date_created: '2015-04-01T16:06:58.970Z'
    },
      {
      apartmentId: 6,
      apartment_name: 'Tempe Metro Apartments',
      picture: "apartment1.jpg",
      webpage: "tempemetro.com",
      description: 'Tempe Metro Apartments, located right along Jefferson and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        street_address: '1811 E Apache Blvd',
        city: 'Tempe',
        state: 'Arizona',
        country: 'USA',
        zip_code: '85281'
      },
      rent_range: {
        min: '600',
        max: '1,000'
      },
      date_created: '2015-02-01T16:06:58.970Z'
    },
    {
      apartmentId: 7,
      apartment_name: 'Villas On Apache',
      picture: "apartment2.jpg",
      webpage: "villasonapache.com",
      description: 'Villas Apartments, located right along Apache and 4th Street, is your new luxury housing community in downtown Phoenix. When you live at Roosevelt Point, you’re in the heart of downtown Phoenix, so you’ll enjoy urban living at its finest. Catch the Light Rail, located just 3 blocks from our community, and head to Mill Avenue in Tempe where you’ll discover more restaurants, entertainment venues, shops, boutiques and art studios.',
      location: {
        city: 'Tempe',
        street_address: '1111 E Apache Blvd',
        state: 'Tempe',
        country: 'USA',
        zip_code: '85281'
      },
      rent_range: {
        min: '900',
        max: '1,400'
      },
      date_created: '2015-05-01T16:06:58.970Z'
    }
  ];

}); //end