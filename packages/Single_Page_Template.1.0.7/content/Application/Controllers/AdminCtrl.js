var app = angular.module('app', ['ngRoute', 'dataContext']);
app.run(function (dataContext) {
    //dataContext.getCompanies();
    //dataContext.getCategories();
    //dataContext.getLocations();
});
app.controller('adminCtrl', function ($scope, $http) {
});

//companies 
app.controller('feedsCtrl', function ($scope, $http, dataContext) {
    //dataContext.getFeeds().then(function (data) {
    //    $scope.feeds = data.results;
    //    $scope.$apply();
    //});

    dataContext.getFeeds().then(function (data) {

        $scope.feeds = data.results;
        $scope.$apply();
    });


    $scope.Delete = function (company, index) {
        $scope.companies.splice(index, 1);
        dataContext.deleteCompany(company).then(function () {
            toastr.success('Company deleted successfully');
        });
    };
});

