// JavaScript source code
'use strict';


var mongoose = require('mongoose'),
  Tasks = mongoose.model('Tasks'); //get a db handle for Tasks schema/Model

////Pending 
////implement a filter or a where clause with REST API to fetch relevant all questions for a selected profile(s)

exports.list_all_tasks = function (req, res) {
    Tasks.find({}, function (err, data) {
        console.log("Calling GET ./tasks --> list_all_tasks from taskcontroller.js");
        //console.log(req.body);
        if (err)
            res.send(err);
        res.json(data);
    });
};


exports.create_a_task = function (req, res) {
    console.log("Calling POST /tasks --> create_a_task from taskcontroller .js");
	console.log("Received data :" + Tasks(req.body));
    var new_task = new Tasks (req.body);
    new_task.save(function (err, data) {
        if (err) {
            res.send(err);
        //console.log("Error: Calling POST ./tasks :" + err);
		}
	    console.log("Calling POST /tasks --> saved data successfully");
        res.json(data);
    });
};


exports.read_a_task = function (req, res) {
    console.log("Calling GET ./tasks --> read_a_task from task controller .js");
	console.log("Displaying all the Params sent :" + req.params);
    console.log("Fetching Task details for taskId:" + req.params.taskId);
    Tasks.findById(req.params.taskId, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
};


exports.update_a_task = function (req, res) {
    Tasks.findOneAndUpdate({ _id: req.params.taskId }, req.body, { new: true }, function (err, task) {
        if (err)
            res.send(err);
        res.json(task);
    });
};


exports.delete_a_task = function (req, res) {
    console.log("Calling DELETE ./tasks --> delete_a_task from task controller .js");

    Tasks.remove({
        _id: req.params.taskId
    }, function (err, data) {
        if (err)
            res.send(err);
        res.json({ message: 'Task successfully deleted' });
    });
};