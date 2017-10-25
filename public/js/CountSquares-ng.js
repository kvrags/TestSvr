
//Global Variables
var g_prev_Result = 0;
var g_current_Result = 0;
var g_tmp_Result;
var g_array_Table;
var g_repeat_Count = 0;
var g_taskLevel = 0;
var g_init = false;
var g_AppData = null;
//var g_AppData;

 function InitAppData() {
     console.log("CountSquaresJS : Inside InitAppData()");

     g_init = false; //hack; for reasons unknown at the moment, global var are initialised for every call from NS.js script
    if (!g_init) {

        g_init = true;

        //build the JSON formatted AppData
        g_AppData = {
            "Application Name": "My App Task 1",
            "Version": "1.0.0.1",
            //"Client": "My Tree Hospitals",
            "TaskName": "Count The Squares",
            "Levels": [
                   {
                       "Low_Seed": 1,
                       "High_Seed": 7,
                       "Table": {
                           "row_clr":
                              ["green", "blue", "red"],
                           "rows": 3,
                           "columns": 3,
                       },

                       "Repeats": "5", //no of screen to present
                       "Completed": 0, // how many times a user a run the task so far
                       "ScreenTimeOut": 3 // time duration after which next screen is presented
                   },
                {
                    "Low_Seed": 8,
                    "High_Seed": 15,
                    "Table": {
                        "row_clr":
                           ["green", "blue", "red"],
                        "rows": 3,
                        "columns": 5,
                    },

                    "Repeats": "5", //no of screen to present
                    "Completed": 0, // how many times a user a run the task so far
                    "ScreenTimeOut": 10 // time duration after which next screen is presented
                },
                {
                    "Low_Seed": 15,
                    "High_Seed": 45,
                    "Table": {
                        "row_clr":
                           ["green", "blue", "red"],
                        "rows": 3,
                        "columns": 7,
                    },

                    "Repeats": "5", //no of screen to present
                    "Completed": 0, // how many times a user a run the task so far
                    "ScreenTimeOut": 10 // time duration after which next screen is presented
                }
            ],
            "Runs": "5",// how many times this task is permitted to used
            "Expiry": "30/08/2019" // date after which app should not run
        } //end of AppData
    }
    return g_AppData;
} 

 function SelectSquaresTaskLevel(level) {
     console.log("CountSquaresJS : Inside selectSquaresTaskLevel()");
     //use parameterised functionality 
     //there should be switch to select a task level
     //level = 0;
     return g_taskLevel = level;

 }

//this function radmonly initialises array objects with white or clear color instead of 0s and 1s

 function InitArrayObject_v1(taskLevel) {
     console.log("CountSquaresJS :   Inside InitArrayObject_V1()");
     g_taskLevel = taskLevel;

     var body, tab, tr, td, tn, row, col, tmp, img, pad, diff;

     g_array_Table = new Array(g_taskLevel.Table.rows); //this creates a new array 

     if (g_array_Table.length % 2 == 0) {
         console.log("Error: Array Table has even number of rows!");
     }
     //check seed number when this converted to binary should create equivalent number of cols
     if ((g_taskLevel.High_Seed).toString(2).length > g_taskLevel.Table.columns) {
         console.log("Error: Task Level High Seed number generates more columns")
     }

     //populate the rows and columns of the array with radominised 0s and 1s
     // 1srepresent the white squares in the table
     for (var i = 0; i < g_array_Table.length; ++i) { //gives the no of rows
    
         tmp = randomIntInc(g_taskLevel.Low_Seed, g_taskLevel.High_Seed).toString(2).toString(); // base 2 - binary format to

         if (tmp.length < g_taskLevel.Table.columns) {//build the columns
             diff = g_taskLevel.Table.columns - tmp.length;
             pad = "0";
             for (j = 0; j < diff; ++j) {
                 tmp = tmp + pad;
             }
         }
         
         if (tmp.length > g_taskLevel.Table.columns) {
             //reduce the digitis to as set by taskLevel.Table.columns
         }

         //
         g_array_Table[i] = tmp;

     }

     var myStr1 ;//= g_array_Table[i].map(string);

     var myTem;
     for (var i = 0; i < g_array_Table.length; ++i) {
         for (var j = 0; j < g_array_Table.length[i].length; ++j)
         {
             myTem = g_array_Table[i][j];

         }
     }
         //toString().replace('/1/g', 'white ');
    // myStr1 = myStr1.split('1').join('white ');
     //myStr1 = myStr1.split('0').join( 'clr ');
     myStr1 = myStr1.toString().replace(/1/g, 'white ');
     myStr1 = myStr1.toString().replace(/0/g, 'clr ');


     var myStr;
     //now fill the array with white or clear for 1 and 0 respectively
     for (var i = 0; i < g_array_Table.length; ++i) { 

         for (j = 0; j < g_taskLevel.Table.columns; ++j) {
             if (g_array_Table[i][j] == "1") {
                 // g_array_Table[i][j].value = "white,";
                 myStr = myStr + "white ";
                 
             } else{
                 //g_array_Table[i][j] = "clear,";
                 //myStr = myStr + "clear ";
                     myStr = myStr + "clear ";
                }
         }
         

         if (myStr.length > g_taskLevel.Table.columns) {
             //reduce the digitis to as set by taskLevel.Table.columns
         }

         //
         g_array_Table[i] = myStr.split(" ");

     }
     return g_array_Table;
 }

 function InitArrayObject(taskLevel) {
     console.log("CountSquaresJS : Inside InitArrayObject()");
     g_taskLevel = taskLevel;

     var body, tab, tr, td, tn, row, col, tmp, img, pad, diff;

     g_array_Table = new Array(g_taskLevel.Table.rows); //this creates a new array 

     if (g_array_Table.length % 2 == 0) {
         console.log("Error: Array Table has even number of rows!");
     }
     //check seed number when this converted to binary should create equivalent number of cols
     if ((g_taskLevel.High_Seed).toString(2).length > g_taskLevel.Table.columns) {
         console.log("Error: Task Level High Seed number generates more columns")
     }

     //populate the rows and columns of the array with radominsed 0s and 1s
     ////1s represent the white squares in the table
     for (var i = 0; i < g_array_Table.length; ++i) {

         tmp = randomIntInc(g_taskLevel.Low_Seed, g_taskLevel.High_Seed, g_taskLevel.Table.columns).toString(2); // base 2 - binary format to

         if (tmp.length < g_taskLevel.Table.columns) {
             diff = g_taskLevel.Table.columns - tmp.length;
             pad = "0";
             for (var j = 0; j < diff; ++j) {
                 tmp = tmp + pad;
             }
         }
         if (tmp.length > g_taskLevel.Table.columns) {
             //reduce the digitis to as set by taskLevel.Table.columns
             var reduceStr;
             for (var z = 0 ; z < g_taskLevel.Table.columns; ++z) {
                 reduceStr = reduceStr + tmp[z];
             }
             tmp = reduceStr;
         }
         g_array_Table[i] = tmp;

     }
     return g_array_Table;
 }


 function randomIntInc(low, high) {

     //var val = Math.floor(1000 + Math.random() * 9000);//gives fixed lenght of 4
		
     return Math.floor(Math.random() * (high - low + 1) + low);
 }

