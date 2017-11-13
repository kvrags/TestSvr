// JavaScript source code

// REST API routes ======================================================================

// api route table ---------------------------------------------------------------------
/*  HTTP Verb	URL	                        Description
    GET	        /api/profile                Get all of the profiles
    POST	    /api/profile                Create a single profile
    DELETE	    /api/profile/:profile_id	Delete a single profile
*/

'use strict';
module.exports = function (app) {
//    app.use(function (err, req, res, next) { //handle next here.. pending

    var assessee = require('../controllers/assesseeController');

    // assessee Routes
    app.route('/assessee')
      .get(assessee.list_all_assessees)
      .post(assessee.create_a_assessee)

	app.route('/assessee/:operation')
	  .patch(assessee.bulkInsert);


    app.route('/assessee/:mobile')
      .get(assessee.find_a_assessee)
      .put(assessee.update_a_assessee)
      .delete(assessee.delete_a_assessee);
	
	
	/*//app.route('/assessee/:name/:email')
    app.route('/assessee/:email')
      .get(assessee.find_a_assessee)
*/

	  //console.error(err.stack);
        //res.status(500);
        //res.render('NeuroGym Server error in Profiles Controller:', { error: err });
  //  next(err);
    //});

    

};