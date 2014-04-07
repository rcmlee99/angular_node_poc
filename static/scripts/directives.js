'use strict';

/**
 * Our directives
 */
var rpDirectives = angular.module('rpApp.directives', []);

rpDirectives.directive('sectionwidget', function() {
    return {
        template: '<div class="section-box">'  +
            '<div class="section-header">' +
            '<span style="position: relative;top: 30px;left: 25px;outline: none" contenteditable="true">Untitled</span>' +
            '</div>' +
            '<div class="layout-wrapper">' +
            '<input type="text" class="sectionText" id="inputlayout" placeholder="Select layout">' +
            '</div>' +
            '<div class="image-wrapper">' +
            '<input type="text" class="sectionText" id="inputtitle" placeholder="Select image">' +
            '</div>' +
            '<div class="text-wrapper">' +
            '<textarea class="sectionParagraph" placeholder="Content goes here"></textarea>' +
            '</div>' +
            '</div>' +
            '</div>'
    };
});

rpDirectives.directive('rpSection', [
    '$scope',
    function($scope) {

    }
]);


rpDirectives.directive('rpTree', [
    '$compile',
    '$injector',
    'PageLayout',
    function($compile, PageLayout) {
        var template_data = '';
        return {
            restrict: "E",
            link: function(scope, element, attributes, PageLayout) {
                var data = scope.example_treedata;
                var level = 0;
                scope.tree_rows = [];
                scope.expanded = true;

                function traverse(param, parent) {
                    level = level + 1;
                    for(var counter=0; counter<param.length; counter++) {
                        var node = param[counter];
                        var idValue = "treeItem" +"_"+level+"_"+counter;
                        var expandIdValue = "treeItem_expand" +"_"+level+"_"+counter;

                        if(counter === 0) {
                            template_data += '<ul class="nav nav-list nav-pills nav-stacked abn-tree">';
                        }

                        if(node.children) {
                            if(node.label) {
                                var label_with_ = node.label.split(' ').join('_');
                                var row = {
                                    id: counter,
                                    pageId: 1,
                                    level: level+1,
                                    divId : idValue,
                                    label: node.label,
                                    parent: parent,
                                    children: node.children,
                                    expanded: false,
                                    expandDivId : expandIdValue,
                                    hasChildren : true
                                };
                                scope.tree_rows.push(row);
                                var params = "{'pageId': '"+row.pageId+"', 'elementId': '"+idValue+"'}";
                                //var method = 'when_user_clicks_branch('+JSON.stringify(params)+')';
                                var method = 'when_user_clicks_branch('+row.pageId+',"'+ idValue +'")';
                                //label_with_
                                var rowExapndedMethod = 'when_user_clicks_icon("'+idValue+'");$event.stopPropagation();';


                                template_data += '<li id="'+idValue+'" class="abn-tree-row"  ng-animate="abn-tree-animate">'+
                                    '<a>'+
                                    '<i ng-click='+rowExapndedMethod+' ng-class="icon-minus" class="indented tree-icon treeiconminus">&#10134;</i>' +
                                    '<span ng-click='+method+' class="indented tree-label">'+node.label+'</span></a></li>';

                            }
                            traverse(node.children, parent);
                        } else {
                            if(node.label) {
                                var label_with_ = node.label.split(' ').join('_');

                                var row = {
                                    id: counter,
                                    pageId: 1,
                                    level: level+1,
                                    divId : idValue,
                                    label: label_with_,
                                    labelCaption: node.label,
                                    children: [],
                                    expanded: false,
                                    hasChildren : false
                                };

                                scope.tree_rows.push(row);
                                var params = "{'pageId': '"+row.pageId+"', 'elementId': '"+idValue+"'}";
                                var method = 'when_user_clicks_branch('+row.pageId+',"'+ idValue +'")';

                                //var rowExapndedMethod = 'when_user_clicks_icon(\''+label_with_+'\')';
                                var rowExapndedMethod = 'when_user_clicks_icon("'+idValue+'");$event.stopPropagation();';

                                template_data += '<li id="'+idValue+'" class="abn-tree-row" ng-animate="abn-tree-animate">'+
                                    '<a ng-click='+method+'>'+
                                    '<span ng-click='+rowExapndedMethod+' ng-class="icon-file" ng-click="" class="indented tree-icon treeiconfile">&#128196;</span>' +
                                    '<span class="indented tree-label">'+node.label+'</span></a></li>';

                            }
                        }

                        if(counter === param.length - 1) {
                            template_data += '</ul>';
                        }
                    }
                }
                var root = {
                    id: 0,
                    level: 0,
                    divId : "treeItem_0_0",
                    label: "Products",
                    children: [],
                    expanded: false,
                    hasChildren: true
                };
                traverse(data, root);
                var div_element = element.children()[0];

                $(div_element).append(template_data);
                $compile(div_element)(scope);
            }
        }
    }
]);

