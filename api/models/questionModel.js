// JavaScript source code


'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*//example
{
        domain: either one of Attention, Mental Flexibility,Implusitivity or WorkingMemory
        qText: the actual text,
        Never: value, 
        Rarely: value,
        Sometimes: value,
        MostOften: value,
        Always: value
}*/

var QuestionSchema = new Schema({
    domain: {
        type: String,
        required: 'Kindly enter the name of the domain this question belongs to'
    },

    qText: {
        type: String,
        required: 'Kindly enter the quesion text'
    },

    Never: {
        type: Number,
        required: 'Kindly enter the Never number'
    },

    Rarely: {
        type: Number,
        required: 'Kindly enter the Rarely number'
    },
    Sometimes: {
        type: Number,
        required: 'Kindly enter the Sometimes number'
    },

    MostOften: {
        type: Number,
        required: 'Kindly enter the MostOften number'
    },
    Always: {
        type: Number,
        required: 'Kindly enter the Always number'
    }

});
module.exports = mongoose.model('Questions', QuestionSchema);// JavaScript source code
