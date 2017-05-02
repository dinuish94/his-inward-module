'use strict';

angular.module('inward').
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/ward',{
            templateUrl:'components/ward/allWards.html',
            controller: 'GreetingController'
        })
        .when('/view2', {
            templateUrl: 'components/ward/test2.html'
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