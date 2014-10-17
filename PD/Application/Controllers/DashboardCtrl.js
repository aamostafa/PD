app.controller('DashboardCtrl', function ($scope, dataContext,$translate) {
    var enrolledCourses = [];
    var upComingCourses = [];
    var completedCourses = [];
    var activeCourses = [];

    var selectedStatusCourses = [];
    var selectedStatus;
    var courseCssClass;

    $scope.dashboardPromise = dataContext.getUserCourses();
    $scope.dashboardPromise.then(function (data) {

        enrolledCourses = data.results;
        console.log("Enrolled: " + enrolledCourses);
        $scope.EnrolledCourses = enrolledCourses;

        if ($scope.EnrolledCourses <= 0)
            $scope.EmptyDashboard = true;
        else
            $scope.EmptyDashboard = false;

        $scope.$apply();

        var sessionNotStarted = 0;
        var sessionStarted = 1;
        var sessionCompleted = 2;


        //console.log(data.results);

        $(data.results).each(function(index, userCourse) {
            var course = userCourse.Course;
            if (userCourse.SessionStates.length > 0) {
                var sessionstats = [];
                if (userCourse.SessionStates[0].Sessions != "") {
                    sessionstats = angular.fromJson(userCourse.SessionStates[0].Sessions);
                    course.TotalSessions = sessionstats.length;
                    course.RemainingSessions = $.grep(sessionstats, function (e) { return e.SessionState == 0 || e.SessionState == 1; }).length;
                }
                var count = 0;
                //var active = false;

                $(sessionstats).each(function(stateIndex, sessionstate) {
                    count += sessionstate.SessionState;
                });
                switch (count) {
                case 0:
                    upComingCourses.push(course);
                    break;
                case (sessionstats.length) * 2:
                    completedCourses.push(course);
                    break;
                default:
                    activeCourses.push(course);
                    break;
                }

            } else {
                upComingCourses.push(course);
            }
        });
       
        $(upComingCourses).each(function (index, course) {
            course.TotalSessions = course.Sessions.length;
            course.RemainingSessions = course.Sessions.length;
        })
        var completed = $translate.instant('completed_courses');
        var active = $translate.instant('Active');
        var upComing = $translate.instant('UpComing');

        $scope.States = [
        { name: completed, y: completedCourses.length, color: "#87c8e1" },
        { name: active, y: activeCourses.length, color: "#ffdf75" },
        { name: upComing, y: upComingCourses.length, color: "#ce77b6" }
        ];


        //$scope.States = [
        //{ name: "Completed", y: completedCourses.length, color: "#87c8e1" },
        //{ name: "Active", y: activeCourses.length, color: "#ffdf75" },
        //{ name: "UpComing", y: upComingCourses.length, color: "#ce77b6" }
        //];

        if (activeCourses.length <= 0)
            $scope.States = $.grep($scope.States, function (e) { return e.name != active; });
            //$scope.States = $.grep($scope.States, function (e) { return e.name != "Active"; });
        if (completedCourses.length <= 0)
            $scope.States = $.grep($scope.States, function (e) { return e.name != completed; });
        //$scope.States = $.grep($scope.States, function (e) { return e.name != "Completed"; });
        if (upComingCourses.length <= 0)
            $scope.States = $.grep($scope.States, function (e) { return e.name != upComing; });
        //$scope.States = $.grep($scope.States, function (e) { return e.name != "UpComing"; });

        // initial Drill Down values :
        var longest = [];
        var longestLen = 0;

        if (completedCourses.length >= upComingCourses.length && completedCourses.length >= activeCourses.length) {
                $scope.selectedStatusCourses = completedCourses;
                $scope.selectedStatus = completed; //"Completed";
                $scope.courseCSSClass = "Completed-Color";
            
        } else if (upComingCourses.length >= activeCourses.length && upComingCourses.length >= completedCourses.length) {
            $scope.selectedStatusCourses = upComingCourses;
            $scope.selectedStatus = upComing;//"UpComing";
            $scope.courseCSSClass = "Upcoming-Color";
        }
        else {
            $scope.selectedStatusCourses = activeCourses;
            $scope.selectedStatus = active;//"Active";
            $scope.courseCSSClass = "Active-Color";
        }

        

        $scope.$apply();
        //});

        $scope.onSelectionChanged = function (name) {
            if (name == active /*"Active"*/) {
                $scope.selectedStatus = active;//"Active";
                $scope.courseCSSClass = 'Active-Color';
                $scope.selectedStatusCourses = activeCourses;
                $scope.$apply();
            }
            else if (name == completed/*"Completed"*/) {
                $scope.selectedStatus = completed;//"Completed";
                $scope.courseCSSClass = 'Completed-Color';
                $scope.selectedStatusCourses = completedCourses;
                $scope.$apply();
            }
            else if (name ==upComing /*"UpComing"*/) {
                $scope.selectedStatus = upComing;//"UpComing";
                $scope.courseCSSClass = 'Upcoming-Color';
                $scope.selectedStatusCourses = upComingCourses;
                $scope.$apply();
            }
        };
    });

    
});
