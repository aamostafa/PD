//note that 'ui.bootstrap' must comes before  'mgcrea.ngStrap' otherwise datepicker will not work



app.filter('startFrom', function () {
    return function (input, start) {
        start = +start;
        if (input != undefined)//parse to int
            return input.slice(start);
        else
            return;
    }
});


app.controller('adminCtrl', function ($scope, $http) {
});





app.controller('CourseDetailsCtrl', function($scope, $routeParams, dataContext) {
    $scope.showPushPopup = function () {
        $('#Push-popup').modal('show');
        $('#Push-popup').modal({
            backdrop: true
        });
    };
    $scope.cancelPushPopup = function () {
        $('#Push-popup').modal('hide');
    };
    $scope.PushedCourses = [];
    //edit 
    $scope.getCourseByIdPromise = dataContext.getCourseById($routeParams.id);

    if ($routeParams.id) {
        dataContext.getUserCourseByCourseId($routeParams.id).then(function (userData) {
            
            $scope.getCourseByIdPromise.then(function (data) {
                var Course = data.results[0];
               if(userData.results.length>0)
                Course.UserCourses.push(userData.results[0])

               $scope.Course = Course;
               $scope.PushedCourses.push($scope.Course);
                $scope.availableSeats = $scope.Course.NumberOfSeats - $scope.Course.NumberOfReservedSeats;
                $scope.Course.enroll = userData.results.filter(function(userCourse) {
                    return userCourse.CourseId == $scope.Course.ID;
                }).length > 0;

                if (new Date() > $scope.Course.EndDate)
                    $scope.Course.disable = true;
                else
                    $scope.Course.disable = false;

                if ($scope.Course.NumberOfSeats == $scope.Course.NumberOfReservedSeats)
                    $scope.Course.isReserved = true;
                else
                    $scope.Course.isReserved = false;

                

                dataContext.getAllRequests().then(function (Requests) {

                    var allRequests = Requests.results;
                    var userRequests = $.grep(allRequests, function (e) { return e.CourseId == $scope.Course.ID; });
                    if (userRequests.length == 0) 
                        $scope.Course.isRequested = false;
                    else {
                        switch (userRequests[0].Status) {
                            case "PendingAdminApproval": //not started 
                                $scope.Course.isRequested = true;
                                $scope.Course.isApproved = false;
                                $scope.Course.isRejected = false;
                                break;
                            case "Approved": // check status & the record is inserted in UserCourses
                                if ($scope.Course.UserCourses.length > 0 && $scope.Course.IsFacetoFace) {
                                    $scope.Course.isApproved = true;
                                    $scope.Course.isRequested = false;
                                    $scope.Course.isRejected = false;
                                }
                                //else {// Workflow corrupted,  because status should be approved when a record is saved in UserCourses
                                //    $scope.Course.isRequested = true;
                                //    $scope.Course.isApproved = false; 
                                //    $scope.Course.isRejected = false;
                                //}
                                break;
                            case "Rejected":
                                $scope.Course.isRequested = false;
                                $scope.Course.isApproved = false;
                                $scope.Course.isRejected = true;
                                break;
                            default:
                                break;
                        }
                    }
                });


                if ($scope.Course.Instructor != null && $scope.Course.Instructor != '') {
                    $scope.Course.Instructors = $scope.Course.Instructor.split(',');
                    $scope.instructorFlag = true;
                } else {
                    $scope.instructorFlag = false;
                }
                $scope.$apply();

                //Competiences
                var competenciesIds = [];
                if ($scope.Course.Competencies != null)
                    competenciesIds = $scope.Course.Competencies.split(',');

                dataContext.getCompetencies().then(function(data) {
                    $scope.Competencies = data.results;
                    // $scope.$apply();

                    var data = data.results.filter(function(value, index, ar) {
                        if (competenciesIds.indexOf(value.Id.toString()) > -1)
                            return true;
                        else
                            return false;
                    });
                    $scope.CompetenciesTree = [];
                    var courseCopmetencies = [];
                    $scope.tree = $(data).each(function(index, item) {
                        courseCopmetencies = [];
                        item.title = item.Name;
                        item.id = item.Id;
                        if (item.Competencies1.length > 0) {
                            $(item.Competencies1).each(function(index, item) {
                                if (competenciesIds.indexOf(item.Id.toString()) > -1)
                                    courseCopmetencies.push(item);
                            });
                            item.children = courseCopmetencies;
                        }
                        item.isFolder = true;
                        if (item.ParentId == null) {
                            $scope.CompetenciesTree.push(item);
                        }
                    });
                    $scope.CompetenciesTree;
                });
            });
        });
    }

    $scope.EnrollCourse = function(course) {
        $scope.disable = true;
        dataContext.enrollInCourse(course).then(function() {
            dataContext.saveChanges().then(function() {
                //toastr.success('You have enrolled to the course successfully')

                
                //$scope.$apply();
                dataContext.getCourseById($routeParams.id).then(function (data) {
                    $scope.Course = data.results[0];
                    $scope.Course.enroll = true;
                    $scope.disable = false;
                    $scope.$apply();
                });
            });
        });

    }

    $scope.UnEnrollCourse = function(course) {
        $scope.disable = true;
        dataContext.unEnrollInCourse(course);

        dataContext.saveChanges().then(function () {
            $('#OverviewTab a').trigger('click');
            toastr.success('You have un-enrolled to the course successfully')
            $scope.Course.enroll = false;
            $scope.disable = false;
            $scope.$apply();
        });
    };

    $scope.RegisterCourse = function (Course) {
        dataContext.createRequest({ Status: "PendingAdminApproval", CourseId: Course.ID });
        dataContext.saveChanges();
        $scope.Course.isRequested = true;
    }

    //Pushing Courses
 
    $scope.PushCourses = function () {
        //select the course again to show it in the pop up
        $scope.Course.selected = true;
        //if course is removed add it
        if ($scope.PushedCourses.length <= 0)
            $scope.PushedCourses.push($scope.Course);
        $scope.showPushSelect = true;
    }
});
app.controller('CourseDetailsFAQ', function($scope, $routeParams, dataContext) {

});

