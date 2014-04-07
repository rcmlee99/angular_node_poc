'use strict';

/**
 * The Angular application
 */
var rpApp = angular.module('rpApp', [
    'ngRoute',
    'ngCookies',
    'ngAnimate',
    'rpApp.controllers',
    'rpApp.directives',
    'rpApp.services',
    'rpApp.filters'
]);

/**
 * Configure the application
 */
rpApp.config([
    '$routeProvider',
    '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/',          { templateUrl: 'ide.html' })
        ;

        // Turn on HTML5 mode. AngularJS will fall back to hashbang routing if
        // the browser does not support HTML5.
        $locationProvider.html5Mode(true);
    }
]);
