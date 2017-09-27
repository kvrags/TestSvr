// JavaScript source code


'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*//example
{
    "name":"Student_CBSE_Rural",
    "ageGroup":"6to16",
    "occupation":"Student",
    "stream":"CBSE",
    "cityType":"rural",
    "Attention" : medianValue,
    "WorkingMemory" : medianValue,
    "Implusivity" : medianValue,
    "MentalFlexibility" : medianValue,
	"tastGrid":[
		{0: {range:0to5, {name:Attention, tasks:{ task1URL,task2URL,task3URL}},
						 {name:WorkingMemory, tasks: {task4URL,task5URL,task6URL}}
						 {name:Impulsivity, tasks: {task7URL,task8URL,task9URL}}
						 {name:MentalFlexibility, tasks: {task10URL,task11URL,task12URL}}
			}
		1: {range:6to10, {name:Attention, tasks:{ task13URL,task14URL,task15URL}},
						 {name:WorkingMemory, tasks: {task16URL,task17URL,task18URL}}
						 {name:Impulsivity, tasks: {task19URL,task20URL,task21URL}}
						 {name:MentalFlexibility, tasks: {task22URL,task23URL,task24URL}}	
		}
		2: {range:11to20,{name:Attention, tasks:{ task13URL,task14URL,task15URL}},
						 {name:WorkingMemory, tasks: {task16URL,task17URL,task18URL}}
						 {name:Impulsivity, tasks: {task19URL,task20URL,task21URL}}
						 {name:MentalFlexibility, tasks: {task22URL,task23URL,task24URL}}	
		}
		3: {range:21to25,{name:Attention, tasks:{ task13URL,task14URL,task15URL}},
						 {name:WorkingMemory, tasks: {task16URL,task17URL,task18URL}}
						 {name:Impulsivity, tasks: {task19URL,task20URL,task21URL}}
						 {name:MentalFlexibility, tasks: {task22URL,task23URL,task24URL}}	
		}
	]
}*/

var ProfileSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the Profile'
    },

    ageGroup: {
        type: String,
        required: 'Kindly enter the ageGroup for this new Profile'
    },

   occupation: {
        type: String,
        required: 'Kindly enter the Occupation'
    },

    stream: {
    type: String,
    //required: 'Kindly enter the stream of the occupation' //not applicable for Retired
    },

    cityType: {
    type: String,
    required: 'Kindly enter the City Type'
    },

    Attention: {
    type: Number,
    required: 'Kindly enter the Attention Median value (number)'
    },
    WorkingMemory: {
        type: Number,
        required: 'Kindly enter the Working Memory Median value (number)'
    },
    Impulsivity: {
        type: Number,
        required: 'Kindly enter the Impulsivity Median value (number)'
    },
    MentalFlexibility: {
        type: Number,
        required: 'Kindly enter the Mental Flexibility Median value (number)'
    },
	taskGrid :[] //see example above
});

/* example
var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task',
    default:'Hello moto'
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});*/
module.exports = mongoose.model('Profiles', ProfileSchema);