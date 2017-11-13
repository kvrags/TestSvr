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

    var institute = require('../controllers/instituteController');

    // Domains Routes
    app.route('/institute')
      .get(institute.list_all_institutes)
      .post(institute.create_an_institute);
 
    /*app.route('/domains/:domainId')
      .get(domains.read_a_domain)
      .put(domains.update_a_domain)
      .delete(domains.delete_a_domain);
	  */
};