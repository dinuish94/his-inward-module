/**
 * Created by dinuksha on 5/2/17.
 */
angular.module('inward').controller('BedController',
    ['$location', '$scope', 'ngNotify', 'BedService', '$routeParams', function($location, $scope, ngNotify, BedService, $routeParams) {
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
    getBeds(wardId);

    $scope.addBed = (bed) => {
        BedService.add(wardId, bed).then(() => {
            getBeds(wardId);
        });
        ngNotify.set('Bed added successfully!','success');
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

}]);