
app.directive('sessions', function () {
    return {
        scope: {
            model: '='
        },  // use a new isolated scope
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/Directives/sessionblocks.html',
    };
});

app.directive('materials', function () {
    return {
        scope: {
            model: '='
        },  // use a new isolated scope
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/Directives/materialblocks.html'
    };
});

app.directive('instructors', function () {
    return {
        scope: {
            model: '='
        },  // use a new isolated scope
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/Directives/Instructors.html'
    };
});
app.directive('courseoverview', function () {
    return {
        scope: {
            Course: '=model'
        },  // use a new isolated scope
        restrict: 'AE',
        replace: 'false',
        templateUrl: '/Directives/courseOverview.html'
    };
});
app.directive('coursefaqs', function () {
    return {
        scope: {
            FAQS: '=model'
        },  // use a new isolated scope
        restrict: 'AE',
        replace: 'false',
        templateUrl: '/Directives/courseFaqs.html',
        controller: function ($scope, $element, $attrs, $routeParams, dataContext) {
            dataContext.getFAQSByCourseId(parseInt($routeParams.id)).then(function (faqData) {
                $scope.FAQs = faqData.results;
                // $scope.$apply();
                $($scope.FAQs).each(function (index) {
                    $scope.FAQs[index].show = false;

                });

            });
            $scope.toggleFAQ = function (faq) {
                $scope.FAQ = faq;
                if ($scope.FAQ.show)
                    $scope.FAQ.show = false;

                else
                    $scope.FAQ.show = true;
            };
        },
        link: function ($scope, element, attrs) {
            $scope.$watch(attrs.model, function (newValue) {
                if (newValue != null) {
                    $("ul.faq-list-question li p").hide();
                    //$("ul.faq-list-question li .answer-text").hide();
                    //$("ul.faq-list-question .collapse-btn a").addClass("iconplus");
                }
            });
        }
    };
});

