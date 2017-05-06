/**
 * Created by Jonathan on 5/6/2017.
 */

var myApp = angular.module('inward');

myApp.controller('GreetingController', ['$scope', function($scope) {
    $scope.greeting = 'Hola!';
}]);

myApp.controller('laboratoryTestCtrl', AngularWayCtrl);
AngularWayCtrl.$inject = ['$scope'];

function AngularWayCtrl($scope) {
    var vm = this;
    /*  vm.dtOptions = DTOptionsBuilder.newOptions()
     .withPaginationType('full_numbers')
     .withDisplayLength(2)
     .withDOM('pitrfl');
     vm.dtColumns = [
     DTColumnBuilder.newColumn('id').withTitle('ID'),
     DTColumnBuilder.newColumn('title').withTitle('First name'),
     DTColumnBuilder.newColumn('lastName').withTitle('Last name').notVisible()
     ];*/
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
