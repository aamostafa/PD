var userServices = angular.module('userServices', []);
userServices.factory('userServices', function ($http) {


    var getFilters = function () {
       return $http.get('/api/UsersFilters')
    };
    
    var getBy = function (searchCriteria, Size, PageIndex) {
     
        var data={
            searchCriteria:JSON.stringify(searchCriteria),
            Size: Size,
            PageIndex:PageIndex
        }
        
        return $http({
            method: "GET",
            url: "/api/User",
            params:data
        })
    };

    var userServices = {
        getFilters: getFilters,
        getBy: getBy
    };

    return userServices;

});