app.directive('courseschedule', function () {
    return {
        scope: {
            course: '=',
            //sessionStates:'='
        },  // use a new isolated scope
        restrict: 'AE',
        replace: 'false',
        templateUrl: '/Directives/CourseSchedule.html',
        link: function ($scope) {
            $scope.$watch("course", function (newval) {
                if (newval != null) {
                    var course = newval;
                    $scope.Sessions = newval.Sessions; //No row in the database for session state
                    //if (course.UserCourses[0].SessionStates.length < 1) {
                    var TodayDate = new Date;
                    var curr = new Date; // get current date
                    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
                    var last = first + 6; // last day is the first day + 6

                    var firstday = new Date(curr.setDate(first));
                    var lastday = new Date(curr.setDate(last));

                    if (course.UserCourses[0] == null) {
                        $($scope.Sessions).each(function (index, item) {
                            item.show = false;
                            item.StartBtn = true;
                            item.markAsCompleted = false;
                            item.Completed = false;
                        });
                        return;
                    }

                    var allSessionStates = [];
                    if (course.UserCourses[0].SessionStates[0].Sessions !== "")
                        var allSessionStates = angular.fromJson(course.UserCourses[0].SessionStates[0].Sessions);

                    $($scope.Sessions).each(function (index, item) {

                        if (item.PublishedDate >= firstday && item.PublishedDate <= lastday)
                            $scope.Sessions[index].show = true;
                        else
                            item.show = false;
                        if (item.PublishedDate <= TodayDate)
                            item.isPublished = true;
                        else
                            item.isPublished = false;

                        var sessionStates = $.grep(allSessionStates, function (e) { return e.SessionId == item.Id; });

                        if (sessionStates.length == 0) {
                            item.StartBtn = true;
                            item.markAsCompleted = false;
                            item.Completed = false;
                        }
                        else {
                            switch (sessionStates[0].SessionState) {
                                case 0: //not started 
                                    item.StartBtn = true;
                                    item.markAsCompleted = false;
                                    item.Completed = false;
                                    break;
                                case 1:
                                    item.StartBtn = false;
                                    item.markAsCompleted = true;
                                    item.Completed = false;
                                    break;
                                case 2:
                                    item.StartBtn = false;
                                    item.markAsCompleted = false;
                                    item.Completed = true;
                                    break;
                                default:
                                    break;
                            }

                        }

                    });
                }
            });
        },
        controller: function ($scope, $element, $attrs, $routeParams, dataContext) {
            $scope.StartSession = function (session) {
                var courseId = session.Course.ID;

                $scope.sessionStates = $scope.course.UserCourses[0].SessionStates;
                if ($scope.sessionStates.length == 0) {
                    var sessionState = [];
                    $($scope.Sessions).each(function (index, item) {
                        if (item.Name == session.Name) {
                            sessionState.push({ "SessionId": item.Id, "SessionState": 1 });
                            $scope.Sessions[index].StartBtn = false;
                            $scope.Sessions[index].markAsCompleted = true;
                            $scope.Sessions[index].Completed = false;
                        } else
                            sessionState.push({ "SessionId": item.Id, "SessionState": 0 });
                    });

                    if (sessionState.length != 0)
                        var intialValues = { "CourseId": parseInt(courseId), "Sessions": JSON.stringify(sessionState) };
                    dataContext.createSessionState(intialValues);
                    dataContext.saveChanges();

                } else if ($scope.sessionStates[0].Sessions == "") {
                    var sessionState = [];
                    $($scope.Sessions).each(function (index, item) {
                        if (item.Name == session.Name) {
                            sessionState.push({
                                "SessionId": item.Id,
                                "SessionState": 1
                            });
                            $scope.Sessions[index].StartBtn = false;
                            $scope.Sessions[index].markAsCompleted = true;
                            $scope.Sessions[index].Completed = false;
                        } else
                            sessionState.push({
                                "SessionId": item.Id,
                                "SessionState": 0
                            });
                    });

                    if (sessionState.length != 0)
                        $scope.sessionStates[0].Sessions = JSON.stringify(sessionState)
                    //    var intialValues = { "CourseId": parseInt(courseId), "Sessions": JSON.stringify(sessionState) };
                    //dataContext.createSessionState(intialValues);
                    dataContext.saveChanges();
                } else {
                    //var allSessionsStates =[];
                    //if ($scope.sessionStates[0].Sessions != "")
                    var allSessionsStates = angular.fromJson($scope.sessionStates[0].Sessions);
                    var startedSession = allSessionsStates.filter(function (el) { return el.SessionId == session.Id; });
                    if (startedSession.length == 0) {
                        startedSession.push({
                            "SessionId": session.Id,
                            "SessionState": 0
                        });
                    }
                    removeByAttr(allSessionsStates, 'SessionId', session.Id);
                    startedSession[0].SessionState = 1;
                    allSessionsStates.push(startedSession[0]);
                    $scope.sessionStates[0].Sessions = JSON.stringify(allSessionsStates);
                    indexes = $scope.Sessions.map(function (obj, index) {
                        if (obj.Name == session.Name) {
                            return index;
                        }
                    }).filter(isFinite);
                    $scope.Sessions[indexes[0]].StartBtn = false;
                    $scope.Sessions[indexes[0]].markAsCompleted = true;
                    $scope.Sessions[indexes[0]].Completed = false;
                    dataContext.saveChanges();
                }


            };
            $scope.CompleteSession = function (session) {
                $scope.completeSessionState = $scope.course.UserCourses[0].SessionStates;
                var allSessionsStates = angular.fromJson($scope.completeSessionState[0].Sessions);
                var startedSession = allSessionsStates.filter(function (el) { return el.SessionId == session.Id; });
                removeByAttr(allSessionsStates, 'SessionId', session.Id);
                startedSession[0].SessionState = 2;
                allSessionsStates.push(startedSession[0]);
                $scope.completeSessionState[0].Sessions = JSON.stringify(allSessionsStates);
                indexes = $scope.Sessions.map(function (obj, index) {
                    if (obj.Id == session.Id) {
                        return index;
                    }
                }).filter(isFinite);
                $scope.Sessions[indexes[0]].StartBtn = false;
                $scope.Sessions[indexes[0]].markAsCompleted = false;
                $scope.Sessions[indexes[0]].Completed = true;
                dataContext.saveChanges();

                //});
            };
            $scope.toogleSession = function (session) {
                $scope.session = session;

                if ($scope.session.show) {
                    $scope.session.show = false;
                    $scope.sessionTrim = true;
                } else {
                    $scope.session.show = true;
                    $scope.sessionTrim = false;
                }
            };
        }

    };
});

