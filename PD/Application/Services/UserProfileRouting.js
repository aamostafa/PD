app.config(['$routeProvider', '$translateProvider', function ($routeProvider, $translateProvider) {
    //Routing 
    $routeProvider.
        when('/', {
            templateUrl: '/Templates/UserProfile.html',
            controller: 'UserProfileCtrl'
        })
	.otherwise({
	    redirectTo: '/'
	});
}]);