//var app = angular.module('profileApp', ['ngRoute', 'dataContext', 'ngAnimate',
//                                                'ui.bootstrap', 'cgBusy', 'mgcrea.ngStrap'
//                                                , 'pascalprecht.translate']);

//UserProfile 
app.controller('UserProfileCtrl', function ($scope, dataContext, $translate) {

    $scope.getCountriesPromise = dataContext.getCountries();
    $scope.getAllMaritalStatusPromise = dataContext.getMaritalStatuses();

    //dataContext.getMaritalStatuses().then(function (data) {
    //    console.log("Marital statuses:" + data);
    //    $scope.allMaritalStatuses = data.results;
    //    $scope.maritalstatusId = $scope.UserProfiles.MaritalStatusId;
    //    $scope.$apply();
    //});

    dataContext.getUserProfiles().then(function (data) {
        $scope.UserProfiles = data.results[0];
        if ($scope.UserProfiles.BirthDay != null) {
            //$scope.myBirthDay = $scope.UserProfiles.BirthDay;
            $scope.birthDay = $scope.UserProfiles.BirthDay.getDate() + 1;
            $scope.birthMonth = $scope.UserProfiles.BirthDay.getMonth();
            $scope.birthYear = $scope.UserProfiles.BirthDay.getFullYear();

            $scope.myBirthDay = new Date($scope.birthYear, $scope.birthMonth, $scope.birthDay)

        }

        $scope.userImage = $scope.UserProfiles.ImageUrl;
        $scope.userSchool = $scope.UserProfiles.School;
        $scope.userGender = $scope.UserProfiles.Gender;
        $scope.aboutMe = $scope.UserProfiles.About;
        $scope.facebookUrl = $scope.UserProfiles.FacebookUrl;
        $scope.linkedInURL = $scope.UserProfiles.LinkedInUrl;
        $scope.twitterURl = $scope.UserProfiles.TwitterUrl;
        $scope.googleURl = $scope.UserProfiles.GoogleUrl;
        //$scope.myBirthDay = $scope.UserProfiles.BirthDay;
     
        //for Skip Button
        $scope.isFirstTimeLogin = true;
        if ($scope.UserProfiles.Gender == null || $scope.UserProfiles.UserName == null ||
            $scope.UserProfiles.Title == null || $scope.UserProfiles.JoinedDate == null)
            $scope.isFirstTimeLogin = true;
        else
            $scope.isFirstTimeLogin = false;

        $scope.socailMediaEmpty = IsSocialMediaDataEmpty($scope);
      
        $scope.getCountriesPromise.then(function (data) {
            $scope.Countries = data.results;
            $scope.$apply();
            if ($scope.UserProfiles.CountryId != null) {
                var id = $scope.UserProfiles.CountryId;
                dataContext.getRegionsByCountryId(id).then(function (regions) {
                    $scope.Regions = regions.results;
                    $scope.$apply();
                });
            }

            $scope.CountryId = $scope.UserProfiles.CountryId;
            $scope.RegionId = $scope.UserProfiles.RegionId;
            $scope.Country = $scope.UserProfiles.Country.Name;
            $scope.Region = $scope.UserProfiles.Region.Name;



        });

        $scope.getAllMaritalStatusPromise.then(function (data) {
            $scope.allMaritalStatuses = data.results;
            $scope.maritalstatusId = $scope.UserProfiles.MaritalStatusId;
            
        })

        $scope.$apply();
    });

    $scope.Delete = function (UserProfile, index) {
        $scope.UserProfiles.splice(index, 1);
        dataContext.deleteUserProfile(UserProfile).then(function () {
            toastr.success('UserProfile deleted successfully');
        });
    };

    //$scope.saveChanges = function () {
    //    $scope.UserProfiles.BirthDay = new Date($scope.birthYear, $scope.birthMonth, $scope.birthDay)
    //    dataContext.saveChanges();
    //    window.location = "#/UserProfile"
    //}

    //Initialize Edit Mode for first time login
    $scope.BasicInfoEditMode = false;
    $scope.aboutMeEditMode = false;
    $scope.findMeEditMode = false;
    $scope.myExperienceEditMode = false;
    $scope.personalDetailsEditMode = false;

    //Skip
    $scope.Skip = function () {
        //1. validate required fields
        if (false === $('#userProfileForm').parsley().validate('block1')) {
            //1.1 view mode
            if (!$scope.BasicInfoEditMode)
                $scope.BasicInfoEditMode = true;
            return false;
        } else {
            //$scope.BasicInfoEditMode = false;
            window.location = "#/Dashboard"
        }
        
        //1.2 Edit Mode
        //2. navigate to Dashboard
    }

    //Basic Info
    $scope.SelectCountry = function (CountryId) {
        var id = $scope.CountryId;
        if ($scope.CountryId == null)
        {
            $scope.RegionId = null;
            return;
        }
        dataContext.getRegionsByCountryId(id).then(function (regions) {
            $scope.Regions = regions.results;
            $scope.$apply();
        });
    }

    $scope.SaveBasicInfo = function (UserProfile) {
        if (false === $('#userProfileForm').parsley().validate('block1'))
            return false;
        UserProfile.School = $scope.userSchool;
        UserProfile.CountryId = $scope.CountryId;
        UserProfile.RegionId = $scope.RegionId;
        UserProfile.Gender = $scope.userGender;
        UserProfile.ImageUrl = $scope.userImage;
        dataContext.saveChanges();
        $scope.BasicInfoEditMode = false;
    }
    $scope.CancelBasicInfo = function (UserProfile) {
        $scope.BasicInfoEditMode = false;
        $scope.userSchool = UserProfile.School;
        $scope.CountryId = UserProfile.CountryId;
        $scope.RegionId = UserProfile.RegionId;
        $scope.userGender = UserProfile.Gender;
        $scope.userImage = UserProfile.ImageUrl;
    }
    $scope.EditBasicInfo = function () {
        $scope.BasicInfoEditMode = true;
    }


    //About Me
    $scope.SaveAboutMe = function (UserProfile) {
        if (false === $('#userProfileForm').parsley().validate('block2'))
            return false;
        UserProfile.About = $scope.aboutMe;
        dataContext.saveChanges();
        $scope.aboutMeEditMode = false;
    }
    $scope.CancelAboutMe = function (UserProfile) {
        $scope.aboutMeEditMode = false;
        $scope.aboutMe = UserProfile.About;
    }
    $scope.EditAboutMe = function (UserProfile) {
        //$scope.aboutMe = UserProfile.About;
        $scope.aboutMeEditMode = true;
    }

    //Find Me
    $scope.SaveFindMe = function (UserProfile) {
        UserProfile.FacebookUrl = $scope.facebookUrl;
        UserProfile.LinkedInUrl = $scope.linkedInURL;
        UserProfile.TwitterUrl = $scope.twitterURl;
        UserProfile.GoogleUrl = $scope.googleURl;
        dataContext.saveChanges();
        $scope.socailMediaEmpty = IsSocialMediaDataEmpty();
        $scope.findMeEditMode = false;
    }
    $scope.CancelFindMe = function (UserProfile) {
        $scope.findMeEditMode = false;
        $scope.facebookUrl = UserProfile.FacebookUrl;
        $scope.linkedInURL = UserProfile.LinkedInUrl;
        $scope.twitterURl = UserProfile.TwitterUrl;
        $scope.googleURl = UserProfile.GoogleUrl;
        $scope.socailMediaEmpty = IsSocialMediaDataEmpty();
    }
    $scope.EditFindMe = function (UserProfile) {
        $scope.findMeEditMode = true;
    }

    dataContext.getCategories().then(function (categoryData) {
        //console.log(categoryData);
            $scope.AutoCompleteData = categoryData.results;
           // $scope.$apply();
        });
    $scope.Interests = [];

    //Experiance
    $scope.today = new Date();

    $scope.CurrentlyWorkHereCheck = function () {
        if ($scope.Experience != undefined) {
            if ($scope.Experience.CurrentlyWorkHere) {
                $scope.Experience.EndDate = null;
                $('#userProfileForm').parsley().destroy();
                $('#endDate-datepicker').attr('data-parsley-required', 'false');
                $('#userProfileForm').parsley();
                return true;
            }
            else {
                $('#userProfileForm').parsley().destroy();
                $('#endDate-datepicker').attr('data-parsley-required', 'true');
                $('#endDate-datepicker').attr('data-parsley-required-message', $translate.instant('End Date is required'));
                $('#userProfileForm').parsley();
                return false;
            }
        }
    }

    $scope.SaveExperiance = function (UserProfiles)
    {
            if (false === $('#userProfileForm').parsley().validate('block3'))
                return false;

        $scope.Experience.UserProfileId = UserProfiles.UserId;
        $scope.Experience.UserProfile = UserProfiles;
        var endDate;
        if ($scope.Experience.EndDate == null)
            endDate = new Date();
        else
            endDate = $scope.Experience.EndDate;
        $scope.Experience.YearsOfExperience = endDate.getYear() - $scope.Experience.StartDate.getYear()
        if ($scope.Experience.Id < 0 || typeof $scope.Experience.Id=='undefined')
        dataContext.createExperiance($scope.Experience);
        dataContext.saveChanges();
        $scope.myExperienceEditMode = false;
    }
    $scope.CancelExperiance = function (UserProfiles) {
        $('#userProfileForm').parsley().destroy();
        if ($scope.Experience != null) {
            if ($scope.Experience.entityAspect)
                $scope.Experience.entityAspect.rejectChanges();
            else
                $scope.Experience = null;
        }

        $scope.myExperienceEditMode=false
    }
    $scope.EditMyExperience = function (experience) {
        $scope.Experience = experience;
        if ($scope.Experience.EndDate == null)
            $scope.Experience.CurrentlyWorkHere = true;
        $scope.myExperienceEditMode = true
    }
    $scope.RemoveExperience = function () {
        dataContext.deleteExperiance($scope.Experience);
        $scope.myExperienceEditMode = false
    }
    $scope.AddExperience = function () {
        $scope.Experience = null;
        $scope.myExperienceEditMode = true
    }
    
    function IsSocialMediaDataEmpty() {
        if (($scope.facebookUrl == null || $scope.facebookUrl == '')
            && ($scope.linkedInURL == null || $scope.linkedInURL == '')
            && ($scope.googleURl == null || $scope.googleURl == '')
            && ($scope.twitterURl == null || $scope.twitterURl == ''))
            return true;
        else
            return false;
    }
    //Personal Details
    $scope.SavePersonalDetails = function (UserProfiles) {
        UserProfiles.BirthDay = $scope.myBirthDay;
        UserProfiles.MaritalStatusId = $scope.maritalstatusId;
        dataContext.saveChanges();
        $scope.personalDetailsEditMode = false;
    }
    $scope.CancelPersonalDetails = function (UserProfiles) {
        $scope.personalDetailsEditMode = false;
        $scope.myBirthDay = UserProfiles.BirthDay;
        $scope.maritalstatusId = UserProfiles.MaritalStatusId;
    }
    $scope.EditPersonalDetails = function (UserProfiles) {
        $scope.personalDetailsEditMode = true;

    }

});