app.directive('courseschedule1', function () {
    return {
        scope: {
            sessionStates: '='
        }, // use a new isolated scope
        restrict: 'AE',
        replace: 'false',
        templateUrl: '/Directives/CourseSchedule.html',
        link: function ($scope) {
            $scope.$watch("sessionStates", function (newval) {
                if (newval != null) {

                    var course = newval;
                    $scope.Sessions = newval.Sessions; //No row in the database for session state
                    //if (course.UserCourses[0].SessionStates.length < 1) {
                    if (course.UserCourses[0] == null) {
                        $($scope.Sessions).each(function (index, item) {
                            item.show = false;
                            item.StartBtn = true;
                            item.markAsCompleted = false;
                            item.Completed = false;
                        });
                        return;
                    }

                    var allSessionStates = [];
                    if (course.UserCourses[0].SessionStates[0].Sessions !== "")
                        var allSessionStates = angular.fromJson(course.UserCourses[0].SessionStates[0].Sessions);

                    $($scope.Sessions).each(function (index, item) {
                        item.show = false;

                        var sessionStates = $.grep(allSessionStates, function (e) {
                            return e.SessionId == item.Id;
                        });

                        if (sessionStates.length == 0) {
                            item.StartBtn = true;
                            item.markAsCompleted = false;
                            item.Completed = false;
                        } else {
                            switch (sessionStates[0].SessionState) {
                                case 0: //not started 
                                    item.StartBtn = true;
                                    item.markAsCompleted = false;
                                    item.Completed = false;
                                    break;
                                case 1:
                                    item.StartBtn = false;
                                    item.markAsCompleted = true;
                                    item.Completed = false;
                                    break;
                                case 2:
                                    item.StartBtn = false;
                                    item.markAsCompleted = false;
                                    item.Completed = true;
                                    break;
                                default:
                                    break;
                            }

                        }

                    });
                }
            });
        },
        controller: function ($scope, $element, $attrs, $routeParams, dataContext) {
            $scope.StartSession = function (session) {
                var courseId = session.Course.ID;

                $scope.sessionStates = $scope.course.UserCourses[0].SessionStates;
                if ($scope.sessionStates.length == 0) {
                    var sessionState = [];
                    $($scope.Sessions).each(function (index, item) {
                        if (item.Name == session.Name) {
                            sessionState.push({
                                "SessionId": item.Id,
                                "SessionState": 1
                            });
                            $scope.Sessions[index].StartBtn = false;
                            $scope.Sessions[index].markAsCompleted = true;
                            $scope.Sessions[index].Completed = false;
                        } else
                            sessionState.push({
                                "SessionId": item.Id,
                                "SessionState": 0
                            });
                    });

                    if (sessionState.length != 0)
                        var intialValues = {
                            "CourseId": parseInt(courseId),
                            "Sessions": JSON.stringify(sessionState)
                        };
                    dataContext.createSessionState(intialValues);
                    dataContext.saveChanges();

                } else if ($scope.sessionStates[0].Sessions == "") {
                    var sessionState = [];
                    $($scope.Sessions).each(function (index, item) {
                        if (item.Name == session.Name) {
                            sessionState.push({
                                "SessionId": item.Id,
                                "SessionState": 1
                            });
                            $scope.Sessions[index].StartBtn = false;
                            $scope.Sessions[index].markAsCompleted = true;
                            $scope.Sessions[index].Completed = false;
                        } else
                            sessionState.push({
                                "SessionId": item.Id,
                                "SessionState": 0
                            });
                    });

                    if (sessionState.length != 0)
                        $scope.sessionStates[0].Sessions = JSON.stringify(sessionState)
                    //    var intialValues = { "CourseId": parseInt(courseId), "Sessions": JSON.stringify(sessionState) };
                    //dataContext.createSessionState(intialValues);
                    dataContext.saveChanges();
                } else {
                    //var allSessionsStates =[];
                    //if ($scope.sessionStates[0].Sessions != "")
                    var allSessionsStates = angular.fromJson($scope.sessionStates[0].Sessions);
                    var startedSession = allSessionsStates.filter(function (el) {
                        return el.SessionId == session.Id;
                    });
                    removeByAttr(allSessionsStates, 'SessionId', session.Id);
                    startedSession[0].SessionState = 1;
                    allSessionsStates.push(startedSession[0]);
                    $scope.sessionStates[0].Sessions = JSON.stringify(allSessionsStates);
                    indexes = $scope.Sessions.map(function (obj, index) {
                        if (obj.Name == session.Name) {
                            return index;
                        }
                    }).filter(isFinite);
                    $scope.Sessions[indexes[0]].StartBtn = false;
                    $scope.Sessions[indexes[0]].markAsCompleted = true;
                    $scope.Sessions[indexes[0]].Completed = false;
                    dataContext.saveChanges();
                }


            };
            $scope.CompleteSession = function (session) {
                $scope.completeSessionState = $scope.course.UserCourses[0].SessionStates;
                var allSessionsStates = angular.fromJson($scope.completeSessionState[0].Sessions);
                var startedSession = allSessionsStates.filter(function (el) {
                    return el.SessionId == session.Id;
                });
                removeByAttr(allSessionsStates, 'SessionId', session.Id);
                startedSession[0].SessionState = 2;
                allSessionsStates.push(startedSession[0]);
                $scope.completeSessionState[0].Sessions = JSON.stringify(allSessionsStates);
                indexes = $scope.Sessions.map(function (obj, index) {
                    if (obj.Id == session.Id) {
                        return index;
                    }
                }).filter(isFinite);
                $scope.Sessions[indexes[0]].StartBtn = false;
                $scope.Sessions[indexes[0]].markAsCompleted = false;
                $scope.Sessions[indexes[0]].Completed = true;
                dataContext.saveChanges();

                //});
            };
            $scope.toogleSession = function (session) {
                $scope.session = session;

                if ($scope.session.show)
                    $scope.session.show = false;
                else
                    $scope.session.show = true;
            };
        }

    };
});

