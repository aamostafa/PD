var dataContext = angular.module('dataContext', []);
dataContext.factory('dataContext', function () {
    var remoteServiceName = '/DataB';
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
        //metadataStore.registerEntityTypeCtor('List', null, function (entity) {
        //    entity.href = function () {
        //        //return "#" + 'tab_' + entity.id();
        //        return "#tab_" + entity.Id();
        //    };
        //});
    }


    //Companies 
    var getFeeds = function () {
        var query = entityQuery.from('Accounts');
        return manager.executeQuery(query);
    };
    var deleteCompany = function(company) {
        company.entityAspect.setDeleted();
        return saveChanges();
    };
    var addCompany = function(company) {
        manager.createEntity('Company', company);
        return saveChanges();
    };
    var getCompanyById = function (id) {
        var query = entityQuery.from("Companies").where("Id", "==", id);
        return manager.executeQuery(query);
    };
  
    var saveChanges = function () {
        return manager.saveChanges();
    };

    var datacontext = {
        getFeeds: getFeeds,
        deleteCompany: deleteCompany,
        addCompany: addCompany,
        getCompanyById: getCompanyById,
        saveChanges: saveChanges
    };

    return datacontext;

});
