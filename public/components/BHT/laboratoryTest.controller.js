/**
 * Created by Jonathan on 5/6/2017.
 */

angular.module('inward').controller('LabTestController',
    ['LabTestService', '$location', '$scope', 'ngNotify', '$mdDialog', function( LabTestService, $location, $scope, ngNotify, $mdDialog) {

        var vm = this;

        function getLabTests() {
            LabTestService.get().then(labTests =>{
                //console.log(labTests);
                vm.labTests = labTests;
        })
        }
        getLabTests();


        $scope.addLab = (lab) => {
            LabTestService.add(lab).then(() => {
                getLabTests();
        });

            ngNotify.set('Laboratory Test added successfully!','success');
        };

        $scope.deleteLab = (testId) => {

            LabTestService.delete(testId).then(() => {
                getLabTests();
        });
            ngNotify.set('Laboratory Test Deleted successfully!','error');
           // setTimeout(function(){ window.location.reload(); }, 3000);

        };

        function test(){
            console.log("fcdsavds");
        }


        $scope.getLab = (testId) => {
            LabTestService.getLab(testId).then(lab => {
            $scope.labEdit = lab;
        });

        };

        // lab test names to load in add new lab schedule modal
        getLabTestType = () => {
            LabTestService.getLabTypes().then(labTypes => {
               // $scope.labNames = labTypes;
                console.log(labTypes);
        });

        };
        getLabTestType();



    }]);