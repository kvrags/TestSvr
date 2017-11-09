// build the router
var rootApp = angular.module('neuroApp', ['ngRoute']);

rootApp.run(function($rootScope) {
  window.addEventListener("online", function () {
        $rootScope.$broadcast('onlineChanged', true);
	}, true);

    window.addEventListener("offline", function () {
        $rootScope.$broadcast('onlineChanged', false);
	}, true);
	
	
});


rootApp.directive('bars', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         scope:{data:'=data', avg:'=avg', scale:'=scale'}, //from the html <bars data="dataSet"></bars>
         link: function (scope, element, attrs) {
			 //d3js specific code goes here as bars directive is used explicity for d3js
			 
			var svg = d3.select("svg"),
			margin = {top: 20, right: 20, bottom: 30, left: 40},
			width = +svg.attr("width") - margin.left - margin.right,
			height = +svg.attr("height") - margin.top - margin.bottom;

			var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
				y = d3.scaleLinear().rangeRound([height, 0]);

			var g = svg.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			/*d3.tsv("data.tsv", function(d) {
			  d.frequency = +d.frequency;
			  return d;
			}, function(error, data) {
			  if (error) throw error;
			*/
			d3.data(scope.data, function(d){
				d.score = +d.score;
				return d;			
			}, function(error, data) {
			  if (error) throw error;
				
			
			  x.domain(data.map(function(d) { return d.domainName; }));
			  y.domain([0, d3.max(data, function(d) { return d.score; })]);

			  g.append("g")
				  .attr("class", "axis axis--x")
				  .attr("transform", "translate(0," + height + ")")
				  .call(d3.axisBottom(x));

			  g.append("g")
				  .attr("class", "axis axis--y")
				  .call(d3.axisLeft(y).ticks(10, "%"))
				.append("text")
				  .attr("transform", "rotate(-90)")
				  .attr("y", 6)
				  .attr("dy", "0.71em")
				  .attr("text-anchor", "end")
				  .text("Frequency");

			  g.selectAll(".bar")
				.data(data)
				.enter().append("rect")
				  .attr("class", "bar")
				  .attr("x", function(d) { return x(d.letter); })
				  .attr("y", function(d) { return y(d.frequency); })
				  .attr("width", x.bandwidth())
				  .attr("height", function(d) { return height - y(d.frequency); });
			});
			}
		}
   });
	
	
	/* //working
				d3.select(element[0])	
				.selectAll("div")
				.data(scope.data)
				.enter()
				.append("div")
				.attr("class", "bar")
				.style("height", function(d) {
					var barHeight = d * 5;
					return barHeight + "px";});


rootApp.directive('bars', function ($parse) {
      return {
         restrict: 'E',
         replace: true,
         template: '<div id="chart"></div>',
         link: function (scope, element, attrs) {
           var data = attrs.data.split(','),
           chart = d3.select('#chart')
             .append("div").attr("class", "chart")
             .selectAll('div')
             .data(data).enter()
             .append("div")
             .transition().ease("elastic")
             .style("height", function(d) { return d + "%"; })
             .text(function(d) { return d + ""; });
         } 
      };
   });
  */
  
rootApp.value("currentUser", "tempUser");


rootApp.run(function ($rootScope) {
    $rootScope.currentUser = 'Test User';
});


rootApp.config(function ($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: './partials/home.html',
        controller: 'ctrlHome'
    })
    .when('/home', {
        templateUrl: './partials/home.html',
        controller: 'ctrlHome'
    })
    .when('/attention', {
        templateUrl: './partials/attention.html',
        controller: 'ctrlAttention'
    })
	.when('/assessmentReport', {
        templateUrl: './partials/assessmentReport.html',
        controller: 'ctrlassessmentReport'
    })

	
    .when('/impulsivity', {
        templateUrl: './partials/impulsivity.html',
        controller: 'ctrlImpulsivity'
    })

    .when('/mentalflexibility', {
        templateUrl: './partials/mentalflexibility.html',
        controller: 'ctrlmentalflexibility'
    })

    .when('/workingmemory', {
        templateUrl: './partials/workingmemory.html',
        controller: 'ctrlWorkingMemory'
    })
	
    .when('/about', {
        templateUrl: './partials/about.html',
        controller: 'ctrlAbout'
    })
    .when('/assesment', {
        templateUrl: './partials/assesment.html',
        controller: 'ctrlAssesment'
    })
    .when('/contact', {
        templateUrl: './partials/contact.html',
        controller: 'ctrlContact'
    })
    .when('/admin', {
        templateUrl: './partials/admin.html',
        controller: 'ctrlAdmin'
    })

    .when('/retrieveUser', {
        templateUrl: './partials/retrieveuserdetails.html',
        controller: 'ctrlRetrieveUser'
    })
    .when('/squares/:taskname/:level', {
        templateUrl: './tasks/attention/squares.html',
        controller: 'ctrlSquares'
    })
    .when('/squaresblack', {
        templateUrl: './tasks/attention/squaresblack.html',
        controller: 'ctrlBlackSquares'
    })
    .when('/smiley', {
        templateUrl: './tasks/attention/smiley.html',
        controller: 'ctrlSmiley'
    }) 
    .when('/cnntShapes', {
        templateUrl: './partials/connetShapes.html',
        controller: 'ctrlConnectShapes'
    })
	
    .otherwise({ redirectTo: '/index.html' });
	
});

rootApp.factory('dataFactory',  function($http, $rootScope) {

	//Initialise all the db document and objects
	var profiles =[];
	var newProfile=[];
	var newQuestion=[];
	var questions =[];
	var assessee=[];
	var users=[];
	var tasks=[];
	var bOnline = true;
	var currentStorage = "http";
	
	//setup db configuration
	//var host = "http://localhost";
	//var host_addr = "http://192.168.43.71";
	//var port = "8080";

	var host_addr = "https://192.168.43.71";
	var port = "8443";
	var base_url = host_addr +":"+ port + "/";
	
		
	return {
		getAllProfiles: function() {
			return $http.get(base_url + "profiles").then(function(success) {
					profiles = success.data;
		
					//save it local storage for offline support
					writeLocalStorageJson("profiles",profiles);
					return profiles;
				}, function(error){
					//on error attempt from localstorage
					profiles = readLocalStorageJson("profiles");
					
					return profiles[0];
				});
		},

		insertNewProfile: function(newProf) {
			return $http.post(base_url + "profiles", newProf).then(function(success) {
					newProfile = success.data;
					
					//save it local storage for offline support
					//appendToLocalStorage("newAssessee",newAssessee);
					return newProfile;
				},function(error){
					//on error attempt from localstorage
					//save it local storage for offline support
					//appendToLocalStorage("newAssessee",newAssessee);
					return newProfile;
				});
		},
		updateProfile:function(id, data){
			return $http.put(base_url + "profiles/" + id, data).then(function(success) {
					newProfile = success.data;
					//save it on local storage for offline support
					//writeLocalStorageJson("profiles" + id,data,false);
					return newProfile;
				},function(error){
					//update local storage for offline support
					writeLocalStorageJson("profiles" + id,data,false);
					return assessee;
				});
		},
		
		getAllQuestions: function(){
			return $http.get(base_url + "questions").then(function(success) {
					questions = success.data;
					//$rootScope.$broadcast('questions',quesions);
					
					//save it local storage for offline support
					writeLocalStorageJson("questions",questions);
					return questions;
				},function(error){
					//on error attempt from localstorage
					questions = readLocalStorageJson("questions");
					return questions[0];
				});
		},
		
		insertNewQuestion : function(newQues) {
			return $http.post(base_url + "questions", newQues).then(function(success) {
					newQuestion = success.data;
					
					//save it local storage for offline support
					//appendToLocalStorage("newAssessee",newAssessee);
					return newQuestion;
				},function(error){
					//on error attempt from localstorage
					//save it local storage for offline support
					//appendToLocalStorage("newAssessee",newAssessee);
					return newQuestion;
				});
		},
		deleteQuestion: function(id) {
			return $http.delete(base_url + "questions/" + id).then(function(success) {
					newQuestion = success.data;
					
					//save it local storage for offline support
					//appendToLocalStorage("newAssessee",newAssessee);
					return newQuestion;
				},function(error){
					//on error attempt from localstorage
					//save it local storage for offline support
					//appendToLocalStorage("newAssessee",newAssessee);
					return error;
				});
		},
		getAllAssessee: function(){
			return $http.get(base_url + "assessee").then(function(success) {
					assessee = success.data;
					//$rootScope.$broadcast('questions',quesions);
					
					//save it local storage for offline support
					//writeLocalStorageJson("questions",assessee);
					return assessee;
				},function(error){
					//on error attempt from localstorage
					assessee = readLocalStorageJson("assessee");
					return assessee[0];
				});
		},
		
		searchAssessee: function(email){ 
		return $http.get(base_url + "assessee/" + email ).then(function(success) {
					assessee = success.data;
					return assessee;
				},function(error){
					return error;
				});
		},

		insertNewAssessee: function(newAssessee){
			return $http.post(base_url + "assessee", newAssessee).then(function(success) {
					assessee = success.data;
					
					//save it local storage for offline support
					//appendToLocalStorage("newAssessee",newAssessee);
					return assessee;
				},function(error){
					//on error save it local storage for offline support
					//appendToLocalStorage("newAssessee",newAssessee);
					 
					//Return the same data set when offline to mimic mongoDB action by 
					//creating and allocating a fake id
					//this will prevent over writing of records in localstorage!!
					var d = new Date();
					newAssessee._id = d.getTime();
					return newAssessee;
				});
		},

		updateAssessee:function(email, data,str){
			return $http.put(base_url + "assessee/" + email, data).then(function(success) {
					assessee = success.data;
					//$rootScope.$broadcast('questions',quesions);
					
					//save it local storage for offline support
					//writeLocalStorageJson("newAssessee" + id,data,false);
					writeLocalStorageJson("currentUser",data);
					writeLocalStorageJson("scores",data.progress,false);
					
					return assessee;
				},function(error){
					//on error attempt from localstorage
					//save it local storage for offline support
					//alert("updateAssessee() writing to LocalStorage");
					
					//str = newAssessee for new assesment
					//str = updateAssessee when a user is already created and is running tasks
					// to update the tasks details/scores str with updateAssessee is used.
					// this new local record with updateAssessee key will be picked up bulkUpdateAssessee
					
					writeLocalStorageJson(str + email,data,false);
					
					writeLocalStorageJson("currentUser",data);
					writeLocalStorageJson("scores",data.progress,false);
	
					return error.status;
				});
		},
		
		bulkInsertAssessees:function(data,strOp){ //: JSON.stringify(data)
			return $http({method: 'PATCH',url: base_url + "assessee/"+ strOp,data}).then(function (success) {
					return(success);
				}, function (error) {
					return (error.status);
				});
		},
		
		insertNewTask: function(newTask){
			return $http.post(base_url + "tasks", newTask).then(function(success) {
					tasks = success.data;
					return tasks;
				},function(error){
					return error;
				});
		},
		
		getAllTasks: function(){
			return $http.get(base_url + "tasks").then(function(success) {
			tasks = success.data;

			//save it local storage for offline support
			writeLocalStorageJson("tasks", tasks);

			return tasks;
		},function(error){
			//on error attempt from localstorage
			tasks = readLocalStorageJson("tasks");
			return tasks[0];
		});
},

		getAllDomains: function(){
			return $http.get(base_url + "domains").then(function(success) {
					return success;
				},function(error){
					return error;
				});
		}

		
	  };	
});
	