app.directive('treeview', function () {
    return {
        //scope: {
        //    model: '='
        //},  // use a new isolated scope
        restrict: 'CA',
        replace: 'true',
        require: 'ngModel',
        link: function ($scope, element, attrs, ngModel) {
            $scope.$watch(attrs.model, function (newValue) {
                if (newValue != null) {
                    element.dynatree({
                        children: newValue,
                        autoCollapse: false,
                        onActivate: function (node) {
                            if ($scope.searchTxt == undefined)
                                $scope.treefilter = node.data.title;
                            $scope.$apply();
                            ngModel.$setViewValue(node.data.Id);
                            //$scope.numberOfPages = function () {
                            //    return Math.ceil(node.data.Courses.length / $scope.pageSize);
                            //}
                            $scope.catId = node.data.Id;
                            $scope.currentPage = 0;
                            //$scope.courses = node.data.Courses;
                            $scope.$apply();
                        },
                        onPostInit: function (isReloading, isError) {
                            var key = $scope.selectedCatId;
                            if (key) {
                                this.activateKey(key);
                            }
                        }
                    });
                }
            });



        },
        //template: '{{model}}',
        //template: '<div></div>'
        //templateUrl: '/Directives/CourseSchedule.html'
    };
});

app.directive('Competenciestreeview', function () {
    return {
        scope: {
            model: '=',
            ngModel: '='
        },  // use a new isolated scope
        restrict: 'C',
        replace: 'true',
        link: function ($scope, element, attrs, ngModel) {

            $scope.$watch('model', function (newValue) {
                if (newValue != null) {
                    $scope.inEventHandler = false;
                    $scope.flag = null;
                    element.dynatree({
                        children: newValue,
                        autoCollapse: false,
                        checkbox: true,
                        selectMode: 2,
                        onSelect: function (flag, node) {
                            $scope.flag = flag;
                            // Ignore, if this is a recursive call
                            if ($scope.inEventHandler)
                                return;
                            // Select all children of currently selected node
                            try {
                                $scope.inEventHandler = true;
                                node.visit(function (childNode) {
                                    childNode.select(flag);
                                }, true);

                                node.visitParents(function (p) {
                                    if (flag)
                                        p.select(flag);
                                }, true);

                                // Select all children of currently selected node
                                //var NodeParent = node.parent;
                                //while (NodeParent != null) {
                                //    NodeParent.select(flag);
                                //    NodeParent = NodeParent.parent;
                                //}

                            } finally {
                                $scope.inEventHandler = false;
                            }


                            if (!flag)
                                // alert("You deselected node with title " + node.data.title);
                            {
                                var index = $scope.courseCompetencySelectedItems.indexOf(node.data.id.toString());
                                if (index > -1) {
                                    $scope.courseCompetencySelectedItems.splice(index, 1);
                                }
                            }
                            var selectedNodes = node.tree.getSelectedNodes();
                            var selectedKeys = $.map(selectedNodes, function (node) {
                                return (node.data.id).toString();
                            });
                            // alert("Selected keys: " + selectedKeys.join(", "));
                            if (selectedKeys.length == 0)
                                $scope.courseCompetencySelectedItems = [];
                            else
                                $scope.courseCompetencySelectedItems = selectedKeys;
                            //ngModel.$setViewValue(selectedKeys);


                            $scope.$apply();
                            var myJoinedString = $scope.courseCompetencySelectedItems.join(',');
                            //$scope.$parent.SelectedCompetencies= myJoinedString;
                            //$scope.$scope.Course.Competencies = myJoinedString;
                            $scope.ngModel = myJoinedString;
                            //ngModel.$setViewValue(myJoinedString);
                        }
                    });
                }
            });
            $scope.$watch('ngModel', function (newValue) {
                if (newValue != null) {
                    if ($scope.inEventHandler == true)
                        return;
                    $scope.inEventHandler = true;
                    var tree = $(element).dynatree("getTree");

                    var selectedKeys = newValue.split(',');
                    $(selectedKeys).each(function (index, key) {
                        if ($scope.flag == null)
                            tree.selectKey(key, true);
                        else
                            tree.selectKey(key, $scope.flag);
                    });
                    $scope.inEventHandler = false;
                }
            });
        },
        //template: '{{model}}',
        //template: '<div></div>'
        //templateUrl: '/Directives/CourseSchedule.html'
    };
});

