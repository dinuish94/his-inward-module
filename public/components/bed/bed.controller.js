/**
 * Created by dinuksha on 5/2/17.
 */
angular.module('inward').controller('BedController',
    ['$location', '$scope', 'ngNotify', 'sharedProperties', 'WardService', function($location, $scope, ngNotify, sharedProperties, WardService) {
    "use strict";
    var vm = this;

    var wardId = sharedProperties.getWardNo();
    $scope.id = wardId;

    var vm = this;

    function getBeds(wardId) {

        WardService.getBeds(wardId).then(ward =>{
            // console.log(ward.beds[]);
            console.log(ward.beds);
            vm.beds = ward.beds;
        })
    }
    getBeds(wardId);

}]);