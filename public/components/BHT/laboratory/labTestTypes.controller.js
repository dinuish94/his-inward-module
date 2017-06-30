
angular.module('inward').controller('LabTestTypeController',
    ['LabTestService', '$location', '$scope', 'ngNotify', '$mdDialog', function( LabTestService, $location, $scope, ngNotify, $mdDialog) {


        function getLabTestTypes() {
            LabTestService.getLabTestTypes().then(labTestTypes =>{
                $scope.labTestTypes = labTestTypes;
            })
        }

        getLabTestTypes();

         $scope.addLabTestType = (labType) => {
            LabTestService.addLabTestType(labType).then(() => {
                labType="";
                getLabTestTypes();
            });
            ngNotify.set('Laboratory Test Type added successfully!','success');
        };

        $scope.deleteLabType = (id) => {
            LabTestService.deleteLabType(id).then(() => {
                getLabTestTypes();
            });
            ngNotify.set('Laboratory Test Deleted successfully!','error');
        };

}]);