function appendToLocalStorage(key,newData){
	var currentData = localStorage.getItem(key);
	localStorage.setItem(key, currentData + newData);
}

//calling from admin Dashboard
rootApp.controller('ctrlSync', function ($scope,$http,$rootScope,dataFactory) {
	$scope.bOnline = true;
	$scope.message = "This page helps you to load required data for offline working. Also, after offline/field work one must connect to server for automatic upload.";
	
	$scope.Init = function() {
		$scope.localDataNew = readLocalStorageJson("newAssessee");
		$scope.localDataUpdate = readLocalStorageJson("updateAssessee");
		
		$scope.Sync();
		
	};
	
	//check internet connection
	$rootScope.$on('onlineChanged', function(event, isOnline) {
		if (isOnline) {
				$scope.bOnline = true;
				
				//now that we are connected to our server && we have localdata then upload them
				$scope.UploadLocalDB();
		} else {
			$scope.bOnline = false;
		}
	});

	//manually called to copy profiles and questions onto localStorage of the device
	$scope.Sync = function(){
	
		dataFactory.getAllProfiles().then(function (res){
				$scope.profilesList = res;
			}, function(res){
				//error
				$scope.message = "Error syncing profiles. check internet/wi-fi connection and rety later.";
			});
			
		dataFactory.getAllQuestions().then(function (res){
				$scope.questions = res;
			}, function(res){
				//error
				//$scope.questions=res;
				$scope.message = "Error syncing questions. check internet/wi-fi connection and rety later.";
			});
		dataFactory.getAllTasks().then(function (res){
				$scope.tasks = res;
			}, function(res){
				//error
				//$scope.questions=res;
				$scope.message = "Error syncing tasks. check internet/wi-fi connection and rety later.";
			});
	}
	
	//give the user an option to manually perform upload from localStorage if not done automatically with bOnline flag as above
	$scope.UploadLocalDB = function() {
		$scope.lsNewRecords = readLocalStorageJson("newAssessee");
		$scope.lsUpdateRecords = readLocalStorageJson("updateAssessee");
		$scope.localDataDuplicates = readLocalStorageJson("duplicateAssessee");
				
		MergeLocalStorageData();
		
		bulkOperation("new");
		bulkOperation("update");
			
		}
		
		function MergeLocalStorageData(){
			// condition
			//new user created -- gets stored under newAssessee
			//after running thru tasks, -- gets stored under updateAssessee
			//when bulkOperation, first newAssessee records get new id
			//while coming to updation, the updateAssessee record for the newAssessee will not match
		
			//length of the temp Id created is 13 and that of Mongo DB is lengthier
			//if newAssessee and updateAssessee records have _id length of 13 and are same then merge 
			//both the records into a single newAssessee record
			//
			if ($scope.lsUpdateRecords.length > 0) {
				
				for (var i=0;i<$scope.lsUpdateRecords.length;++i) {
					var updateID = $scope.lsUpdateRecords[i]._id.toString();
					
					if (updateID.length < 14 ){
						if($scope.lsNewRecords.length > 0) {
							for(var j=0;j<$scope.lsNewRecords.length ;++j) {
								if(($scope.lsUpdateRecords[i]._id == $scope.lsNewRecords[j]._id)){
									//now our is record found
									//update cache data for newAssessee then
									//delete cache data for updateAssessee
									$scope.lsNewRecords[j] = $scope.lsUpdateRecords[i];
									//lsUpdateRecords[i].delete();
									//alert("Deleting UpdateAssessee : " + $scope.lsUpdateRecords[i]._id);
									localStorage.removeItem("updateAssessee" + $scope.lsUpdateRecords[i]._id);
								}
							}
						}
						$scope.lsUpdateRecords = readLocalStorageJson("updateAssessee");
					}
				
				}
				
			}
		}
		
		function bulkOperation(opStr) {
			//if there are pending items in the localstorage then upload them onto server/DB
			$scope.localData = readLocalStorageJson(opStr);
	
			if ($scope.localData.length) {
				
				if (opStr == "new") 
					//get rid of the temp '_id' field so that DB server will create a new one
					$scope.localData.forEach(function(item){ delete item._id});
			
				dataFactory.bulkInsertAssessees($scope.localData, opStr ).then(function(res) {
					//$scope.message =  res.data.insertedCount + " records uploaded successfully." ;
					
					//check the status of the 'res' to know if we were successful
					//if status = 200 then we could successfully connect to server/db 
					//if status !=200 preserve the localdata newAssessee data for next attempt
					
					//if there are duplicates the we get res.data.code=11000
					if (res.data.code == 11000){
						writeLocalStorageJson("duplicateAssessee", res.data.op);
					}else if (res.status == 200){
						clearLocalStorageJson(opStr);
					}
					
					//update the data members for UI
					$scope.localDataNew = readLocalStorageJson("newAssessee");
					$scope.localDataUpdate = readLocalStorageJson("updateAssessee");
					$scope.localDataDuplicates = readLocalStorageJson("duplicateAssessee");
					
				}, function(res){
						$scope.message =  "Upload of records failed: error:" +  res.error;
				});
			}else {
				$scope.message =  "No pending records to update!";
			}
			
		}
		
		$scope.CreateDummyRecords = function(){
			var tmpData=[
				{	
					"name":"Jay12 Mason",
					"email":"jaymistry@yahoo.com",
					"ageGroup":"6to16",
					"occupation":"Student",
					"stream":"CBSE",
					"cityType":"rural",
					"profileMedian":{
							"name":"Student_CBSE_Rural","Id" : "434f4wfsdfsd45245fsf45","Attention":"22","WorkingMemory":"10","Implusivity":"10","MentalFlexibility":"19"
						},
					"progress":[
									{"Attention":22,"WorkingMemory":10,"Implusivity":10,"MentalFlexibility":19, "asessmentDate":"27Oct2017" }, //GAP 0 or first test 
									{Attention:15,WorkingMemory:8,Implusivity:9,MentalFlexibility:12, } //reduction		
								],
					"tasks":[
								{"name":"Task1forAttention", "plannedStartDate":"17July2016", "plannedCompletionDate":"27Oct2016", "actualStartDate":"","actualCompletionDate":""}
							]
				},
				{	
					"name":"Jay12 Mike",
					"email":"jay11mistry@yahoo.com",
					"ageGroup":"6to16",
					"occupation":"Student",
					"stream":"CBSE",
					"cityType":"rural",
					"profileMedian":{
							"name":"Student_CBSE_Rural","Id" : "434f4wfsdfsd45245fsf45","Attention":"22","WorkingMemory":"10","Implusivity":"10","MentalFlexibility":"19"
						},
					"progress":[
									{"Attention":22,"WorkingMemory":10,"Implusivity":10,"MentalFlexibility":19, "asessmentDate":"27Oct2017" }, //GAP 0 or first test 
									{Attention:15,WorkingMemory:8,Implusivity:9,MentalFlexibility:12, } //reduction		
								],
					"tasks":[
								{"name":"Task1forAttention", "plannedStartDate":"17July2016", "plannedCompletionDate":"27Oct2016", "actualStartDate":"","actualCompletionDate":""}
							]
				},
				{	
					"name":"Killi23 Manju",
					"email":"killmanju@yahoo.com",
					"ageGroup":"6to16",
					"occupation":"Student",
					"stream":"CBSE",
					"cityType":"rural",
					"profileMedian":{
							"name":"Student_CBSE_Rural","Id" : "434f4wfsdfsd45245fsf45","Attention":"22","WorkingMemory":"10","Implusivity":"10","MentalFlexibility":"19"
						},
					"progress":[
									{"Attention":22,"WorkingMemory":10,"Implusivity":10,"MentalFlexibility":19, "asessmentDate":"27Oct2017" }, //GAP 0 or first test 
									{Attention:15,WorkingMemory:8,Implusivity:9,MentalFlexibility:12, } //reduction		
								],
					"tasks":[
								{"name":"Task1forAttention", "plannedStartDate":"17July2016", "plannedCompletionDate":"27Oct2016", "actualStartDate":"","actualCompletionDate":""}
							]
				},

				{	
					"name":"Laul23 Paul",
					"email":"laulpaul@yahoo.com",
					"ageGroup":"6to16",
					"occupation":"Student",
					"stream":"CBSE",
					"cityType":"rural",
					"profileMedian":{
							"name":"Student_CBSE_Rural","Id" : "434f4wfsdfsd45245fsf45","Attention":"22","WorkingMemory":"10","Implusivity":"10","MentalFlexibility":"19"
						},
					"progress":[
									{"Attention":22,"WorkingMemory":10,"Implusivity":10,"MentalFlexibility":19, "asessmentDate":"27Oct2017" }, //GAP 0 or first test 
									{Attention:15,WorkingMemory:8,Implusivity:9,MentalFlexibility:12, } //reduction		
								],
					"tasks":[
								{"name":"Task1forAttention", "plannedStartDate":"17July2016", "plannedCompletionDate":"27Oct2016", "actualStartDate":"","actualCompletionDate":""}
							]
				},
				{	
					"name":"Srinidi23 RaoMason",
					"email":"srao@yahoo.com",
					"ageGroup":"6to16",
					"occupation":"Student",
					"stream":"CBSE",
					"cityType":"rural",
					"profileMedian":{
							"name":"Student_CBSE_Rural","Id" : "434f4wfsdfsd45245fsf45","Attention":"22","WorkingMemory":"10","Implusivity":"10","MentalFlexibility":"19"
						},
					"progress":[
									{"Attention":22,"WorkingMemory":10,"Implusivity":10,"MentalFlexibility":19, "asessmentDate":"27Oct2017" }, //GAP 0 or first test 
									{Attention:15,WorkingMemory:8,Implusivity:9,MentalFlexibility:12, } //reduction		
								],
					"tasks":[
								{"name":"Task1forAttention", "plannedStartDate":"17July2016", "plannedCompletionDate":"27Oct2016", "actualStartDate":"","actualCompletionDate":""}
							]
				}
				
			];
				
			for(var i=0;i<tmpData.length;++i){
				writeLocalStorageJson("newAssessee", tmpData[i],true);
			}
		
			$scope.localData = readLocalStorageJson("newAssessee");
		
		};
});

