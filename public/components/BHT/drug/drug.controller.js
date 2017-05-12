angular.module('inward').controller('drugController', ['$scope', 'drugService', function ($scope, drugService) {

  $scope.selected = "";

  drugService.get().then(drugs => {
    $scope.drugs = drugs;
  });

}]);