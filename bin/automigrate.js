var Fs = require('fs');
var path     = require('path');

let app      = require(path.resolve(__dirname, '../server/server'));
var database = app.datasources.reservationsDS;


//creating loopback necessary tables if no exists
database.automigrate("campground", function(err) {
  if (err) throw err;
  var campground = [
    {
      name:'Salt Lake City KOA',
      location:{
        lat: 40.772112,
        lng : -111.932165
      }
    },
    {
      name:'Gouldings Campground',
      location:{
        lat: 37.006989,
        lng : -110.214907
      }
    },
    {
      name:'Grand Canyon Mather Campground',
      location:{
        lat: 36.056472,
        lng : -112.140728
      }
    },
    {
      name:'Camping Paris Bois de Boulogne',
      location:{
        lat: 48.868879,
        lng :2.234914
      }
    }
    ];
    var count = campground.length;
     campground.forEach(function(campground) {
       app.models.Campground.create(campground, function(err, model) {
         if (err) throw err;

         console.log('Created:', model);

         count--;
         if (count === 0)
           database.disconnect();
       });
     });
});
     database.automigrate("customer", function(err) {
       if (err) throw err;
       var customer = [
         {
           name:'Andy Van Den Heuvel',
           username:'andy',
           password:'$2a$10$1lmPRI0Xjd5fU8HGdPmDoOkZpIPJj2axcdJYIfc/3RUnBDDqQe31K',
           email:'andy@optis.be'
         },
         {
           name:'Kenneth Van den Berghe',
           username:'kenneth',
           password:'$2a$10$H5wtnFvhxf8CPn66gEbPu.tki2WRpkplqvUV3yhQ049ugY8rHFSJi',
           email:'kenneth@optis.be'
         },
         {
           name:'Claudiu Matei',
           username:'claudiu',
           password:'$2a$10$6b9jxIwb6y84gpq.ZU57YegRM4BWxHoXc.K/WwlEOJTa/9fO7cCta',
           email:'claudiu@optis.be'
         }];

         var count1 = customer.length;
          customer.forEach(function(customer) {
            app.models.Customer.create(customer, function(err, model) {
              if (err) throw err;

              console.log('Created:', model);

              count1--;
              if (count1 === 0)
                database.disconnect();
            });
          });
});
          database.automigrate("reservation", function(err) {
            if (err) throw err;
            var reservation = [
              {
                startDate:'2017-03-21',
                endDate:'2017-03-23'
              },
              {
                startDate:'2017-03-25',
                endDate:'2017-03-31'
              }];

              var count2 = reservation.length;
               reservation.forEach(function(reservation) {
                 app.models.Reservation.create(reservation, function(err, model) {
                   if (err) throw err;

                   console.log('Created:', model);

                   count2--;
                   if (count2 === 0)
                     database.disconnect();
                 });
               });

});