app.directive('courseDetailsCompetenciestree', function () {
    return {
        //scope: {
        //    model: '='
        //},  // use a new isolated scope
        restrict: 'C',
        replace: 'true',
        link: function ($scope, element, attrs, ngModel) {
            $scope.$watch(attrs.model, function (newValue) {
                if (newValue != null) {
                    element.dynatree({
                        children: newValue,
                        autoCollapse: false,
                    });
                }
            });

        },

    };
});

app.directive('searchCompetenciestreeview', function () {
    return {
        //scope: {
        //    model: '='
        //},  // use a new isolated scope
        restrict: 'C',
        replace: 'true',
        link: function ($scope, element, attrs) {
            $scope.$watch(attrs.model, function (newValue) {
                if (newValue != null) {
                    element.dynatree({
                        children: newValue,
                        autoCollapse: false,
                        checkbox: true, // Show checkboxes.
                        selectMode: 2,
                        onSelect: function (flag, node) {
                            if (!flag)
                                // alert("You deselected node with title " + node.data.title);
                            {
                                var index = $scope.TreeSelectedItemsTemp.indexOf(node.data.id.toString());
                                if (index > -1) {
                                    $scope.TreeSelectedItems.splice(index, 1);
                                }
                            }
                            var selectedNodes = node.tree.getSelectedNodes();
                            var selectedKeys = $.map(selectedNodes, function (node) {
                                return (node.data.id).toString();
                            });
                            // alert("Selected keys: " + selectedKeys.join(", "));
                            if (selectedKeys.length == 0)
                                $scope.TreeSelectedItemsTemp = undefined;
                            else
                                $scope.TreeSelectedItemsTemp = selectedKeys;
                            //ngModel.$setViewValue(selectedKeys);

                        }
                    });
                }
            });

        },
        //template: '{{model}}',
        //template: '<div></div>'
        //templateUrl: '/Directives/CourseSchedule.html'
    };
});

app.directive('courseCard', function () {
    return {
        scope: {
            course: '=',
            showpushselect: '=',
            pushcourse: '&'
        },
        restrict: 'AEC',
        replace: 'true',
        templateUrl: '/Directives/coursecard.html',
        controller: function ($scope, $element, $attrs, dataContext) {
            if ($scope.course.Instructor != null && $scope.course.Instructor != '') {
                $scope.course.Instructors = $scope.course.Instructor.split(',');
                $scope.InstructorFlag = true;
            }
            else
                $scope.InstructorFlag = false;

            $scope.EnrollCourse = function (course) {
                $scope.disable = true;
                dataContext.enrollInCourse(course).then(function () {
                    course.isEnrolled = true;

                    dataContext.saveChanges().then(function () {
                        toastr.success('You have enrolled to the course successfully');
                        $scope.enroll = true;
                        $scope.disable = false;
                        $scope.$apply();
                    });
                });
            };


            $scope.UnEnrollCourse = function (course) {
                $scope.disable = true;
                dataContext.unEnrollInCourse(course);

                dataContext.saveChanges().then(function () {
                    toastr.success('You have un-enrolled to the course successfully');
                    $scope.enroll = false;
                    course.isEnrolled = false;

                    $scope.disable = false;
                    $scope.$apply();
                });
            };

            $scope.RegisterCourse = function (course) {

                dataContext.createRequest({ Status: "PendingAdminApproval", CourseId: course.ID });
                dataContext.saveChanges();
                course.isRequested = true;
            };
        },
        link: function ($scope, element, attrs) {
            $scope.$watch("course", function (newValue) {
                var trimTitleTxt = $(element).find('.course-name');
                var trimInstructorTxt = $(element).find('.course-owner');
                smartTrimText(trimTitleTxt, 60);
                smartTrimText(trimInstructorTxt, 65);
                //var trimInstTxt = $(element).find('.course-owner');
                //smartTrimText(trimInstTxt, 40);
            });
            //showPushSelect
            $(element).hover(
                   function () {
                       var imgHeight = $(element).find('.course-img').height();
                       var trimDetailsTxt = $(element).find('.custom-course-item-details');
                       smartTrimText(trimDetailsTxt, 250);
                           $(element).find('.course-img').stop().animate({ "top": -(imgHeight) + "px" }, "slow");
                       $(element).find('.block-details').stop().animate({ "top": "0px" }, "slow");
                       $(element).find('p.custom-course-item-details,footer.favorite-bar-hover').stop().fadeTo("slow", 1);

                   }, function () {
                       var imgHeight = $(element).find('.course-img').height();
                       //alert(imgHeight);
                       $(element).find('.course-img').stop().animate({ "top": "0px" }, "slow");
                       $(element).find('.block-details').stop().animate({ "top": imgHeight + "px" }, "slow");
                       $(element).find('p.custom-course-item-details,footer.favorite-bar-hover').stop().fadeTo("slow", 0);

                   }
         );
        },
    };
});

