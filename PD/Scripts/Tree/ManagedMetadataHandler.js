Function.registerNamespace('ManagedMetadataHandler');




var nodes = [];
var parent = [];
var childrenNodes = []



ManagedMetadataHandler.GetTermSetData = function (termStoreName, termSetID, treeID) {


    
        var value = location.hash.match(new RegExp("Default" + '=([^&]*)'));

        //if (value != null) {
           
        //    var currentUrl = window.location.href;
        //    currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
        //    window.location = currentUrl + "searchresult.aspx";
           
        //}
     
    var scriptbase = _spPageContextInfo.webServerRelativeUrl + "/_layouts/15/";
 //  var  taxonomySodLoaded = _v_dictSod['SP.Runtime.js'].state === Sods.loaded;

   
    $.getScript(scriptbase + "SP.Runtime.js", function () {

        $.getScript(scriptbase + "SP.js", function () {

            $.getScript(scriptbase + "SP.Taxonomy.js", function () {
               
                getTaxonomyTerms(termStoreName, termSetID, treeID);
               // readTermstore(termStoreName);
            });

        });
    });

    


}


function getTaxonomyTerms(termStoreName, termSetID, treeID) {
    
    var subChildren = [];
    var rootNodes=[]

    var context = SP.ClientContext.get_current();

    var siteCollection = context.get_site();
   
    context.load(siteCollection);
    context.executeQueryAsync(Function.createDelegate(this, function (sender, args) {

        var taxonomySession = SP.Taxonomy.TaxonomySession.getTaxonomySession(context);

        var termStore = taxonomySession.get_termStores().getByName(termStoreName);

        var termSet = termStore.getTermSet('f4bef59e-e34b-43f2-b8e7-9239687cff36');

        var terms = termSet.getAllTerms();
    

        context.load(terms);
    
        //alert(window.location.protocol + "//" + window.location.host + _spPageContextInfo.siteServerRelativeUrl)

        context.executeQueryAsync(Function.createDelegate(this, function (sender, args) {
            var termsEnumerator = terms.getEnumerator();
            var menuItems = new Array();

            while (termsEnumerator.moveNext()) {


                var currentTerm = termsEnumerator.get_current();


                var nodesTitle = currentTerm.get_pathOfTerm().split(';')
                console.log(nodesTitle);
                if (nodesTitle.length == 1) {

                    var node = {
                        "Guid": currentTerm.get_id(),
                        isFolder: true,
                        "key": nodesTitle[nodesTitle.length - 1],
                        "parentId": "0",
                        "title": nodesTitle[nodesTitle.length - 1],
                        "children": null,
                        "level": nodesTitle.length,

                    };
                    nodes.push(node);
                    rootNodes.push(node);
                }
                else if (nodesTitle.length > 1) {
                    nodes.push(
                        {
                            "Guid": currentTerm.get_id(),
                            "key": nodesTitle[nodesTitle.length - 1],
                            "parentId": nodesTitle[nodesTitle.length - 2],
                            "title": nodesTitle[nodesTitle.length - 1],
                            "children": null,
                            "level": nodesTitle.length
                        });




                }


            }

            function sortByKey(array, key) {
                return array.sort(function (a, b) {
                    var x = a[key]; var y = b[key];
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
            }

            nodes = sortByKey(nodes, 'level');
            var map = {}, node, allNodes = [];
            for (var i = 0; i < nodes.length; i += 1) {
                node = nodes[i];
                node.children = [];
                map[node.key] = i; // use map to look-up the parents
                if (node.parentId !== "0") {
                    nodes[map[node.parentId]].children.push(node);
                } else {
                    allNodes.push(node);
                }
            }
        
            ManagedMetadataTree.Intialize(treeID, allNodes, rootNodes)
        
         
        }), Function.createDelegate(this, function (sender, args) {
            alert('The following error has occured while loading  ' + args.get_message());
        }));
    }), Function.createDelegate(this, function (sender, args) {
        alert('The following error has occured while loading  ' + args.get_message());
    }));
};
