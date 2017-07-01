/**
 * Created by dinukshakandasamanage on 4/29/17.
 */

angular.module('inward').controller('WardController',
    ['WardService', '$location', '$scope', 'ngNotify','$mdDialog','SweetAlert', '$route', function( WardService, $location, $scope, ngNotify, $mdDialog, SweetAlert, $route) {
    var vm = this;

    // Retrieve all wards
    function getWards() {

        WardService.get().then(wards =>{
            vm.wards = wards;
            $scope.wards = wards;
        })
    }

    getWards();

    // Fiter available beds
    $scope.completedFilter = (object) => {
        return object.available === true;
    }
    
    $scope.goToAdd = () => {
        $location.path('/addWard');
    }

    // Delete a ward
    $scope.deleteWard = (id) =>{
        "use strict";
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
                WardService.delete(id).then(()=>{
                    ngNotify.set('Ward Deleted!','error');
                    getWards();
                })
                SweetAlert.swal("Deleted!");
            }
        });
        
    }

    $scope.goToAddBed = (id) => {
        $location.url('/wards/' + id+ '/beds');
    }

    // Adds a new ward
    $scope.addWard = (ward) => {
        WardService.add(ward).then(() => {
            getWards();
        });
        $location.path('/ward');
        ngNotify.set('Ward added successfully!','success');
    };

    // Update a ward
    $scope.updateWard = (wardId, ward) => {
        WardService.update(wardId, ward).then(ward => {
            $route.reload();
        })
    }

    // Retrieve all doctors
    WardService.getDoctors().then(doctors =>{
        $scope.doctors = doctors;
    })

    // Retrieve ward by given ID
    $scope.getWard = (id) => {
        WardService.getWardById(id).then(ward => {
            $scope.editWard = ward;
        })
    }

    $scope.goToAssignPatient = (id) => {
        $location.path('/assignPatient/'+id);
    }

    // Filters beds that have patients assigned
    $scope.patientFilter = (object) => {
        return object.patient != null ;
    }

    // Updates the data according to the ward selected
    $scope.update = (ward) => {
        $scope.wardName = ward.name;
        $scope.wardDesc = ward.description;
        console.log(ward);
        WardService.getPatients(ward.id).then(beds => {
            $scope.beds = beds;
        })
    }

    // Updates the beds by the ward selected
    $scope.updateBeds = (ward) => {
        $scope.selectedWardBeds = ward.beds;
        console.log(ward);
    }

    // Adds an internal transfer
    $scope.addTransfer = (transfer) => {
        transfer.to = transfer.to.id;
        WardService.internalTransfer(transfer).then( transfer => {
            console.log(transfer);
        })
        $scope.transfer = {};
       
    }

    // Adds an external transfer
    $scope.externalTransfer = (transfer) => {
        WardService.externalTransfer(transfer).then( transfer => {
            console.log(transfer);
        })
        $scope.transfer = {};
       
    }
}]);
