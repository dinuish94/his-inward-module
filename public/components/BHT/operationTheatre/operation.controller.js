
angular.module('inward').controller('OperationTheatreController',
    ['OperationTheatreService','LabTestService','$location', '$scope', 'ngNotify', '$mdDialog','$routeParams','SweetAlert',function( OperationTheatreService,LabTestService, $location, $scope, ngNotify, $mdDialog,$routeParams,SweetAlert) {

        function getPatientDetails(){
            let patientId = $routeParams.id;
            LabTestService.getPatientById(patientId).then(patient =>{
                console.log(patient.operations);
                $scope.operations = patient.operations;
                $scope.patient = patient;
            });
        }

        function getDoctors(){
            OperationTheatreService.getDoctors().then(doctors=>{
                $scope.doctors = doctors;
               // console.log(doctors);
            });
        }

        getDoctors();
        getPatientDetails();

        $scope.addTheatreOperation = (patientId,theatre) =>{
            OperationTheatreService.add(patientId,theatre).then(patient=>{
                $scope.operations = "";
                $scope.patient = patient;
                $scope.operations = patient.operations;
                $scope.patient = patient;
            });
        }

        $scope.checkStatus = function(a){
            if (a.activeFlag==1)
                return true;
            else
                return false;           
        }

        $scope.deleteOperation = (operationId) => {
            SweetAlert.swal({
            title: "Are you sure you want to delete?", 
            text: "You will not be able to recover this record!", 
            type: "warning", 
            showCancelButton: true, 
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Delete",
            closeOnConfirm: false,
            closeOnCancel: true
            }, 
            function(isConfirm){
                if(isConfirm){
                    OperationTheatreService.delete(operationId).then(patient => {
                    $scope.operations = "";
                    $scope.patient = patient;
                    getPatientDetails();
                    // $scope.operations = patient.operations;
                    // $scope.patient = patient;
                    });
                    
                    SweetAlert.swal("Deleted!", "The record has been deleted.", "success");
                }
            });   
            
        };
        
}]);