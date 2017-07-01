/**
 * Created by Jonathan on 5/6/2017.
 */

angular.module('inward').controller('LabRequestList',
    ['LabTestService', '$location', '$scope', 'ngNotify', '$mdDialog','$routeParams','SweetAlert',function( LabTestService, $location, $scope, ngNotify, $mdDialog,$routeParams,SweetAlert) {

        function getLabRequests() {
            let id = $routeParams.id;
            LabTestService.getPatientById(id).then(patient =>{
                $scope.labRequests = patient.labTests;
                $scope.patient = patient;
            });
        }

        getLabRequests();

        //get lab test by Id
        $scope.getTestDetails = (labRequestId) =>{
            LabTestService.getLab(labRequestId).then(labRequest =>{
                $scope.lab = "";
                labRequest.remarks="";
                $scope.lab = labRequest;
                console.log(labRequest);
            });
        }

        // Add remarks to the existing lab request(result)
        $scope.addRemarks = (labRequestId,lab) =>{
            lab.status = "Completed";
            LabTestService.updateLabRequest(labRequestId,lab).then(lab =>{
                $scope.labRequests = "";
                $scope.patient = "";
                $scope.lab = "";
                ngNotify.set('Remark added successfully!','success');
                getLabRequests();
            });
        }

        // Show only status = pending requests
        $scope.checkStatus = function(a){
            if (a.status =="Pending" && a.activeFlag==1)
                return true;
            else
                return false;           
        }

        $scope.cancelRequest = (labRequestId,lab) =>{
            
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
                    lab.status = "Cancelled";
                    lab.activeFlag = 0;
                    LabTestService.updateLabRequest(labRequestId,lab).then(lab =>{
                        $scope.labRequests = "";
                        $scope.patient = "";
                        $scope.lab = "";
                    });
                    
                    SweetAlert.swal("Deleted!", "The Request has been deleted.", "success");
                    getLabRequests();
                }
            }); 

        }
    }]);