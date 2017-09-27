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

    var profiles = require('../controllers/profileController');

    // Profiles Routes
    app.route('/profiles')
      .get(profiles.list_all_profiles)
      .post(profiles.create_a_profile);


    app.route('/profiles/:profileId')
      .get(profiles.read_a_profile)
      .put(profiles.update_a_profile)
      .delete(profiles.delete_a_profile);

        //console.error(err.stack);
        //res.status(500);
        //res.render('NeuroGym Server error in Profiles Controller:', { error: err });
  //  next(err);
    //});

    

};