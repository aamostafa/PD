app.config(['$routeProvider', function ($routeProvider) {




    $routeProvider.
        when('/feeds', {
            templateUrl: '/Templates/feeds.html',
            controller: 'feedsCtrl'
        }).
        when('/Feeds/new', {
            templateUrl: '/Templates/editCompanyTemplate',
            controller: 'companyCtrl'
        }).
        when('/Feeds/edit/:id', {
            templateUrl: '/Templates/editCompanyTemplate',
            controller: 'companyCtrl'
        })
        .when('/jobs', {
            templateUrl: '/Templates/JobsIndexTemplate',
            controller: 'jobsCtrl'
        })
        .when('/jobs/new', {
            templateUrl: '/Templates/JobsEditorTemplate',
            controller: 'jobCtrl'
        })
        .when('/jobs/edit/:id', {
            templateUrl: '/Templates/JobsEditorTemplate',
            controller: 'jobCtrl'
        })
        .when('/Users', {
            templateUrl: '/Templates/UsersIndexTemplate',
            controller: 'usersCtrl'
        })
        .when('/jobs/new', {
            templateUrl: '/Templates/JobsEditorTemplate',
            controller: 'jobCtrl'
        })
        .when('/jobs/edit/:id', {
            templateUrl: '/Templates/JobsEditorTemplate',
            controller: 'jobCtrl'
        })
        .when('/Roles', {
                templateUrl: '/Templates/RolesIndexTemplate',
                controller: 'rolesCtrl'
            })
        .when('/jobs/new', {
            templateUrl: '/Templates/JobsEditorTemplate',
            controller: 'jobCtrl'
        })
        .when('/Roles/edit/:id', {
            templateUrl: '/Templates/RolesEditorTemplate',
            controller: 'roleCtrl'
        });




//      $routeProvider.
//        when('/companies', {
//            templateUrl: 'Admin/Company',
//            controller: 'companiesCtrl'
//        }).
//        when('/phones/:phoneId', {
//            templateUrl: 'partials/phone-detail.html',
//            controller: 'PhoneDetailCtrl'
//        }).
//        otherwise({
//            redirectTo: '/phones'
//        });
  }]);