var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
        if (arr[i] && arr[i].hasOwnProperty(attr) && (arguments.length > 2 && arr[i][attr] === value)) {
            arr.splice(i, 1);
        }
    }
    return arr;
}

app.controller('CreateCourseCtrl', function ($scope, dataContext, $routeParams,$q,$translate) {
    $scope.$on('$routeChangeStart', function (event, next, current) {
        
        if (dataContext.hasChanges()) {
            dataContext.rejectChanges();
            //event.preventDefault();
            //$('#lblMissingFields').show();
        }
        //Do Stuff
    });
   
    //Initialize 
    var startUpPromise = [dataContext.getCategorySections(), dataContext.getCompetencies()]

    $scope.today = new Date();

    if ($routeParams.id == null)
        startUpPromise.push(dataContext.createCourse({ StartDate: null, EndDate: null }));
    else
        startUpPromise.push(dataContext.getCourseById($routeParams.id));

    $q.all(startUpPromise).then(initialze);

    function initialze(data) {
        //Category sections
        $scope.Sections = data[0].results;

        //Competencies
        $scope.Competencies = data[1].results;
        $scope.allCompetenciesTree = [];
        $scope.tree = $($scope.Competencies).each(function (index, item) {
            item.title = item.Name;
            item.id = item.Id;
            item.key = item.Id;
            if (item.Competencies1.length > 0)
                item.children = item.Competencies1;
            item.isFolder = true;
            if (item.ParentId == null) {
                $scope.allCompetenciesTree.push(item);
            }
        });

        //Course 
        if ($routeParams.id != null) {
            $scope.Course = data[2].results[0];
            $scope.SectionId = $scope.Course.Category.CategorySection.Id;
            $scope.Sessions = $scope.Course.Sessions;
            $scope.SelectSection();
        } else {
            $scope.Course = data[2];
        }
    };
    

    $scope.SelectSection = function () {
        var id = $scope.SectionId;
        //SectionId
        dataContext.getCategoriesBySectionId(id).then(function (data) {
            $scope.Categories = data.results;
            $scope.$apply();
    });
    }

    $scope.courseNameChange = function () {
        $('#courseNameValidation').hide();
    }

    


    
    $scope.currentstep = 0;

    $scope.Materials = [];
    $scope.Sessions = [];
    $scope.isEdit = false;
    $scope.SessionsOccurArr = ["Daily", "Weekly", "Bi Weekly", "Tri-Weekly", "Monthly"];

    $scope.EditCourse = function (Course) {
        $scope.isEdit = true;
    }

    $scope.SaveCourse = function (Course) {
        //to do validation
            if (false === $('#createCourseForm').parsley().validate('block0'))
            
                return false;
            dataContext.getAllCourse().then(function (data) {
                $scope.allCourses = data.results;
                var result = $.grep($scope.allCourses, function (e) { return e.Name == $scope.Course.Name && e.CategoryId == $scope.Course.CategoryId; });
                if (result.length > 0 && result[0].ID != scope.course.ID) {
                    $('#courseNameEditValidation').show();
                    $('#editCourseNameTxt').addClass('parsley-error');
                    return false;

                }
                else {

                    $scope.isEdit = false;
                    $scope.Course = Course;
                    $scope.$apply();
                }
            });
            
            
        
       // $scope.$apply();
    }

    $scope.editCourseNameChange = function () {
        $('#courseNameEditValidation').hide();
    }

    $scope.AddMaterial = function () {

        if (document.getElementById("materialFile").firstChild.childNodes[3].files.length<=0) {
            //$scope.UrlMaterial = '';
            $('#NoMaterialValidation').show();
        }
        else {
            
            $('#NoMaterialValidation').hide();
            
           // $scope.UrlMaterial = $scope.Material.Url;
            if (document.getElementById("materialTitle").value == '')
                $scope.Material.Name = $scope.Material.Url.split('/')[2];
            $scope.Materials.push($scope.Material);
            $scope.Material = null;
            document.getElementById("materialFile").firstChild.childNodes[3].files[0]='';
        }
    }

    $scope.SessionNameChange = function () {

        $scope.UniqueSessionName = false;
        $('#sessionName').removeClass('parsley-error');
        $('#noSessionValidation').hide();
    }
    //$scope.mytime = new Date();
    $scope.hstep = 1;
    $scope.mstep = 1;
    //$scope.Session.StartTime = new Date();
    //$scope.Session.EndTime = new Date();
    $scope.EndTimechanged = function () {
        $scope.TimerValidation = false;
    }
    $scope.StartTimechanged = function () {
        $scope.TimerValidation = false;
    }
    $scope.AddSession = function () {
        if (false === $('#createCourseForm').parsley().validate('block5')) {
            return;
        }
        var result = $.grep($scope.Course.Sessions, function (e) { return e.Name == $scope.Session.Name; });
        if (result.length > 0) {
      
            $scope.UniqueSessionName = true;
            // $("#createCourseForm").parsley().validate().element("#sessionName") = false;
            $('#sessionName').addClass('parsley-error');
            return;
        }
        else {

            $('#noSessionValidation').hide();
            $scope.UniqueSessionName = false;

            if ($scope.Session.StartDateTime == undefined)
                $scope.Session.StartDateTime = $scope.mytime;
            if ($scope.Session.EndDateTime == undefined)
                $scope.Session.EndDateTime = $scope.mytime;

            if ($scope.Session.StartDateTime >= $scope.Session.EndDateTime) {
                $scope.TimerValidation = true;
                return;
            }

            


            $scope.Session.Materials = $scope.Materials;
            $scope.Session.Course = $scope.Course;
            if ($scope.Course.IsFacetoFace) {
                $scope.Session.StartDate = new Date($scope.Session.StartDate.getFullYear(), $scope.Session.StartDate.getMonth(), $scope.Session.StartDate.getDate(), $scope.Session.StartDateTime.getHours(), $scope.Session.StartDateTime.getMinutes());
                $scope.Session.EndDate = new Date($scope.Session.StartDate.getFullYear(), $scope.Session.StartDate.getMonth(), $scope.Session.StartDate.getDate(),
                    $scope.Session.EndDateTime.getHours(), $scope.Session.EndDateTime.getMinutes());
            }
            dataContext.createSession($scope.Session);

            $scope.Session = null;
            $scope.Materials = [];
            document.getElementById("sessionName").value = '';
            document.getElementById("sessionObjective").value = '';
            document.getElementById("SessionPublishingDate").value = '';
            document.getElementById("SessionStartDate").value = '';
        }
    }

    $scope.DeleteSession = function (Session, index) {

        $(Session.Materials).each(function (index, item) { dataContext.deleteMaterial(item); });
        $scope.Course.Sessions.splice(index, 1);
        dataContext.deleteSession(Session);
        
    }

    $scope.EditSession = function (Session, index) {
        $(Session.Materials).each(function (index, item) { $scope.Materials.push({ Name: item.Name, Url: item.Url }) });
        $scope.Session = {
            Name: Session.Name,
            PublishedDate: Session.PublishedDate,
            Objectives: Session.Objectives,
            StartDate: Session.StartDate,
            StartDateTime: Session.StartDate,
            EndDateTime: Session.EndDate
        };
        $scope.$apply();
        $scope.DeleteSession(Session, index);
        $('.session-form-header').show();
        $('#SessionForm').show();
        $('#materialsDiv').show();
    }

    $scope.DeleteMaterial = function (material) {
        $scope.Materials = $scope.Materials
               .filter(function (el) {
                   return (el !== material);
               })
    }

    $scope.AddFAQ = function () {
        $scope.FAQ.Course = $scope.Course;
        dataContext.createFaq($scope.FAQ);
        // $scope.FAQ = null;
        document.getElementById("faqQuestion").value = '';
        document.getElementById("faqAnswer").value = '';
    }

    $scope.DeleteFAQ = function (faq) {
        dataContext.deleteFaq(faq);
    }

    $scope.EditFAQ = function (faq) {
        document.getElementById("faqQuestion").value = faq.Question;
        document.getElementById("faqAnswer").value = faq.Answer;
        dataContext.deleteFaq(faq);
    }

    $scope.IsFaceToFace = function (course) {
        if (course.IsFacetoFace) {
            
            $('#createCourseForm').parsley().destroy();
            $('#NumberOfSeatsTxt').attr('data-parsley-required', 'true');
            $('#NumberOfSeatsTxt').attr('data-parsley-required-message', $translate.instant('Number of seats required'));
            $('#createCourseForm').parsley();
       
        }
        else {
            $('#createCourseForm').parsley().destroy();
            $('#NumberOfSeatsTxt').attr('data-parsley-required', 'false');
            $('#createCourseForm').parsley();
            $scope.Course.NumberOfSeats = null;

        }
    }

    $scope.Publish = function () {
        console.log($scope);
        if ($scope.Course.Instructor != null && $scope.Course.Instructor!= '') {
            $scope.Course.instructors = $scope.Course.Instructor.split(',');
        }
        //$scope.Course.Competencies = $scope.SelectedCompetencies;

        if ($scope.Course.Description == null || $scope.Course.Details == null ||
            $scope.Course.EndDate == null || $scope.Course.StartDate == null || $scope.Course.Sessions.length == 0) {
            $('#lblMissingFields').show();
        }
        else
            $('#lblMissingFields').hide();
        
        dataContext.saveChanges().then(function () {
            $('#lblMissingFields').hide();
            if ($routeParams.id == undefined) {
                
                toastr.success($translate.instant('Your course is saved successfully'));
                window.location = "#/EditCourse/" + $scope.Course.ID;
            }
            else {
                toastr.success($translate.instant('Your course is updated successfully'));
                window.location = "#/CourseDetails/" + $scope.Course.ID;
            }
        });

       
    }

    $scope.addNewSession = function() {
        $('.session-form-header').show();
        $('#SessionForm').show();
        $('#noSessionValidation').hide();
        $('#materialsDiv').hide();
    };
    $scope.addNewContent = function () {
        $('#materialsDiv').show();
    }
    $("#WizardLinks .wizard-link-selected").prevAll().css("color", "#575757");


});

// DAshboard

