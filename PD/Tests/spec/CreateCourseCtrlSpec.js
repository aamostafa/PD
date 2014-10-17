﻿describe('Create Course Controller', function() {
    var $scope, $rootScope, $location, createController, $q, $controller;
    var dataContext;

    var metaData = { "schema": { "namespace": "PD.Contracts.Entities", "alias": "Self", "annotation:UseStrongSpatialTypes": "false", "xmlns:annotation": "http://schemas.microsoft.com/ado/2009/02/edm/annotation", "xmlns:customannotation": "http://schemas.microsoft.com/ado/2013/11/edm/customannotation", "xmlns": "http://schemas.microsoft.com/ado/2009/11/edm", "cSpaceOSpaceMapping": "[[\"PD.Contracts.Entities.Category\",\"PD.Contracts.Entities.Category\"],[\"PD.Contracts.Entities.CategorySection\",\"PD.Contracts.Entities.CategorySection\"],[\"PD.Contracts.Entities.Course\",\"PD.Contracts.Entities.Course\"],[\"PD.Contracts.Entities.FAQ\",\"PD.Contracts.Entities.FAQ\"],[\"PD.Contracts.Entities.Session\",\"PD.Contracts.Entities.Session\"],[\"PD.Contracts.Entities.Material\",\"PD.Contracts.Entities.Material\"],[\"PD.Contracts.Entities.SessionState\",\"PD.Contracts.Entities.SessionState\"],[\"PD.Contracts.Entities.UserCourse\",\"PD.Contracts.Entities.UserCourse\"],[\"PD.Contracts.Entities.UserProfile\",\"PD.Contracts.Entities.UserProfile\"],[\"PD.Contracts.Entities.Experience\",\"PD.Contracts.Entities.Experience\"],[\"PD.Contracts.Entities.webpages_Roles\",\"PD.Contracts.Entities.webpages_Roles\"],[\"PD.Contracts.Entities.Competency\",\"PD.Contracts.Entities.Competency\"],[\"PD.Contracts.Entities.webpages_Membership\",\"PD.Contracts.Entities.webpages_Membership\"],[\"PD.Contracts.Entities.webpages_OAuthMembership\",\"PD.Contracts.Entities.webpages_OAuthMembership\"]]", "entityType": [{ "name": "Category", "customannotation:ClrType": "PD.Contracts.Entities.Category, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "Id" } }, "property": [{ "name": "Id", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "Name", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "SectionId", "type": "Edm.Int32", "nullable": "false" }], "navigationProperty": [{ "name": "CategorySection", "relationship": "Self.CategorySection_Categories", "fromRole": "CategorySection_Categories_Target", "toRole": "CategorySection_Categories_Source" }, { "name": "Courses", "relationship": "Self.Category_Courses", "fromRole": "Category_Courses_Source", "toRole": "Category_Courses_Target" }] }, { "name": "CategorySection", "customannotation:ClrType": "PD.Contracts.Entities.CategorySection, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "Id" } }, "property": [{ "name": "Id", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "Name", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true", "nullable": "false" }], "navigationProperty": { "name": "Categories", "relationship": "Self.CategorySection_Categories", "fromRole": "CategorySection_Categories_Source", "toRole": "CategorySection_Categories_Target" } }, { "name": "Course", "customannotation:ClrType": "PD.Contracts.Entities.Course, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "ID" } }, "property": [{ "name": "ID", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "Name", "type": "Edm.String", "maxLength": "255", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "ImageUrl", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "StartDate", "type": "Edm.DateTime", "nullable": "false" }, { "name": "EndDate", "type": "Edm.DateTime", "nullable": "false" }, { "name": "Instructor", "type": "Edm.String", "maxLength": "255", "fixedLength": "false", "unicode": "true" }, { "name": "Description", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "CategoryId", "type": "Edm.Int32", "nullable": "false" }, { "name": "PublishingDate", "type": "Edm.DateTime" }, { "name": "Details", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "TargetAudience", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "Participants", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "RequiredBackground", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "Competencies", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }], "navigationProperty": [{ "name": "Category", "relationship": "Self.Category_Courses", "fromRole": "Category_Courses_Target", "toRole": "Category_Courses_Source" }, { "name": "FAQs", "relationship": "Self.Course_FAQs", "fromRole": "Course_FAQs_Source", "toRole": "Course_FAQs_Target" }, { "name": "Sessions", "relationship": "Self.Course_Sessions", "fromRole": "Course_Sessions_Source", "toRole": "Course_Sessions_Target" }, { "name": "SessionStates", "relationship": "Self.Course_SessionStates", "fromRole": "Course_SessionStates_Source", "toRole": "Course_SessionStates_Target" }, { "name": "UserCourses", "relationship": "Self.Course_UserCourses", "fromRole": "Course_UserCourses_Source", "toRole": "Course_UserCourses_Target" }] }, { "name": "FAQ", "customannotation:ClrType": "PD.Contracts.Entities.FAQ, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "Id" } }, "property": [{ "name": "Id", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "Question", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "Answer", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "CourseId", "type": "Edm.Int32", "nullable": "false" }], "navigationProperty": { "name": "Course", "relationship": "Self.Course_FAQs", "fromRole": "Course_FAQs_Target", "toRole": "Course_FAQs_Source" } }, { "name": "Session", "customannotation:ClrType": "PD.Contracts.Entities.Session, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "Id" } }, "property": [{ "name": "Id", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "Name", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "PublishedDate", "type": "Edm.DateTime", "nullable": "false" }, { "name": "Objectives", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "CourseId", "type": "Edm.Int32", "nullable": "false" }], "navigationProperty": [{ "name": "Course", "relationship": "Self.Course_Sessions", "fromRole": "Course_Sessions_Target", "toRole": "Course_Sessions_Source" }, { "name": "Materials", "relationship": "Self.Session_Materials", "fromRole": "Session_Materials_Source", "toRole": "Session_Materials_Target" }] }, { "name": "Material", "customannotation:ClrType": "PD.Contracts.Entities.Material, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "Id" } }, "property": [{ "name": "Id", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "Name", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "Url", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "SessionId", "type": "Edm.Int32", "nullable": "false" }], "navigationProperty": { "name": "Session", "relationship": "Self.Session_Materials", "fromRole": "Session_Materials_Target", "toRole": "Session_Materials_Source" } }, { "name": "SessionState", "customannotation:ClrType": "PD.Contracts.Entities.SessionState, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "Id" } }, "property": [{ "name": "Id", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "userID", "type": "Edm.Int32", "nullable": "false" }, { "name": "Sessions", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "CourseId", "type": "Edm.Int32", "nullable": "false" }, { "name": "UserCourseId", "type": "Edm.Int32" }], "navigationProperty": [{ "name": "Course", "relationship": "Self.Course_SessionStates", "fromRole": "Course_SessionStates_Target", "toRole": "Course_SessionStates_Source" }, { "name": "UserCourse", "relationship": "Self.UserCourse_SessionStates", "fromRole": "UserCourse_SessionStates_Target", "toRole": "UserCourse_SessionStates_Source" }, { "name": "UserProfile", "relationship": "Self.UserProfile_SessionStates", "fromRole": "UserProfile_SessionStates_Target", "toRole": "UserProfile_SessionStates_Source" }] }, { "name": "UserCourse", "customannotation:ClrType": "PD.Contracts.Entities.UserCourse, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "Id" } }, "property": [{ "name": "Id", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "UserId", "type": "Edm.Int32", "nullable": "false" }, { "name": "CourseId", "type": "Edm.Int32", "nullable": "false" }], "navigationProperty": [{ "name": "Course", "relationship": "Self.Course_UserCourses", "fromRole": "Course_UserCourses_Target", "toRole": "Course_UserCourses_Source" }, { "name": "SessionStates", "relationship": "Self.UserCourse_SessionStates", "fromRole": "UserCourse_SessionStates_Source", "toRole": "UserCourse_SessionStates_Target" }, { "name": "UserProfile", "relationship": "Self.UserProfile_UserCourses", "fromRole": "UserProfile_UserCourses_Target", "toRole": "UserProfile_UserCourses_Source" }] }, { "name": "UserProfile", "customannotation:ClrType": "PD.Contracts.Entities.UserProfile, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "UserId" } }, "property": [{ "name": "UserId", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "UserName", "type": "Edm.String", "maxLength": "500", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "Email", "type": "Edm.String", "maxLength": "500", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "JobTitle", "type": "Edm.String", "maxLength": "500", "fixedLength": "false", "unicode": "true" }, { "name": "Country", "type": "Edm.String", "maxLength": "500", "fixedLength": "false", "unicode": "true" }, { "name": "Region", "type": "Edm.String", "maxLength": "500", "fixedLength": "false", "unicode": "true" }, { "name": "ImageUrl", "type": "Edm.String", "maxLength": "500", "fixedLength": "false", "unicode": "true" }, { "name": "About", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "School", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "Interests", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "LinkedInUrl", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "GoogleUrl", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "FacebookUrl", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "TwitterUrl", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }, { "name": "BirthDay", "type": "Edm.DateTime" }, { "name": "Gender", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true" }], "navigationProperty": [{ "name": "Experiences", "relationship": "Self.UserProfile_Experiences", "fromRole": "UserProfile_Experiences_Source", "toRole": "UserProfile_Experiences_Target" }, { "name": "SessionStates", "relationship": "Self.UserProfile_SessionStates", "fromRole": "UserProfile_SessionStates_Source", "toRole": "UserProfile_SessionStates_Target" }, { "name": "UserCourses", "relationship": "Self.UserProfile_UserCourses", "fromRole": "UserProfile_UserCourses_Source", "toRole": "UserProfile_UserCourses_Target" }, { "name": "webpages_Roles", "relationship": "Self.UserProfile_webpages_Roles", "fromRole": "UserProfile_webpages_Roles_Source", "toRole": "UserProfile_webpages_Roles_Target" }] }, { "name": "Experience", "customannotation:ClrType": "PD.Contracts.Entities.Experience, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "Id" } }, "property": [{ "name": "Id", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "OrganisationName", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "Title", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "StartDate", "type": "Edm.DateTime", "nullable": "false" }, { "name": "EndDate", "type": "Edm.DateTime", "nullable": "false" }, { "name": "UserProfileId", "type": "Edm.Int32", "nullable": "false" }], "navigationProperty": { "name": "UserProfile", "relationship": "Self.UserProfile_Experiences", "fromRole": "UserProfile_Experiences_Target", "toRole": "UserProfile_Experiences_Source" } }, { "name": "webpages_Roles", "customannotation:ClrType": "PD.Contracts.Entities.webpages_Roles, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "RoleId" } }, "property": [{ "name": "RoleId", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "Identity" }, { "name": "RoleName", "type": "Edm.String", "maxLength": "256", "fixedLength": "false", "unicode": "true", "nullable": "false" }], "navigationProperty": { "name": "UserProfiles", "relationship": "Self.UserProfile_webpages_Roles", "fromRole": "UserProfile_webpages_Roles_Target", "toRole": "UserProfile_webpages_Roles_Source" } }, { "name": "Competency", "customannotation:ClrType": "PD.Contracts.Entities.Competency, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "Id" } }, "property": [{ "name": "Id", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "None" }, { "name": "Name", "type": "Edm.String", "maxLength": "Max", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "ParentId", "type": "Edm.Int32" }], "navigationProperty": [{ "name": "Competencies1", "relationship": "Self.Competency_Competencies1", "fromRole": "Competency_Competencies1_Source", "toRole": "Competency_Competencies1_Target" }, { "name": "Competency1", "relationship": "Self.Competency_Competencies1", "fromRole": "Competency_Competencies1_Target", "toRole": "Competency_Competencies1_Source" }] }, { "name": "webpages_Membership", "customannotation:ClrType": "PD.Contracts.Entities.webpages_Membership, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": { "name": "UserId" } }, "property": [{ "name": "UserId", "type": "Edm.Int32", "nullable": "false", "annotation:StoreGeneratedPattern": "None" }, { "name": "CreateDate", "type": "Edm.DateTime" }, { "name": "ConfirmationToken", "type": "Edm.String", "maxLength": "128", "fixedLength": "false", "unicode": "true" }, { "name": "IsConfirmed", "type": "Edm.Boolean" }, { "name": "LastPasswordFailureDate", "type": "Edm.DateTime" }, { "name": "PasswordFailuresSinceLastSuccess", "type": "Edm.Int32", "nullable": "false" }, { "name": "Password", "type": "Edm.String", "maxLength": "128", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "PasswordChangedDate", "type": "Edm.DateTime" }, { "name": "PasswordSalt", "type": "Edm.String", "maxLength": "128", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "PasswordVerificationToken", "type": "Edm.String", "maxLength": "128", "fixedLength": "false", "unicode": "true" }, { "name": "PasswordVerificationTokenExpirationDate", "type": "Edm.DateTime" }] }, { "name": "webpages_OAuthMembership", "customannotation:ClrType": "PD.Contracts.Entities.webpages_OAuthMembership, PD, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null", "key": { "propertyRef": [{ "name": "Provider" }, { "name": "ProviderUserId" }] }, "property": [{ "name": "Provider", "type": "Edm.String", "maxLength": "30", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "ProviderUserId", "type": "Edm.String", "maxLength": "100", "fixedLength": "false", "unicode": "true", "nullable": "false" }, { "name": "UserId", "type": "Edm.Int32", "nullable": "false" }] }], "association": [{ "name": "CategorySection_Categories", "end": [{ "role": "CategorySection_Categories_Source", "type": "Edm.Self.CategorySection", "multiplicity": "1" }, { "role": "CategorySection_Categories_Target", "type": "Edm.Self.Category", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "CategorySection_Categories_Source", "propertyRef": { "name": "Id" } }, "dependent": { "role": "CategorySection_Categories_Target", "propertyRef": { "name": "SectionId" } } } }, { "name": "Course_FAQs", "end": [{ "role": "Course_FAQs_Source", "type": "Edm.Self.Course", "multiplicity": "1" }, { "role": "Course_FAQs_Target", "type": "Edm.Self.FAQ", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "Course_FAQs_Source", "propertyRef": { "name": "ID" } }, "dependent": { "role": "Course_FAQs_Target", "propertyRef": { "name": "CourseId" } } } }, { "name": "Session_Materials", "end": [{ "role": "Session_Materials_Source", "type": "Edm.Self.Session", "multiplicity": "1" }, { "role": "Session_Materials_Target", "type": "Edm.Self.Material", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "Session_Materials_Source", "propertyRef": { "name": "Id" } }, "dependent": { "role": "Session_Materials_Target", "propertyRef": { "name": "SessionId" } } } }, { "name": "Course_Sessions", "end": [{ "role": "Course_Sessions_Source", "type": "Edm.Self.Course", "multiplicity": "1" }, { "role": "Course_Sessions_Target", "type": "Edm.Self.Session", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "Course_Sessions_Source", "propertyRef": { "name": "ID" } }, "dependent": { "role": "Course_Sessions_Target", "propertyRef": { "name": "CourseId" } } } }, { "name": "UserCourse_SessionStates", "end": [{ "role": "UserCourse_SessionStates_Source", "type": "Edm.Self.UserCourse", "multiplicity": "0..1" }, { "role": "UserCourse_SessionStates_Target", "type": "Edm.Self.SessionState", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "UserCourse_SessionStates_Source", "propertyRef": { "name": "Id" } }, "dependent": { "role": "UserCourse_SessionStates_Target", "propertyRef": { "name": "UserCourseId" } } } }, { "name": "UserProfile_Experiences", "end": [{ "role": "UserProfile_Experiences_Source", "type": "Edm.Self.UserProfile", "multiplicity": "1", "onDelete": { "action": "Cascade" } }, { "role": "UserProfile_Experiences_Target", "type": "Edm.Self.Experience", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "UserProfile_Experiences_Source", "propertyRef": { "name": "UserId" } }, "dependent": { "role": "UserProfile_Experiences_Target", "propertyRef": { "name": "UserProfileId" } } } }, { "name": "UserProfile_SessionStates", "end": [{ "role": "UserProfile_SessionStates_Source", "type": "Edm.Self.UserProfile", "multiplicity": "1" }, { "role": "UserProfile_SessionStates_Target", "type": "Edm.Self.SessionState", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "UserProfile_SessionStates_Source", "propertyRef": { "name": "UserId" } }, "dependent": { "role": "UserProfile_SessionStates_Target", "propertyRef": { "name": "userID" } } } }, { "name": "UserProfile_UserCourses", "end": [{ "role": "UserProfile_UserCourses_Source", "type": "Edm.Self.UserProfile", "multiplicity": "1" }, { "role": "UserProfile_UserCourses_Target", "type": "Edm.Self.UserCourse", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "UserProfile_UserCourses_Source", "propertyRef": { "name": "UserId" } }, "dependent": { "role": "UserProfile_UserCourses_Target", "propertyRef": { "name": "UserId" } } } }, { "name": "UserProfile_webpages_Roles", "end": [{ "role": "UserProfile_webpages_Roles_Source", "type": "Edm.Self.UserProfile", "multiplicity": "*" }, { "role": "UserProfile_webpages_Roles_Target", "type": "Edm.Self.webpages_Roles", "multiplicity": "*" }] }, { "name": "Course_SessionStates", "end": [{ "role": "Course_SessionStates_Source", "type": "Edm.Self.Course", "multiplicity": "1" }, { "role": "Course_SessionStates_Target", "type": "Edm.Self.SessionState", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "Course_SessionStates_Source", "propertyRef": { "name": "ID" } }, "dependent": { "role": "Course_SessionStates_Target", "propertyRef": { "name": "CourseId" } } } }, { "name": "Course_UserCourses", "end": [{ "role": "Course_UserCourses_Source", "type": "Edm.Self.Course", "multiplicity": "1" }, { "role": "Course_UserCourses_Target", "type": "Edm.Self.UserCourse", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "Course_UserCourses_Source", "propertyRef": { "name": "ID" } }, "dependent": { "role": "Course_UserCourses_Target", "propertyRef": { "name": "CourseId" } } } }, { "name": "Category_Courses", "end": [{ "role": "Category_Courses_Source", "type": "Edm.Self.Category", "multiplicity": "1" }, { "role": "Category_Courses_Target", "type": "Edm.Self.Course", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "Category_Courses_Source", "propertyRef": { "name": "Id" } }, "dependent": { "role": "Category_Courses_Target", "propertyRef": { "name": "CategoryId" } } } }, { "name": "Competency_Competencies1", "end": [{ "role": "Competency_Competencies1_Source", "type": "Edm.Self.Competency", "multiplicity": "0..1" }, { "role": "Competency_Competencies1_Target", "type": "Edm.Self.Competency", "multiplicity": "*" }], "referentialConstraint": { "principal": { "role": "Competency_Competencies1_Source", "propertyRef": { "name": "Id" } }, "dependent": { "role": "Competency_Competencies1_Target", "propertyRef": { "name": "ParentId" } } } }], "entityContainer": { "name": "ProfessionalDevelopmentEntities", "customannotation:UseClrTypes": "true", "entitySet": [{ "name": "Categories", "entityType": "Self.Category" }, { "name": "CategorySections", "entityType": "Self.CategorySection" }, { "name": "Courses", "entityType": "Self.Course" }, { "name": "FAQs", "entityType": "Self.FAQ" }, { "name": "Sessions", "entityType": "Self.Session" }, { "name": "Materials", "entityType": "Self.Material" }, { "name": "SessionStates", "entityType": "Self.SessionState" }, { "name": "UserCourses", "entityType": "Self.UserCourse" }, { "name": "UserProfiles", "entityType": "Self.UserProfile" }, { "name": "Experiences", "entityType": "Self.Experience" }, { "name": "webpages_Roles", "entityType": "Self.webpages_Roles" }, { "name": "Competencies", "entityType": "Self.Competency" }, { "name": "webpages_Membership", "entityType": "Self.webpages_Membership" }, { "name": "webpages_OAuthMembership", "entityType": "Self.webpages_OAuthMembership" }], "associationSet": [{ "name": "CategorySection_Categories", "association": "Self.CategorySection_Categories", "end": [{ "role": "CategorySection_Categories_Source", "entitySet": "CategorySections" }, { "role": "CategorySection_Categories_Target", "entitySet": "Categories" }] }, { "name": "Course_FAQs", "association": "Self.Course_FAQs", "end": [{ "role": "Course_FAQs_Source", "entitySet": "Courses" }, { "role": "Course_FAQs_Target", "entitySet": "FAQs" }] }, { "name": "Session_Materials", "association": "Self.Session_Materials", "end": [{ "role": "Session_Materials_Source", "entitySet": "Sessions" }, { "role": "Session_Materials_Target", "entitySet": "Materials" }] }, { "name": "Course_Sessions", "association": "Self.Course_Sessions", "end": [{ "role": "Course_Sessions_Source", "entitySet": "Courses" }, { "role": "Course_Sessions_Target", "entitySet": "Sessions" }] }, { "name": "UserCourse_SessionStates", "association": "Self.UserCourse_SessionStates", "end": [{ "role": "UserCourse_SessionStates_Source", "entitySet": "UserCourses" }, { "role": "UserCourse_SessionStates_Target", "entitySet": "SessionStates" }] }, { "name": "UserProfile_Experiences", "association": "Self.UserProfile_Experiences", "end": [{ "role": "UserProfile_Experiences_Source", "entitySet": "UserProfiles" }, { "role": "UserProfile_Experiences_Target", "entitySet": "Experiences" }] }, { "name": "UserProfile_SessionStates", "association": "Self.UserProfile_SessionStates", "end": [{ "role": "UserProfile_SessionStates_Source", "entitySet": "UserProfiles" }, { "role": "UserProfile_SessionStates_Target", "entitySet": "SessionStates" }] }, { "name": "UserProfile_UserCourses", "association": "Self.UserProfile_UserCourses", "end": [{ "role": "UserProfile_UserCourses_Source", "entitySet": "UserProfiles" }, { "role": "UserProfile_UserCourses_Target", "entitySet": "UserCourses" }] }, { "name": "UserProfile_webpages_Roles", "association": "Self.UserProfile_webpages_Roles", "end": [{ "role": "UserProfile_webpages_Roles_Source", "entitySet": "UserProfiles" }, { "role": "UserProfile_webpages_Roles_Target", "entitySet": "webpages_Roles" }] }, { "name": "Course_SessionStates", "association": "Self.Course_SessionStates", "end": [{ "role": "Course_SessionStates_Source", "entitySet": "Courses" }, { "role": "Course_SessionStates_Target", "entitySet": "SessionStates" }] }, { "name": "Course_UserCourses", "association": "Self.Course_UserCourses", "end": [{ "role": "Course_UserCourses_Source", "entitySet": "Courses" }, { "role": "Course_UserCourses_Target", "entitySet": "UserCourses" }] }, { "name": "Category_Courses", "association": "Self.Category_Courses", "end": [{ "role": "Category_Courses_Source", "entitySet": "Categories" }, { "role": "Category_Courses_Target", "entitySet": "Courses" }] }, { "name": "Competency_Competencies1", "association": "Self.Competency_Competencies1", "end": [{ "role": "Competency_Competencies1_Source", "entitySet": "Competencies" }, { "role": "Competency_Competencies1_Target", "entitySet": "Competencies" }] }] } } };

   
    beforeEach(module('app'));

    beforeEach(inject(function (_$rootScope_, _$controller_, _dataContext_, _$q_) {
        $controller = _$controller_;
        $q = _$q_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        dataContext = _dataContext_;

        var sectionsDeferred = $q.defer();
        sectionsDeferred.resolve(categorySectionData);
        spyOn(dataContext, 'getCategorySections').and.returnValue(sectionsDeferred.promise);

        var CompetencyDeferred = $q.defer();
        CompetencyDeferred.resolve(CompetencyData);
        spyOn(dataContext, 'getCompetencies').and.returnValue(CompetencyDeferred.promise);

        var newCourseDeferred = $q.defer();
        newCourseDeferred.resolve(newCourseData);
        spyOn(dataContext, 'createCourse').and.returnValue(newCourseDeferred.promise);

        $controller('CreateCourseCtrl',
        {
            '$rootScope': $rootScope,
            '$scope': $scope,
            'dataContext': dataContext
        });

        $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle

    }));


    it('Should initialize without exceptions', function () {


    });

    it('Should load sections correctly', function() {
        expect($scope.Sections.length).toBe(4);
    })

    it('Should load Competencies correctly', function() {
        expect($scope.Competencies.length).toBe(2);
    });

    it('Should load Competencies in a tree heraricy', function () {
        expect($scope.tree[1].children.length).toBe(3);
    });

    it('Should assign every competency with the correct key and title', function() {
        expect($scope.tree[0].key).toBe(1);
        expect($scope.tree[0].title).toBe("Soft Skills");

        expect($scope.tree[1].children[1].Id).toBe(11);
        expect($scope.tree[1].children[1].Name).toBe("Lesson Planning");

    });

    it('Should create an empty course object', function() {
        expect($scope.Course).toBeDefined();
        expect($scope.Course.ID).toBe(-1);
    });

    it('Should load categories when selecting a section', function() {
        $scope.SectionId = 1

        var deferred = $q.defer();
        deferred.resolve(CategoriesData);
        spyOn(dataContext, 'getCategoriesBySectionId').and.returnValue(deferred.promise);

        $scope.SelectSection();

        $rootScope.$apply(); // promises are resolved/dispatched only on next $digest cycle

        expect($scope.Categories.length).toBe(3);
    })

    it('wizard should start at the first step', function() {
        expect($scope.currentstep).toBe(0);
    })

    it('Should have correct initialized value', function() {
        expect($scope.Materials.length).toBe(0);
        expect($scope.Sessions.length).toBe(0);
        expect($scope.isEdit).toBe(false);
    })

    it('Should be in edit mode when calling edit course', function() {
        $scope.EditCourse(null);
        //$rootScope.$apply();
        expect($scope.isEdit).toBe(true);
    })

});
