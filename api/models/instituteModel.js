// JavaScript source code


'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var InstituteSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the name of the Institute'
    },
	address: {
        type: String,
        required: 'Kindly enter the address of the Institute'
    },
	stream: {
        type: String,
        required: 'Kindly enter the stream of the Institute'
    },
	city: {
        type: String,
        required: 'Kindly enter the city name of the Institute'
    },
	state: {
        type: String,
        required: 'Kindly enter the state name of the Institute'
    },
	areaCode: {
        type: String,
        required: 'Kindly enter the area code the Institute'
    },
	coordName: {
        type: String,
        required: 'Kindly enter the Co-Ordinator name of the Institute'
    },
	coordPhone: {
        type: String,
        required: 'Kindly enter the Co-Ordinator phone of the Institute'
    },
	coordEmail: {
        type: String,
        required: 'Kindly enter the Co-Ordinator email of the Institute'
    },

}); {timestamps: true} 

//InstituteSchema.index({mobile: 1},{name: 'profileIndex'});

module.exports = mongoose.model('Institute', InstituteSchema);
