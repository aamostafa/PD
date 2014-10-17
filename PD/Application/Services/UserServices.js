var userServices = angular.module('userServices', []);
userServices.factory('userServices', function ($http) {


    var getFilters = function () {
       return $http.get('/api/UsersFilters')
    };
    


    var userServices = {
        getFilters: getFilters
    };

    return userServices;

});