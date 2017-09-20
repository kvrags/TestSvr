// server.js set up ======================================================================
var express = require('express');
var app = express(); 								// create our app w/ express
var mongoose = require('mongoose'); 					// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
//var database = require('./config/database'); 			// load the database config

//var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration ===============================================================
Profiles = require('./api/models/profileModel'); //created model loading here
Questions = require('./api/models/questionModel'); //created model loading here

////DB connection setting
var mongoURI = "mongodb://localhost/neurogym";

var promise = mongoose.connect(mongoURI, {
  useMongoClient: true,
    /* other options */
});

app.use(express.static(__dirname + '/public')); 				// set the static files location /public/img will be /img for users
//app.use(morgan('dev')); 										// log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); 			// parse application/x-www-form-urlencoded
app.use(bodyParser.json()); 									// parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// REST API routes ======================================================================
require('./api/routes/profileRoutes.js')(app);
require('./api/routes/questionRoutes.js')(app);


//// frontend client application routes-------------------------------------------------------------
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
    //res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);