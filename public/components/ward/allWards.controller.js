/**
 * Created by dinukshakandasamanage on 4/29/17.
 */
var myApp = angular.module('inward');

myApp.controller('GreetingController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
}]);

myApp.controller('AngularWayCtrl', getData);

function getData() {
    var vm = this;
    var persons = [{
        "id": 860,
        "firstName": "Mary",
        "lastName": "Jane"
    }, {
        "id": 870,
        "firstName": "Tony",
        "lastName": "Stark"
    }, {
        "id": 590,
        "firstName": "Darth",
        "lastName": "Wader"
    }, {
        "id": 803,
        "firstName": "Bruce",
        "lastName": "Wayne"
    }, {
        "id": 857,
        "firstName": "Matthew",
        "lastName": "Murdock"
    }];
    vm.persons = persons;
}