function clearLocalStorageJson(key){
	var arrJson = [];
	//First read all with matching 'key' as remove while reading is unsafe!!
	//arrJson = readLocalStorageJson(key);
	
	for (var i = 0; i < localStorage.length; i++){
		if (localStorage.key(i).includes(key)) {
			arrJson.push(localStorage.key(i));
		}
	}
	
	for (var i = 0; i < arrJson.length; ++i) {
		localStorage.removeItem(arrJson[i]);
	}
}

function readLocalStorageJson(key) {

    var arrJson = [];
    for (var i = 0; i < localStorage.length; ++i) {
        var tmp = localStorage.key(i);
        if (tmp.includes(key))
        arrJson.push( JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
    return arrJson;

    /*
    var fs = require('fs');

    var strFilename = "./" + usrName + ".json";

    fs.readFile(strFilename, 'utf-8', function (err, data) {
        if (err) throw err

        var arrayOfObjects = JSON.parse(arrData)
        arrayOfObjects.push(arrData)
wr
        console.log(arrayOfObjects)
    })
    */
}
function writeLocalStorageJson(key, arrData,bKey) {
    if (bKey)
        key = key + "-" + Date.now();
    localStorage.setItem(key, JSON.stringify(arrData));



    /*
    var fs = require('fs');

    var strFilename = "./" + usrName + ".json";

    fs.writeFile(strFilename, JSON.stringify(arrData), 'utf-8', function (err) {
        if (err) throw err
        console.log('Done!')
    });
    */
}

rootApp.controller('ctrlHome', function ($scope,$rootScope) {
    $scope.message = 'Hello from ctrlHome HomeController';

	//check for internet connection
	 $rootScope.$on('onlineChanged', function(event, isOnline) {
		$scope.bOnline = isOnline;
	});
	
	
    $scope.status = "status message init from HomeController.. ";
	$scope.userDetails ={};
	//didn't work using global variable
	//$scope.user = $rootScope.currentUser;
	$scope.userDetails = readLocalStorageJson("currentUser");
	if ($scope.userDetails.length == 1 )
		$scope.userName = $scope.userDetails[0].fname;
	
	
    $scope.Register = function (model) {
        console.log("Inside ng.js :: Calling Register () in ctrlHome Controller");
        $scope.status = "Registration under process : please wait...";
        //alert('Submitted\n' + JSON.stringify(model));

        $scope.name = model.name;

        //Register the user details here
        if (!window.indexedDB) {
            //window.alert("Your browser doesn't support a stable version of IndexedDB.")
        } else {
            var db;
            var request = window.indexedDB.open("myAppDB",1);
            $scope.status = "Registration process : Connecting to the database...";

            request.onerror = function (event) {
                alert("Error opnening IndexedDB");
                console.log("Error opnening IndexedDB");
                $scope.status = "Registration process : Error connecting to database. check your network and try again later";
            };
            request.onsuccess = function (event) {
                //alert("Opening of myAppDB a success");
                console.log("Opening of myAppDB a success")

                //request.onupgradeneeded = function (event) {
                db = event.target.result;
                var objectStore = db.createObjectStore("customers", { keyPath: "email" });
                var transaction = db.transaction(["customers"], "readwrite");

                console.log("myAppDB : creating Index on Name and eMail")

                // Create an index to search customers by name. We may have duplicates
                // so we can't use a unique index.
                transaction.createIndex("name", "name", { unique: false });

                // Create an index to search customers by email. We want to ensure that
                // no two customers have the same email, so use a unique index.
                objectStore.createIndex("email", "email", { unique: true });

                console.log("myAppDB : creating Index completed")

                // Use transaction oncomplete to make sure the objectStore creation is 
                // finished before adding data into it.
                objectStore.transaction.oncomplete = function (event) {
                    // Store values in the newly created objectStore
                    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
                    //for (var i in customerData) {
                      //  customerObjectStore.add(customerData[i]);
                    //}
                    customerObjectStore.add(model);
                    $scope.status = "Registration successful!";

                };

            }
        }



        //if successfull registration
    }
});


rootApp.controller('ctrlAttention', function ($scope, dataFactory) {
    
	$scope.Init = function (){
		$scope.userDetails = readLocalStorageJson("currentUser");
		$scope.userName = $scope.userDetails[0].fname;
		$scope.message = "Dear " + $scope.userName + ", Our analysis recommends the following tasks to improve your cognitive area of attention. ";
		$scope.mode = "panel";  // a task page with back button
		$scope.tasks=[];
		
		dataFactory.getAllTasks().then(function (res){
			for(i=0; i< res.length;++i) {
				for(j=0; j<res[i].domains.length;++j) {
					if(res[i].domains[j].name == "Attention")
						$scope.tasks.push(res[i]);
				}
			}
		}, function(res){
			//error
			$scope.message = "Error retieving tasks. check internet/wi-fi connection and rety later.";
		});
	}
	
	$scope.goBack = function (){
		$scope.mode = "panel";
	}
});

rootApp.controller('ctrlImpulsivity', function ($scope, dataFactory) {

	$scope.Init = function (){
		$scope.userDetails = readLocalStorageJson("currentUser");
		$scope.userName = $scope.userDetails[0].fname;
		$scope.message = "Dear " + $scope.userName + ", Our analysis recommends the following tasks to improve your cognitive area of attention. ";
		$scope.mode = "panel";  // a task page with back button
		$scope.tasks=[];
			dataFactory.getAllTasks().then(function (res){
				for(i=0; i< res.length;++i) {
					for(j=0; j<res[i].domains.length;++j) {
						if(res[i].domains[j].name == "Impulsivity")
							$scope.tasks.push(res[i]);
					}
				}
				}, function(res){
					//error
					$scope.message = "Error retieving tasks. check internet/wi-fi connection and rety later.";
			});
	}
	
	$scope.goBack = function (){
		$scope.mode = "panel";
	}	
});

rootApp.controller('ctrlWorkingMemory', function ($scope, dataFactory) {

	$scope.Init = function (){
		$scope.userDetails = readLocalStorageJson("currentUser");
		$scope.userName = $scope.userDetails[0].fname;
		$scope.message = "Dear " + $scope.userName + ", our analysis recommends the following tasks to improve your cognitive area of working memory. ";
		$scope.mode = "panel";  // a task page with back button
		$scope.tasks=[];
			dataFactory.getAllTasks().then(function (res){
				for(i=0; i< res.length;++i) {
					for(j=0; j<res[i].domains.length;++j) {
						if(res[i].domains[j].name == "Working Memory")
							$scope.tasks.push(res[i]);
					}
				}
				}, function(res){
					//error
					$scope.message = "Error retieving tasks. check internet/wi-fi connection and rety later.";
			});
	}
	
});

rootApp.controller('ctrlmentalflexibility', function ($scope, dataFactory) {

	$scope.Init = function (){
		$scope.userDetails = readLocalStorageJson("currentUser");
		$scope.userName = $scope.userDetails[0].fname;
		$scope.message = "Dear " + $scope.userName + ", Our analysis recommends the following tasks to improve your cognitive area of attention. ";
		$scope.mode = "panel";  // a task page with back button
		$scope.tasks=[];
			dataFactory.getAllTasks().then(function (res){
				for(i=0; i< res.length;++i) {
					for(j=0; j<res[i].domains.length;++j) {
						if(res[i].domains[j].name == "Mental Flexibility")
							$scope.tasks.push(res[i]);
					}
				}
				}, function(res){
					//error
					$scope.message = "Error retieving tasks. check internet/wi-fi connection and rety later.";
			});
	}
	
	$scope.goBack = function (){
		$scope.mode = "panel";
	}	
});

rootApp.controller('ctrlTasks', function ($scope,dataFactory) {
	$scope.message = "Message from ctrlTasks.";
	
	var tasks=[];
	var task={
		"name": "",   		//name of the task
		"aim":"",			//what this task want to achieve
		"level":"", 		//level of the task 
		"description":"", 	//brief description of the task
		"instructions":"",	// instructions on how to execute the task
		"file":"",			//file name of the task
		"icon":"",		//icon of the task
		"sequence_id":"",	//order of appearance on the web page
		"domains":[],		//list of domains that this task should appear
		"profilesMedian":[]		// list of profiles that this task should appear
		};
		
		$scope.Init = function(){
			//alert("Init function called");
		}
		
		$scope.taskMode = function(mode){
			switch (mode) {				
				case 'create':
					$scope.mode = "create";
					break;
				case 'modify':
					$scope.mode = "modify";					
					break;
				case 'simulate':
					$scope.mode = "simulate";
					break;			
			}
			$scope.message = $scope.mode;
		}
		
		$scope.InitCreateTask = function(){ 
			//initialise domains list and profiles list
		
			//fetch all the domains
			//$scope.domains = ["Attention","Working Memory","Impulsivity", "Mental Flexibility","Inhibition"];

			dataFactory.getAllDomains().then(function (res){
				$scope.domains = res.data;
				}, function(res){
					//error
					$scope.message = "Error syncing Domain names. check internet/wi-fi connection and rety later.";
					$scope.profilesList = null;
				});

			//fetch all the profilesMedian
			dataFactory.getAllProfiles().then(function (res){
				$scope.profiles = res;
				}, function(res){
					//error
					$scope.message = "Error syncing profiles. check internet/wi-fi connection and rety later.";
					$scope.profiles = null;
				});

				
		}
		
		$scope.createTask = function(model) {
			//alert("Create New Task called");
			//var domainList = {"name":"","ratings":{}};
			
			//set right the domain list and profiles list
			//$scope.message = model;
			task={
					"name":  model.name,
					"aim":"",		
					"level":model.level, 
					"description":model.description, 
					"instructions":"",
					"file":model.file,
					"icon":"",
					"sequence_id":"",	
					"domains":model.domains,	
					"profiles":[]
					};
					
			var tmpList ={};

			//just store id and name of the profiles in the task...discard rest
			for(i=0; i < model.profiles.length;++i){
				tmpList.id = model.profiles[i]._id;
				tmpList.name = model.profiles[i].name;
				task.profiles.push(tmpList);
				tmpList = {};
			}
 
			dataFactory.insertNewTask(task).then(function (res) {
				$scope.message = "New Task details successfully posted to server  ";// + res.data;
			}, function(res){
				//error
				$scope.message = "Error in creating of new Task. Error: " + res;
				
			});
		}
		$scope.showRatingsFor = function(domain){
			$scope.message = "Show Ratings for " + domain;
		}
});

rootApp.controller('ctrlassessmentReport', function ($scope) {
    $scope.userDetails = readLocalStorageJson("currentUser");

	if ($scope.userDetails.length == 1) {
		$scope.fname = $scope.userDetails[0].fname;
		$scope.lname = $scope.userDetails[0].lname;
		$scope.tasks = $scope.userDetails[0].tasks;
		$scope.scores = $scope.userDetails[0].progress;
		$scope.profileMedian = $scope.userDetails[0].profileMedian;
	}
	/*$scope.scores = readLocalStorageJson("scores");
	$scope.progress = $scope.userDetails[0].progress;
	$scope.attention = $scope.score[0].attention;
	$scope.workingMemory = $scope.score[0].workingMemory;
	$scope.impulsivity = $scope.score[0].impulsivity;
	$scope.mentalFlexibility = $scope.score[0].mentalFlexibility;
	
	$scope.createdOn = $scope.userDetails[0].progress[0].createdDate;
	*/
	
	/*//datasets build in this order Attention,Working Memory,Impulsivity,MentalFlexibility
	$scope.dataSetMedian = [
			$scope.profileMedian.Attention,
			$scope.profileMedian.WorkingMemory,
			$scope.profileMedian.Impulsivity,
			$scope.profileMedian.MentalFlexibility
		];
	$scope.dataSetMedianStr = $scope.dataSetMedian.toString();
	
	$scope.dataSet = [$scope.progress[0].Attention,$scope.progress[0].WorkingMemory,$scope.progress[0].Impulsivity,$scope.progress[0].MentalFlexibility];
	
	//temp for testing to display in d3js bar graph
	//$scope.dataSet = [10,40,20,60];
	$scope.dataSet = [
					{"score":10,domainName:"Attention",
					 "score":40,domainName:"Working Memory",
					 "score":20,domainName:"Impulsivity",
					 "score":60,domainName:"Mental Flexibility",
						
					}
	];
	$scope.dataSetStr = $scope.dataSet.toString();
	*/
});


rootApp.controller('ctrlAbout', function ($scope) {
    $scope.message = 'Hello from AboutController';
});


rootApp.controller('ctrlAdmin', function ($scope) {
    $scope.message = 'Hello from AdminController';
    /*
    _QuestionModal = true;
    b_UsersModal = true;


    $scope.manageUsers = function () {
        alert("Manage USers here....");
        b_UsersModal = false;
        b_QuestionModal = true;

    }
    $scope.manageQuestionaire = function () {
        alert("Manage Assessment Questions here..");
        b_QuestionModal = false;
        b_UsersModal = true;

    }
    $scope.manageUsrQuestionaire = function () {
        alert("Manage Users submitted Assessment here..");

    }

    $scope.createQuestion = function (model) {
        alert(model.domain + ";" + model.question + ";" + model.weightage);

    }
    */
});

/*
rootApp.controller('ctrlConnectShapes', function ($scope) {
    $scope.message = 'Hello from ctrlConnectShapes';

});
*/


// Profiles
//called from Admin > Profiles tab
rootApp.controller('ctrlProfiles', function ($scope,dataFactory) {
    $scope.message = "Please fill in the above fields";

    $scope.Student = ["CBSE", "ICSE", "State","NIOS","IGCSE"];
    $scope.Working = ["Professional", "Self-Employed", "Govt Employee"];
    $scope.Retired = [];
    $scope.Housewife = [];

    $scope.occupationType = [
			{ type: 'Student', data: $scope.Student, displayName: 'Student' },
			{ type: 'Working', data: $scope.Working, displayName: 'Working' },
			{ type: 'Retired', data: $scope.Retired, displayName: 'Retired' },
			{ type: 'Housewife', data: $scope.Retired, displayName: 'Retired'}
	];

	$scope.profilesList = [];
	
	dataFactory.getAllProfiles().then(function (res){
		$scope.profilesList = res;
		}, function(res){
			//error
			$scope.message = "Error syncing profiles. check internet/wi-fi connection and rety later.";
	});
		
	/* //check and delete later 
	fetchProfiles();
	
	function fetchProfiles(){
		 //retrieve all the profiles record
		$http.get("http://localhost:8080/profiles")
		.then(function (res) {
			$scope.profilesList = res.data;
			//alert("Profiles fetched: " + res.data);
				}, function (res) {
			//failure callback
			$scope.profilesList = [];
		});
	}*/

    //profile Model
    /*
    Model
    {
        name:String,
        ageGrou":String,
        occupation:String,
        stream:String,
        cityType:String,
		tasksGrid:[]
    }
    //example
    {
        "name":"Student_CBSE_Rural",
        "ageGroup":"6to16",
        "occupation":"Student",
        "stream":"CBSE",
        "cityType":"rural",
        "ID":1505661846259
		tasksGrid: []
    }*/

    $scope.createProfile = function (model) {
		//refresh profiles check and delete later
		//fetchProfiles();
		
        model.occupation = model.occupation.type;
		$scope.b_Duplicate = false;
		
		//check for duplicate profiles already created with different name 
		//but have same ageGroup,occupation,cityType
		for (var i=0; i < $scope.profilesList.length; ++i) {
			//Occupations of type Retired and Housewife profiles do not have stream 
			if(($scope.profilesList[i].occupation == 'Retired') ||  ($scope.profilesList[i].occupation == 'Housewife') ){
				if (($scope.profilesList[i].ageGroup == model.ageGroup) && ($scope.profilesList[i].occupation == model.occupation) && ($scope.profilesList[i].cityType == model.cityType)){
					$scope.message = "New Profile creation error : Profile already exists.";
					$scope.b_Duplicate = true;	
				}
				
			}else{
				if(($scope.profilesList[i].ageGroup == model.ageGroup) && ($scope.profilesList[i].occupation == model.occupation) && ($scope.profilesList[i].stream == model.stream) && ($scope.profilesList[i].cityType == model.cityType)){
					$scope.message = "New Profile creation error : Profile already exists.";
					$scope.b_Duplicate = true;	
					}
			}	
		}
		
		/* check and delete later
		if (!$scope.b_Duplicate) {
			//if no duplicate then create new one in db
			$http.post("http://localhost:8080/profiles", model)
			.then(function (res) {
				//$scope.model = {}; // clear the form so our user is ready to enter another
				$scope.message = model.name + " profile is submitted for processing";

			}, function (res) {
				alert("Error while posting new profiles:" + res.error);
				$scope.message = "Error:" + res.error;
			});
		}*/
		
		//if no duplicates are found then create a new one in DB
		if(!$scope.b_Duplicate){
				dataFactory.insertNewProfile(model).then(function (res) {
				//alert(model.name + " profile is successfully submitted for processing");
				$scope.message = model.name + " profile is submitted for processing";
				$scope.model={};
			}, function(res){
				//error
				$scope.message = "Error while creating new profile : " + res.error;
			});
		}
	}
});


//manage profiles median score for various cognitive domains
//called from admin html tab
rootApp.controller('ctrlprofilesMedian', function ($scope,dataFactory) {
    $scope.message = 'Hello from ctrlprofilesMedian Controller11';
    $scope.profilesList = {};
    $scope.profile = {};
    //$scope.profileMedianMaster = {};
    $scope.profileMedian = [];

   $scope.Student = ["CBSE", "ICSE", "State"];
    $scope.Working = ["Professional", "Self-Employed", "Govt Employee"];
    $scope.Retired = [];
    $scope.Housewife = [];


    $scope.occupationType = [
        { type: 'Student', data: $scope.Student, displayName: 'Student' },
         { type: 'Working', data: $scope.Working, displayName: 'Working' },
         { type: 'Retired', data: $scope.Retired, displayName: 'Retired' },
         { type: 'Housewife', data: $scope.Retired, displayName: 'Retired' }

    ];
	$scope.RefresProfiles = false;
	$scope.b_UpdateBtn = false;//this button will disabled by default
	/* check and delete later
	$scope.fetchAllProfiles = function (){
	   //retrieve all the profiles record
		$http.get("http://localhost:8080/profiles")
		.then(function (res) {
			$scope.profilesList = res.data;
			$scope.message = "Profiles retrieved";
		}, function (res) {
			//failure callback
			$scope.message = res.data;
		});	
	}*/
	
	$scope.fetchAllProfiles = function (){
		dataFactory.getAllProfiles().then(function (res){
			$scope.profilesList = res;
			$scope.message = "Profiles retrieved";
			$scope.RefresProfiles = true;
			}, function(res){
			//Online fetch unsuccessful 
			$scope.message = "Error in Profiles retrieval.";
		});
	}
	//narrow down the list of profile from the profilesList by Occupation type
    $scope.fetchProfilesByOccupation = function (model) {
        $scope.profile = [];
		
		if (!$scope.RefresProfiles) return;
		
        for (var i = 0; i < $scope.profilesList.length; ++i) {
            if ($scope.profilesList[i].occupation == model.occupation) {
                $scope.profile.push($scope.profilesList[i]);
            }
        }
    }
	
    //Select Profilename from the all the profiles fetched from the data
    $scope.fetchProfileByName = function (profileName) {
        //alert("selected row:" + rowID);

        //save profileName to be used to write back later
        $scope.profileName = profileName;

        //reset the values
		/*$scope.focusProfileId = 0;
		$scope.name = "";
		$scope.ageGroup = "";
		$scope.occupation = "";
		$scope.stream = "";
		$scope.cityType = "";*/
		$scope.model.Attention = 0;
        $scope.model.WorkingMemory = 0;
        $scope.model.Impulsivity = 0;
        $scope.model.MentalFlexibility = 0;

        for (var i = 0; i < $scope.profilesList.length; ++i) {
            if ($scope.profilesList[i].name == profileName) {
				$scope.focusProfileId = $scope.profilesList[i]._id;
				
				//store the index of the profile to update data on successful posting to server
				$scope.model.i = i;
				$scope.model.name = $scope.profilesList[i].name;
				$scope.model.ageGroup = $scope.profilesList[i].ageGroup;
				$scope.model.occupation = $scope.profilesList[i].occupation;
				$scope.model.stream = $scope.profilesList[i].stream;
						
                $scope.model.Attention = $scope.profilesList[i].Attention;
                $scope.model.WorkingMemory = $scope.profilesList[i].WorkingMemory;
                $scope.model.Impulsivity = $scope.profilesList[i].Impulsivity;
                $scope.model.MentalFlexibility = $scope.profilesList[i].MentalFlexibility;
				break;
            }
        }		
    }
	
	//// enable the update button only if user changes 'any' one of the median values
	$scope.enableUpdateBtn = function(){
		$scope.b_UpdateBtn = true;
	}

	$scope.updateProfileMedian = function (model) {
		//model.occupation = model.occupation.type;
	
	/* check and delete later
	//format of _id:59c387e8d997c325b4b6afe0
		$http.put('http://localhost:8080/profiles/'+ $scope.focusProfileId, model)
		.then(function (res) {
			var i = model.i;
			
			$scope.profilesList[i].name = $scope.model.name ;
			$scope.profilesList[i].ageGroup = $scope.model.ageGroup ;
			$scope.profilesList[i].occupation = $scope.model.occupation ;
			$scope.profilesList[i].stream = $scope.model.stream;
					
			$scope.profilesList[i].Attention = $scope.model.Attention ;
			$scope.profilesList[i].WorkingMemory = $scope.model.WorkingMemory ;
			$scope.profilesList[i].Impulsivity = $scope.model.Impulsivity ;
			$scope.profilesList[i].MentalFlexibility = $scope.model.MentalFlexibility;
				
			//$scope.message = res.data;
			$scope.message = "Profile update posted successfully.";
		},
		function (res) {
			//failure callback
			$scope.message = ("Error in updating the data, error: " + res.data);
		});
    }*/
		dataFactory.updateProfile($scope.focusProfileId, model).then(function (res) {
			var i = $scope.model.i;
			
			$scope.profilesList[i].name = $scope.model.name ;
			$scope.profilesList[i].ageGroup = $scope.model.ageGroup ;
			$scope.profilesList[i].occupation = $scope.model.occupation ;
			$scope.profilesList[i].stream = $scope.model.stream;
					
			$scope.profilesList[i].Attention = $scope.model.Attention ;
			$scope.profilesList[i].WorkingMemory = $scope.model.WorkingMemory ;
			$scope.profilesList[i].Impulsivity = $scope.model.Impulsivity ;
			$scope.profilesList[i].MentalFlexibility = $scope.model.MentalFlexibility;
				
			//$scope.message = res;
			$scope.message = "Profile update posted successfully.";
			
			//disable the Update button until new update Operation is started.
			$scope.b_UpdateBtn = false;
			}, function(res){
				//failure callback
				$scope.message = ("Error in updating the data, error: " + res);
		});
	}
});

 //utility
function getItemByKey(key, array) {
        var value;
        array.some(function (obj) {
            if (obj[key]) {
                value = obj[key];
                return true;
            }
            return false;
        });
        return value;
}


//admin adminSurvey
rootApp.controller('ctrladminSurvey', function ($scope,dataFactory) {
    $scope.message = {};// = 'Hello from ctrladminSurvey';
	var tmp;
	var user = {
				name:"",
				ageGroup:"",
				Attention:"",
				WorkingMemory:"",
				Impulsivity:"",
				MentalFlexibility:""				
			};

	$scope.users = [];
        
   //this functionality is not yet fully implemented*********
	//fetch all the profiles to give user the option to look at Assessees for a particular profile
	//
	$scope.profilesList=[];
		dataFactory.getAllProfiles().then(function (res){
			$scope.profilesList = res;
			}, function(res){
			//$scope.message = "Profiles fetch unsuccessful!";
		});

	
	dataFactory.getAllAssessee().then(function (res){
		var tmp =  res;
		var user = {
				fname:"",
				lname:"",
				ageGroup:"",
				Attention:"",
				WorkingMemory:"",
				Impulsivity:"",
				MentalFlexibility:""				
		};

		////build an array with all the details that is required for the UI table display
		//name,ageGroup,Attention,WorkingMemory,Impulsivity,MentalFlexibility
		for (var i=0; i < tmp.length; ++i) {
				user.fname = tmp[i].fname;
				user.lname = tmp[i].lname;
				user.ageGroup = tmp[i].ageGroup;
				user.Attention = tmp[i].progress[tmp[i].progress.length-1].Attention;
				user.WorkingMemory = tmp[i].progress[tmp[i].progress.length-1].WorkingMemory;
				user.Impulsivity = tmp[i].progress[tmp[i].progress.length-1].Impulsivity;
				user.MentalFlexibility = tmp[i].progress[tmp[i].progress.length-1].MentalFlexibility;
				
				$scope.users.push(user);
				user = {};
		}
					
		}, function(res){
			//error
			$scope.message = "Error in fetching assessees. check internet/wi-fi connection and rety later.";
		});
});

//called from admin Questions
rootApp.controller('ctrladminQuestions', function ($scope,$window, dataFactory) {
    $scope.profilesList = [];
	$scope.question = [];
    //set the default values for the options
    $scope.Never = 0;
    $scope.Rarely = 1;
    $scope.Sometimes = 2;
    $scope.MostOften = 3;
    $scope.Always = 4;
	$scope.displayQuestions=[];
	$scope.b_profilesRefreshed = false;
	$scope.b_questionsRefreshed = false;
	
	$scope.Init = function() {
		
		//initially Create Q screen displayed; hence fetch all the latest profiles
		getAllProfiles();
	}
	
	function getAllProfiles(){
		//Initialise $scope variables with profiles and questions DATA
		dataFactory.getAllProfiles().then(function (res){
			$scope.profilesList = res;
			$scope.b_profilesRefreshed = true;
			}, function(res){
			//$scope.message = "Profiles fetch unsuccessful!";
		});
	}
	function getAllQuestion() {
		if ($scope.b_questionsRefreshed ) return;
		
		dataFactory.getAllQuestions().then(function (res){
			$scope.questions = res;
			$scope.b_questionsRefreshed = true;
			}, function(res){
				//error
				//$scope.questions=res;
				$scope.message = "Error syncing questions. check internet/wi-fi connection and rety later.";
		});
	}
	
	$scope.setFilter = function(filter){
		//alert(filter);
		//check the ng filter is NOT working as expected!!!
		$scope.displayFilter = filter;
	}
	/* check and delete later
    //retrieve all the Median profiles 
   // $http.get("http://localhost:8080/profiles")
	 $http.get("http://192.168.43.71:8080/profiles")

    .then(function (res) {
        $scope.profilesList = res.data;
    }, function (res) {
        //failure callback
        $scope.message = res.data;
    });
	
	
	//initialise with all the questions
	getAllQuestions();
	
	function getAllQuestions() {	
		//retieve all the questions
		//$http.get('http://localhost:8080/questions')
			$http.get('http://192.168.43.71:8080/questions')
			
			.then(function (res) {
				$scope.questions = res.data;
			},
			function (res) {
				//failure callback
				$scope.questions = res.data
			});	
	} */
	
    $scope.selectMode = function (mode){
        if (mode == "create"){
            $scope.b_CreateQ = false;
        } else {
            $scope.b_CreateQ = true;
			
			//referesh Questions list
			getAllQuestion();
        }
    }

    $scope.createQuestion = function (model) {
		
		////if not changed by the user on UI, set model 
		////values with default values stored in $scope
		if (model.Never == null)
			model.Never = $scope.Never;
			
		if (model.Rarely == null)
			model.Rarely = $scope.Rarely;
		
		if (model.Sometimes == null)
			model.Sometimes = $scope.Sometimes;
		
		if (model.MostOften == null)
			model.MostOften = $scope.MostOften;
			
		if (model.Always == null)
			model.Always = $scope.Always;
	
		$scope.question = {
            'domain': model.domain,
            'qText': model.qText,
            'Never': model.Never, 
            'Rarely': model.Rarely,
            'Sometimes': model.Sometimes ,
            'MostOften': model.MostOften ,
            'Always': model.Always,
			'profiles' : []
        };

		////atleast one of the profiles should be assigned to question
		if (model.profilesList.length > 0) {
			
			for(var i=0;i < model.profilesList.length; ++i){
				var list = {'id':"",'name':""};
				//$scope.question.profiles.push('id':model.profileList[i]._id , 'name':model.profileList[i].name);
				list.id = model.profilesList[i]._id;
				list.name = model.profilesList[i].name;
				$scope.question.profiles.push(list);
			}
			
			/*$http.post("http://localhost:8080/questions", $scope.question)
			.then (function (res){
				$scope.question = {}; // clear the form so our user is ready to enter another
				$scope.message = "Successfully posted to server:" ;//+ res.data;
			}, function (res){
				$scope.message = "Error in posting new question, error: " + res.error;
			});*/
			dataFactory.insertNewQuestion($scope.question).then(function (res) {
				//alert(model.name + " profile is successfully submitted for processing");
				$scope.message = "New questions is submitted for processing";
				$scope.question={};
				$scope.b_questionsRefreshed  = false;
			}, function(res){
				//error
				$scope.message = "Error while creating new question: " + res.error;
			});

		}else {
			$scope.message = "Error in creating new Question, select atleast one of the profiles.";
			alert("Select atleast one Profile for this new Question.");
		}
	}
	
	$scope.deleteQuestion = function (id){
		if ($window.confirm("Do you want to delete this question? " + id)) {
			dataFactory.deleteQuestion(id).then(function (res) {
				$scope.message = "Question deleted. Page need to be refreshed";
			}, function(res){
				$scope.message = "Error while deleting question : " + res.error;
			});
		}else {
				$scope.message = "Question not deleted";
		}
		
		
	}
});

//called from Admin page to find existing assessees
rootApp.controller('ctrlAssessees', function ($scope, $window, dataFactory) {
	//right now only find option
	$scope.mode = "find";
	$scope.display = false;
	
   	$scope.taskMode = function(mode){
			switch (mode) {				
				case 'create':
					$scope.mode = "create";
					break;
				case 'modify':
					$scope.mode = "modify";					
					break;
				case 'find':
					$scope.mode = "find";
					break;			
			}
			$scope.message = $scope.mode;
		}
		
	$scope.InitFindAssessee = function() {
		$scope.message = "in ctrlAssessees()";
	}
	
	$scope.clearDisplay = function() {
			$scope.display = false;
	}
	
	$scope.findAssessee = function (model) {
		
		dataFactory.searchAssessee(model.email).then(function (res){
			if (res.length == 1){
				$scope.display = true;
				$scope.user = res[0];
				$scope.message = res[0];
			}else {
				alert ("No Assessee details found!");
			}
			
			
		}, function(err){
			$scope.message = err;  
		});
		
	}
   
   $scope.selectAssessee =  function(){
	   writeLocalStorageJson("currentUser",$scope.user);
	   writeLocalStorageJson("scores",$scope.progress);
	   alert("New Assessee details loaded");
	   $window.location.href = '/index.html';
   }
});

rootApp.controller('ctrlAssesment', function ($scope,$window,dataFactory) {
	
		
    $scope.newRecord;
	
	$scope.bEnable = true; //Next button flag
	$scope.bAssesseDetails = "new";
    //$scope.bQuestions = false;
	
	$scope.date = Date();//'Hello World from Assesment Controller1';
    $scope.qIndex = 0;
    //$scope.survey = [];
    //$scope.final = []; // place holder to display final assesment scores
    $scope.attention = 0;
    $scope.workingMemory = 0;
    $scope.impulsivity = 0;
    $scope.mentalFlexibility = 0;

    $scope.Student = ["CBSE", "ICSE", "State","NIOS","IGCSE"];
    $scope.Working = ["Professional", "Self-Employed", "Govt Employee"];
    $scope.Retired = [];
    $scope.Housewife = [];

    $scope.occupationType = [
        { type: 'Student', data: $scope.Student, displayName: 'Student' },
         { type: 'Working', data: $scope.Working, displayName: 'Working' },
         { type: 'Retired', data: $scope.Retired, displayName: 'Retired' },
         { type: 'Housewife', data: $scope.Retired, displayName: 'Retired' }

    ];

	dataFactory.getAllProfiles().then(function (res){
		$scope.profilesList = res;
		$scope.message = "Ready to start assesment process";//res.data; //res;
	}, function(res){
		//Online fetch unsuccessful hence reading from localstorage
		$scope.profilesList=res;
	});
1
    ////retrieve all the questions based on the selected profile
	//TBD
	//{}
    $scope.Init = function () {
    
	    //if bAssesseDetails = new then show new form to capture assessee details
	    //if bAssesseDetails = update then show existing assessee details
		//if bAssesseDetails = questions then show Questions screen

		//if we already have a current user then update the model fields in the UI
		$scope.userDetails = readLocalStorageJson("currentUser");
		
		if ($scope.userDetails.length == 1) {
			//there is a user identified
			$scope.bAssesseDetails = "update";
			$scope.strOperation = "updateAssessee";
			
			$scope.userDetails = $scope.userDetails[0];
			$scope.fname = $scope.userDetails.fname;
			$scope.lname = $scope.userDetails.lname;
			$scope.progress = $scope.userDetails.progress;
			$scope.progressCount = $scope.progress.length;
		}else{
			//new 
			$scope.bAssesseDetails = "new";
			$scope.strOperation = "newAssessee";

		}
	}

	$scope.assessAgain = function(){
		$scope.bAssesseDetails = "questions";
		GetQuestions("","");
		$scope.InitQuestions();
	}
	
    var optionKey = '';
    var score = 0;

    /*
    Assesee Model

	/*example
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
		],
		"tasks": []

	}*/

	/*$scope.Submit = function(model) {
		
		if ($scope.bAssesseDetails == "update"){ 
			updateAssessee(model);
		}
		
		if ($scope.bAssesseDetails == "new"){ 
			CreateNewAssessee(model);
		}
	}
	
	function updateAssessee(model) {
		alert("in updateAssessee()");
	}*/
	//create a new Assessee as per the above model
	//progress array will contain scores from respective Cogntive areas
    $scope.CreateNewAssessee = function(model) {

		if (!$scope.profilesList.length) {
			$scope.message = "Profile creation error. Please check internet/wifi connection and try again.";			
			return;
		}
	
		//Keep Next button/flag disable until DB post process is complete
		$scope.bEnable = false; 
		
        model.occupation = model.occupation.type;
		
		//build a template place holder for profileMedian data type
        model.profileMedian = {"name":"","id":"","Attention":"","WorkingMemory":"","Impulsivity":"","MentalFlexibility":""};
		
        for (var i = 0; i < $scope.profilesList.length; ++i) {
            ////find a matching median profile by comparing on ageGroup,occupation,stream,cityType
			//// stream field is optional as in case of Retired or Housewife hence
			////not included in the if statements below - $scope.profilesList[i].stream == model.stream 
            if ($scope.profilesList[i].ageGroup == model.ageGroup && $scope.profilesList[i].occupation == model.occupation && $scope.profilesList[i].stream == model.stream && $scope.profilesList[i].cityType == model.cityType) {
				model.profileMedian.name = $scope.profilesList[i].name;
				model.profileMedian.id = $scope.profilesList[i]._id;
				model.profileMedian.Attention = $scope.profilesList[i].Attention;
				model.profileMedian.WorkingMemory = $scope.profilesList[i].WorkingMemory;
				model.profileMedian.Impulsivity = $scope.profilesList[i].Impulsivity;
				model.profileMedian.MentalFlexibility = $scope.profilesList[i].MentalFlexibility;
				break; // break out now
            } 
		}
        //$scope.message = model;
		
		model.progress = [];
		model.tasks = [];
		
		var allTasks;
		var allProfiles;
		var tmp
		//get relevant tasks for this profile
		dataFactory.getAllTasks().then(function (res){
			allTasks = res;
			
			for (var i=0; i < allTasks.length; ++i) {
				for( var j=0; j< allTasks[i].profiles.length;++j) {
					if ( allTasks[i].profiles[j].name == model.profileMedian.name ){
						model.tasks.push(allTasks[i]);
					}
				}
			}
			
			dataFactory.insertNewAssessee(model).then(function (res) {
				
				//check if we have a duplicate mail-id
				if (res.code == "11000") {
					alert("Error: This email/record already exists. Choose another one.");
					$window.location.href = '/index.html';
				}else {
					$scope.userDetails = res;
					$scope.fname = res.fname;
					$scope.assesseeId = res._id; //not used currently
					$scope.message1 = "New Assessee details successfully posted to server  ";// + res.data;
					GetQuestions(model.profileMedian.name,model.profileMedian.id);
					}
			}, function(res){
				//error
				$scope.questions = res;
			});
		
			
			}, function(res){
				//error
				$scope.message = "Error retieving tasks. check internet/wi-fi connection and rety later.";
		});
	
		//retrieve all the relevant Questions for this profile
		///api/cars?filter[where][carClass]=fullsize
		////GET /users?name=rob&email=rob@email.com
		
		
		//Right now all the questions are retrieved and then processed on the client side...
		//ideally write REST API to support where clause to return only the specific matching profilesMedian...
		
	
	}
	//called from Async dataFactory.insertNewAssessee
	function GetQuestions(profileName,id) {

		dataFactory.getAllQuestions().then(function (res){
			$scope.questionsList = res;
			$scope.InitQuestions();
			//after succes retrive of questions enable the Next button and the next screen with Questions
			//enbale the next button on UI only after an successfull post.
			$scope.bEnable = true;
			$scope.bAssesseDetails = "questions";
			//$scope.bQuestions = true;
		}, function(res){
			//error
			$scope.questionsList = res;
		});
}


	$scope.InitQuestions = function(){
		$scope.qSlNo = "Question 1 :";
        $scope.qIndex = 0;
		//alert("Questions List length : " + $scope.questionsList.length);
		$scope.qText = $scope.questionsList[$scope.qIndex].qText;
	}
	
    $scope.SubmitQuestions = function (qResponse) {
        optionKey = qResponse.reply;
        
        score = $scope.questionsList[$scope.qIndex][optionKey];

        if ($scope.questionsList[$scope.qIndex].domain == "Attention") {
            $scope.attention = $scope.attention + score;
        }

        if ($scope.questionsList[$scope.qIndex].domain == "WorkingMemory") {
            $scope.workingMemory = $scope.workingMemory + score;
        }
        if ($scope.questionsList[$scope.qIndex].domain == "Impulsivity") {
            $scope.impulsivity = $scope.impulsivity + score;
        }

        if ($scope.questionsList[$scope.qIndex].domain == "MentalFlexibility") {
            $scope.mentalFlexibility = $scope.mentalFlexibility + score;
        }

        /*$scope.survey = {
            'username': '',//res.userName,
            'age': '', //res.age,
            'created' :'',//assigned just after completing all the Qs and just before saving to storage
            'Attention': $scope.attention,
            'WorkingMemory':$scope.workingMemory,
            'Impulsivity':$scope.Impulsivity,
            'MentalFlexibility': $scope.mentalFlexibility,
            'Total' : $scope.attention + $scope.workingMemory+$scope.Impulsivity+$scope.mentalFlexibility   
        };*/
		
		
        $scope.qIndex = $scope.qIndex + 1;

        if ($scope.qIndex >= $scope.questionsList.length) {
            $scope.qText = "Thank you for completing the assessment";
            $scope.b_show = false;
		
			var strDate = Date();
			/*var day = strDate.getDay();
			var month = strDate.getMonth();
			var year = strDate.getYear();
			
			strDate = day + "/" + month + "/" + year;
			*/
				//	0:{Attention:22,WorkingMemory:10,Implusivity:10,MentalFlexibility:19, date:"" }
			$scope.progress = {	
						"Attention":$scope.attention,
						"WorkingMemory":$scope.workingMemory,
						"Impulsivity":$scope.impulsivity,
						"MentalFlexibility":$scope.mentalFlexibility,
						"Date":strDate
				};	
			$scope.userDetails.progress.push($scope.progress);
			
			
			//'newAssessee' is passed on dataFactory param for local Storage indication 
			//that it is a new record
			//also when passed as 'updateAssessee' a bulkUpdate is to be called rather 
			//than bulkInsertAssessees
			//"newAssessee";
			dataFactory.updateAssessee($scope.userDetails.email, $scope.userDetails, $scope.strOperation).then(function (res) {
				$scope.message = "Your assessement details successfully posted to server  " ;//+ res.data;
				//writeLocalStorageJson("currentUser",res);
				//writeLocalStorageJson("scores", res.progress);
		
				//now navigate to home page
				$window.location.href = '/index.html';
			}, function(err){
				//error
				$scope.questions = err;
				$scope.message = "Error while posting assessement details, please check your internet / wi-fi connection and retry." ;//+ err.error;
			});
	
	
        }
        else {
            $scope.qSlNo = "Question " + $scope.qIndex + ":";
            $scope.qText = $scope.questionsList[$scope.qIndex].qText;
        }
    }
});

function AnalyseScores (attention,workingMemory,impulsivity,mentalFlexibility) {

	var str = "Analysis :";

	/*	Attention RANGE OF SCORES	
		NO DEFICIT	0 TO 7
		BORDERLINE	8 TO 13
		MILD	14 TO 30
		MODERATE	31 TO 61
		SEVERE	>61
*/
	
	str = str + "[Attention (" + attention + ")";

	if (attention >= 61)
		str = str + ": Severe] ";
	if ((attention < 61) && (attention >= 31))
		str = str +  ": Moderate] ";
	if ((attention < 31) && (attention >= 14))
		str = str +  ": Mild";
	if ((attention < 14) && (attention >= 8))
		str = str +  ": Borderline] ";
	if ((attention < 8) && (attention >= 0))
		str = str +  ": No Deficit] ";
		
/*Working Memory	RANGE OF SCORES	
NO DEFICIT	0 TO 7
BORDERLINE	8 TO 17
MILD	18 TO 31
MODERATE	32 TO 46
SEVERE	>46
*/	
	str = str + " [Working Memory(" + workingMemory + ")";

	if (workingMemory >= 46)
		str = str + ": Severe] ";
	if ((workingMemory < 46) && (workingMemory >= 32))
		str = str +  ": Moderate] ";
	if ((workingMemory < 32) && (workingMemory >= 18))
		str = str +  ": Mild";
	if ((workingMemory < 18) && (workingMemory >= 8))
		str = str +  ": Borderline ]";
	if ((workingMemory < 8) && (workingMemory >= 0))
		str = str +  ": No Deficit] ";
		
/*
IMPULSIVITY RANGE OF SCORES	
NO DEFICIT	0 TO 5
BORDERLINE	6 TO 13
MILD	14 TO 24
MODERATE	25 TO 41
SEVERE	>41
*/		
	str = str + " [Impulsivity(" + impulsivity + ")";

	if (impulsivity >= 41)
		str = str + ": Severe] ";
	if ((impulsivity < 41) && (impulsivity >= 25))
		str = str +  ": Moderate] ";
	if ((impulsivity < 25) && (impulsivity >= 14))
		str = str +  ": Mild] ";
	if ((impulsivity < 14) && (impulsivity >= 6))
		str = str +  ": Borderline] ";
	if ((impulsivity < 6) && (impulsivity >= 0))
		str = str +  ": No Deficit] ";

/*
MENTAL FLEXIBILITY RANGE OF SCORES	
NO DEFICIT	0 TO 5
BORDERLINE	6 TO 11
MILD	12 TO 24
MODERATE	25 TO 44
SEVERE	>44

*/	

	str = str + " [Mental Flexibility (" + mentalFlexibility + ")";

	if (mentalFlexibility >= 44)
		str = str + ": Severe] ";
	if ((mentalFlexibility < 44) && (mentalFlexibility >= 25))
		str = str +  ": Moderate] ";
	if ((mentalFlexibility < 25) && (mentalFlexibility >= 12))
		str = str +  ": Mild] ";
	if ((mentalFlexibility < 12) && (mentalFlexibility >= 6))
		str = str +  ": Borderline] ";
	if ((mentalFlexibility < 6) && (mentalFlexibility >= 0))
		str = str +  ": No Deficit] ";

	
	return str;
}

rootApp.controller('ctrlContact', function ($scope) {
    $scope.message = 'Hello from Contact Controller';
});

rootApp.controller('ctrlRetrieveUser', function ($scope) {
    console.log("Inside ng.js :: In ctrlRetrieveUser Controller");

    $scope.Retrieve = function (model) {
        console.log("Inside ng.js :: Calling Register () in ctrlAssesment Controller");
        $scope.status = "fetching user deatils...please wait";
        //alert('Submitted\n' + JSON.stringify(model));
    };
});

//task Controller
rootApp.controller('ctrlSmiley', function ($scope,$routeParams,dataFactory) {
	//var d = Date();
	var startTime; //= Date.getTime();
	var attempt = {
					date: "",
					duration:"",	
					hits:"",
					misses:""
	};
	
    $scope.message = "Hello from ctrlSmiley";
    $scope.hits = 0;
    $scope.misses = 0;

    $scope.display = function() {
     
        var randomImg = Math.round(Math.random());
        var randomh_align = Math.round(Math.random());
        var randomv_align = Math.round(Math.random());

        if (randomImg == 0) {
            $scope.imageName = "smiley.jpg";
        }
        else {
            $scope.imageName = "heart.jpg";
        }

        if (randomh_align == 0) {
            $scope.h_align = "left";
        } else {
            $scope.h_align = "right";
        }

        if (randomv_align == 0) {
            $scope.v_align = "top";
        } else {
            $scope.v_align = "bottom";
        }
        $scope.status = "Image Name : " + $scope.imageName + " hAlign : " + $scope.h_align + " vAlign : " + $scope.v_align;
    }
	
    $scope.KeyDownF = function (keyCode) {
		startTime = Date();
		
		if (keyCode == 39){
            //$scope.message = "right arrow";
            
            if (($scope.imageName == "smiley.jpg") && ($scope.h_align == "right")) {
                $scope.hits = $scope.hits + 1;
            } else {
				if (($scope.imageName == "heart.jpg") && ($scope.h_align == "left")) {
					$scope.hits = $scope.hits + 1;
				} else {
					$scope.misses = $scope.misses + 1;
				}            
			}


            
            $scope.display();
        }
      
		if (keyCode == 37) {
            //$scope.message = "left arrow pressed"

            if (($scope.imageName == "smiley.jpg") && ($scope.h_align == "left" )) {
				$scope.hits = $scope.hits + 1;
			} else {
				if (($scope.imageName == "heart.jpg") && ($scope.h_align == "right" )){
					$scope.hits = $scope.hits + 1;
				} else {
					$scope.misses = $scope.misses + 1;
				}
			}


            $scope.display();

        }
		
    };
	$scope.taskExit = function() {
		//save the results 
		var endTime = Date();
		
		attempt = {
					date:startTime,
					duration: (endTime - startTime) /1000, //store elasped time minutes 
					hits:$scope.hits,
					misses:$scope.misses
				};
	
		updateTasksScores($routeParams.taskname, attempt, dataFactory);
	
		/*
		$scope.userDetails = {};
		//didn't work using global variable
		//$scope.user = $rootScope.currentUser;
		$scope.userDetails = readLocalStorageJson("currentUser");
		$scope.userName = $scope.userDetails[0].name;
		$scope.userId = $scope.userDetails[0]._id;
		$scope.tasks = $scope.userDetails[0].tasks;
		
		$scope.taskName = "Smiley Heart Level 1"; //this is hardcoded
		
		for (var i=0; i < $scope.tasks.length;++i) {
			if ( $scope.tasks[i].name == $scope.taskName){
				$scope.tasks[i].scores.push(attempt);
				break;
			}
		}			
		
		//update the database
		//instead of sending all the userdata, send only his _Id, tasks/task_iD, /tasks/task_score 
		dataFactory.updateAssessee($scope.userId, $scope.userDetails[0], "updateAssessee").then(function (res) {
			$scope.message = "Smiley Heart details of Task update successful";
			
			//now update the local storage
			writeLocalStorageJson("currentUser",res);
		}, function(res){
			
		});

		*/

				
	}	
});


//ctrlBlackSquares
rootApp.controller('ctrlBlackSquares', function ($scope) {
    console.log("Inside ng.js :: In ctrlBlackSquares Controller");
    $scope.message = "In ctrlBlackSquares Controller";
    $scope.nextScreen = 0;
    $scope.b_ShowTable = false;

    $scope.arrInstructions = InitBlackSquares();
    $scope.message = $scope.arrInstructions[0];

    $scope.Next = function () {
        $scope.b_ShowTable = false;

        $scope.message = $scope.arrInstructions[$scope.nextScreen];

        if ($scope.nextScreen == 3) {
            $scope.b_ShowTable = true;
            $scope.imageName = "table0.jpg"
        }
        if ($scope.nextScreen == 9) {
            $scope.b_ShowTable = true;
            $scope.imageName = "table1.jpg"
        }
       if ($scope.nextScreen == $scope.arrInstructions.length) {
			
			$scope.b_ShowTable = true;
            $scope.imageName = "table2.jpg"
       
            $scope.nextScreen = 0;
            $scope.message = "Did you get it right? Click to start again.";
        }

        /*if ($scope.nextScreen == 13) {
            $scope.b_ShowTable = true;
            $scope.imageName = "table2.jpg"
        }*/
		
		$scope.nextScreen = $scope.nextScreen + 1;

    }
});

rootApp.controller('ctrlSquares', function ($scope, $routeParams,dataFactory) {

	//
	//read the squares app parameters LoadSquaresAppData() --> InitAppData
	//read the tasks allocated to the users
	//determine the task level invoked and match the corresponding Sq app data level
	//Initialise the Array object to represent 1s and 0s for the table to be displayed
	//track the result relevant to the task level and store it in users data struct
	//

//task level functionality 
//	I	Report the number of white squares on previous slide - number of squares =3 max
//	II	Report the number of white squares on previous slide (increase the number of squares) 5 max 
//	III	Add number of white squares of present slide with previous slide -- number of squares = 3 max
//	IV	Add number of white squares of present slide with previous slide ((increase the number of squares)
//	V	Add all white squares on first slide and subtract it from total of slides form next slide

	$scope.message = "";
	$scope.clicks = 0;
	$scope.current_Result = 0;
	$scope.prev_Result = 0;
	$scope.prev_prev_Result = 0;
	$scope.calcResult = 0;
	$scope.ScreenTimeOut = 20;
	$scope.right = 0;
	$scope.wrong = 0;
	$scope.startTime = 0;
 	$scope.startTime = Date();
	$scope.right = 0;
	$scope.wrong = 0;
	var attempt = {
					date: "",
					duration:"",	
					right:"",
					wrong:"",
					screens:""
				};
	
	
	$scope.Init = function() {
		//capture when this was activated
		$scope.startTime = Date();
	
		$scope.hideAnswer = true;
		$scope.disableBtn = false;
		$scope.userInput = "";
			
		$scope.current_Result = 0;
		$scope.prev_Result = 0;
		$scope.prev_prev_Result = 0;

		//set how many times a square screen must be presented before user input is accepted for validation
		//$scope.ScreenTimeOut = $scope.taskLevel.ScreenTimeOut;
		//reset the screen count
		$scope.clicks = 0;

		$scope.SquareAppData = LoadSquaresAppData();

		//check if the task desired is supported well within the Square App
		//else set to maximum level
		//routeParams.level is reduced by 1 to arrive at Array based '0' index 
		if (( $routeParams.level - 1) < $scope.SquareAppData.Levels.length) 
			//initial level when first time draw//set g_taskLevel 
			$scope.taskLevel = $scope.SquareAppData.Levels[$routeParams.level - 1];
		else
			$scope.taskLevel = $scope.SquareAppData.Levels[$scope.SquareAppData.Levels.length -1];
		
		$scope.row_clrs = $scope.taskLevel.Table["row_clr"];
		$scope.userDetails = {};
		$scope.userDetails = readLocalStorageJson("currentUser");
		$scope.userName = $scope.userDetails[0].name;
		$scope.userId = $scope.userDetails[0]._id;
		$scope.tasks = $scope.userDetails[0].tasks;
		$scope.taskName = $routeParams.taskname;
	
		for (var i=0;i<$scope.tasks.length; ++i) {
			if ($scope.tasks[i].name == $routeParams.taskname) {
				//setDifficultyLevel($scope.tasks[i].level -1);
				$scope.taskLevel = $scope.SquareAppData.Levels[$scope.tasks[i].level -1];
				$scope.array_Table = InitArrayObject($scope.taskLevel);
				$scope.taskInstructions = $scope.tasks[i].description;
				break;
			}
		}

		$scope.trackResult($scope.array_Table);
	
	}
	
	/*function setDifficultyLevel(item) {

		if (item > $scope.AppData.Levels) {
			//set item = to maximum level
			item = $scope.AppData.Levels.length();
		}
		
		$scope.taskLevel = $scope.AppData.Levels[item];

		$scope.array_Table = InitArrayObject($scope.taskLevel);
			
		$scope.current_Result = 0;
		$scope.prev_Result = 0;
		$scope.prev_prev_Result = 0;

		//set how many times a square screen must be presented before user input is accepted for validation
		$scope.ScreenTimeOut = $scope.taskLevel.ScreenTimeOut;
		//reset the screen count
		$scope.clicks = 0;

		$scope.trackResult($scope.array_Table);
	}*/

	
			
	$scope.Draw = function () {
		//hide the answer
		$scope.hideAnswer = true;
		$scope.disableBtn = false;
		$scope.userInput = "";
		
		//track number of times the user has clicked the screen
		$scope.clicks++;
		
		//this sets an array object with radominised 0s and 1 for the given task difficulty level
		$scope.array_Table = InitArrayObject($scope.taskLevel); 
		
		//$scope.message = $scope.array_Table;
		
		$scope.trackResult($scope.array_Table);

		if ($scope.clicks == $scope.ScreenTimeOut) {
			//alert("REached maximum user clciks");
			model.bVisible = true;
		}

	}


	//define
	$scope.trackResult = function (table) {
		
		switch ($routeParams.level) {
			case "1":
				//count the number of Squares in the middle row
				addSquaresinMiddleRow(table);
				break;
			case "2":
				//count the number of Squares in the middle row
				addSquaresinMiddleRow(table);
				break;
			case "3":
			//Add number of white squares of present slide with previous slide
				addSquaresinMiddleRow_N1(table);			
				break;
			case "4":
			//Add number of white squares of present slide with previous slide
				addSquaresinMiddleRow_N1(table);			
				break;
			case "5":
			//n-2 slides
			//Add all white squates on first slide, prev and prev to prev slide 
				addSquaresinMiddleRow_N1(table);			
				break;
			case "6":
			//Add all white squates on first slide and subtract it 
			//from total of slides form next slide
				//callLevel-5-Track();
				break;
				
		}
	}
	
	function addSquaresinMiddleRow(arr) {
		//check the array length if odd so that we can pick the middle row containing the squares
		//once middle row is determined, find the occurences of "1" as this represent each square in our logic
		//sum of such occurences of "1" gives the result

		var screen_sum = 0;

		if (arr.length % 2 == 0) {
			console.log("Error: In CountSquaresJS: Array Table has even number of rows!");
		} else {
			//array table is odd, lets begin
			var middelStr = arr[Math.floor(arr.length / 2)];
			//var middelStr = arr[middleRow];
			//var sum = middelStr.match(/1/g).length;
			for (var i = 0; middelStr.length > i; i++) {
				if (middelStr.charAt(i) == '1') {
					++screen_sum;
				}
			}
		}
		$scope.calcResult = screen_sum;
	}

	
	function addSquaresinMiddleRow_N1(table) {
		// get sum of the current screen; store it in calcResult
		addSquaresinMiddleRow(table);
		
		//3,4,2,1,4
		var screen_sum = 0;

				if ($scope.current_Result == 0) {
					$scope.current_Result = $scope.calcResult;
					//prev_Result = ;
				} else {
					$scope.prev_prev_Result = $scope.prev_Result;
					$scope.prev_Result = $scope.current_Result;
					$scope.current_Result = $scope.prev_Result + screen_sum;
					$scope.prev_Result = screen_suev_Result = $scope.prev_Result;
					$scope.prev_Result = $scope.current_Result;
					$scope.current_Result = $scope.calcResult;


				}
				var curr = +$scope.current_Result;
				var pre = +$scope.prev_Result;

				$scope.calcResult = curr + pre;

				//$scope.message = ("Sum : " + $scope.calcResult + " Current Number = " + $scope.current_Result + "," + " Previous Number = " + $scope.prev_Result + " Screens = " + $scope.clicks);
	}
		

			
	$scope.checkAnswer =  function() {		
		$scope.disableBtn = true;
		$scope.hideAnswer = false;
		
		//store these result in localStorage as when user refreshes the page result will be destroyed
		if ($scope.calcResult == $scope.userInput) {
			$scope.right++;
		} else {
			$scope.wrong++;// += 1;
		}
	
		$scope.message = $scope.calcResult;
		
		/*if ($routeParams.level == "1" || $routeParams.level == "2")
			$scope.message = $scope.calcResult;// + "Hits : " + $scope.right + "   Misses : " + $scope.wrong; 
		else
			if ($routeParams.level == "3" || $routeParams.level == "4")
				//$scope.message = ("Sum : " + $scope.calcResult + " Current Number = " + $scope.current_Result + "," + " Previous Number = " + $scope.prev_Result + " Screens = " + $scope.clicks);
				$scope.message = $scope.calcResult;
				*/
	}
			
	$scope.taskExit = function() {
		var endTime = Date();

		attempt = {
					date: $scope.startTime,
					duration: (endTime - $scope.startTime) /1000, //store elasped time minutes 
					right: $scope.right,
					wrong: $scope.wrong,
					screens: $scope.clicks //no of screens a user has seen
				};
	
		//record this score for this task 
		//find out who the user is? 
		//find out all the particular task being performed by this user
		// at the end of this task, determine the score and store it 
		
		var userDetails = {};
		var tasks;
		
		userDetails = readLocalStorageJson("currentUser");
		
		if (userDetails.length == 0)
			return;
		
	
		userDetails = userDetails[0];
		//userEmail = userDetails.email;
		tasks = userDetails.tasks;
	
	
		for (var i=0; i < tasks.length;++i) {
			if ( tasks[i].name == $routeParams.taskname){
				tasks[i].scores.push(attempt);
			break;
			}
		}			
		
		//now update the local storage
		//writeLocalStorageJson("currentUser",userDetails);

		//update the database
		//instead of sending all the userdata, send only his _Id, tasks/task_iD, /tasks/task_score 
		dataFactory.updateAssessee(userDetails.email, userDetails, "updateAssessee").then(function (success) {
				
		}, function(failure){
			
		});

				
	}
});

function updateTasksScores(taskName, score, dataFactory){
}
