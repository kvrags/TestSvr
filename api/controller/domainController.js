// JavaScript source code
'use strict';


var mongoose = require('mongoose'),
  Domains = mongoose.model('Domains'); //get a db handle for Tasks schema/Model

	////Pending 
	////implement a filter or a where clause with REST API to fetch relevant all questions for a selected profile(s)

exports.list_all_domains = function (req, res) {
	Domains.find({}, function (err, data) {
		console.log("Calling GET ./domains --> list_all_domains from domaincontroller.js");
		//console.log(req.body);
		if (err)
			res.send(err);
		res.json(data);
	});
};
