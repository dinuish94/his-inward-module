var patient = angular.module('inward');

patient.controller('patientController',['patientService','$scope','ngNotify', function (patientService,$scope,ngNotify) {
    console.log('asjjahfijsdfj');

    $scope.show = function(){
        console.log("du da da");
    }
    $scope.addPatient = (data) => {
        console.log(data);
        patientService.post(data).then(data=>{
            ngNotify.set('successful','success');
        })
    }
}]);