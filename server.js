// server.js set up ======================================================================
var express = require('express');
var https = require('https');
var fs = require ('fs'); 
var app = express(); 								// create our app w/ express
var mongoose = require('mongoose');					// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
//var database = require('./config/database'); 			// load the database config

//var morgan = require('morgan'); 		// log requests to the console (express4)
var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

// configuration ===============================================================
Profiles = require('./api/models/profileModel'); //created model loading here
Questions = require('./api/models/questionModel'); //created model loading here
Assessee = require('./api/models/assesseeModel'); //Assessee model definition
Tasks = require('./api/models/taskModel'); //Task model definition
Domains = require('./api/models/domainModel'); //Cognitive Areas/domain definition


// config files TBD
//var db = require('./config/db');

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
//app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

/*app.use(function (err, req, res, next) {
    console.error(err.stack); 
    res.status(500); 
    res.render('NeuroGym Server error', { error: err });
});*/

/* CORS issue
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
*/

 
// REST API routes ======================================================================
require('./api/routes/profileRoutes.js')(app);
require('./api/routes/questionRoutes.js')(app);
require('./api/routes/assesseeRoutes.js')(app);
require('./api/routes/taskRoutes.js')(app);
require('./api/routes/domainRoutes.js')(app);

//// frontend client application routes-------------------------------------------------------------
app.get('*', function (req, res) {
    var path = __dirname + "\\public";
    //console.log("Settig up route for public access -->  " + path);
    res.sendFile(path, 'index.html');

    //res.sendFile(path.join(__dirname, '/public', 'index.html'));
    //res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


// listen (start app with node server.js) ======================================
var sslOptions = {key: fs.readFileSync('./config/domain.key'),
				  cert: fs.readFileSync('./config/domain.crt')};


https.createServer(sslOptions, app).listen(8443); 	
console.log("https server instance listening on port " + 8443);
	
	
/*app.listen(port);
console.log("App listening on port " + port);
*/
exports = module.exports = app;