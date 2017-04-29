/**
 * Created by dinukshakandasamanage on 4/29/17.
 */
var myApp = angular.module('inward');

myApp.controller('GreetingController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
}]);

myApp.controller('AngularWayCtrl', AngularWayCtrl);

function AngularWayCtrl() {
    var vm = this;
    var persons = [{
        "id": 860,
        "firstName": "Superman",
        "lastName": "Yoda"
    }, {
        "id": 870,
        "firstName": "Foo",
        "lastName": "Whateveryournameis"
    }, {
        "id": 590,
        "firstName": "Toto",
        "lastName": "Titi"
    }, {
        "id": 803,
        "firstName": "Luke",
        "lastName": "Kyle"
    }, {
        "id": 857,
        "firstName": "Test",
        "lastName": "Kyle"
    }];
    vm.persons = persons;
}