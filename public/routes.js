'use strict';

angular.module('inward').
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/ward',{
            templateUrl:'components/ward/addWard.html',
            controller: 'GreetingController'
        })
        .when('/view2', {
            templateUrl: 'components/ward/test2.html'
        })
        .otherwise({redirectTo: '/view1'});
}]);