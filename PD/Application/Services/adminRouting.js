
app.config(['$routeProvider', '$translateProvider', function ($routeProvider, $translateProvider) {
    //Routing 
    $routeProvider.
        when('/CoursesCatalog', {
            templateUrl: '/Templates/CoursesCatalog',
            controller: 'CoursesCatalogCtrl'
        }).
        when('/CoursesCatalog/:searchTxt/:CategoryID', {
            templateUrl: '/Templates/CoursesCatalog',
            controller: 'CoursesCatalogCtrl'
        }).
         when('/CoursesCatalog/:searchTxt', {
             templateUrl: '/Templates/CoursesCatalog',
             controller: 'CoursesCatalogCtrl'
         }).
        when('/CourseDetails/:id', {
            //templateUrl: '/Templates/CourseDetails.html',
            templateUrl: '/templates/CourseDetails',
            controller: 'CourseDetailsCtrl'
        }).
        when('/UserProfile', {
            templateUrl: '/Templates/UserProfile.html',
            controller: 'UserProfileCtrl'
        }).
        when('/CreateCourse', {
            templateUrl: '/Templates/CreateCourse.html',
            controller: 'CreateCourseCtrl'
        }).
        when('/EditCourse/:id', {
            templateUrl: '/Templates/CreateCourse.html',
            controller: 'CreateCourseCtrl'
        })
        .when('/Dashboard', {
            templateUrl: '/Templates/Dashboard.html',
            controller: 'DashboardCtrl'
        })
        .when('/UserInfoEdit', {
            templateUrl: '/Templates/UserInfoEdit.html',
            controller: 'UserProfileCtrl'
        })
	.otherwise({
	    redirectTo: '/Dashboard'
        });
}]);

//angular.module('app', ['pascalprecht.translate'])
//  .config(function ($translateProvider) {
//      // Our translations will go in here
//  });


//angular.module('app', ['pascalprecht.translate'])
//  .config(function ($translateProvider) {
//      // Our translations will go in here
//  });

