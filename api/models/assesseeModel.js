// JavaScript source code


'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*//example
{
    "name":"Jay Mistry",
	"email":"jaymistry@yahoo.com",
    "ageGroup":"6to16",
    "occupation":"Student",
    "stream":"CBSE",
    "cityType":"rural",
	"profileMedian:{"name":"Student_CBSE_Rural","Id" : "434f4wfsdfsd45245fsf45","Attention":22,"WorkingMemory":10,"Implusivity":10,"MentalFlexibility":19}
    "progress":[
					0:{Attention:22,WorkingMemory:10,Implusivity:10,MentalFlexibility:19, "asessmentDate":"27Oct2017" } //GAP 0 or first test 
					1:{Attention:15,WorkingMemory:8,Implusivity:9,MentalFlexibility:12," } //reduction		
	],
	tasks:[
			{name:"Task1forAttention", plannedStartDate:"17July2016", plannedCompletionDate:"27Oct2016", actualStartDate:"",actualCompletionDate:"},
	]

}*/

var AssesseeSchema = new Schema({
    fname: {
        type: String,
        required: 'Kindly enter the First name of the User'
    },
	lname: {
        type: String,
        required: 'Kindly enter the Last name of the User'
    },

	email: {
        type: String,
        required: true,//'Kindly enter the email of the  User',
		unique: true,
		dropDups: true // drop duplicates!
    },
    ageGroup: {
        type: String,
        required: 'Kindly enter the ageGroup for this new user'
    },

   occupation: {
        type: String,
        required: 'Kindly enter the user'
    },

    stream: {
    type: String,
    //required: 'Kindly enter the stream of the occupation' //not applicable for Retired
    },

    cityType: {
    type: String,
    required: 'Kindly enter the City Type'
    },
/*
    institute: {
    type: String,
    required: 'Kindly enter the institute Type'
    },

    city: {
    type: String,
    required: 'Kindly enter the city Type'
    },

    state: {
    type: String,
    required: 'Kindly enter the state Type'
    },
	
	country: {
    type: String,
    required: 'Kindly enter the country Type'
    },
	*/
	profileMedian : {"name":"","Id" : "","Attention":"","WorkingMemory":"","Impulsivity":"","MentalFlexibility":""},
		
	tasks: [], // list of task assigned
	
	progress:[] //see the example above

}); {timestamps: true} 

AssesseeSchema.index({email: 1},{name: 'profileIndex'});

module.exports = mongoose.model('Assessee', AssesseeSchema);
