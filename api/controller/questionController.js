// JavaScript source code
'use strict';


var mongoose = require('mongoose'),
  Questions = mongoose.model('Questions'); //get a db handle for Questions schema/Model

////Pending 
////implement a filter or a where clause with REST API to fetch relevant all questions for a selected profile(s)

exports.list_all_questions = function (req, res) {
    Questions.find({}, function (err, data) {
        console.log("Calling GET ./Questions --> list_all_questions from question controller .js");
        //console.log(req.body);
        if (err)
            res.send(err);
        res.json(data);
    });
};


exports.create_a_question = function (req, res) {
    console.log("Calling POST /Questions --> create_a_question from question controller .js");
	console.log("Received data :" + Questions(req.body));
    var new_question = new Questions(req.body);
    new_question.save(function (err, data) {
        if (err) {
            res.send(err);
        //console.log("Error: Calling POST ./Questions :" + err);
		}
	    console.log("Calling POST /Questions --> saved data successfully");
        res.json(data);
    });
};


exports.read_a_question = function (req, res) {
    console.log("Calling GET ./questions --> read_a_question from question controller .js");
	console.log("Displaying all the Params sent :" + req.params);
    console.log("Fetching Question details for questionId:" + req.params.questionId);
    Questions.findById(req.params.questionId, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
};
exports.delete_a_question = function (req, res) {
    console.log("Calling DELETE ./question --> delete_a_question from question controller .js");

	var ObjectId = require('mongodb').ObjectId; 
	var id = req.params.questionId;       
	var obj_id = new ObjectId(id);
	
	Questions.remove({
        _id: obj_id
    }, function (err, data) {
        if (err)
            res.send(err);
        res.json({ message: 'Question successfully deleted' });
    });
};

exports.update_a_question = function (req, res) {
    Questions.findOneAndUpdate({ _id: req.params.questionId }, req.body, { new: true }, function (err, question) {
        if (err)
            res.send(err);
        res.json(question);
    });
};


exports.delete_a_question = function (req, res) {
    console.log("Calling DELETE ./question --> delete_a_question from question controller .js");

    Questions.remove({
        _id: req.params.questionId
    }, function (err, data) {
        if (err)
            res.send(err);
        res.json({ message: 'Question successfully deleted' });
    });
};