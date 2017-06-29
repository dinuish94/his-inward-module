/**
 * Created by dinukshakandasamanage on 4/29/17.
 */

angular.module('inward').controller('WardController',
    ['WardService', '$location', '$scope', 'ngNotify','$mdDialog','SweetAlert', function( WardService, $location, $scope, ngNotify, $mdDialog, SweetAlert) {
    var vm = this;

    function getWards() {

        WardService.get().then(wards =>{
            vm.wards = wards;
            $scope.wards = wards;
        })
    }
    getWards();

    $scope.completedFilter = (object) => {
        return object.available === true;
    }
    
    $scope.goToAdd = () => {
        $location.path('/addWard');
    }

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

    $scope.addWard = (ward) => {
        WardService.add(ward).then(() => {
            getWards();
        });
        $location.path('/ward');
        ngNotify.set('Ward added successfully!','success');
    };

    WardService.getDoctors().then(doctors =>{
        $scope.doctors = doctors;
    })

    $scope.getWard = (id) => {
        WardService.getWardById(id).then(ward => {
            $scope.editWard = ward;
        })
    }

     $scope.goToAssignPatient = (id) => {
         $location.path('/assignPatient/'+id);
     }
}]);
