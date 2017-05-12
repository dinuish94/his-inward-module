
angular.module('inward').controller('LabTestTypeController',
    ['LabTestService', '$location', '$scope', 'ngNotify', '$mdDialog', function( LabTestService, $location, $scope, ngNotify, $mdDialog) {

        var vm = this;

        function getLabTestTypes() {
            LabTestService.getLabTestTypes().then(labTestTypes =>{
                vm.labTestTypes = labTestTypes;
            })
        }
        getLabTestTypes();

         $scope.addLabTestType = (labType) => {
            LabTestService.addLabTestType(labType).then(() => {
                getLabTestTypes();
            });
            ngNotify.set('Laboratory Test Type added successfully!','success');
        };

        $scope.deleteLabType = (id) => {

            LabTestService.deleteLabType(id).then(() => {
                getLabTestTypes();
        });
            ngNotify.set('Laboratory Test Deleted successfully!','error');
            // setTimeout(function(){ window.location.reload(); }, 3000);

        };

}]);