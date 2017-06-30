/**
 * Created by Jonathan on 5/6/2017.
 */

angular.module('inward').controller('LabRequestList',
    ['LabTestService', '$location', '$scope', 'ngNotify', '$mdDialog','$routeParams',function( LabTestService, $location, $scope, ngNotify, $mdDialog,$routeParams) {

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
            lab.status = "Cancelled";
            lab.activeFlag = 0;
            LabTestService.updateLabRequest(labRequestId,lab).then(lab =>{
                $scope.labRequests = "";
                $scope.patient = "";
                $scope.lab = "";
                getLabRequests();
            });
        }
    }]);