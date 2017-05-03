/**
 * Created by dinukshakandasamanage on 4/29/17.
 */

angular.module('inward').controller('WardController',
    ['WardService', '$location', '$scope', 'ngNotify', 'sharedProperties','$mdDialog', function( WardService, $location, $scope, ngNotify, sharedProperties, $mdDialog) {
    var vm = this;

    function getWards() {

        WardService.get().then(wards =>{
            vm.wards = wards;
        })
    }
    getWards();
    
    $scope.goToAdd = () => {
        $location.path('/addWard');
    }

    $scope.deleteWard = (id) =>{
        "use strict";
    
        WardService.delete(id).then(()=>{
            ngNotify.set('Ward Deleted!','error');
            getWards();
        })
    }

    $scope.goToAddBed = (id) => {
        $location.path('/beds');
        sharedProperties.setWardNo(id);
    }

    $scope.addWard = (ward) => {
        WardService.add(ward).then(() => {
            getWards();
        });
        $location.path('/ward');
        ngNotify.set('Ward added successfully!','success');
    };
}]);
