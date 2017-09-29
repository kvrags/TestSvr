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
      .get(assessee.list_all_profiles)
      .post(assessee.create_a_profile);


    app.route('/assessee/:profileId')
      .get(assessee.read_a_profile)
      .put(assessee.update_a_profile)
      .delete(assessee.delete_a_profile);

        //console.error(err.stack);
        //res.status(500);
        //res.render('NeuroGym Server error in Profiles Controller:', { error: err });
  //  next(err);
    //});

    

};