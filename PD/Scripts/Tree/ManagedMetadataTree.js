Function.registerNamespace('ManagedMetadataTree');




var nodes = [];
var parent = [];
var childrenNodes = [];
var TreeSelectedItems=[];
var fromAll;
var currwntSelectedNode = "";

ManagedMetadataTree.Intialize = function (treeID, flatData, rootNodes,IsCheckable) {
    var path = window.location.pathname;
    var page = path.substring(path.lastIndexOf('/') + 1);
    var currentUrl = window.location.href;
    currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
    $.ui.dynatree.nodedatadefaults["icon"] = false;
    var data = convertFromFlatToHierarchal(flatData)
    $(treeID).dynatree({
        classNames: { checkbox: "dynatree-radio" },
        checkbox: IsCheckable, // Show checkboxes.
        selectMode: 1,
        onActivate: function (node) {
            if (node.data.parentId == "0")
                return;
         
            node.select(true)
            searchFilters.CategoryFilter = "string(\\\"#0" + node.data.ID + "\\\")";
            var query = SearchURLFormatter.GetFormattedQuery(searchFilters);
            window.location.href = currentUrl + "searchresult.aspx#Category="+node.data.title+"#k=" + searchFilters.Keyword + "#Default=" + escape(query);

          
        },
        onSelect: function (flag, node) {
            if (!flag)
                node.deactivate();
            else
                node.activate();
        },
        onPostInit: function (isReloading, isError) {
            var category = getHashValue("Category");
            for (var i = 0; i < rootNodes.length; i++) {
                var node = $(treeID).dynatree("getTree").getNodeByKey(rootNodes[i])
                node.expand(false);
            }
            if (category == "") {
                node = $(treeID).dynatree("getTree").getNodeByKey(rootNodes[0]);
                node.visitParents(function (node) {
                    node.expand(true);
                }, true);
                checkChildren();
            }
            else {
                $(treeID).dynatree("getRoot").visit(function (node) {

                    if (node.data.title.toLowerCase() == category.toLowerCase()) {
                        node.activate();
                        node.select(true);
                        node.getParent().expand(true);
                    }
                    else node.select(false);
                });
            }
           
        },

       
        
        persist: false,
        children: data
    });
  
    function getUrlQueryStrings() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
       
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        alert(vars.length)
        return vars;
    }

}



ManagedMetadataTree.DeselectAllItems = function (treeID)
{
    $(treeID).dynatree("getRoot").visit(function (node) {

        node.select(false,false);

    });
}

ManagedMetadataTree.IntializeCompetencesTree = function (treeID, flatData) {

    flatData = sortByKey(flatData, 'level');
    var data=  convertFromFlatToHierarchal(flatData)
    $.ui.dynatree.nodedatadefaults["icon"] = false;
    $(treeID).dynatree({


        persist: true,
        children: data
    });


}

function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}

function convertFromFlatToHierarchal(nodes) {
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
    return allNodes;
}
var tempSelectedTree=[]
ManagedMetadataTree.IntializeSearchCompetenciesTree = function (treeID, flatData) {

    $.ui.dynatree.nodedatadefaults["icon"] = false;
    // flatData = sortByKey(flatData, 'level');
    var data = convertFromFlatToHierarchal(flatData)
    $(treeID).dynatree({
        checkbox: true, // Show checkboxes.
        selectMode: 2,
        onActivate: function (node) {

        },
        onSelect: function (flag, node) {
            if (!flag)
                //alert("You deselected node with title " + node.data.title);
            {
                var index = TreeSelectedItems.indexOf(node.data.key.toString());
                if (index > -1) {
                    TreeSelectedItems.splice(index, 1);
                }
            }
            var selectedNodes = node.tree.getSelectedNodes();
            var selectedKeys = $.map(selectedNodes, function (node) {
                return node.data.key;
            });
            // alert("Selected keys: " + selectedKeys.join(", "));
            TreeSelectedItems = selectedKeys;
        },

        persist: false,
        children: data
    });

    function getUrlQueryStrings() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        alert(vars.length)
        return vars;
    }

}