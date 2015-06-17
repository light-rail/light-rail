var app = angular.module('lightRail');


app.service('GeneralUserService', function($http, $q) {

  //I recommend being more descriptive w/ this funct name, example: "getGeneralUserFavorites"
  this.getGeneralUser = function() {
    var url = '/api/user/getFavorites'
    return $http({
      method: 'GET',
      url: url
    }).then(function(response){
      return response.data;
    })
  };

  this.addToFavoritesList = function(locationId) {
    var url = '/api/user/addToFavorites'
    return $http({
      method: 'POST',
      url: url,
      data: locationId

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
      return data.data;
    });
  };



  this.displayAll = function(obj) {
    var allItems = '';
    for (var prop in obj) {
      allItems = allItems + obj[prop];
    }
    return allItems.replace(',', ' ');
  };


  

  //*** SEED DATA FOR MAIN PAGE ***//


  this.apartmentData = [
    {
      apartmentId: 0,

      apartment_name: 'Monroe Street Abbey',
      cover_picture: {
        src:'images/apt_abbey1.jpg'
      },
      picturesArray: [{
        name:'apt_abbey1.jpg',
        src: 'images/apt_abbey1.jpg',
        profile_pic: true
        },
        {
        name:'apt_abbey2.jpg',
        src: 'images/apt_abbey2.jpg',
        profile_pic: false
        },
        {
        name:'apt_abbey3.jpg',
        src: 'images/apt_abbey3.jpg',
        profile_pic: false
        }
      ],
      phone: '602-555-5555',
      webpage: 'www.theabbeyapartments.com',
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
      cover_picture: {
        src: 'images/apt_west1.jpg'
      },
      picturesArray: [{
        name:'apt_west1.jpg',
        src: 'images/apt_west1.jpg',
        profile_pic: true
        },
        {
        name:'apt_west2.jpg',
        src: 'images/apt_west2.jpg',
        profile_pic: false
        },
        {
        name:'apt_west3.jpg',
        src: 'images/apt_west3.jpg',
        profile_pic: false
        }
      ],
      phone: '602-555-5555',
      webpage: 'www.west6thtempe.com',
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
      cover_picture: {
        src: 'images/apt_bella1.jpg'
      },
      picturesArray: [{
        name:'apt_bella1.jpg',
        src: 'images/apt_bella1.jpg',
        profile_pic: true
        },
        {
        name:'apt_bella2.jpg',
        src: 'images/apt_bella2.jpg',
        profile_pic: false
        },
        {
        name:'apt_bella3.jpg',
        src: 'images/apt_bella3.jpg',
        profile_pic: false
        }
      ],
      phone: '602-555-5555',
      webpage: 'www.bellasolanoapartments.com',
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
      cover_picture: {
        src: 'images/apt_pavillions1.jpg'
      },
      picturesArray: [{
        name:'apt_pavillions1.jpg',
        src: 'images/apt_pavillions1.jpg',
        profile_pic: true
        },
        {
        name:'apt_pavillions2.jpg',
        src: 'images/apt_pavillions2.jpg',
        profile_pic: false
        },
        {
        name:'apt_pavillions3.jpg',
        src: 'images/apt_pavillions3.jpg',
        profile_pic: false
        },
        {
        name:'apt_pavillions4.jpg',
        src: 'images/apt_pavillions4.jpg',
        profile_pic: false
        }
      ],
      phone: '602-555-5555',
      webpage: 'www.liveatthepavilions.com',
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
      cover_picture: {
        src: 'images/apt_met1.jpg'
      },
      picturesArray: [{
        name:'apt_met1.jpg',
        src: 'images/apt_met1.jpg',
        profile_pic: true
        },
        {
        name:'apt_met2.jpg',
        src: 'images/apt_met2.jpg',
        profile_pic: false
        },
        {
        name:'apt_met3.jpg',
        src: 'images/apt_met3.jpg',
        profile_pic: false
        },
        {
        name:'apt_met4.jpg',
        src: 'images/apt_met4.jpg',
        profile_pic: false
        }
      ],
      phone: '602-555-5555',
      webpage: 'www.themetapartmenthomes.com',
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
      cover_picture: {
        src: 'images/apt_midtown1.jpg'
      },
      picturesArray: [{
        name:'apt_midtown1.jpg',
        src: 'images/apt_midtown1.jpg',
        profile_pic: true
        },
        {
        name:'apt_midtown2.jpg',
        src: 'images/apt_midtown2.jpg',
        profile_pic: false
        },
        {
        name:'apt_midtown3.jpg',
        src: 'images/apt_midtown3.jpg',
        profile_pic: false
        },
        {
        name:'apt_midtown4.jpg',
        src: 'images/apt_midtown4.jpg',
        profile_pic: false
        }
      ],
      phone: '602-555-5555',
      webpage: 'www.midtownonmain.com',
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
      cover_picture: {
        src: 'images/apt_tempe_metro1.jpg'
      },
      picturesArray: [{
        name:'apt_tempe_metro1.jpg',
        src: 'images/apt_tempe_metro1.jpg',
        profile_pic: true
        },
        {
        name:'apt_tempe_metro2.jpg',
        src: 'images/apt_tempe_metro2.jpg',
        profile_pic: false
        },
        {
        name:'apt_tempe_metro3.jpg',
        src: 'images/apt_tempe_metro3.jpg',
        profile_pic: false
        },
        {
        name:'apt_tempe_metro4.jpg',
        src: 'images/apt_tempe_metro4.jpg',
        profile_pic: false
        },
        {
        name:'apt_tempe_metro5.jpg',
        src: 'images/apt_tempe_metro5.jpg',
        profile_pic: false
        }
      ],
      phone: '602-555-5555',
      webpage: "www.tempemetro.com",
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
      cover_picture: {
        src: 'images/apt_apache1.jpg'
      },
      picturesArray: [{
        name:'apt_apache1.jpg',
        src: 'images/apt_apache1.jpg',
        profile_pic: true
        },
        {
        name:'apt_apache2.jpg',
        src: 'images/apt_apache2.jpg',
        profile_pic: false
        },
        {
        name:'apt_apache3.jpg',
        src: 'images/apt_apache3.jpg',
        profile_pic: false
        },
        {
        name:'apt_apache4.jpg',
        src: 'images/apt_apache4.jpg',
        profile_pic: false
        }
      ],
      phone: '602-555-5555',
      webpage: "www.villasonapache.com",
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

  this.userData = [
    {
      name: 'jordyn',
      email: 'jordynm4@gmail.com'
    },
    {
      name: 'jessica',
      email: 'jessica@gmail.com'
    }
  ]

}); //end

