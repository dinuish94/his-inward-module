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
        "firstName": "Diabetic",
        "lastName": "Pending",
        "priority": "Pending",
        "date": "2017-05-04"
    }, {
        "id": 870,
        "firstName": "Glucose",
        "lastName": "Complete",
        "priority": "Pending",
        "date": "2017-05-04"
    }, {
        "id": 590,
        "firstName": "Diabetic",
        "lastName": "Pending",
        "priority": "Pending",
        "date": "2017-05-04"
    }, {
        "id": 803,
        "firstName": "Blood",
        "lastName": "passed",
        "priority": "Pending",
        "date": "2017-05-04"
    }, {
        "id": 857,
        "firstName": "Test",
        "lastName": "failed",
        "priority": "Pending",
        "date": "2017-05-04"
    },{
        "id": 803,
        "firstName": "Blood",
        "lastName": "passed",
        "priority": "Pending",
        "date": "2017-05-04"
    },{
        "id": 803,
        "firstName": "Blood",
        "lastName": "passed",
        "priority": "Pending",
        "date": "2017-05-04"
    },{
        "id": 803,
        "firstName": "Blood",
        "lastName": "passed",
        "priority": "Pending",
        "date": "2017-05-04"
    },{
        "id": 803,
        "firstName": "Blood",
        "lastName": "passed",
        "priority": "Pending",
        "date": "2017-05-04"
    }];
    vm.persons = persons;
}
