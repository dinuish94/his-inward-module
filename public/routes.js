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
        .when('/wards/:wardId/beds', {
            templateUrl: 'components/bed/beds.view.html',
            controller: 'BedController'
        })
        .when('/availability', {
            templateUrl: 'components/ward/availability.view.html',
            controller: 'WardController'
        })
        .when('/assignPatient/:wardId', {
            templateUrl: 'components/bed/patientBed.view.html',
            controller: 'BedController'
        })
        .when('/allocations', {
            templateUrl: 'components/bed/allocations.view.html',
            controller: 'WardController'
        })
        .when('/view3', {
            templateUrl: 'components/BHT/feverChart.html',
            controller: 'lineChartController'
        })
        .when('/view4', {
            templateUrl: 'components/BHT/prescription/prescription.html',
            controller: "prescriptionController"
        })
        .when('/patient', {
            templateUrl: 'components/patient/patient.html',
            controller: 'patientController'
        })
        .when('/modal',{
            templateUrl:'components/BHT/prescription/modal.html'
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
        .when('/viewAvailableTests', {
            templateUrl: 'components/BHT/labTestTypes.view.html',
        })
        .otherwise({redirectTo: '/view1'});
}]);

