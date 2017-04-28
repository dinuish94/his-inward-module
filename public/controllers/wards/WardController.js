/**
 * Created by dinuksha on 4/27/17.
 */
var app = angular.module('inward',[]);

app.controller('WardController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
}]);