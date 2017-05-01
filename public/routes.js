'use strict';

angular.module('inward').
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/', {
            templateUrl: 'components/dashboard/dashboard.html'
        })
        .when('/ward',{
            templateUrl:'components/ward/allWards.html',
            controller: 'GreetingController'
        })
        .when('/view2', {
            templateUrl: 'components/ward/addWard.html'
        })
        .otherwise({redirectTo: '/view1'});
}]);