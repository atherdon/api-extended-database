const path    = require('path');
const async   = require('async');
// const debug   = require('debug');
const raven   = require('raven');
const _       = require('underscore');

raven.config('https://c1e3b55e6a1a4723b9cae2eb9ce56f2e:57e853a74f0e4db98e69a9cf034edcdd@sentry.io/265540').install();

let server     = require(path.resolve(__dirname, '../server/server'));
// @TODO update this, cause each time i need to pass a different sources.
let database   = server.datasources.reservationsDS;

let helper     = require(path.resolve(__dirname, 'helper'));

// include middleware
// @todo make it auto-icludable from folder
let Attribute = require(path.resolve(__dirname, 'campground'));


// @TODO remove this include and just find all recipes, stored at database.
let Recipe    = require(path.resolve(__dirname, 'container'));
let Ingredient= require(path.resolve(__dirname, 'customer'));
// console.log(  )


let Departments  = require(path.resolve(__dirname, 'reservation'));

let options = {
	server: server,
	database: database,
	raven: raven,


}

//@TODO think about separating predata and options array
async.parallel({

		Campground     : async.apply(helper.create, options, Campground),
    	Container  : async.apply(helper.create, options, Container),
      Customer  : async.apply(helper.create, options, Customer),
		Reservatios : async.apply(helper.create, options, Reservatios),

	}, function(err, results){
		if( err ) {
			raven.captureException(err);
			throw err;

		}

		if( !results
			|| !results.Campground || !results.Container
			|| !results.Customer || !results.Reservatios

		) {
				raven.captureException("not imported well");
		}



			console.log('import finished');
    //
		// process.on('exit', function(code) {
    // 	return console.log(`About to exit with code ${code}`);
		// });
		// process.exit(22);

	}

);
