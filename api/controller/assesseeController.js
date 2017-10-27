// JavaScript source code
'use strict';
//var attsert = require("assert");

var mongoose = require('mongoose'),
  Assessee = mongoose.model('Assessee'); //this model is created in <>model.js file


exports.list_all_assessees = function (req, res) {
    Assessee.find({}, function (err, data) {
        console.log("Calling GET ./assessee --> list_all_profiles from Assessee controller .js");
        //console.log(req.body);
        if (err)
            res.send(err);
        res.json(data);
    });
};

exports.create_a_assessee = function (req, res) {
    console.log("Calling POST ./assessee --> create_a_profile from Assessee controller .js");
    console.log("Received data for profile:" + Assessee(req.body));
    var new_assessee = new Assessee(req.body);
    new_assessee.save(function (err, data) {
        if (err) {
            console.log("Error creating new Assessee : error : " + err);
            res.send(err);
        }
		console.log("Created new Assessee : " +  data);
        res.json(data);
    });
};

exports.bulkInsert = function (req, res) {
    console.log("Calling PATCH ./assessees --> bulkInsert() from Assessee controller .js");
    var arryBulk = req.body;
	console.log(arryBulk.length + ": records received for bulk operations on Assessee(s) document");
	
	//return res.send();
	Assessee.collection.insert(req.body, onInsert);
	
	function onInsert(err, docs){
		if (err) {
			res.send(err);
		}else {
			console.log("%d : Assessee records successfully stored.", docs.insertedCount);
			return res.send(docs);
		}
	}
	
};

exports.read_a_assessee = function (req, res) {
    console.log("Calling GET ./assessee --> read_a_profile from Assessee controller .js");
    console.log("Fetching Assessee details for profileId:"+ req.params.profileId);
    Assessee.findById(req.params.assesseeId, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
};


exports.update_a_assessee = function (req, res) {
    console.log("Calling PUT ./assessee --> update_a_profile from Assessee controller .js");
    console.log("Received updated data for profileId:" + req.params.assesseeId);
	console.log("Assessee body received is :" + 	Assessee(req.body));
	
	//
	////Model.findOneAndUpdate([conditions], [update], [options], [callback])
    //
	//Finds a matching document, updates it according to the update arg, passing any options, and 
	//returns the found document (if any) to the callback. The query executes immediately if callback 
	//is passed else a Query object is returned.
	
	
	Assessee.findOneAndUpdate({_id: req.params.assesseeId }, req.body, { new: true, upsert: true }, function (err, profile) {
        if (err) {
            console.log("Error in updating the data for assessee Id:"+ req.params.assesseeId + "error: " + err);
            res.send(err);
        }
        console.log("Successfully updated the data : " + profile);
        res.json(profile);
    });
};


exports.delete_a_assessee = function (req, res) {
    console.log("Calling DELETE ./assessee --> delete_a_profile from Assessee controller .js");
    console.log("Received delete request for profile with id:" + req.params.assesseeId);
    Assessee.remove({
        _id: req.params.assesseeId
    }, function (err, data) {
        if (err)
            res.send(err);
        res.json({ message: 'Assessee successfully deleted' });
    });
};