/*
    function DrawSquares() {

        console.log("In CountSquaresJS: DrawSquares()");
   var body, tab, tr, td, tn, row, col, tmp, img, pad, diff;
        //there should be switch to select a task level
        var taskLevel = AppData.Levels[0];

        var body, tab, tr, td, tn, row, col, tmp, img, pad, diff;
        
        //if (repeat_Count < taskLevel.Repeats) {
          //  repeat_Count++;
        //} else {
          //  console.log("In DrawSquares: exceed repeat count for the task!");
           // var td_Temp = document.getElementById("Results")
           // //td_Temp.innerText = "<input type=/"number/" id=/"usr_Result>";

           // return;
       // }
        

        array_Table = new Array(taskLevel.Table.rows);

        if (array_Table.length % 2 == 0) {
            console.log("Error: Array Table has even number of rows!");
        }
        //check seed number when this converted to binary should create equivalent number of cols
        if ((taskLevel.High_Seed).toString(2).length > taskLevel.Table.columns) {
            console.log("Error: Task Level High Seed number generates more columns")
        }

        //Build a Array with 0 and 1 
        //1 represent presence of Sqaures
        
        for (var i = 0; i < array_Table.length; ++i) { //numbers represent the white squares in the table

            tmp = randomIntInc(taskLevel.Low_Seed, taskLevel.High_Seed).toString(2); // base 2 - binary format to

            if (tmp.length < taskLevel.Table.columns) {
                diff = taskLevel.Table.columns - tmp.length;
                pad = "1";
                for (j = 0; j < diff; ++j) {
                    tmp = tmp + pad;
                }
            }
            if (tmp.length > taskLevel.Table.columns) {
                //reduce the digitis to as set by taskLevel.Table.columns
            }
            array_Table[i] = tmp;

            //console.log("Array Table content " + array_Table)[i];
            //track the result

            //current_result = tmp;
            //prev_result = tmp + current_result;
            //tmp_result = 0;
        }

        
        // calculate the result of the game

        body = document.getElementsByTagName('body')[0];
        body.bgColor = "";

        
        //tab = document.getElementsByTagName("Table");
        tab = document.getElementById("my_123Table");

        //body.deleteElement(tab);

       if (tab == null) { //if the table does not exist create the first time
            tab = document.createElement('Table');
            tab.setAttribute('id', 'my_123Table');
        } else { //delete all the rows
        
           while (tab.hasChildNodes()) {
               tab.removeChild(tab.lastChild);
           }
       }
            


        for (row = 0; row < array_Table.length; row++) {
            tr = document.createElement('tr');

            tr.style.background = taskLevel.Table.row_clr[row];
            //tr.style.border =  taskLevel.Table.row_clr[row];
            
            for (col = 0; col < taskLevel.Table.columns; col++) {
                //var rowLenghtcount = array_Table[row].length;

                td = document.createElement('td');
                var arrStr = array_Table[row];
                var strLen = arrStr.length;

                tn = document.createTextNode(array_Table[row][col]);

                tmp = array_Table[row][col];

                if (tmp == "1") {
                    var img = document.createElement('img');
                    img.src = "/myapp/res/rect.jpg";
                    td.appendChild(img);
                }

                //td.appendChild(tn);
                tr.appendChild(td);
            }
            tab.appendChild(tr);
        }
        body.appendChild(tab);
        //body.createElement(tab);

        //current_result = TrackResult(array_Table);
        //prev_result = current_result;
        //tmp_result = 0;
       
        TrackResult(array_Table);
    }
*/

 function DrawSquares() {

     console.log("In CountSquaresJS: DrawSquares()");
     g_AppData = InitAppData();
        //there should be switch to select a task level
        var taskLevel = g_AppData.Levels[0];

        var body, tab, tr, td, tn, row, col, tmp, img, pad, diff;
        /*
        if (repeat_Count < taskLevel.Repeats) {
            repeat_Count++;
        } else {
            console.log("In DrawSquares: exceed repeat count for the task!");
            var td_Temp = document.getElementById("Results")
            //td_Temp.innerText = "<input type=/"number/" id=/"usr_Result>";

            return;
        }*/


        g_array_Table = new Array(taskLevel.Table.rows);

        if (g_array_Table.length % 2 == 0) {
            console.log("Error: Array Table has even number of rows!");
        }
        //check seed number when this converted to binary should create equivalent number of cols
        if ((taskLevel.High_Seed).toString(2).length > taskLevel.Table.columns) {
            console.log("Error: Task Level High Seed number generates more columns")
        }

        //Build a Array with 0 and 1 
        //1 represent presence of Sqaures

        for (var i = 0; i < g_array_Table.length; ++i) { //numbers represent the white squares in the table

            tmp = randomIntInc(taskLevel.Low_Seed, taskLevel.High_Seed).toString(2); // base 2 - binary format to

            if (tmp.length < taskLevel.Table.columns) {
                diff = taskLevel.Table.columns - tmp.length;
                pad = "1";
                for (j = 0; j < diff; ++j) {
                    tmp = tmp + pad;
                }
            }
            if (tmp.length > taskLevel.Table.columns) {
                //reduce the digitis to as set by taskLevel.Table.columns
            }
            g_array_Table[i] = tmp;

            //console.log("Array Table content " + array_Table)[i];
            //track the result

            //current_result = tmp;
            //prev_result = tmp + current_result;
            //tmp_result = 0;
        }

        // calculate the result of the game

        body = document.getElementsByTagName('body')[0];
        body.bgColor = "";


        //tab = document.getElementsByTagName("Table");
        tab = document.getElementById("my_123Table");

        //body.deleteElement(tab);

        if (tab == null) { //if the table does not exist create the first time
            tab = document.createElement('Table');
            tab.setAttribute('id', 'my_123Table');
        } else { //delete all the rows

            while (tab.hasChildNodes()) {
                tab.removeChild(tab.lastChild);
            }
        }



        for (row = 0; row < g_array_Table.length; row++) {
            tr = document.createElement('tr');

            tr.style.background = taskLevel.Table.row_clr[row];
            //tr.style.border =  taskLevel.Table.row_clr[row];

            for (col = 0; col < taskLevel.Table.columns; col++) {
                //var rowLenghtcount = array_Table[row].length;

                td = document.createElement('td');
                var arrStr = g_array_Table[row];
                var strLen = arrStr.length;

                tn = document.createTextNode(g_array_Table[row][col]);

                tmp = g_array_Table[row][col];

                if (tmp == "1") {
                    var img = document.createElement('img');
                    img.src = "/myapp/res/rect.jpg";
                    td.appendChild(img);
                }

                //td.appendChild(tn);
                tr.appendChild(td);
            }
            tab.appendChild(tr);
        }
        body.appendChild(tab);
        //body.createElement(tab);

        //current_result = TrackResult(array_Table);
        //prev_result = current_result;
        //tmp_result = 0;

        //TrackResult(array_Table);
    }


    function TrackResult(arr) {
        console.log("In CountSquaresJS:TrackResult()");
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
            if (current_Result == 0) {
                current_Result = screen_sum;
                //prev_Result = ;
            } else {
                prev_Result = current_Result;
                current_Result = prev_Result + screen_sum;
            }



            var td_Temp = document.getElementById("Results")
            td_Temp.innerText = "Previous sum : " + prev_Result + " and Current sum : " + current_Result;
        }


    }

