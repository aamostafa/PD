var dataContext = angular.module('dataContext', []);
dataContext.factory('dataContext', function ($http) {
    var remoteServiceName = '/breeze/DataB';
    var entityQuery = breeze.EntityQuery;
    var manager = configureBreezeManager();

    function configureBreezeManager() {
        //breeze.NamingConvention.camelCase.setAsDefault();
        //var mgr = new breeze.EntityManager({});
        var mgr = new breeze.EntityManager(remoteServiceName);
        configureMetadataStore(mgr.metadataStore);
        
        return mgr;
    }

    function configureMetadataStore(metadataStore) {
        
        metadataStore.registerEntityTypeCtor('Course', null, function (entity) {
            //if (entity.Competencies != null) {
            //    var competencies = entity.Competencies.split(',');
            //    entity.CompetenciesList = competencies;
            //}
            //if (entity.Instructor != null) {
            //    var instructors = entity.Instructor.split(',');

            //    entity.Instructors = function () {
            //        return instructors;
            //    };
            //}
        });

        metadataStore.registerEntityTypeCtor('UserProfile', null, function (entity) {
            if (entity.Interests != null) {
                var interestsList = entity.Interests.split(',');

                entity.InterestsList = function () {
                    return interestsList;
                };
            }
        });
    }


    var getAllCourse = function () {
        var query = entityQuery.from("Courses");
            //.expand(['UserCourses']);

        return manager.executeQuery(query);
    };

    //Courses 
    var getUserCourses = function () {
        var query = entityQuery.from("UserCourses").expand(['SessionStates', 'Course']);
        return manager.executeQuery(query);
    };

    var getUserCourseByCourseId= function(courseId)
    {
        var query = entityQuery.from("UserCourses")
            .expand('SessionStates')
            .where("CourseId", "==", courseId);
        return manager.executeQuery(query);
    }
    var getUserCoursesIds = function() {
        var query = entityQuery.from("UserCourses");
        return manager.executeQuery(query);
    };
    var getCourseById = function (id) {
        var query = entityQuery.from("Courses")
            .expand(['FAQs', 'Sessions', 'Sessions.Materials', 'Category', 'Category.CategorySection'
                //, 'UserCourses.UserProfile.SessionStates'
            ])
            .where("ID", "==", id);

        return manager.executeQuery(query);
    };

    var createCourse = function(initialValues) {
        return getMetadata().then(function() {
            return manager.createEntity('Course', initialValues);
        });


        //return manager.createEntity('Course', initialValues);
    };

    var createSession = function(initialValues) {
        return manager.createEntity('Session', initialValues);
    };

    var createFaq = function(initialValues) {
        return manager.createEntity('FAQ', initialValues);
    };

    
    //Courses 
    var getSessionByCourseId = function (courseId) {
        var query = entityQuery.from("Sessions").expand('Materials')
            .where("CourseId", "==", courseId);
        return manager.executeQuery(query);
    };

    var getMaterialBySessionId = function (sessionId) {
        var query = entityQuery.from("Materials").where("SessionId", "==", sessionId);
        return manager.executeQuery(query);
    };

    var getFAQSByCourseId = function (courseId) {
        var query = entityQuery.from("FAQs").where("CourseId", "==", courseId);
        return manager.executeQuery(query);
    };

    //SessionStates
    var GetSessionStatesByCurrentUser = function () {
        var query = entityQuery.from("SessionStates");//.where("userID", "==", userId);
        return manager.executeQuery(query);
    };

    var getCompetencies = function () {
        var query = entityQuery.from("Competencies");
        return manager.executeQuery(query);
    };

    var getCompetenciesByIds = function (Ids) {
        var query = entityQuery.from("Competencies")
                    .where("Competencies", "any","Id", Ids);

        return manager.executeQuery(query);
    };


    //var GetSessionStatesByCourseId = function (courseId) {
    //    var query = entityQuery.from("SessionStates").where("CourseId", "==", courseId);
    //    return manager.executeQuery(query);
    //};

    var GetSessionStatesByCourseIdAndUserId = function (courseId, userId) {
        var pred1 = breeze.Predicate.create("CourseId", "==", parseInt(courseId));
        var pred2 = breeze.Predicate.create("userID", "==", userId);
        var newPred = pred1.and(pred2);
        var query = entityQuery.from("SessionStates").where(newPred);
        return manager.executeQuery(query);
    };

    var GetSessionStatesByCourseId = function (courseId) {
        var query = entityQuery.from("SessionStates").where("CourseId", "==", parseInt(courseId));
        return manager.executeQuery(query);
    };

    var createSessionState = function (initialValues) {
        return manager.createEntity('SessionState', initialValues);
    };

    var createRequest = function (initialValues) {
        return manager.createEntity('Request', initialValues);
    };

    var getAllRequests = function () {
        var query = entityQuery.from('Requests');
        return manager.executeQuery(query);
    };

    //CategorySections 
    var getCategorySections = function () {
        var query = entityQuery.from('CategorySections').orderBy('Name');
        return manager.executeQuery(query);
    };
    var getCategories = function () {
        var query = entityQuery.from('Categories').orderBy('Name');
        return manager.executeQuery(query);
    };
    var getCategoryById = function (id) {
        var query = entityQuery.from('Categories').where("Id", "==", id);
        return manager.executeQuery(query);
    };
    var getCategoriesBySectionId = function (sectionId) {
        var query = entityQuery.from('Categories').where("SectionId", "==", sectionId).orderBy('Name');
        return manager.executeQuery(query);
    };
    var deleteCategorySection = function (CategorySection) {
        CategorySection.entityAspect.setDeleted();
        return saveChanges();
    };
    var addCategorySection = function (CategorySection) {
        manager.createEntity('CategorySection', CategorySection);
        return saveChanges();
    };
    var getCategorySectionById = function (id) {
        var query = entityQuery.from("CategorySections").where("Id", "==", id);
        return manager.executeQuery(query);
    };


    var createMaterial = function(Material) {
        return manager.createEntity('Material', Material);

    };

    //UserProfiles 
    var getUserProfiles = function () {
        var query = entityQuery.from('UserProfiles').expand(['Title', 'Experiences', 'Region', 'Country', 'MaritalStatus']);
        return manager.executeQuery(query);
    };
    var getCountries = function () {
        var query = entityQuery.from('Countries').orderBy('Name');
        return manager.executeQuery(query);
    };
    var getMaritalStatuses = function () {
        var query = entityQuery.from('MaritalStatuses');
        return manager.executeQuery(query);
    }
    var getRegionsByCountryId = function (id) {
        var query = entityQuery.from('Regions').where("CountryId", "==", id).orderBy('Name');
        return manager.executeQuery(query);
    };
    var getCountryById = function (id) {
        var query = entityQuery.from('Countries').where("Id", "==", id);
        return manager.executeQuery(query);
    };
    var getRegionById = function (id) {
        var query = entityQuery.from('Regions').where("Id", "==", id);
        return manager.executeQuery(query);
    };
    var deleteUserProfile = function (UserProfile) {
        UserProfile.entityAspect.setDeleted();
        return saveChanges();
    };
    var addUserProfile = function (UserProfile) {
        manager.createEntity('UserProfile', UserProfile);
        return saveChanges();
    };
    var getUserProfileById = function (id) {
        var query = entityQuery.from("UserProfiles").where("Id", "==", id);
        return manager.executeQuery(query);
    };

    var createExperiance = function (Experience) {
        return manager.createEntity('Experience', Experience);
    };
    var deleteExperiance = function (Experience) {
        Experience.entityAspect.setDeleted();
         return saveChanges();
    };
    var enrollInCourse = function(course) {
        return getMetadata().then(function() {
            var item = manager.createEntity('UserCourse', { CourseId: course.courseId });
            course.UserCourses.push(item);


            var sessionState = manager.createEntity('SessionState');
            sessionState.Sessions = "";
            sessionState.Course = course;

            item.SessionStates.push(sessionState);

            return item;
        });
    };

    var unEnrollInCourse = function (course) {
        var item = course.UserCourses.filter(function(userCourse) {
            return userCourse.CourseId == course.ID;
        });

        $(item).each(function(index, userCourse) {
            $(userCourse.SessionStates).each(function (i, sessionState) {
                sessionState.entityAspect.setDeleted();
            });
            //userCourse.SessionStates.splice(0, userCourse.SessionStates.length)
            userCourse.entityAspect.setDeleted();
        });

        ////course.UserCourses.splice(0, course.UserCourses.length);
    };

    var deleteFaq = function (FAQ) {
        FAQ.entityAspect.setDeleted();
        return saveChanges();
    };

    var deleteSession = function (session) {
        session.entityAspect.setDeleted();
        //return saveChanges();
    };


    var deleteMaterial = function (material) {
        material.entityAspect.setDeleted();
       // return saveChanges();
    };


    var getMetadata = function() {
        var store = manager.metadataStore;
        if (store.hasMetadataFor(remoteServiceName)) { //Have metadata
            return Q(true);
        } else { //Get metadata
            return store.fetchMetadata(remoteServiceName);
        }
    }

    //var CancelEditExperience = function (experience) {
    //    x.entityAspect.rejectChanges()
    //}

    //Companies 
    //var getFeeds = function () {
    //    var query = entityQuery.from('Accounts');
    //    return manager.executeQuery(query);
    //};
    //var deleteCompany = function(company) {
    //    company.entityAspect.setDeleted();
    //    return saveChanges();
    //};
    //var addCompany = function(company) {
    //    manager.createEntity('Company', company);
    //    return saveChanges();
    //};
    //var getCompanyById = function (id) {
    //    var query = entityQuery.from("Companies").where("Id", "==", id);
    //    return manager.executeQuery(query);
    //};

    var saveChanges = function () {
        return manager.saveChanges();
    };

    var notify = function(item) {
        alert(item);
    };

    var testMode = function(intData)
    {
        manager.importEntities(intData);

        options = new breeze.QueryOptions({
            fetchStrategy: breeze.FetchStrategy.FromLocalCache
        });
        
        manager.setProperties({ queryOptions: options });
    }

    var datacontext = {
        notify:notify,
        enrollInCourse : enrollInCourse,
        //getCategorySections: getCategorySections,
        getCategoryById: getCategoryById,
        //courses
        getCourseById: getCourseById,
        getAllRequests:getAllRequests,
        getSessionByCourseId: getSessionByCourseId,
        getFAQSByCourseId: getFAQSByCourseId,
        //getFeeds: getFeeds,
        //deleteCompany: deleteCompany,
        //addCompany: addCompany,
        //getCompanyById: getCompanyById,
        createRequest:createRequest,
        deleteSession: deleteSession,
        deleteMaterial:deleteMaterial,
        deleteFaq:deleteFaq,
        getCategories: getCategories,
        deleteExperiance:deleteExperiance,
        getCategorySections: getCategorySections,
        deleteCategorySection: deleteCategorySection,
        addCategorySection: addCategorySection,
        getCategorySectionById: getCategorySectionById,
        getAllCourse: getAllCourse,
        GetSessionStatesByCurrentUser: GetSessionStatesByCurrentUser,

        getCompetencies: getCompetencies,
        createExperiance:createExperiance,
        getUserProfiles: getUserProfiles,
        deleteUserProfile: deleteUserProfile,
        addUserProfile: addUserProfile,
        getUserProfileById: getUserProfileById,
        getCompetenciesByIds: getCompetenciesByIds,
        createCourse: createCourse,
        getCategoriesBySectionId: getCategoriesBySectionId,
        getMaterialBySessionId: getMaterialBySessionId,
        getCountryById: getCountryById,
        getRegionById:getRegionById,
        GetSessionStatesByCourseIdAndUserId: GetSessionStatesByCourseIdAndUserId,
        createSessionState: createSessionState,
        createSession: createSession,
        createMaterial: createMaterial,
        createFaq: createFaq,
        getCountries: getCountries,
        getMaritalStatuses: getMaritalStatuses,
        getRegionsByCountryId:getRegionsByCountryId,
        unEnrollInCourse:unEnrollInCourse,
        saveChanges: saveChanges,
        getUserCourseByCourseId:getUserCourseByCourseId,
        getUserCourses:getUserCourses,
        getUserCoursesIds: getUserCoursesIds,
        GetSessionStatesByCourseId:GetSessionStatesByCourseId,
        rejectChanges: function () { manager.rejectChanges(); },
        hasChanges: function () { return manager.hasChanges(); },
        remoteServiceName: remoteServiceName,
        testMode: testMode,
        getMetadata: getMetadata
    };

    return datacontext;

});
