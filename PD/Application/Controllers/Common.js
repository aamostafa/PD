var app = angular.module('app', ['ngRoute', 'dataContext', 'userServices', 'ngAnimate', 'ui.bootstrap', 'cgBusy', 'mgcrea.ngStrap'
                                         , 'pascalprecht.translate']);

app.controller('TranslateController', ['$scope', '$location', '$translate', function ($scope, $location, $translate) {
    var lang = localStorage["lang"] || 'en-us';
    $scope.rtl = lang == "ar-sa";
    $scope.themePath = "../content/" + lang + "/css/theme.css";
    $scope.layoutPath = "../content/" + lang + "/css/layout.css";


    $scope.changeLanguage = function (langKey) {
        //$translate.use(langKey);
        //$scope.rtl = langKey == "ar-sa";
        localStorage["lang"] = langKey;
        window.location.reload();
        //$scope.themePath = "../content/" + langKey + "/css/theme.css";
        //$scope.layoutPath = "../content/" + langKey + "/css/layout.css";
    };

    $scope.$on('$routeChangeStart', function (next, current) {
        $scope.path = $location.path();
        if ($scope.path == "/Dashboard") {
            $('.my-dashboard-menu-item').addClass('selected-menu-item').siblings().removeClass('selected-menu-item');
        }
        if ($scope.path == "/CoursesCatalog") {
            $('.course-cataloge-menu-item').addClass('selected-menu-item').siblings().removeClass('selected-menu-item');
        }
        if ($scope.path == "/CreateCourse") {
            $('.MainMenu li').removeClass('selected-menu-item');
        }
        if ($scope.path.search("/UserProfile") > -1) {
            $('.MainMenu li').removeClass('selected-menu-item');
        }
        if ($scope.path.search("/CourseDetails") > -1) {
            $('.MainMenu li').removeClass('selected-menu-item');
        }
    });
}]);