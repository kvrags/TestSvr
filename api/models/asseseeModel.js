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
					0:{Attention:22,WorkingMemory:10,Implusivity:10,MentalFlexibility:19, plannedStartDate:"17July2016", plannedCompletionDate:"27Oct2016", actualStartDate:"",actualCompletionDate:"" } //GAP 0 or first test 
					1:{Attention:15,WorkingMemory:8,Implusivity:9,MentalFlexibility:12, plannedStartDate:"17July2016", plannedCompletionDate:"27Oct2016", actualStartDate:"",actualCompletionDate:"" } //reduction		
	]

}*/

var AssesseeSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the User'
    },
	email: {
        type: String,
        required: 'Kindly enter the email of the  User'
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
	
	profileMedian : {"name":"","Id" : "","Attention":"","WorkingMemory":"","Implusivity":"","MentalFlexibility":""},
    
	progress:[] //see the example above

}{timestamps: true} );

module.exports = mongoose.model('Assesse', AssesseeSchema);