app.controller('CoursesCatalogCtrl', function ($scope, $routeParams, $http, dataContext, $translate) {
    $scope.PagingFlag = true;
    $scope.showPushSelect = false;
    //Loading importance 
    //1- Sections 2- Cats 3- Courses 4- Compe.
    if ($routeParams.catId) {
        $scope.catId = $routeParams.catId;
        $scope.selectedCatId = $routeParams.catId;
    }

    //$scope.CompetencyFilterTxt = "Filter By Competencies";
    $scope.CompetencyFilterTxt = $translate.instant('Filter By Competencies')

    $scope.showPushPopup = function () {
        $('#Push-popup').modal('show');
        $('#Push-popup').modal({
            backdrop: true
        });
    };
    $scope.cancelPushPopup = function () {
        $('#Push-popup').modal('hide');
    };

    $scope.showFilterPopup = function () {
        $('#competenciesModal').modal('show');
        $('#competenciesModal').modal({
            backdrop: true
        });
    };
    $scope.cancelPopupFilter = function () {
        $('#competenciesModal').modal('hide');
        //$("#CompetenciesTree").dynatree("getRoot").visit(function(node) {

        //    node.select(false);
        //});

        //for (var i = 0; i < tempSelectedTree.length; i++) {

        //    var node = $('#CompetenciesTree').dynatree("getTree").getNodeByKey(tempSelectedTree[i])
        //    node.select(true);
        //}
        //$scope.TreeSelectedItems = undefined;
        //$scope.$apply();
    };

    //Pushing Courses
    $scope.PushedCourses = [];
    $scope.CancelPushCourses = function () {
         $scope.PushedCourses.forEach(function (course) {
            course.selected = false;
        });
        $scope.showPushSelect = false;
        $scope.showAssignbtn = false;
        $scope.PushedCourses = [];
    }
    $scope.UnSelectAll = function () {
        $scope.PushedCourses.forEach(function (course) {
            course.selected = false;
        });
            
        $scope.PushedCourses = [];
    }
    $scope.PushCourse = function (course) {
        if (course.selected == true) {
            $scope.PushedCourses.push(course);
            $scope.showAssignbtn = true;
        } else {
            var index = $scope.PushedCourses.indexOf(course);
            if (index > -1) {
                $scope.PushedCourses.splice(index, 1);
                if ($scope.PushedCourses.length < 1)
                    $scope.CancelPushCourses();
            }

        }
    }
    $scope.PushCourses = function () {

        $scope.showPushSelect = true;
    }

    $scope.FilterPopup = function () {
        $scope.TreeSelectedItems = $scope.TreeSelectedItemsTemp;
        if ($scope.TreeSelectedItems != undefined && $scope.TreeSelectedItems.length > 1) {
            $scope.CompetencyFilterTxt = $scope.TreeSelectedItems.length.toString() + " Competencies selected";
            $scope.currentPage = 0;
        }
        else if ($scope.TreeSelectedItems != undefined && $scope.TreeSelectedItems.length == 1) {
            $scope.CompetencyFilterTxt = $scope.TreeSelectedItems.length.toString() + " Competency selected";
            $scope.currentPage = 0;
        }
        else
            $scope.CompetencyFilterTxt = $translate.instant('Filter By Competencies');
        //$scope.CompetencyFilterTxt = "Filter By Competencies";
        $('#competenciesModal').modal('hide');
    };

    $scope.getAllCourses = function () {

        //if ($scope.search == undefined)
        //    return;
        $scope.catId = undefined;
        // $routeParams.searchTxt = undefined;
        // $scope.searchTxt = undefined;
        $("#CompetenciesTree").dynatree("getRoot").visit(function (node) {

            node.select(false);
        });
        $scope.TreeSelectedItems = undefined;
        //$scope.treefilter = "All";
        //$scope.CompetencyFilterTxt = "Filter By Competencies";
        //$scope.treefilter = $translate.instant('All');
        $scope.CompetencyFilterTxt = $translate.instant('Filter By Competencies');
        $scope.coursesPromise.then(function (data) {
            $scope.courses = [];
            dataContext.getUserCoursesIds().then(function (userData) {
                $(data.results).each(function (index, course) {
                    course.isEnrolled = userData.results.filter(function (userCourse) {
                        return userCourse.CourseId == course.ID;
                    }).length > 0;

                    $scope.courses.push(course);
                });


                $scope.$apply();
            })

            $scope.$apply();
            // window.location = "#/CoursesCatalog";

        });
        $scope.numberOfPages = function () {
            if ($scope.filterdcourses.length == 0)
                $scope.PagingFlag = false
            else
                $scope.PagingFlag = true;
            return Math.ceil($scope.filterdcourses.length / $scope.pageSize);
        }

        $("#filter-accordion").dynatree("getRoot").visit(function (node) {
            node.expand(false);
        });
    };

    $scope.categoriesPromise = dataContext.getCategories();
    $scope.sectionspromise = dataContext.getCategorySections();
    $scope.coursesPromise = dataContext.getAllCourse();
    if ($routeParams.CategoryID != undefined)
    {
        $scope.catId = $routeParams.CategoryID;
    }
    if ($routeParams.searchTxt == undefined) {
        $scope.treefilter = $translate.instant('All');
        $scope.searchTxt = undefined;
    }
    else {
        $scope.treefilter = 'Search Result for "' + $routeParams.searchTxt + '"';
        $scope.searchTxt = $routeParams.searchTxt;
    }
    $scope.myFilterTest = function (item) {
        var categoryFlag;
        var competencyFlag;
        var searchTxtFlag;
        if ($scope.catId != undefined) {
            if (item.CategoryId == $scope.catId)
                categoryFlag = true;
            else
                categoryFlag = false;
        } else
            categoryFlag = true;


        if ($scope.TreeSelectedItems != undefined) {
            if (item.Competencies == null)
                var common = [];
            else {
                var common = $.grep(item.Competencies.split(','), function (element) {
                    return $.inArray(element, $scope.TreeSelectedItems) !== -1;
                });
            }
            if (common.length > 0) {
                competencyFlag = true;
            } else
                competencyFlag = false;
        } else
            competencyFlag = true;


        if ($routeParams.searchTxt != undefined) {
            if (item.Name.toLowerCase().indexOf($routeParams.searchTxt.toLowerCase()) > -1 ||
                item.Description.toLowerCase().indexOf($routeParams.searchTxt.toLowerCase()) > -1 ||
                item.Category.Name.toLowerCase().indexOf($routeParams.searchTxt.toLowerCase()) > -1)
                searchTxtFlag = true;
            else
                searchTxtFlag = false;
        } else
            searchTxtFlag = true;

        if (categoryFlag && competencyFlag && searchTxtFlag) {

            return true;
        }
        else
            return false;


    };


    $scope.categoriesPromise.then(function () {
        $scope.sectionspromise.then(function (data) {
            $scope.tree = $(data.results).each(function (index, item) {
                item.title = item.Name,
                    item.children = $(item.Categories).each(function (index, item) {
                        item.title = item.Name;
                        item.key = item.Id;
                    });
            });
            $scope.$apply();
            dataContext.getCompetencies().then(function (data) {
                $scope.Competencies = data.results;
                $scope.$apply();
                $scope.CompetenciesTree = [];
                $scope.tree = $(data.results).each(function (index, item) {
                    item.title = item.Name;
                    item.id = item.Id;
                    if (item.Competencies1.length > 0)
                        item.children = item.Competencies1;
                    item.isFolder = true;
                    if (item.ParentId == null) {
                        $scope.CompetenciesTree.push(item);
                    }
                });

                $scope.coursesPromise.then(function (data) {
                    $scope.courses = [];

                    dataContext.getUserCoursesIds().then(function (userData) {
                        $(data.results).each(function (index, course) {
                            course.isEnrolled = userData.results.filter(function (userCourse) {
                                return userCourse.CourseId == course.ID;
                            }).length > 0;
                            if (new Date() > course.EndDate)
                                course.disable = true;
                            else
                                course.disable = false;

                            if (course.NumberOfSeats == course.NumberOfReservedSeats)
                                course.isReserved = true;
                            else
                                course.isReserved = false;

                            dataContext.getAllRequests().then(function (Requests) {

                                var allRequests = Requests.results;
                                var isRequested = $.grep(allRequests, function (e) { return e.CourseId == course.ID; });
                                if (isRequested.length == 0) {
                                    course.isRequested = false;
                                }
                                else
                                    course.isRequested = true;
                                $scope.$apply();
                            });
                            $scope.courses.push(course);
                        });

                        $scope.$apply();
                    })

                    $scope.currentPage = 0;
                    $scope.pageSize = 9;
                    $scope.numberOfPages = function () {
                        if ($scope.filterdcourses.length == 0)
                            $scope.PagingFlag = false
                        else
                            $scope.PagingFlag = true;
                        return Math.ceil($scope.filterdcourses.length / $scope.pageSize);
                    }
                });
            });
        });
    });


});