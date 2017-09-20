// build the router
var rootApp = angular.module('neuroApp', ['ngRoute']);

rootApp.run(function ($rootScope) {
    $rootScope.UserName = 'Test User';
});


rootApp.config(function ($routeProvider) {
    $routeProvider
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
    .when('/retrieveUser', {
        templateUrl: './partials/retrieveuserdetails.html',
        controller: 'ctrlRetrieveUser'
    })
    .when('/squares', {
        templateUrl: './partials/squares.html',
        controller: 'ctrlSquares'
    })
    
    .otherwise({ redirectTo: '/index.html' });
});


rootApp.controller('ctrlHome', function ($scope) {
    $scope.message = 'Hello from HomeController';
});

rootApp.controller('ctrlAbout', function ($scope) {
    $scope.message = 'Hello from AboutController';
});

rootApp.controller('ctrlAssesment', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.message = 'Hello World from Assesment Controller';

    console.log("Inside ng.js :: In ctrlAssesment Controller");
    $scope.status = "Please fill above details.";
       
    $scope.Register = function (model) {
        console.log("Inside ng.js :: Calling Register () in ctrlAssesment Controller");
        $scope.status = "Registration for Assessment submitted.";
        alert('Submitted\n' + JSON.stringify(model));

        $rootScope.UserName = model.name;
      //  alert('RootScope var name is '+ $rootScope.UserName);

        //Register the user details here


        //if successfull registration

    };
}]);


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

rootApp.controller('ctrlSquares', function ($scope) {
            $scope.message = "";
            $scope.clicks = 1;
            $scope.AppData = InitAppData();
            $scope.taskLevel = $scope.AppData.Levels[0]; //initial level when first time draw//set g_taskLevel ...use a switch in the UI to set a Task Difficulty Level
            $scope.row_clrs = $scope.taskLevel.Table["row_clr"];
            $scope.current_Result = 0;
            $scope.prev_Result = 0;
            $scope.prev_prev_Result = 0;
            $scope.calcResult = 0;

            console.log("Inside ng.js :: in ctrlSquares Controller");

            $scope.setDifficultyLevel = function (item) {

                if (item > $scope.AppData.Levels) {
                    //set item = to maximum level
                    item = $scop.AppData.Levels.length();
                }
                $scope.taskLevel = $scope.AppData.Levels[item];

                $scope.array_Table = InitArrayObject($scope.taskLevel);

                $scope.current_Result = 0;
                $scope.prev_Result = 0;
                $scope.prev_prev_Result = 0;

                $scope.trackResult($scope.array_Table);


            }
            $scope.Draw = function () {
                $scope.clicks = $scope.clicks + 1;
                $scope.array_Table = InitArrayObject($scope.taskLevel); //this sets an array object with radominised 0s and 1 for the given task difficulty level
                $scope.trackResult($scope.array_Table);

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
            //call

});
