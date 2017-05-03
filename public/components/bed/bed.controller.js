/**
 * Created by dinuksha on 5/2/17.
 */
angular.module('inward').controller('BedController',
    ['$location', '$scope', 'ngNotify', 'sharedProperties', 'BedService', function($location, $scope, ngNotify, sharedProperties, BedService) {
    "use strict";
    var vm = this;
    //TODO: Append bed ID to the URL
    var wardId = sharedProperties.getWardNo();
    $scope.id = wardId;

    var vm = this;

    function getBeds(wardId) {

        BedService.getBeds(wardId).then(ward =>{
            vm.beds = ward.beds;
        })
    }
    getBeds(wardId);

    $scope.addBed = (bed) => {
        BedService.add($scope.id, bed).then(() => {
            getBeds($scope.id);
        });
        // $location.path('/ward');
        ngNotify.set('Bed added successfully!','success');
    };



}]);