app.directive('fileUpload', function () {
    return {
        scope: {
            model: '=model',
            url: '=url',
            accept: '@accept',
            //ngModel: "=ngModel"
        },
        replace: false,
        restrict: 'AE',
        templateUrl: '/Directives/fileUpload.html',
        controller: function ($scope) {
            var courseImageUrl = '';
            var imageOnly = $scope.accept == "image/*";

            $scope.setFiles = function (element) {
                $scope.$apply(function (scope) {

                    //console.log('files:', element.files);
                    // Turn the FileList object into an Array

                    // To DO : instead of hiding and show the error , update the parent scope : UrlMaterial

                    if (element.parentElement.attributes["required"] != null) {
                        if (element.parentElement.attributes["required"].value == "true") {
                            if (element.files.length > 0)
                                $('#NoMaterialValidation').hide();
                            else
                                $('#NoMaterialValidation').show();

                        }
                    }

                    $('#ImgUploadValidation').hide();
                    scope.files = [];
                    for (var i = 0; i < element.files.length; i++) {
                        if (imageOnly) {
                            if (element.files[i].type.indexOf("image/") < 0) {
                                //toastr.error("No Image was uploaded. Please upload an image");
                                $('#ImgUploadValidation').show();
                                return;
                            }
                        }
                        else {
                            if (element.files[i].type.indexOf("bin/") >= 0 ||
                                element.files[i].type.indexOf("dll/") >= 0 ||
                                element.files[i].type.indexOf("application/") >= 0 ||
                                element.files[i].name.indexOf(".js") >= 0) {
                                toastr.error("Can't upload harmfull file type");
                                document.getElementById("materialFile").firstChild.value = '';
                                // $('#ImgUploadValidation').show();
                                return;
                            }
                        }
                        scope.files.push(element.files[i]);
                    }
                    scope.progressVisible = false;
                    $scope.uploadFile();
                    courseImageUrl = "/Uploads/" + scope.files[0].name;
                    //scope.ngModel = courseImageUrl;
                });
            };

            $scope.uploadFile = function () {
                var fd = new FormData();
                for (var i = 0; i < $scope.files.length; i++) {
                    //for (var i in $scope.files) {
                    fd.append("uploadedFile" + i, $scope.files[i]);
                }
                var xhr = new XMLHttpRequest();
                xhr.upload.addEventListener("progress", uploadProgress, false);
                xhr.addEventListener("load", uploadComplete, false);
                xhr.addEventListener("error", uploadFailed, false);
                xhr.addEventListener("abort", uploadCanceled, false);

                fd.append("accountIds", $scope.SelectedAccountsIds);
                fd.append("duration", $scope.Duration);
                var url = "/Home/fileupload";
                xhr.open("POST", url);

                $scope.progressVisible = true;
                xhr.send(fd);
            };

            function uploadProgress(evt) {
                $scope.$apply(function () {
                    if (evt.lengthComputable) {
                        $scope.progress = Math.round(evt.loaded * 100 / evt.total);
                    } else {
                        $scope.progress = 'unable to compute';
                    }
                });
            }

            function uploadComplete(evt) {
                /* This event is raised when the server send back a response */
                //alert(evt.target.responseText)
                toastr.success('files uploaded successfully');
                $scope.url = courseImageUrl;
                $scope.$apply();
            }

            function uploadFailed(evt) {
                alert("There was an error attempting to upload the file.");
            }

            function uploadCanceled(evt) {
                $scope.$apply(function () {
                    $scope.progressVisible = false;
                });
                alert("The upload has been canceled by the user or the browser dropped the connection.");
            }

        },
    };
});

