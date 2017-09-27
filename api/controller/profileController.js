// JavaScript source code
'use strict';
//var attsert = require("assert");

var mongoose = require('mongoose'),
  Profiles = mongoose.model('Profiles'); //this model is created in <>model.js file


exports.list_all_profiles = function (req, res) {
    Profiles.find({}, function (err, data) {
        console.log("Calling GET ./profiles --> list_all_profiles from profile controller .js");
        //console.log(req.body);
        if (err)
            res.send(err);
        res.json(data);
    });
};


exports.create_a_profile = function (req, res) {
    console.log("Calling POST ./profiles --> create_a_profile from profile controller .js");
    console.log("Received data for profile:" + Profiles(req.body));
    var new_profile = new Profiles(req.body);
    new_profile.save(function (err, data) {
        if (err) {
            console.log("Error creating new profiles: error : " + err);
            res.send(err);
        }
        res.json(data);
    });
};


exports.read_a_profile = function (req, res) {
    console.log("Calling GET ./profiles --> read_a_profile from profile controller .js");
    console.log("Fetching Profile details for profileId:"+ req.params.profileId);
    Profiles.findById(req.params.profileId, function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
};


exports.update_a_profile = function (req, res) {
    console.log("Calling PUT ./profiles --> update_a_profile from profile controller .js");
    console.log("Received updated data for profileId:" + req.params.profileId);
	console.log("Profile body received is :" + 	Profiles(req.body));
	
	//
	////Model.findOneAndUpdate([conditions], [update], [options], [callback])
    //
	//Finds a matching document, updates it according to the update arg, passing any options, and 
	//returns the found document (if any) to the callback. The query executes immediately if callback 
	//is passed else a Query object is returned.
	
	
	Profiles.findOneAndUpdate({__id: req.params.profileId }, req.body, { new: true }, function (err, profile) {
        if (err) {
            console.log("Error in updating the data for profile Id:"+ req.params.profileId + "error: " + err);
            res.send(err);
        }
        console.log("Successfully updated the data : " + profile);
        res.json(profile);
    });
};


exports.delete_a_profile = function (req, res) {
    console.log("Calling DELETE ./profiles --> delete_a_profile from profile controller .js");
    console.log("Received delete request for profile with id:" + req.params.profileId);
    Profiles.remove({
        _id: req.params.profileId
    }, function (err, data) {
        if (err)
            res.send(err);
        res.json({ message: 'Profile successfully deleted' });
    });
};