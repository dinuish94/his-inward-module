'use strict';

angular.module('inward').
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        // .when('/', {
        //     templateUrl: 'components/dashboard/dashboard.html'
        // })
        .when('/ward',{
            templateUrl:'components/ward/allWards.view.html',
            controller: 'WardController'
        })
        .when('/addWard', {
            templateUrl: 'components/ward/addWard.view.html',
            controller: 'WardController'
        })
        .when('/beds', {
            templateUrl: 'components/bed/beds.view.html',
            controller: 'BedController'
        })
        .otherwise({redirectTo: '/view1'});
}]);