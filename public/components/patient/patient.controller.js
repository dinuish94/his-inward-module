var patient = angular.module('inward');

patient.controller('patientController', function(patientService, sharedProperties, $location, $scope, ngNotify, $mdDialog,SweetAlert, ngDialog ) {

    var vm=this;

    $scope.show = function(){
        console.log("inside!!");
    }

    $scope.addPatient = (data) => {
        data.status = 'in';
        patientService.add(data).then(data=>{
            data = {};
            ngNotify.set('Patient Add Successfully!','success');
            sharedProperties.setPid(data.pid);
        })
    }

    $scope.clickToOpen = function (patient) {
        $scope.selectedPatient = angular.copy(patient);

        ngDialog.openConfirm({
            template: 'templateUpdate',
            className: 'ngdialog-theme-default dialogwidth1000',
            scope: $scope
        }).then(
        function (value) {
            console.log("confirm");
        }, function (reason) {
            console.log('Modal promise rejected. Reason: ', reason);
        });
    };



$scope.updatePatient = function (id,patient) {
        console.log(patient);
        patientService.update(id,patient).then(function (data) {
            if(data.success){
                alert("Successfully updated!");
                getPatients();

            }else{
                alert("Error!");
            }

        })
    };

     function getPatients() {
        patientService.get().then(patients =>{
            vm.patients = patients;
        })
    }

    getPatients();
    
    $scope.navigatePatientRegi = () => {
        $location.path('/viewPatient');
    }

    $scope.dischargePatient = (id) =>{
        "use strict";
        SweetAlert.swal({
            title: "Are you sure discharge this patient?", 
            text: "Patient will be discharged!", 
            type: "warning", 
            showCancelButton: true, 
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Discharged!",
            closeOnConfirm: false,
            closeOnCancel: true
        }, 
        function(isConfirm){
            if(isConfirm){
                patientService.discharge(id).then(()=>{
                    ngNotify.set('Patient Discharged!','error');
                     getPatients();
                })
                SweetAlert.swal("Discharged!");
            }
        });
        
    }

});