/**
 * Created by dinukshakandasamanage on 4/29/17.
 */

angular.module('inward').controller('WardController', ['WardService', '$location', '$scope', function( WardService, $location, $scope) {
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
    
    $scope.addWard = (ward) => {
        WardService.add(ward).then(() => {
            getWards();
            $scope.ward = {};
        });
        $location.path('/ward');
    };
}]);
