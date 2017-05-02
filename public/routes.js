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
        .when('/view3', {
            templateUrl: 'components/BHT/feverChart.html',
            controller: 'lineChartController'
        })
        .when('/view4', {
            templateUrl: 'components/BHT/datatables.html'
        })
        .otherwise({redirectTo: '/view1'});
}]);