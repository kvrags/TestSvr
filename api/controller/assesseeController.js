// JavaScript source code
'use strict';
//var attsert = require("assert");

var mongoose = require('mongoose'),
  Assessee = mongoose.model('Assessee'); //this model is created in <>model.js file

  /*
//app.route('/assessee/:name
exports.find_a_assessee = function (req, res) {
    Assessee.find({name: req.params.name}, function (err, data) {
        console.log("Calling GET ./assessee/name&e-mail --> find_a_assessee from Assessee controller .js");
        //console.log(req.body);
        if (err)
            res.send(err);
        res.json(data);
    });
};
*/

/*
exports.read_a_assessee = function (req, res) {
    console.log("Calling GET ./assessee/email --> read_a_profile from Assessee controller .js");
    console.log("Fetching Assessee details for email:" + req.params);
    //Assessee.findById(req.params.email, function (err, data) {
	Assessee.find({email: req.params.email },  function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });
};
*/

exports.find_a_assessee = function (req, res) { //{email: req.params.email},
    console.log("Calling GET ./assessee/email --> find_a_assessee from Assessee controller .js");
	console.log("data received --> email : " + req.params.email);

    Assessee.find({email: req.params.email},  function (err, data) {
        //console.log(req.body);
        if (err)
            res.send(err); 
        res.json(data);
    });
};

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
    //console.log("Received data for profile:" + Assessee(req.body));
    var new_assessee = new Assessee(req.body);
    new_assessee.save(function (err, data) {
        if (err) {
            console.log("Error creating new Assessee : error : " + err);
            res.send(err);
        }
		//console.log("Created new Assessee : " +  data);
        res.json(data);
    });
};

exports.bulkInsert = function (req, res) {
	var op = req.params.operation;
	var arryBulk = req.body;
	
    console.log("Calling PATCH ./assessees --> bulkInsert() from Assessee controller .js");
	
	//Assessee.collection.insert(req.body, onInsert);
	if (op == 'new') {
		    console.log(arryBulk.length + ": records received for bulk Insert on Assessees document");
			
			Assessee.collection.insert(req.body, onInsert);
	}
	
	if (op == 'update') {
			console.log(arryBulk.length + ": records received for bulk Update on Assessees document ");
			
			for (var i=0;i< arryBulk.length; ++i) {
				
			console.log("Received updated data for user with mail id  : " + arryBulk[i].email);
			
			Assessee.findOneAndUpdate({email: String(arryBulk[i].email) }, arryBulk[i], {upsert: true , returnNewDocument: true }, function (err, profile) {
				if (err) {
					console.log("Error in updating the user with email Id:"+ arryBulk[i].email + "error: " + err);
					res.send(err);
				}else {
				console.log("Successfully updated the data" ); //+ profile);
				res.json(profile);
				}
			});

				
			}
			//Assessee.collection.update('email', String(req.body.email), Assessee(req.body), onUpdate);
			/*  
			var ids = req.params.ids;
	
			for (var i = 0; i < ids.length; i++) {  
				var id = ids[i];
				
				
				Assessee.find({ '_id': mongoose.Types.ObjectId(id)})
						.updateOne(req.body);
			 
			}*/
	}
	
	function onInsert(err, docs){
		if (err) {
			console.log("Error in bulkInsert Operation. Error : " + err);
			res.send(err);
		}else {
			console.log("%d : Assessee records successfully stored.", docs.insertedCount);
			return res.send(docs);
		}
	}
	function onUpdate(err, docs){
		if (err) {
			console.log("Error in bulkUpdate Operation. Error : " + err);
			res.send(err);
		}else {
			console.log("%d : Assessee records successfully stored.", docs.insertedCount);
			return res.send(docs);
		}
	}
	
};

exports.update_a_assessee = function (req, res) {
    console.log("Calling PUT ./assessee --> update_a_profile from Assessee controller .js");
    console.log("Received updated data for email:" + req.params.email);
	//console.log("Assessee body received is :" + 	Assessee(req.body));
	
	//
	////Model.findOneAndUpdate([conditions], [update], [options], [callback])
    //
	//Finds a matching document, updates it according to the update arg, passing any options, and 
	//returns the found document (if any) to the callback. The query executes immediately if callback 
	//is passed else a Query object is returned.
	
	
	//Assessee.findOneAndUpdate({_id: req.params.assesseeId }, req.body, { new: true, upsert: true }, function (err, profile) {
	Assessee.findOneAndUpdate({email: String(req.params.email) }, req.body, {upsert: true , returnNewDocument: true }, function (err, profile) {
        if (err) {
            console.log("Error in updating the data for assessee Id:"+ req.params.assesseeId + "error: " + err);
            res.send(err);
        }else {
        console.log("Successfully updated the data" ); //+ profile);
        res.json(profile);
		}
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