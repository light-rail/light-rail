var app = angular.module('lightRail');


app.service('GeneralUserService', function($http, $q) {

  //I recommend being more descriptive w/ this funct name, example: "getGeneralUserFavorites"
  this.getGeneralUser = function() {
    var url = '/api/generalUser/myfavorites'
    return http ({
      method: 'GET',
      url: url
    }).then(function(response){
      return response.data;
    })
  };


  //*** SEED DATA FOR MAIN PAGE ***//

  this.displayAll = function(obj) {
    var allItems = '';
    for (var prop in obj) {
      allItems = allItems + ', ' + obj[prop];
    }
    return allItems.replace(',', ' ');
  };


  this.apartmentData = [
    {
      apartmentId: 0,
      apartmentDescription: {
        apartment_title: 'Bella Luxury Apartments',
        picture: "apartment1.jpg"
      },
      location: {
        street_address: '732 East Apache Ave',
        city: 'Tempe',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '1,200',
        max: '1,600'
      },
      date_created: '2015-04-01T16:06:58.970Z'
    },
    {
      apartmentId: 1,
      apartmentDescription: {
        apartment_title: 'Sun Valley Apartments',
        picture: "apartment2.jpg",
        overview: 'Need a project manager to manage the construction of the longest pipeline in the world. Need to manage the people and processes that will construct the building of the pipeline.',
        deliverable: 'A functional bridge'
      },
      location: {
        street_address: '1233 East Main Ave',
        city: 'Mesa',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '800',
        max: '1,300'
      },
      date_created: '2015-02-01T16:06:58.970Z'
    },
      {
      apartmentId: 2,
      apartmentDescription: {
        apartment_title: 'Central Phoenix Apartments',
        picture: "apartment3.jpg",
        overview: 'Need a project manager to provide a safety seminar for employees working on the Alaskan pipeline  .',
        deliverable: 'A fully informed and safety certified team'
      },
      location: {
        street_address: '521 North Central Ave',
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
      apartmentDescription: {
        apartment_title: 'Paradise Living Apartments',
        picture: "apartment4.jpg",
        overview: 'Need an experienced efficiency and productivity consultant to provide a seminar for employees working on Brazilian oil rig. Must speak Portuguese!',
        deliverable: 'A fully certified team'
      },
      location: {
        street_address: '732 East Main Ave',
        city: 'Mesa',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '800',
        max: '1,200'
      },
      date_created: '2015-03-01T16:06:58.970Z'
    },
      {
      apartmentId: 4,
      apartmentDescription: {
        apartment_title: 'Metro Living Apartments',
        picture: "apartment5.jpg",
        overview: 'Need an experienced consultant to provide an operational assessment on our operation in Houston, Texas.  Operation consist of 250 oil rig workers, with a small management team.  Must be able to generate dashboards that report ongoing progress.',
        deliverable: 'A more efficient operation, hard-data'
      },
      location: {
        street_address: '332 East Apache Ave',
        city: 'Tempe',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '900',
        max: '1,200'
      },
      date_created: '2015-02-01T16:06:58.970Z'
    },
    {
      apartmentId: 5,
      apartmentDescription: {
        apartment_title: 'Bella Vita Apartments',
        picture: "apartment6.jpg",
        overview: 'Need an experienced consultant to analyze our operation and create a production processing plan based on the assesment findings. Consultant will need to have processing plant experience.  Time will vary from location to location in South Carolina plants.',
        deliverable: 'Deliver and implement updated processing plan'
      },
      location: {
        street_address: '228 North Camelback',
        city: 'Phoenix',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '600',
        max: '1,000'
      },
      date_created: '2015-04-01T16:06:58.970Z'
    },
    {
      apartmentId: 6,
      apartmentDescription: {
        apartment_title: 'Bellagio Apartments',
        picture: "apartment3.jpg",
        overview: 'Need an experienced consultant to provide an operational assessment on our operation in Houston, Texas.  Operation consist of 250 oil rig workers, with a small management team.  Must be able to generate dashboards that report ongoing progress.',
        deliverable: 'A more efficient operation, hard-data'
      },
      location: {
        street_address: '228 North Central Ave',
        city: 'Phoenix',
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
      apartmentDescription: {
        apartment_title: 'Camelback Apartments',
        picture: "apartment4.jpg",
        overview: 'Need an experienced consultant to analyze our team efficiency and provide an organizational development plan that will create more efficiencies and productivity from our human caplital.',
        deliverable: 'Deliver and implement an Organizational Development Plan'
      },
      location: {
        street_address: '228 North Mill Ave',
        city: 'Tempe',
        state: 'Arizona',
        country: 'USA'
      },
      rent_range: {
        min: '900',
        max: '1,800'
      },
      date_created: '2015-05-01T16:06:58.970Z'
    }   
  ];


}); //end