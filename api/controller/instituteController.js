// JavaScript source code
'use strict';


var mongoose = require('mongoose'),
  Institute = mongoose.model('Institute'); //get a db handle for institutes Model

	////Pending 
	////implement a filter or a where clause with REST API to fetch relevant all questions for a selected profile(s)

exports.list_all_institutes = function (req, res) {
	Institute.find({}, function (err, data) {
		console.log("Calling GET ./institutes --> list_all_domains from institutescontroller.js");
		//console.log(req.body);
		if (err)
			res.send(err);
		res.json(data);
	});
};

exports.create_an_institute = function (req, res) {
    console.log("Calling POST ./institute --> create_an_institute from Institutes controller .js");
    //console.log("Received data for profile:" + Assessee(req.body));
    var new_Institute = new Institute(req.body);
    new_Institute.save(function (err, data) {
        if (err) {
            console.log("Error creating new Institute : error : " + err);
            res.send(err);
        }
		//console.log("Created new Assessee : " +  data);
        res.json(data);
    });
};

