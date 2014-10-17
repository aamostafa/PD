app.directive('profileHead', function () {
    return {
        //scope: {
        //    model: '=model',
        //    block: '=',
        //    userprofile: '=userprofile'
        //},
        replace: false,
        restrict: 'AE',
        templateUrl: '/Directives/profileHead.html',
    };
});

app.directive('profileExperiance', function () {
    return {
        //scope: {
        //    model: '=model',
        //    block: '=',
        //    userprofile: '=userprofile'
        //},
        replace: false,
        restrict: 'AE',
        templateUrl: '/Directives/profileExperiance.html',
    };
});


app.directive('profileIntersets', function () {
    var translate;
    return {
        scope: {
            inputData: '=',
            outputData: '=',
            userprofile: '='
        },  // use a new isolated scope
        restrict: 'AE',
        replace: 'true',
        templateUrl: '/Directives/ProfileIntersets.html',
        controller: function ($scope, $element, $attrs, dataContext, $translate) {
            translate = $translate;

            $scope.EditMode = false;
            $scope.$watch("userprofile", function (newValue) {
                if (newValue != null)
                    $scope.intersets = angular.fromJson($scope.userprofile.Interests);
            });
            $scope.SaveInetersets = function () {

                $scope.intersets = $("#txtIntersets").tokenInput("get");
                console.log($scope.intersets)
                var UserIntersets = JSON.stringify($scope.intersets);
                $scope.userprofile.Interests = UserIntersets;
                dataContext.saveChanges();
                $scope.EditMode = false;
            }
            $scope.DisplayEditMode = function () {
                $("#txtIntersets").tokenInput("clear");
                if ($scope.intersets != null) {
                    for (var i = 0; i < $scope.intersets.length; i++) {
                        $("#txtIntersets").tokenInput("add", $scope.intersets[i]);
                    }
                }

                $scope.EditMode = true;
            }
            $scope.CancelInetersets = function () {

                $("#txtIntersets").tokenInput("clear");
                $scope.EditMode = false;
            }
            $scope.goToCategoryPage = function (CatID) {
                window.location = "/#/CoursesCatalog?catId="+CatID

            }
        },
        link: function ($scope, element, attrs) {

            $scope.$watch("inputData", function (newValue) {
                if (newValue != null) {

                    $("#txtIntersets").tokenInput($scope.inputData, {
                        theme: "facebook", propertyToSearch: 'Name',
                        tokenValue: 'Id', preventDuplicates: true,
                        hintText: translate.instant("Type in a search term"),
                        noResultsText: translate.instant("No results"),
                        searchingText: translate.instant('Searching')

                    });
                }
            });

        },
    };
});

app.directive('aboutMe', function () {
    return {

        replace: false,
        restrict: 'AE',
        templateUrl: '/Directives/profileAboutMe.html',

    };
});

app.directive('findMe', function () {
    return {

        replace: false,
        restrict: 'AE',
        templateUrl: '/Directives/profileFindMe.html',

    };
});

app.directive('personalDetails', function () {
    return {
        replace: false,
        restrict: 'AE',
        templateUrl: '/Directives/profilePersonalDetails.html'
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