/**
 * Created by dinuksha on 5/2/17.
 */
angular.module('inward').controller('BedController',
    ['$location', '$scope', 'ngNotify', 'BedService', '$routeParams', '$route', function($location, $scope, ngNotify, BedService, $routeParams, $route) {
    "use strict";
    var vm = this;

    let wardId = $routeParams.wardId;
    $scope.id = wardId;

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
    $scope.addBed = (bed) => {
        BedService.add(wardId, bed).then(() => {
            getBeds(wardId);
        });
        ngNotify.set('Bed added successfully!','success');
        $route.reload();
    }

    $scope.deleteBed = (bedId) => {
        BedService.delete(wardId, bedId).then(() => {
            getBeds(wardId);
        });
        ngNotify.set('Bed deleted successfully!','error');
    }

    $scope.completedFilter = (object) => {
        return object.available === true;
    }

    $scope.getBed = (id) => {
        BedService.getBedById(id).then( bed => {
            $scope.patientBed.bedId = bed.bId;
        })
    }

    $scope.assignPatient = (patientBed) => {
        console.log(patientBed);
        BedService.assignPatient(patientBed,patientBed.bedId).then(patient => {
            console.log(patient);
            ngNotify.set('Patient assigned!','success')
            $route.reload();
        })
    }

}]);