'use strict';

/**
 * controllers
 */
var rpControllers = angular.module('rpApp.controllers', ['ui.bootstrap']);


rpControllers.controller('WidgetCtrl', [
    '$scope',
    '$compile',
    '$modal',
    'PageLayoutModel',
    'PageHtml',

    function($scope, $compile, $modal, PageLayoutModel, PageHtml) {
        $scope.pageLayout = [];
        $scope.sections = [];
        $scope.sectionDataChange;

        $('#showTree').on('click', function(){
            $(".tabs").css({
                "transition-property":"left",
                "transition-duration": "1s",
                "transition-delay": "0.2s",
                "left": "0px"
                }
            );
            setTimeout(function(){
                $("#section").css({
                    "transition-property":"left",
                    "transition-duration": "1.1s",
                    "transition-delay": "0.2s",
                    "left": "450px"
                    }
                );
            },100);
        });
        $('#addSection').on('click', function(){
            var data = {
                    page : {
                    pageId : "0",
                    pageName: "NewPage",
                    pageHeader : "New Page Header",
                    sections : [
                            {
                                "sectionId" : 1234,
                                "sectionTabHeading" : "",
                                "sectionWidth" : "large",
                                "sectionTitle" : "",
                                "sectionLayoutName" : "show_one_paragraph",
                                "sectionHeading" : ["New Section"],
                                "imageUrl" : [],
                                "text" : [],
                                "text_css": [],
                                "priceText": [],
                                "links": []
                            }
                        ]
                    }
                };
            $scope.addSectionDataChange(data);
        });

        $scope.addSectionDataChange = function(data) {

            if(data){
                var page = data.page;

                var sectionArray = page.sections;
                var sectioArray_len = $scope.sections.length;

                for(var i = 0; i <sectionArray.length; i++){
                    $scope.sections.push(sectionArray[i]);
                }

                var page_height = '';

                if(sectioArray_len === 0) {
                    page_height = '100%';
                } else {
                    page_height = (sectioArray_len+1)*360+"px";
                }


                $("#section-wrapper").css({display: 'block'});
                $("#section").css({
                    "transition-property":"left",
                    "transition-duration": "1.1s",
                    "transition-delay": "0.2s",
                    "left": "450px",
                    "position":"absolute",
                    "padding":"0px",
                    "margin":"0px",
                    "top":"50px",
                    "width": "800px",
                    "height":page_height,
                    "-moz-box-shadow":"inset 0 0 10px #000000",
                    "-webkit-box-shadow": "inset 0 0 10px #000000",
                    "box-shadow": "inset 0 0 10px #000000"
                });
            }
        }

        $scope.clearPage = function() {
            $scope.sections = [];
            $("#section").css({
                "transition-property":"left",
                "transition-duration": "1.1s",
                "transition-delay": "0.2s",
                "left": "450px",
                "position":"absolute",
                "padding":"0px",
                "margin":"0px",
                "top":"50px",
                "width": "800px",
                "height":"100%",
                "-moz-box-shadow":"inset 0 0 10px #000000",
                "-webkit-box-shadow": "inset 0 0 10px #000000",
                "box-shadow": "inset 0 0 10px #000000"});


        }

        $scope.sectionDataChange = function(data) {
            $scope.sections = [];
            if(data){
                $("#section-wrapper").css({display: 'block'});
                var sectionArray = data.page.sections;
                var sectioArray_len = sectionArray.length;
                for(var i = 0; i <sectioArray_len; i++){
                    $scope.sections[i] = sectionArray[i];
                }

                var page_height = sectioArray_len*360;
                $("#section").css({
                    "transition-property":"left",
                    "transition-duration": "1.1s",
                    "transition-delay": "0.2s",
                    "left": "450px",
                    "position":"absolute",
                    "padding":"0px",
                    "margin":"0px",
                    "top":"50px",
                    "width": "800px",
                    "height":page_height+"px",
                    "-moz-box-shadow":"inset 0 0 10px #000000",
                    "-webkit-box-shadow": "inset 0 0 10px #000000",
                    "box-shadow": "inset 0 0 10px #000000"});
            }
        }

        $scope.showPreview = function(d1, d2, d3, d4) {

            $modal.open({
                templateUrl: '../../html/section1.html',
                backdrop: true,
                windowClass: 'modal myModal',
                controller: function ($scope, $modalInstance, $compile, PageHtml) {
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }
            });
        };





    }
]);

rpControllers.controller('WidgetOptionsCtrl', [
    '$scope',
    '$rootScope',
    '$compile',
    'PageLayout',
    'PageLayoutModel',

    function($scope, $rootScope, $compile, PageLayout, PageLayoutModel) {
        $('.closeTree').on('click', function(){
            $(".tabs").css({
                "transition-property":"left",
                "transition-duration": "1s",
                "transition-delay": "0.2s",
                "left": "-365px"});
            $("#section").css({
                "transition-property":"left",
                "transition-duration": "1s",
                "transition-delay": "1s",
                "left": "300px"});
        });



        $scope.example_treedata = [
            {
                label: 'Slides',
                children: [
                    {
                        label : 'User Journey 1'
                    },
                    {
                        label : 'User Journey 2'
                    }
                ]
            }
        ];
        $scope.tree_data_length = $scope.example_treedata.length;

        $scope.addToTree = function() {

            var clickedNode = $scope.clickedNode;

            var template_data = '';
            template_data += '<ul class="nav nav-list nav-pills nav-stacked abn-tree">';
            template_data += '<li id="idValue" class="abn-tree-row" ng-animate="abn-tree-animate">'+
                '<a>'+
                '<span class="indented tree-icon treeiconfile">&#128196;</span>' +
                '<span class="indented tree-label">Example</span></a></li>';
            template_data += '</ul>';
            var div_element = '#'+clickedNode;

            $(div_element).append(template_data);
            $compile(div_element)($scope);

        }
       
        $scope.when_user_clicks_branch = function(Id) {

                PageLayout.get({pageId: Id}, function(data) {
                $scope.sectionDataChange(data);
            });
        }

        $scope.when_user_clicks_icon = function(params) {
            var itemCollection = $scope.tree_rows;
            var label_with_space = params.split('_').join(' ');
            $scope.clickedNode = params;

        }
    }
]);





