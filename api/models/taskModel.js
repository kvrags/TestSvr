// JavaScript source code


'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*//example
	task:{ 
			name:"Squares",
			id:"4324dfsdfdsf4fsr344",
			description:"Squares Task for Attention",
			url:"http://localhost/tasks/Squares.html", 
			gapScore:"0to5", 
			level:{"1","2","3"}, // task levels prescribed for this GAP score
			domain:{name:"Attention", name:"Impulsivity"},//this task might be applicable for multiple domains
			profiles = {list of profiles applicable"
		}
}*/

var TaskSchema = new Schema({
    name: {
        type: String,
        required: 'Kindly enter the Task name'
    },

    description: {
        type: String,
        required: 'Kindly enter the Task description'
    },
	
	file: {
        type: String,
        required: 'Kindly enter the File name for this Task'
    },
	/*gapScore: {
        type: String,
        required: 'Kindly enter the Task GAP Score'
    },*/
	level: {
        type: String,
        required: 'Kindly enter the Task Levels prescribed'
    },
	profiles:[],
    domains: []
        /*type: String,
        required: 'Kindly enter the name of the domain this question belongs to'
		rating: String,
		required: 'Kindly enter the rating level of the domain the task is being associated'
		*/
});
module.exports = mongoose.model('Tasks', TaskSchema);// JavaScript source code
