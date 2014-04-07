'use strict';

/**
 * Our services
 */
var rpServices = angular.module('rpApp.services', ['ngResource']);


rpServices.factory('PageLayout', [
    '$resource',
    'PageLayoutModel',

    function($resource) {
        return $resource('/getPageSection/:pageId', {pageId:'@id'});
    }
]);

rpServices.factory('PageLayoutModel', function () {
    var output = {};

    var set = function (data) {
        angular.copy(data, output);
        console.log('Data set!');
    };

    return {
        set: set,
        data: output
    };
});

rpServices.factory('PageHtml', [
    '$resource',

    function($resource) {

        var url = '/getSectionHTML/:sectionName';
        return $resource(url, {sectionName:'Test Data'}, {
            query: { method: 'GET', isArray: false }
        });
    }
]);




