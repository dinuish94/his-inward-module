angular.module('inward').controller('prescriptionCtrl',prescriptionCtrl);


 function prescriptionCtrl($scope,prescriptionService) {
        var vm = this;
        $scope.sortType     = 'dosage'; // set the default sort type
        $scope.sortReverse  = false;  // set the default sort order
        $scope.searchFish   = '';  
        prescriptionService.get().then(prescriptions=>{
            $scope.prescriptions = prescriptions;
        });  
 }

 