app.directive('searchBox', function () {
    return {
        scope: {
            model: '=model',
        },
        replace: false,
        restrict: 'AE',
        templateUrl: '/Directives/SearchBox.html',
        controller: function ($scope, $element, $attrs, dataContext) {
            $scope.redirect = function () {
                var Searchtxt = $scope.searchTxt;
                if ($scope.searchTxt == "") {
                    $('#SearchTxtSpaceValidation').show();
                    return false;
                }
                var iChars = "!@#$%^&()+=-[]\\\';,./{}|\":<>?";
                for (var i = 0; i < Searchtxt.length; i++) {
                    if (iChars.indexOf(Searchtxt.charAt(i)) != -1) {
                        $('#SearchTxtValidation').show();
                        return false;
                    }
                    if ($scope.searchTxt != undefined)
                        window.location = "#/CoursesCatalog/" + $scope.searchTxt;
                    else
                        window.location = "#/CoursesCatalog";
                }
            }
            $scope.srchTxtChange = function () {
                $('#SearchTxtValidation').hide();
                $('#SearchTxtSpaceValidation').hide();
            }
            $scope.checkEnterKey = function (e) {
                if (e.keyCode == 13) {
                    $scope.redirect();
                }
            }

        },
    };
});

app.directive('loading', ['$http', function ($http) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            scope.isLoading = function () {
                return $http.pendingRequests.length > 0;
            };

            scope.$watch(scope.isLoading, function (v) {
                if (v) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };

}]);

app.directive('hcPie', function () {
    return {
        restrict: 'C',
        replace: true,
        scope: {
            items: '=',
            onSelectionChanged: '&',      // Pass a reference to the method 
        },
        template: '<div id="container" style="margin: 0 auto">not working</div>',
        link: function ($scope, element, attrs) {
            var chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    width: 360,
                    background: '#fafafa'
                },
                title: {
                    text: ''
                },
                tooltip: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,

                            //format: '<b>fsdafsadf{point.name}</b>:  ',
                            formatter: function () {
                                return '<b>' + this.point.name + '</b>: ' + this.point.y;
                            },
                            distance: -50,

                        },
                        point: {
                            events: {
                                click: function () {
                                    //this.name
                                    $scope.onSelectionChanged({ name: this.name });
                                }
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    data: $scope.items
                }]

            });
            $scope.$watch("items", function (newValue) {
                chart.series[0].setData(newValue, true);
            }, true);

        }
    };
});

app.directive('createSrc', function () {
    var defaultImage = '/content/common/images/default-course-background.jpg';
    return {
        link: function (scope, element, attrs) {
            attrs.$set('src', defaultImage);
            element.bind('error', function () {
                if (attrs.src != attrs.createSrc || attrs.src == "") {
                    attrs.$set('src', defaultImage);
                    //attrs.$set('src', attrs.createSrc);
                }
            });
        }
    };
});

app.directive('errSrc', function () {

    var defaultImage = '/content/common/images/default_thumb_img.jpg';
    return {

        link: function (scope, element, attrs) {

            scope.$watch('selectedStatusCourses', function () {

                if (attrs.ngSrc == '') {

                    attrs.$set('src', defaultImage);

                    element.bind('error', function () {
                        if (attrs.src != attrs.errSrc || attrs.src == "") {
                            attrs.$set('src', defaultImage);
                            //attrs.$set('src', attrs.errSrc);
                        }
                    });
                }

            });
        }
    };
});

app.directive('errBig', function () {
    var defaultImage = '/content/common/images/course_default_img.jpg';
    var defaultImageAr = '/content/common/images/course_default_img-ar.jpg';
    return {
        link: function (scope, element, attrs) {
            attrs.$set('src', defaultImage);
            element.bind('error', function () {
                if (attrs.src != attrs.errBig || attrs.src == "") {
                    attrs.$set('src', defaultImage);
                    //attrs.$set('src', attrs.errBig);
                }
            });
        }
    };
});


app.directive('dashboardHeader', function () {
    return {
        //scope: {
        //    model: '='
        //},  // use a new isolated scope
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/Directives/DashboardHeader.html'
    };
});
app.directive('createHeader', function () {
    return {
        //scope: {
        //    model: '='
        //},  // use a new isolated scope
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/Directives/CreateCourseHeader.html'
    };
});


