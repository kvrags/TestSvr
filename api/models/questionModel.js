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
    },
	profiles:[]/*{
				id:	{ 
					type: Number,
					required: 'Model Error: Profile Id not supplied while creating a new Question'
				},
				name: {
						type : String,
						required:'Model Error: Profile name is not supplied while creating a new Question'
				}
	}*/
});
module.exports = mongoose.model('Questions', QuestionSchema);// JavaScript source code
