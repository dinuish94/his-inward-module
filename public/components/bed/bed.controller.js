/**
 * Created by dinuksha on 5/2/17.
 */
angular.module('inward').controller('BedController',
    ['$location', '$scope', 'ngNotify', 'BedService', '$routeParams', '$route', function($location, $scope, ngNotify, BedService, $routeParams, $route) {
    "use strict";
    var vm = this;

    let wardId = $routeParams.wardId;
    $scope.id = wardId;

    // Retrieve all beds
    function getBeds(wardId) {

        BedService.getBeds(wardId).then(ward =>{
            vm.beds = ward.beds;
            $scope.wardName = ward.name;
            $scope.beds = ward.beds;
        })
    }
    if(wardId!= undefined){
        getBeds(wardId);
    }

    // Add new bed
    $scope.addBed = (bed) => {
        BedService.add(wardId, bed).then(() => {
            getBeds(wardId);
        });
        ngNotify.set('Bed added successfully!','success');
        $route.reload();
    }

    // Delete bed
    $scope.deleteBed = (bedId) => {
        BedService.delete(wardId, bedId).then(() => {
            getBeds(wardId);
        });
        ngNotify.set('Bed deleted successfully!','error');
    }

    // Filters the available beds
    $scope.completedFilter = (object) => {
        return object.available === true;
    }

    // Retrieves bed by ID
    $scope.getBed = (bedId) => {
        $location.path('/assignPatient/'+$scope.id+'/beds/'+bedId);
    }

    $scope.patientBed = {};
    $scope.patientBed.bedId = Number($routeParams.bedId);

    // Assigns a patient to a bed
    $scope.assignPatient = (patientBed) => {
        BedService.assignPatient(patientBed,patientBed.bedId).then(patient => {
            console.log(patient);
            ngNotify.set('Patient assigned!','success')
            $route.reload();
        })
    }

}]);