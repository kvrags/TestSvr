'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*//example

domain :{
			name:"Attention", 
			description:"Cognitive area of Attention", 
			ratings: [  
						{ 	name:"No Deficit", 
							low:0, 
							upper:7 
						}, 
						{ 	name:"Borderline", 
							low:8, 
							upper:13 
						}, 
						{ 
							name:"Mild", 
							low:14, 
							upper:30 
						}, 
						{ 	name:"Moderate", 
							low:31, 
							upper:60 
						}, 
						{ 	name:"Severe", 
							low:61, 
							upper:500 //to indicate anything above 61 
						} 
					] 
		} 
*/

var DomainSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the Cognitive Domain name'
    },

    description: {
        type: String,
        required: 'Kindly enter the Cognitive Domain description'
    },
	
	ratings: []
});
module.exports = mongoose.model('Domains', DomainSchema);// JavaScript source code
