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
    var questions = require('../controllers/questionController');

    // Questions Routes
    app.route('/questions')
      .get(questions.list_all_questions)
      .post(questions.create_a_question);

    app.route('/questions/:questionId')
      .get(questions.read_a_question)
      .put(questions.update_a_question)
      .delete(questions.delete_a_question);
};