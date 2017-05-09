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
        .when('/patient', {
            templateUrl: 'components/patient/patient.html'
        })
        .when('/addLabTest', {
            templateUrl: 'components/BHT/addLaboratoryTest.view.html',
            controller: 'LabTestController'
        })
        .when('/diabeticChart', {
            templateUrl: 'components/BHT/diabeticChart.view.html',
            controller: 'diabeticChartController'
        })
        .when('/bhtOptions', {
            templateUrl: 'components/BHT/bhtOptions.view.html',
        })
        .otherwise({redirectTo: '/view1'});
}]);
