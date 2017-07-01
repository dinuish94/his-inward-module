angular.module('inward').controller('foodController', ['$scope', 'foodService', function ($scope, foodService) {

  $scope.selected = "";

  foodService.get().then(foods => {
    $scope.foods = foods;
  });

}]);