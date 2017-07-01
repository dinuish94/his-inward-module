angular.module('inward').controller('dietController', ['$scope', 'prescriptionService', 'ngNotify','dietService','$routeParams', function prescriptionCtrl($scope, prescriptionService, ngNotify,dietService,$routeParams) {
    $scope.sortType = 'dosage'; // set the default sort type
    $scope.sortReverse = false;  // set the default sort order
    $scope.searchFish = '';
    $scope.prescriptions = [];


    function getPres() {
        prescriptionService.get().then(prescriptions => {
            $scope.prescriptions = prescriptions;
        });
    }

    function getDiets() {
        let id = $routeParams.id;
        dietService.get(id).then(diets => {
            $scope.diets = diets;
            console.log(diets);
        });
    }

    getPres();
    getDiets();

    $scope.addDiet = (diet) => {
        let id = $routeParams.id;
        console.log(diet);

        var newDiet = {
            foodId:diet.food._id,
            meal:diet.meal,
            quantity:diet.quantity
        }

        console.log(newDiet);

        dietService.add(id,newDiet).then(diet => {
            getDiets();
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


