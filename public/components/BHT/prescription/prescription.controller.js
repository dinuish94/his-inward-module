angular.module('inward').controller('prescriptionController', ['$scope', 'prescriptionService', 'ngNotify','$routeParams', function prescriptionCtrl($scope, prescriptionService, ngNotify,$routeParams) {
    $scope.sortType = 'dosage'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';
    $scope.prescriptions = [];


    function getPres() {
        let id = $routeParams.id;
        prescriptionService.get(id).then(prescriptions => {
            $scope.prescriptions = prescriptions;
            console.log(prescriptions);
        });
    }

    getPres();

    $scope.addPres = (pres) => {
        let id = $routeParams.id;
        var newPres = {
            patient:id,
            drug: pres.drug._id,
            dosage: pres.dosage,
            frequency: pres.frequency
        }
        prescriptionService.add(id,newPres).then((addedPres) => {
            getPres();
        });
        ngNotify.set('Prescription added successfully!', 'success');
    };

    $scope.removePres = (index) => {
        prescriptionService.delete(index).then(()=>{
            getPres();
            console.log("kashif");
            ngNotify.set('Prescription deleted successfully!', 'danger');
        });
        
    }

    $scope.saveUser = function (data, id) {
        console.log("data");
        prescriptionService.update(id, data).then((updatePres) => {
            getPres();
        });
        ngNotify.set('Prescription updated successfully!', 'success');
    };

}]);


