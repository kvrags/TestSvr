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
    console.log("Calling GET ./assessee/mobile --> find_a_assessee from Assessee controller .js");
	console.log("data received --> mobile : " + req.params.mobile);

    Assessee.find({mobile: req.params.mobile},  function (err, data) {
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
	var replyBulk = {
			"new":"", //count of successful inserted
			"newError":"",//count of error while inserting
			"update":"", //count of successful update
			"update":"",//count of error while updating
			"newStatus":200, //ok if all are successfully otherwise -1
			"updateStatus":200 //pk if all are successful otherwise -1
	};
	
    console.log("Calling PATCH ./assessees --> bulkInsert() from Assessee controller .js");
	
	//Assessee.collection.insert(req.body, onInsert);
	if (op == 'new') {
		    console.log(arryBulk.length + ": records received for bulk Insert on Assessees document");
			
			Assessee.collection.insert(req.body, onInsert);
			replyBulk.new = req.body.length;
			replyBulk.newStatus = 200;
	}
	
	if (op == 'update') {
			console.log(arryBulk.length + ": records received for bulk Update on Assessees document ");
			
			for (var i=0;i< arryBulk.length; ++i) {
				console.log("Processing updated data for user with mobile : " + Number(arryBulk[i].mobile));
				/*for (var j=0;j<arryBulk[i].tasks.length;++j) {
					
					for(var k=0;k<arryBulk[i].tasks[j].scores.length;++k){
						console.log("Tasks upates : " + arryBulk[i].tasks[j].name);
						console.log("Tasks upates : hits:" + arryBulk[i].tasks[j].scores[k].hits + "/ misses : " + arryBulk[i].tasks[j].scores[k].misses);
					}
				}*/	
				
					
				Assessee.findOneAndUpdate({mobile: Number(arryBulk[i].mobile) }, arryBulk[i], {upsert: true , returnNewDocument: true }, function (err, profile) {
					if (err) {
						//console.log("Error in updating the user with mobile : " + Number(arryBulk[i].mobile) + "error: " + err);
						//res.send(err);
						replyBulk.updateStatus = -1;
					}else {
					console.log("Successfully updated the data" ); //+ profile);
					//res.json(profile);
					}
				});
			}
			res.send(replyBulk); 
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
    console.log("Received updated data for mobile : " + req.params.mobile);
	//console.log("Assessee body received is :" + 	Assessee(req.body));
	
	//
	////Model.findOneAndUpdate([conditions], [update], [options], [callback])
    //
	//Finds a matching document, updates it according to the update arg, passing any options, and 
	//returns the found document (if any) to the callback. The query executes immediately if callback 
	//is passed else a Query object is returned.
	
	
	//Assessee.findOneAndUpdate({_id: req.params.assesseeId }, req.body, { new: true, upsert: true }, function (err, profile) {
	Assessee.findOneAndUpdate({mobile: Number(req.params.mobile) }, req.body, {upsert: true , returnNewDocument: true }, function (err, profile) {
        if (err) {
            console.log("Error in updating the data for mobile : "+ req.params.mobile + "error: " + err);
            res.send(err);
        }else {
        console.log("Successfully updated the data" ); //+ profile);
        res.json(profile);
		}
    });
};


exports.delete_a_assessee = function (req, res) {
    console.log("Calling DELETE ./assessee --> delete_a_profile from Assessee controller .js");
    console.log("Received delete request for profile with mobile :" + req.params.mobile);
    Assessee.remove({
        mobile: req.params.mobile
    }, function (err, data) {
        if (err)
            res.send(err);
        res.json({ message: 'Assessee successfully deleted' });
    });
};