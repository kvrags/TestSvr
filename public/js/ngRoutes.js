
angular.module('neuroApp').config('ngRoute', function ($scope,routeProvider) {
	$scope.message = "Hello from Route controller from a new file!!";

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
        controller: 'ctrlworkoutMemory'
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
        templateUrl: './tasks/attention/squares.html',
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
