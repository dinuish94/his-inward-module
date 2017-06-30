angular.module('inward').controller('dietController', ['$scope', 'prescriptionService', 'ngNotify','dietService', function prescriptionCtrl($scope, prescriptionService, ngNotify,dietService) {
    $scope.sortType = 'dosage'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';
    $scope.prescriptions = [];


    function getPres() {
        prescriptionService.get().then(prescriptions => {
            $scope.prescriptions = prescriptions;
        });
    }

    function getDiets(id) {
        dietService.get(id).then(diets => {
            $scope.diets = diets;
            console.log(diets);
        });
    }

    getPres();
    getDiets(1);

    $scope.addDiet = (diet) => {
        console.log(diet);

        var newDiet = {
            foodId:diet.food._id,
            meal:diet.meal,
            quantity:diet.quantity
        }

        dietService.add(1,newDiet).then(diet => {
            getDiets(1);
        });
    }

    $scope.removeDiet = (id) => {
        dietService.delete(id).then(response => {
          getDiets(1);  
        });
    }

    $scope.updateDiet = (diet,id) => {
        console.log(diet);
        console.log(id);
        dietService.update(id,diet).then(diet => {
            getDiets(1);
        });
    }



}]);


