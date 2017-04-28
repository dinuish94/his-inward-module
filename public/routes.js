'use strict';

// Declare app level module which depends on views, and components
angular.module('inward', [
    'ngRoute'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/view1',{
            templateUrl:'components/ward/test.html'
        })
        .when('/view2', {
            templateUrl: 'components/ward/test2.html'
        })
        .otherwise({redirectTo: '/view1'});
}]);