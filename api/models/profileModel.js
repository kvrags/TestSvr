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
    required: 'Kindly enter the stream of the occupation'
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
    }
});

/* example
var TaskSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
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