app.directive('changeblock', function () {
    return {
        scope: {
            block: '@',
            currentstep: '=',
            course: '='
        },  // use a new isolated scope
        restrict: 'AE',
        replace: 'true',
        controller: function ($scope, $element, $attrs, dataContext) {
            dataContext.getAllCourse().then(function (data) {
                $scope.allCourses = data.results;
            });
            if ($scope.currentstep == 5 && $scope.block == 6) {
                $scope.$parent.$parent.mytime = new Date();
            }
        },
        link: function (scope, element, dataContext) {

            $(element).on('click', function () {

                var current = parseInt(scope.block); //$(element).data('currentblock'),

                

                if (scope.currentstep == 5 && scope.block == 6) {
                    if (scope.$parent.Course.Sessions.length == 0) {
                        $('#noSessionValidation').show();
                        return false;
                    }
                    else {
                        $('#noSessionValidation').hide();
                        $('#createCourseForm').parsley().destroy();
                        scope.currentstep = current.toString();
                        scope.$apply();
                    }
                }

                //if (scope.currentstep == 55) {
                //    alert("don't validate parent");
                //    // validate URL
                //    return;
                //}

                // only validate going forward. If current group is invalid, do not go further
                // .parsley().validate() returns validation result AND show errors
                if (current > scope.currentstep) {
                    if (scope.currentstep == 0) {

                        if (false === $('#createCourseForm').parsley().validate('block' + scope.currentstep))
                            return false;

                        var result = $.grep(scope.allCourses, function (e) { return e.Name == scope.course.Name && e.CategoryId == scope.course.CategoryId; });
                        if (result.length > 0 && result[0].ID != scope.course.ID) {
                            $('#courseNameValidation').show();
                            $('#courseName').addClass('parsley-error');
                            return false;
                        }
                    }
                    else if (false === $('#createCourseForm').parsley().validate('block' + scope.currentstep))
                        return false;
                }

                //$("#WizardLinks li").removeClass('wizard-link-selected');
                //$(element).addClass('wizard-link-selected');



                // validation was ok. We can go on next step.
                scope.currentstep = current.toString();
                scope.$apply();

                //$('.block' + current)
                //    .removeClass('show')
                //    .addClass('hidden');

                //$('.block' + next)
                //    .removeClass('hidden')
                //    .addClass('show');
            });
        }
    };
});

app.directive('pushCourses', function () {
    return {
        scope: {
            coursesToPush: '='
        },
        restrict: 'AE',
        replace: false,
        templateUrl: '/Directives/PushCourses.html',
        link: function (scope, element, userServices) {
            scope.$watch("coursesToPush", function (newval) {
                console.log(newval);
                console.log("Push Courses: " + scope.coursesToPush);
            })
            // console.log("Push Courses: " + scope.coursesToPush);
        },
        controller: function ($scope, $element, $attrs, $routeParams, userServices) {
            $scope.RemoveCourse = function (course) {
                $scope.coursesToPush = $scope.coursesToPush.filter(function (el) {
                    course.selected = false;
                    return (el !== course);
                })

            }
            userServices.getFilters().then(function (userFilters) {
                $scope.filters=userFilters.data;
            });

        }
        //controller: function ($scope, $element, $attrs, datacontext) {
        //    $scope.RemoveCourse = function (course) {
        //        alert("remove");
        //    }
        //}
    }

});

//If you want to display the error image when ngSrc is blank you can add this:

//attrs.$observe('ngSrc', function(value) {
//    if (!value && attrs.errSrc) {
//        attrs.$set('src', attrs.errSrc);
//    }
//});

//app.directive("valueDisplay1", function () {
//    return {
//        restrict: "E",
//        link: function (scope, element, attrs) {
//            element.text(scope[attrs.value]);
//        }
//    };
//});

//app.directive("valueDisplay2", function () {

//    return {
//        restrict: "E",
//        link: function (scope, element, attrs) {
//            scope.$watch(attrs.value, function (newValue) {
//                element.text(newValue);
//            });
//        }
//    };

//});

//app.directive("valueDisplay3", function () {
//    return {
//        restrict: "E",
//        link: function (scope, element, attrs) {
//            attrs.$observe("value", function (newValue) {
//                element.text(newValue);
//            });
//        }
//    };
//});
//app.directive("valueDisplay4", function () {
//    return {
//        restrict: "E",
//        scope: {
//            value: "="
//        },
//        template: '{{value}}',
//    };
//});

//app.directive("valueDisplay5", function () {
//    return {
//        restrict: "E",
//        scope: {
//            value: "@"
//        },
//        template: '{{value}}',
//    };
//});


function smartTrimText(elem, numChars) {

    var text, trimmedStr, afterLastChar, dots, altCharIndex, isSmartTrim;
    text = $.trim($(elem).text());
    trimmedStr = text.substring(0, numChars - 1); //the trimmed text according to the number of characters required                
    afterLastChar = text.charAt(numChars - 1); //the character after the last one  
    dots = "<span class='dots'>...</span>";

    if (afterLastChar === " ") isSmartTrim = false; //will no require smart trimming, just normal trimming
    else isSmartTrim = true;

    if (text.length > numChars) {
        if (isSmartTrim) {
            altCharIndex = trimmedStr.lastIndexOf(" ");
            trimmedStr = trimmedStr.substring(0, altCharIndex);
        }
        $(elem).text(trimmedStr).append(dots).attr('title', text);
    }
}