'use strict';

angular.module('inward').
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
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
        .when('/assignPatient/:wardId/beds/:bedId', {
            templateUrl: 'components/bed/assignPatient.view.html',
            controller: 'BedController'
        })
        .when('/allocations', {
            templateUrl: 'components/bed/allocations.view.html',
            controller: 'WardController'
        })
        .when('/transfers', {
            templateUrl: 'components/bed/transfer.view.html',
            controller: 'WardController'
        })
        .when('/transfers#profile', {
            templateUrl: 'components/bed/internalTransfer.view.html',
            controller: 'WardController'
        })
        .when('/externalTransfers', {
            templateUrl: 'components/bed/externalTransfer.view.html',
            controller: 'WardController'
        })
        .when('/view3', {
            templateUrl: 'components/BHT/feverChart.html',
            controller: 'lineChartController'
        })
        .when('/prescription/:id', {
            templateUrl: 'components/BHT/prescription/prescription.html',
            controller: "prescriptionController"
        })
        .when('/diet/:id',{
          templateUrl:'components/BHT/Diet Plan/diet.view.html',
          controller: 'dietController'  
        })
        .when('/patient', {
            templateUrl: 'components/patient/patient.html',
            controller: 'patientController'
        })
        .when('/viewPatient', {
            templateUrl: 'components/patient/viewPatient.html',
            controller: 'patientController'
        })
        .when('/modal',{
            templateUrl:'components/BHT/prescription/modal.html'
        })
        .when('/addLabTest/:id', {
            templateUrl: 'components/BHT/laboratory/laboratoryTest.list.view.html',
            controller: 'LabTestController'
        })
        .when('/diabeticChart', {
            templateUrl: 'components/BHT/chart/diabeticChart.view.html',
            controller: 'diabeticChartController'
        })
        .when('/feverChart', {
            templateUrl: 'components/BHT/chart/feverChart.view.html',
            controller: 'feverChartController'
        })
        .when('/lbChart', {
            templateUrl: 'components/BHT/chart/liquidBalance.view.html',
            controller: 'liquidBalanceController'
        })
        .when('/bht/:id', {
            templateUrl: 'components/BHT/bht.view.html',
            controller: 'BHTController'
        })
        .when('/viewTestTypes', {
            templateUrl: 'components/BHT/laboratory/labTestTypes.view.html',
            controller: 'LabTestTypeController'
        })
        .when('/viewLabRequests/:id', {
            templateUrl: 'components/BHT/laboratory/laboratoryTest.requests.view.html',
            controller: 'LabRequestList'
        })
        .when('/theatreList/:id', {
            templateUrl: 'components/BHT/operationTheatre/operation.list.view.html',
            controller: 'OperationTheatreController'
        })
        .when('/test', {
            templateUrl: 'components/BHT/home.view.html',
            controller: 'Home'
        })
        .otherwise({redirectTo: '/viewPatient'});

}]);

function ensureAuthenticated(req,res,next) {
    
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('error_msg','You are not logged in');
        res.redirect('/users/login');
    }
}

