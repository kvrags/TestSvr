// build the router
var rootApp = angular.module('neuroApp', ['ngRoute']);

rootApp.run(function ($rootScope) {
    $rootScope.UserName = 'Test User';
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
    .when('/squares', {
        templateUrl: './partials/squares.html',
        controller: 'ctrlSquares'
    })
    .when('/squaresblack', {
        templateUrl: './partials/squaresblack.html',
        controller: 'ctrlBlackSquares'
    })
    .when('/smiley', {
        templateUrl: './partials/smiley.html',
        controller: 'ctrlSmiley'
    }) 
    .when('/cnntShapes', {
        templateUrl: './partials/connetShapes.html',
        controller: 'ctrlConnectShapes'
    })
    .otherwise({ redirectTo: '/index.html' });
});


rootApp.controller('ctrlHome', function ($scope) {
    $scope.message = 'Hello from ctrlHome HomeController';

    $scope.status = "status message init from HomeController.. ";
       
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


// Profies

rootApp.controller('ctrlProfiles', function ($scope,$http) {
    $scope.message = "Please fill in the above fields";

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

    //profile Model
    /*
    Model
    {
        name:String,
        ageGrou":String,
        occupation:String,
        stream:String,
        cityType:String,
    }
    //example
    {
        "name":"Student_CBSE_Rural",
        "ageGroup":"6to16",
        "occupation":"Student",
        "stream":"CBSE",
        "cityType":"rural",
        "ID":1505661846259
    }*/

    $scope.createProfile = function (model) {
        $scope.id = model.ID = Date.now();
        model.occupation = model.occupation.type;
        //$scope.message = model;
        //$scope.model = {};
        //writeLocalStorageJson("profile", $scope.model, true);

        $http.post("http://localhost:8080/profiles", model)
        .then(function (res) {
            $scope.model = {}; // clear the form so our user is ready to enter another
            $scope.message = "Successfully Posted";
            alert("Success posted new profile!" );

        }, function (res) {
            alert("Error while posting new profiles:" + res.error);
            $scope.message = "Error:" + res.error;
        });
    }
});


//manage profiles median score for various cognitive domains
rootApp.controller('ctrlprofilesMedian', function ($scope,$http) {
    $scope.message = 'Hello from ctrlprofilesMedian Controller11';
    $scope.profilesMaster = {};
    $scope.profiles = {};
    //$scope.profileMedianMaster = {};
    $scope.profileMedian = [];

    //retrieve all the profiles record
    $http.get("http://localhost:8080/profiles")
    .then(function (res) {
        $scope.profilesMaster = res.data;
        }, function (res) {
            //failure callback
            $scope.message = res.data;
    });


    $scope.fetchProfiles = function (model) {
        //$scope.profilesMaster = readLocalStorageJson("profile");
        $scope.profiles = [];
        for (var i = 0; i < $scope.profilesMaster.length; ++i) {
            if ($scope.profilesMaster[i].occupation == model.occupation) {
                $scope.profiles.push($scope.profilesMaster[i]);
            }
        }
    }
    //read operation
    $scope.fetchProfileMedianFromRowID = function (rowID,profileName) {
        //alert("selected row:" + rowID);

        //save rowID and profileName to be used to write back later
        $scope.rowID = rowID;
        $scope.profileName = profileName;

        //$scope.profileMedianMaster = readLocalStorageJson("PrfMedian"+profileName);
        //$scope.profileMedian = [];

        //if ($scope.profileMedianMaster)
          //  $scope.profileMedian = $scope.profileMedianMaster[rowID];
        //Names = sample.map(function (item) { return item.Name; });

        $scope.profileMedian = readLocalStorageJson("PrfMedian-" + profileName);

        if ($scope.profileMedian.length > 0) { //check if we have median array available
            $scope.model.attention = getItemByKey("Attention",$scope.profileMedian);//$scope.profileMedian.Attention;
            $scope.model.workingMemory = getItemByKey("WorkingMemory",$scope.profileMedian) ; 
            $scope.model.impulsivity = getItemByKey("Impulsivity",$scope.profileMedian) ; 
            $scope.model.mentalFlexibility = getItemByKey("MentalFlexibility", $scope.profileMedian);
        } else {
            $scope.model.attention = 0;
            $scope.model.workingMemory = 0;
            $scope.model.impulsivity = 0;
            $scope.model.mentalFlexibility = 0;

        }
    }
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


    //write median using the rowID selected from operation fetchProfileMedianFromRowID
    $scope.submitMedian = function (model) {

        if ($scope.rowID >= 0) {
            $scope.profileMedian = {};
            $scope.profileMedian.Attention = model.attention;
            $scope.profileMedian.WorkingMemory = model.workingMemory;
            $scope.profileMedian.Impulsivity = model.impulsivity;
            $scope.profileMedian.MentalFlexibility = model.mentalFlexibility;

            //writeLocalStorageJson("PrfMedian-" + $scope.profileName, $scope.profileMedian,false);


        }
    }

});

//admin adminSurvey
rootApp.controller('ctrladminSurvey', function ($scope,$http) {

/*    //readin from file when hosted on a server
    $http.get('./assets/survey.json')
        .then(function (res) {
            $scope.survey = res.data;
        });
  */      

    $scope.message = {};// = 'Hello from ctrladminSurvey';

    $scope.survey = {};
        
    $scope.survey = readLocalStorageJson("survey");
    

});

rootApp.controller('ctrladminQuestions', function ($scope, $http) {
    $scope.question = [];
    //set the default values for the options
    $scope.Never = 0;
    $scope.Rarely = 1;
    $scope.Sometimes = 2;
    $scope.MostOften = 3;
    $scope.Always = 4;

    $scope.selectMode = function (mode){
        if (mode == "create"){
            $scope.selectQ = false;
        } else {
            $scope.selectQ = true;
            //$scope.questions = readLocalStorageJson("question");


            $http.get('http://localhost:8080/questions')
                .then(function (res) {
                    $scope.questions = res.data;
                },
                function (res) {
                    //failure callback
                    $scope.questions = res.data
                });

        }
    }

    $scope.createQuestion = function (model) {
        $scope.question = {
            'domain': model.domain,
            'qText': model.qText,
            'Never': $scope.Never, 
            'Rarely': $scope.Rarely, //model.Rarely,
            'Sometimes': $scope.Sometimes,//model.Sometimes ,
            'MostOften': $scope.MostOften,//model.MostOften ,
            'Always': $scope.Always //model.Always
        };

        //$scope.message = $scope.question;
        //writeLocalStorageJson("question", $scope.question,true);
        
        $http.post("http://localhost:8080/questions", $scope.question)
        .then (function (res){
            $scope.question = {}; // clear the form so our user is ready to enter another
            $scope.message = "Successfully Posted";
        }, function (res){
            $scope.message = "Error:" + res.error;
        });
    }
});

//rootApp.controller('ctrlAssesment', ['$scope', '$rootScope', function ($scope, $rootScope) {

rootApp.controller('ctrlAssesment', function ($scope) {
    $scope.message = Date();//'Hello World from Assesment Controller1';
    $scope.qIndex = 0;
    $scope.survey = [];
    $scope.final = []; // place holder to display final assesment scores
    $scope.attention = 0;
    $scope.workingMemory = 0;
    $scope.implusivity = 0;
    $scope.mentalFlexibility = 0;


    $scope.Init = function () {
        $scope.qSlNo = "Question 1 :";
        $scope.qIndex = 1;
        $scope.b_show = true;

        
        //read all the Qs from the storage
        $scope.assessmentQs = readLocalStorageJson("question");
        $scope.qText = $scope.assessmentQs[0].qText;

        $scope.survey = $scope.assessmentQs[0];

    }

    var optionKey = '';
    var score = 0;

    $scope.Submit = function (res) {
        optionKey = res.reply;
        
        score = $scope.assessmentQs[$scope.qIndex][optionKey];

        if ($scope.assessmentQs[$scope.qIndex].domain == "Attention") {
            $scope.attention = $scope.attention + score;
        }

        if ($scope.assessmentQs[$scope.qIndex].domain == "WorkingMemory") {
            $scope.workingMemory = $scope.workingMemory + score;
        }
        if ($scope.assessmentQs[$scope.qIndex].domain == "Implusivity") {
            $scope.implusivity = $scope.implusivity + score;
        }

        if ($scope.assessmentQs[$scope.qIndex].domain == "MentalFlexibility") {
            $scope.mentalFlexibility = $scope.mentalFlexibility + score;
        }

        $scope.survey = {
            'username': '',//res.userName,
            'age': '', //res.age,
            'created' :'',//assigned just after completing all the Qs and just before saving to storage
            'Attention': $scope.attention,
            'WorkingMemory':$scope.workingMemory,
            'Implusivity':$scope.implusivity,
            'MentalFlexibility': $scope.mentalFlexibility,
            'Total' : $scope.attention + $scope.workingMemory+$scope.implusivity+$scope.mentalFlexibility   
        };

        $scope.qIndex = $scope.qIndex + 1;

        if ($scope.qIndex >= $scope.assessmentQs.length) {
            $scope.qText = "Thank you for completing the assessment";
            $scope.b_show = false;

            $scope.survey.username = res.userName;
            $scope.survey.age = res.age;
            $scope.survey.created = Date(); //now().getTime().toUTCString();
            $scope.final = $scope.survey; //display the results to the user
            writeLocalStorageJson("survey", $scope.survey,true);

        }
        else {
            $scope.qSlNo = "Question " + $scope.qIndex + ":";
            $scope.qText = $scope.assessmentQs[$scope.qIndex].qText;
        }
    }
});

function readLocalStorageJson(key) {

    var arrJson = [];
    for (var i = 0, len = localStorage.length; i < len; ++i) {
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


rootApp.controller('ctrlSmiley', function ($scope) {
    $scope.message = "Hello from ctrlSmiley";
    $scope.hits = 0;
    $scope.missess = 0;

    display();

    function display() {
     
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
        //alert("in keydown()");

        if (keyCode == 38)
            $scope.message = "up arrow pressed";
        else if (keyCode == 39){
            $scope.message = "right arrow";
            
            if (($scope.imageName == "smiley.jpg") && ($scope.h_align == "right")) {
                $scope.hits = $scope.hits + 1;
            } else {
                $scope.missess = $scope.missess +1;
            }


            if (($scope.imageName == "heart.jpg") && ($scope.h_align == "left")) {
                $scope.hits = $scope.hits + 1;
            } else {
                $scope.missess = $scope.missess + 1;

            }


                display();
        }
        else if (keyCode == 40)
            $scope.message = "down arrow";
        else if (keyCode == 37) {
            $scope.message = "left arrow pressed"

            if (($scope.imageName == "smiley.jpg") && ($scope.h_align == "left" ))
            $scope.hits = $scope.hits + 1;

            if (($scope.imageName == "heart.jpg") && ($scope.h_align == "right" ))
            $scope.hits = $scope.hits + 1;

            display();

        }
    };
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
        $scope.nextScreen = $scope.nextScreen + 1;

        if ($scope.nextScreen == $scope.arrInstructions.length) {
            $scope.nextScreen = 0;
            $scope.message = "Starting again... click to continue";
        }

        if ($scope.nextScreen == 3) {
            //alert("going into 3 screen...display table herer.")
            $scope.b_ShowTable = true;
            $scope.imageName = "table0.jpg"

        }
        if ($scope.nextScreen == 9) {
            //alert("going into  screen...display table herer.")
            $scope.b_ShowTable = true;
            $scope.imageName = "table1.jpg"

        }
        if ($scope.nextScreen == 13) {
            //alert("going into  screen...display table herer.")
            $scope.b_ShowTable = true;
            $scope.imageName = "table1.jpg"

        }
    }
});

rootApp.controller('ctrlSquares', function ($scope) {
            $scope.message = "";
            $scope.clicks = -1;
            $scope.AppData = InitAppData();
            $scope.taskLevel = $scope.AppData.Levels[0]; //initial level when first time draw//set g_taskLevel ...use a switch in the UI to set a Task Difficulty Level
            $scope.row_clrs = $scope.taskLevel.Table["row_clr"];
            $scope.current_Result = 0;
            $scope.prev_Result = 0;
            $scope.prev_prev_Result = 0;
            $scope.calcResult = 0;
            $scope.ScreenTimeOut = 20;

            console.log("Inside ng.js :: in ctrlSquares Controller");
             
            $scope.setDifficultyLevel = function (item) {

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


            }
            $scope.Draw = function (model) {
                $scope.clicks = $scope.clicks + 1;
                $scope.array_Table = InitArrayObject($scope.taskLevel); //this sets an array object with radominised 0s and 1 for the given task difficulty level
                $scope.trackResult($scope.array_Table);

                if ($scope.clicks == $scope.ScreenTimeOut) {
                    //alert("REached maximum user clciks");
                    model.bVisible = true;
                }

            }


            //define
            $scope.trackResult = function (arr) {
                console.log("In ngJS: cntrlSquare :: TrackResult()");
                //check the array length if odd so that we can pick the middle row containing the squares
                //once middle row is determined, find the occurences of "1" as this represent each square in our logic
                //sum of such occurences of "1" gives the result

                if (arr.length % 2 == 0) {
                    console.log("Error: In CountSquaresJS: Array Table has even number of rows!");
                } else {
                    //array table is odd, lets begin
                    var middelStr = arr[Math.floor(arr.length / 2)];
                    //var middelStr = arr[middleRow];
                    //var sum = middelStr.match(/1/g).length;
                    var screen_sum = 0;
                    for (var i = 0; middelStr.length > i; i++) {
                        if (middelStr.charAt(i) == '1') {
                            ++screen_sum;
                        }
                    }
                    //3,4,2,1,4
                    if ($scope.current_Result == 0) {
                        $scope.current_Result = screen_sum;
                        //prev_Result = ;
                    } else {
                        /*$scope.prev_prev_Result = $scope.prev_Result;
                        $scope.prev_Result = $scope.current_Result;
                        $scope.current_Result = $scope.prev_Result + screen_sum;
                        $scope.prev_Result = screen_sum;*/

                        $scope.prev_prev_Result = $scope.prev_Result;
                        $scope.prev_Result = $scope.current_Result;
                        $scope.current_Result = screen_sum;


                    }
                    var curr = +$scope.current_Result;
                    var pre = +$scope.prev_Result;

                    $scope.calcResult = curr + pre;

                    $scope.message = ("Sum : " + $scope.calcResult + " Current Number = " + $scope.current_Result + "," + " Previous Number = " + $scope.prev_Result + " Screens = " + $scope.clicks);
                }
            }

});
