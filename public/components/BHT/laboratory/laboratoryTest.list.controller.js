/**
 * Created by Jonathan on 5/6/2017.
 */

angular.module('inward').controller('LabTestController',
    ['LabTestService', '$location', '$scope', 'ngNotify', '$mdDialog','$routeParams','SweetAlert', function( LabTestService, $location, $scope, ngNotify, $mdDialog,$routeParams,SweetAlert) {


        //get all details of the patient
        function getPatientLabTests() {
            LabTestService.getPatientById($routeParams.id).then(patient =>{
                $scope.labTests = patient.labTests;
                $scope.patient = patient;
            });
        }

        //get all available lab test types
        function getLabTestTypes() {
            LabTestService.getLabTestTypes().then(labTestTypes =>{
                $scope.labTestTypes = labTestTypes;
            });
        }

        getPatientLabTests();
        getLabTestTypes();

        // Add new Lab Test Request
        $scope.addLab = (patientId,lab) => {
            let id = $routeParams.id;
            lab.status="Pending";
            lab.remarks="Pending";
            lab.activeFlag=1;
            LabTestService.add(patientId,lab).then(patient => {
                $scope.labTests = "";
                $scope.patient = "";
                $scope.lab = {};
                $scope.labTests = patient.labTests;
                $scope.patient = patient;
                ngNotify.set('Laboratory Test Request added successfully!','success');
            }); 
        };

        //Get a specific Lab Test details by id
        $scope.getLab = (testId) => {
            LabTestService.getLab(testId).then(lab => {
            $scope.labEdit = lab;
            });
        };

        // update a specific lab request(before completion)
        $scope.updateLabRequest = (labId,lab) => {
             LabTestService.updateLabRequest(labId,lab).then(patient => {
                 $scope.labTests = "";
                 $scope.patient = "";
                 $scope.labTests = patient.labTests;
                 $scope.patient = patient;
                 ngNotify.set('Laboratory Test Updated successfully!','success');   
             });
        };

        // Delete a Specific Lab
        $scope.deleteLab = (testId) => {
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
                    LabTestService.delete(testId).then(patient => {
                    $scope.labTests = "";
                    $scope.patient = "";
                    $scope.labTests = patient.labTests;
                    $scope.patient = patient;
                    });
                    
                    SweetAlert.swal("Deleted!", "The record has been deleted.", "success");
                }
            });   
            
        };

    }]);