var patient = angular.module('inward');

patient.controller('patientController', function(patientService, sharedProperties, $location, $scope, ngNotify, $mdDialog,SweetAlert, ngDialog ) {
// patient.controller('patientController',['patientService','sharedProperties','$location', '$scope', 'ngNotify','$mdDialog','ngDialog','SweetAlert', 'ngDialog', 
// function(patientService,sharedProperties,$location, $scope, ngNotify, $mdDialog, SweetAlert, ngDialog) {
    console.log('asjjahfijsdfj');
    var vm=this;

    $scope.show = function(){
        console.log("du da da");
    }

    $scope.addPatient = (data) => {
        console.log(data);
        patientService.add(data).then(data=>{
            ngNotify.set('successful','success');
        })
        sharedProperties.setPid(pid).then(function(pid){
            console.log("dta is:"+pid);
        })
    }

    $scope.clickToOpen = function (patient) {
        console.log("click");
        $scope.selectedPatient = angular.copy(patient);

        ngDialog.openConfirm({
            template: 'templateUpdate',
            className: 'ngdialog-theme-default dialogwidth800',
            scope: $scope
            // appendClassName: 'ngdialog-custom',
            // width:'800px'
        }).then(
        function (value) {
            console.log("confirm");
        }, function (reason) {
            console.log('Modal promise rejected. Reason: ', reason);
        });
    };


     function getPatients() {
        patientService.get().then(patients =>{
            vm.patients = patients;
        })
    }

    getPatients();
    
    $scope.goToAdd = () => {
        $location.path('/viewPatient');
    }

    $scope.deletePatient = (id) =>{
        console.log('hjhjhjhjahsjhajsh')
        "use strict";
        SweetAlert.swal({
            title: "Are you sure you want to Discharged?", 
            text: "You will not be able to recover this record!", 
            type: "warning", 
            showCancelButton: true, 
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Discharged",
            closeOnConfirm: false,
            closeOnCancel: true
        }, 
        function(isConfirm){
            if(isConfirm){
                patientService.delete(id).then(()=>{
                    ngNotify.set('Patient Discharged!','error');
                    getWards();
                })
                SweetAlert.swal("Discharged!");
            }
        });
        
    }

});