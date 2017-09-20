// JavaScript source code
'use strict';


var mongoose = require('mongoose'),
  Profiles = mongoose.model('Profiles'); //this model is created in <>model.js file

exports.list_all_profiles = function (req, res) {
    Profiles.find({}, function (err, data) {
        console.log("Calling GET ./profiles --> list_all_profiles from profile controller .js");
        console.log(req.body);
        if (err)
            res.send(err);
        res.json(data);
    });
};




exports.create_a_profile = function (req, res) {
    console.log("Calling POST ./profiles --> create_a_profile from profile controller .js");

    var new_profile = new Profiles(req.body);
    new_profile.save(function (err, data) {
        if (err)
            res.send(err);
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
    Profiles.findOneAndUpdate({ _id: req.params.profileId }, req.body, { new: true }, function (err, profile) {
        if (err)
            res.send(err);
        res.json(profile);
    });
};


exports.delete_a_profile = function (req, res) {
    console.log("Calling DELETE ./profiles --> delete_a_profile from profile controller .js");

    Profiles.remove({
        _id: req.params.profileId
    }, function (err, data) {
        if (err)
            res.send(err);
        res.json({ message: 'Profile successfully deleted' });
    });
};