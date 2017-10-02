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

    var tasks = require('../controllers/taskController');

    // Tasks Routes
    app.route('/tasks')
      .get(tasks.list_all_tasks)
      .post(tasks.create_a_task);

	  
    app.route('/tasks/:taskId')
      .get(tasks.read_a_task)
      .put(tasks.update_a_task)
      .delete(tasks.delete_a_task);

        //console.error(err.stack);
        //res.status(500);
        //res.render('NeuroGym Server error in Profiles Controller:', { error: err });
  //  next(err);
    //});
};