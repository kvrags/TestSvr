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
    "ID":1505661846259
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